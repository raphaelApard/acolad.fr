import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Runs the publish command (content pull, tests, build, copy to the web root) in the background
// and keeps its log. The command is detached so that it survives a restart of the CMS process
// (Passenger stops idle apps); its outcome is read back from the last line of the log.

const cmsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const dataDir = path.join(cmsRoot, 'data')
const logFile = path.join(dataDir, 'publish.log')
const stateFile = path.join(dataDir, 'publish.json')
const EXIT_MARK = '__PUBLISH_EXIT__'

export type PublishStatus = {
  state: 'idle' | 'running' | 'success' | 'failed'
  startedAt?: string
  startedBy?: string
  log: string
}

type State = { pid: number; startedAt: string; startedBy: string }

function readState(): State | null {
  try {
    return JSON.parse(fs.readFileSync(stateFile, 'utf8')) as State
  } catch {
    return null
  }
}

function isAlive(pid: number): boolean {
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

function tail(text: string, lines: number): string {
  return text.split('\n').slice(-lines).join('\n')
}

export function getPublishStatus(): PublishStatus {
  const state = readState()
  if (!state) return { state: 'idle', log: '' }
  const log = fs.existsSync(logFile) ? fs.readFileSync(logFile, 'utf8') : ''
  const exit = log.match(new RegExp(`${EXIT_MARK} (\\d+)`))
  const outcome: PublishStatus['state'] = exit
    ? exit[1] === '0'
      ? 'success'
      : 'failed'
    : isAlive(state.pid)
      ? 'running'
      : 'failed'
  return {
    state: outcome,
    startedAt: state.startedAt,
    startedBy: state.startedBy,
    log: tail(log.replace(new RegExp(`${EXIT_MARK} \\d+\\n?`), ''), 60),
  }
}

export function startPublish(startedBy: string): PublishStatus {
  if (getPublishStatus().state === 'running') return getPublishStatus()

  const command = process.env.PUBLISH_COMMAND || path.resolve(cmsRoot, '../scripts/publish.sh')
  fs.mkdirSync(dataDir, { recursive: true })
  const out = fs.openSync(logFile, 'w')
  const child = spawn('sh', ['-c', `"$0"; echo "${EXIT_MARK} $?"`, command], {
    cwd: path.dirname(command),
    detached: true,
    stdio: ['ignore', out, out],
    env: process.env,
  })
  child.unref()
  fs.closeSync(out)
  if (child.pid === undefined) throw new Error(`Could not start ${command}`)
  fs.writeFileSync(
    stateFile,
    JSON.stringify({ pid: child.pid, startedAt: new Date().toISOString(), startedBy } satisfies State),
  )
  return getPublishStatus()
}
