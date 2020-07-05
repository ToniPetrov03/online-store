import { basename, dirname, join } from 'path';
import { readdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST_IP,
    dialect: 'mysql',
    operatorsAliases: 0
  });

const filename = fileURLToPath(import.meta.url);
const directoryName = dirname(filename);

const db = await readdirSync(directoryName)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename(filename)) && file.slice(-3) === '.js')
  .reduce(async (db, file) => {
    const { default: modelFactory} = await import(pathToFileURL(join(directoryName, file)).href);
    const model = modelFactory(sequelize, Sequelize.DataTypes, Sequelize.Model);
    db[model.name] = model;
    if (db[model.name].associate) {
      db[model.name].associate(db);
    }

    return db;
  }, {});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
