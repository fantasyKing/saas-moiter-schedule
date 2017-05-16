import Connection from './connection';
import mongoose from 'mongoose';

export default function (config, schemas, data_source_name, db_name) {
  if (!config || !Array.isArray(schemas)) {
    throw new Error('invalid params');
  }
  const db = new Connection(config, mongoose);
  const Schema = db.mongoose.Schema;
  let database = null;
  if (data_source_name) {
    if (db_name) {
      database = db.useDatabase(data_source_name, db_name);
    } else {
      database = db.useDatabase(data_source_name);
    }
  } else {
    const data_source_names = Object.keys(config);
    database = db.useDatabase(data_source_names[0]);
  }
  const models = {};
  for (const _schema of schemas) {
    const schema = new Schema(_schema.schema, { collection: _schema.collection });
    schema.set('toJSON', { getters: true, virtuals: true });
    schema.set('toObject', { getters: true, virtuals: true });
    if (_schema.index) {
      const indexs = _schema.index;

      for (const indexField of indexs) {
        const { field, options } = indexField;
        schema.index(field, options);
      }
    }
    models[_schema.name] = database.model(_schema.name, schema);
  }
  return models;
}
