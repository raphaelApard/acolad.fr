import * as migration_20260929_230934_initial from './20260929_230934_initial';

export const migrations = [
  {
    up: migration_20260929_230934_initial.up,
    down: migration_20260929_230934_initial.down,
    name: '20260929_230934_initial'
  },
];
