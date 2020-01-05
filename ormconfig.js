module.exports = {
  type: 'postgres',
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT, 10),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  cli: {
    entitiesDir: 'src/**/*.entity.{ts,js}',
    migrationsDir: 'src/migrations',
  },
  migrations: ['dist/src/migrations/**/*.js'],
  entities: ['dist/**/*.entity.js'],
  logging: true,
  extra: {
    ssl: true,
  },
};
