// Startup file for o2switch's "Setup Node.js App" (Phusion Passenger), which runs a plain
// Node script and gives it the port to listen on: `next start` cannot be used there.
// Run `pnpm build` first; `.env` is loaded by Next.
const { createServer } = require('node:http')
const next = require('next')

const app = next({ dev: false, dir: __dirname })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const port = Number(process.env.PORT || 3000)
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`CMS ready on port ${port}`)
  })
})
