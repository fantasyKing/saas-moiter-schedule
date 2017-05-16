/**
 * Created on 05/12/2017.
 */
import config from '../../config';
import mongoDb from './../../utils/mongodb/';
import server from './server';

const schemas = [
  server
];

const models = mongoDb(config.mongo, schemas);

export default models;
