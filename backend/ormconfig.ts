import _ from './src/lib/_dotenv';
const ENVIRONMENT = process.env.NODE_ENV || 'development';

let ROOT_DIRECTORY = 'src';
let CONFIG_SUFFIX = 'ts';
if (ENVIRONMENT === 'prod') {
  ROOT_DIRECTORY = 'dist';
  CONFIG_SUFFIX = 'js';
}

console.log('DOTENV LOADED: ' + _);

const config = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: [`${ROOT_DIRECTORY}/entity/**/*.${CONFIG_SUFFIX}`],
  migrations: [`${ROOT_DIRECTORY}/database/migration/**/*.${CONFIG_SUFFIX}`],
  cli: {
    entitiesDir: `./${ROOT_DIRECTORY}/entity`,
    migrationsDir: `${ROOT_DIRECTORY}/database/migration`,
  },
  logging: true,
  dropSchema: false,
  synchronize: false,
  migrationsRun: false,
  legacySpatialSupport: false,
};

if (ENVIRONMENT === 'test') {
  config.dropSchema = true;
  config.synchronize = true;
  config.migrationsRun = true;
}

// export default config;
export = { ...config };
