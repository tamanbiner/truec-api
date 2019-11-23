module.exports = {
  type: 'postgres',
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT, 10),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  migrations: ['dist/migrations/*.{ts,js}'],
  cli: { migrationsDir: 'src/migrations' },
  entities: ['dist/**/**.entity.{ts,js}'],
  logging: true,
};
