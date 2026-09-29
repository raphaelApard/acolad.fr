import * as migration_20260929_233449_initial from './20260929_233449_initial';

export const migrations = [
  {
    up: migration_20260929_233449_initial.up,
    down: migration_20260929_233449_initial.down,
    name: '20260929_233449_initial'
  },
];
