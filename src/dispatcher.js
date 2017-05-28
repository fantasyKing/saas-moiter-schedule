import InfluxDb from './utils/influxdb/index';

class Dispatcher {
  constructor(Scheduler) {
    this.Scheduler = Scheduler;
  }

  /**
   * 将监控数据通过socket发送给客户端
   * @param {Object} params
   */
  async dispatch(params) {
    try {
      const { type, data } = params;
      logger.debug('dispatch data---->', type, data);
      if (type === 'process') {
        await this.writeProcess(data);
      } else if (type === 'server') {
        await this.writeServer(data);
      } else if (type === 'metadata') {
        await this.writeMetadata(data);
      } else if (type === 'server_info') {
        await this.writeServerInfo(data);
      } else if (type === 'metrics') {
        await this.writeMetrics(data);
      }
    } catch (err) {
      throw err;
    }
  }

  async writeServer(params) {
    try {
      await InfluxDb.writePoints([
        {
          measurement: 'server',
          tags: { name: params.name, hostname: params.hostname, ip: params.ip },
          fields: { uptime: params.uptime, cpu_num: params.cpu_num }
        }
      ], {
        database: 'moniter',
        retentionPolicy: 'moniter',
        precision: 's'
      });
    } catch (err) {
      throw err;
    }
  }

  async writeProcess(params) {
    try {
      await InfluxDb.writePoints([
        {
          measurement: 'process',
          tags: { app_name: params.app_name, hostname: params.hostname, ip: params.ip, pm_id: params.pm_id },
          fields: { pid: params.pid, memory_usage: params.memory_usage, cpu_usage: params.cpu_usage, status: params.status }
        }
      ], {
        database: 'moniter',
        retentionPolicy: 'moniter',
        precision: 's'
      });
    } catch (err) {
      throw err;
    }
  }

  async writeMetadata(params) {
    try {
      await InfluxDb.writePoints([
        {
          measurement: 'metadata',
          tags: { app_name: params.app_name, hostname: params.hostname, ip: params.ip, pm_id: params.pm_id },
          fields: { restart: params.restart, uptime: params.uptime, exec_mode: params.exec_mode, node_version: params.node_version, unstable_restart: params.unstable_restart }
        }
      ], {
        database: 'moniter',
        retentionPolicy: 'moniter',
        precision: 's'
      });
    } catch (err) {
      throw err;
    }
  }

  async writeServerInfo(params) {
    try {
      await InfluxDb.writePoints([
        {
          measurement: 'server_info',
          tags: { hostname: params.hostname, ip: params.ip },
          fields: {
            loadavg_0: params.loadavg_0,
            loadavg_1: params.loadavg_1,
            loadavg_2: params.loadavg_2,
            total_mem: params.total_mem,
            free_mem: params.free_mem,
            cpu_usage: params.cpu_usage,
            operating_system: params.operating_system,
            avail_disk: params.avail_disk,
            used_space: params.used_space,
            free_memory: params.free_memory,
            used_memory: params.used_memory,
            network_in: params.network_in,
            network_out: params.network_out,
            total_processes: params.total_processes
          }
        }
      ], {
        database: 'moniter',
        retentionPolicy: 'moniter',
        precision: 's'
      });
    } catch (err) {
      throw err;
    }
  }

  async writeMetrics(params) {
    try {
      await InfluxDb.writePoints([
        {
          measurement: 'metrics',
          tags: { app_name: params.app_name, hostname: params.hostname, ip: params.ip, pm_id: params.pm_id },
          fields: {
            loop_delay: params.loop_delay,
            qps: params.qps,
            port: params.port,
            http_latency: params.http_latency,
            network_download: params.network_download,
            network_upload: params.network_upload,
            global_size: params.global_size,
            files_count: params.files_count
          }
        }
      ], {
        database: 'moniter',
        retentionPolicy: 'moniter',
        precision: 's'
      });
    } catch (err) {
      console.log('params--->', params);
      throw err;
    }
  }
}

export default Dispatcher;
