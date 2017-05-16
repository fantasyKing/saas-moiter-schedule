import models from './mongo';

const ServerList = models.Server;

class Loader {

  constructor(Scheduler) {
    this.serverList = {};
    this.Scheduler = Scheduler;
  }

  /**
   * 加载所有的server
   * @return { name: {} }
   */
  async loadAll() {
    try {
      const serverList = await ServerList.find({ _status: 1 }).exec();
      const result = {};
      for (const server of serverList) {
        result[server.name] = server.obj();
      }
      this.serverList = result;
      return result;
    } catch (err) {
      this.Scheduler.emit({ key: 'Loader.load.error', err });
      throw err;
    }
  }

  /**
   * 验证server，是否被更改，若被更改，则替换
   * @param server {} Object
   */
  validateServer(server) {
    try {
      if (typeof prev !== 'object' || typeof news !== 'object') {
        return false;
      }
      const serverName = server.name;

      let newUpdateAt = server.updatea_at;
      newUpdateAt = (new Date(newUpdateAt)).getTime();

      const oldServer = this.serverList[serverName];

      let oldUpdatedAt = oldServer.updatea_at;
      oldUpdatedAt = (new Date(oldUpdatedAt)).getTime();

      if (newUpdateAt <= oldUpdatedAt) {
        return false;
      }
      return true;
    } catch (err) {
      this.Scheduler.emit({ key: 'Loader.validateServer.error', err });
      throw err;
    }
  }

  /**
   * reload server from mongodb
   */
  async reloadServer(serverName) {
    try {
      if (typeof serverName !== 'string') {
        return false;
      }

      let server = await ServerList.findOne({ _status: 1, name: serverName }).exec();

      if (!server) {
        return false;
      }

      server = server.obj();
      if (!this.validateServer(server)) {
        return false;
      }

      this.serverList[serverName] = server;
      return true;
    } catch (err) {
      this.Scheduler.emit({ key: 'Loader.reload.error', err });
      throw err;
    }
  }
}

export default Loader;
