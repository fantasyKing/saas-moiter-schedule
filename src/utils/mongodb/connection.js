class DataSource {

  constructor(config, name, mongoose) {
    this.name = name;
    this.default_database = null;
    this.connected_dbs = {};
    this.init(config, mongoose);
  }

  init(config, mongoose) {
    console.log('[DataSource init] -- ', this.name);
    this.connection = mongoose.createConnection(config.uri, config.options);
    if (Array.isArray(config.dbs)) {
      for (const db of config.dbs) {
        if (this.default_database) {
          break;
        }
        if (db.default) {
          this.default_database = db.name;
        }
      }
    }
  }

  /**
   * if name is null, then use default database
   *
   * @param name
   * @returns {*}
   */
  useDatabase(name) {
    name = name || this.default_database;
    if (!name) {
      throw new Error('Invalid database name.');
    }
    if (!this.connection) {
      throw new Error('The database connection failed.');
    }
    if (this.connected_dbs[name]) {
      return this.connected_dbs[name];
    }
    this.connected_dbs[name] = this.connection.useDb(name);
    return this.connected_dbs[name];
  }

  close() {
    this.connection.close();
  }

  closeByName(db_name) {
    db_name = db_name || this.default_database;
    if (!db_name) {
      return;
    }
    if (this.connected_dbs[db_name]) {
      this.connected_dbs[db_name].close();
    }
  }

  closeAll() {
    this.connection.close();
    for (const connection of Object.keys(this.connected_dbs)) {
      connection.close();
    }
  }
}

export default class Connection {
  constructor(dataSourceConfigs, mongoose) {
    console.log('[Mongodb Connected]');
    this.mongoose = mongoose;
    this.dataSources = {};
    this.init(dataSourceConfigs);
  }
  init(dataSourceConfigs) {
    const data_source_names = Object.keys(dataSourceConfigs);
    if (!data_source_names.length) {
      throw new Error('No valid mongodb config.');
    }
    for (const name of data_source_names) {
      this.createDataSource(dataSourceConfigs[name], name);
    }
  }

  createDataSource(config, name) {
    this.dataSources[name] = new DataSource(config, name, this.mongoose);
  }

  getDataSource(name) {
    if (!this.dataSources[name]) {
      throw new Error(`No data source named ${name}`);
    }
    return this.dataSources[name];
  }

  getDataSourceConnection(name) {
    if (!this.dataSources[name]) {
      throw new Error(`No data source named ${name}`);
    }
    return this.dataSources[name].connection;
  }

  /**
   * if database_name is null, then use default database
   *
   * @param data_source_name
   * @param database_name
   * @returns {*}
   */
  useDatabase(data_source_name, database_name) {
    return this.getDataSource(data_source_name).useDatabase(database_name);
  }

  closeDataSource(data_source_name) {
    this.getDataSource(data_source_name).closeAll();
  }

  closeDatabase(data_source_name, db_name) {
    this.getDataSource(data_source_name).closeByName(db_name);
  }
}
