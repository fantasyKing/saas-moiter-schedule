/**
 * server: { name, hostname, uptime, ip, cpu_num }
 * process: { app_name, hostname, ip, pid, memory_usage, cpu_usage, status }
 * metadata: { app_name, hostname, ip, restart, uptime, exec_mode, node_version, unstable_restart }
 */

/**
 * metrics: { app_name, hostname, ip, loop_delay, qps, port, http_latency, network_download, network_upload, global_size, files_count }
 * server_info: { hostname, ip, loadavg_0, loadavg_1, loadavg_2, total_mem, free_mem, cpu_usage, operating_system, avail_disk, used_space, free_memory, used_memory, network_in, network_out, total_processes  }
 */

const PM2PROCESS = [
  'pm2-logrotate',
  'pm2-server-monit',
  'pm2-http-interface'
];

const axmMap = {
  'Loop delay': 'loop_delay', // 1.47ms
  QPS: 'qps', // '100'
  'Open ports': 'port', // 50152
  'Network Download': 'network_download', // 5.5 MB/s
  'Network Upload': 'network_upload', // 5.5 MB/s
  'pmx:http:latency': 'http_latency', // 234 ms
  'CPU usage': 'cpu_usage', // 33.33%
  'Operating System': 'operating_system', // Ubuntu 14.04
  'Avail. Disk': 'avail_disk', // 68.4%
  'Used space': 'used_space', // 5.1GB / 19.6GB
  'Free memory': 'free_memory', // 30.2%
  'Used memory': 'used_memory', // 0.7GB / 1.0GB
  'network in': 'network_in', // 0.02MB/s
  'network out': 'network_out', // 0.02MB/s
  'Total Processes': 'total_processes', // 106
  'Global logs size': 'global_size', // 140.13 MB
  'Files count': 'files_count' // 31
};

class Analyzer {
  async analyze(data, scheduler) {
    try {
      const { name, hostIp, monitInfo } = data;

      if (typeof monitInfo !== 'object') {
        return null;
      }

      const { system_info, monit, processes } = monitInfo;

      const hostname = system_info.hostname; // string
      const serverUptime = system_info.uptime; // string
      const ip = hostIp; // string
      const loadavg = monit.loadavg; // array
      const total_mem = monit.total_mem; // integer
      const free_mem = monit.free_mem;
      const cpu_num = monit.cpu.length;

      const server = {
        name,
        hostname,
        uptime: serverUptime,
        ip,
        cpu_num
      };
      scheduler.emit('anaylzed', { type: 'server', data: server });

      const server_info = {
        hostname,
        ip,
        loadavg_0: loadavg[0],
        loadavg_1: loadavg[1],
        loadavg_2: loadavg[2],
        total_mem,
        free_mem
      };

      for (const proce of processes) {
        let process_info = {};
        let metadata = {};
        const metrics = {};

        const app_name = proce.name;
        const pid = proce.pid;
        const pm_id = proce.pm_id;
        const memory_usage = proce.monit.memory;
        const cpu_usage = proce.monit.cpu;
        const status = proce.pm2_env.status;

        process_info = { app_name, hostname, ip, pid, pm_id, memory_usage, cpu_usage, status };
        scheduler.emit('anaylzed', { type: 'process', data: process_info });

        const restart = proce.pm2_env.restart_time;
        const uptime = proce.pm2_env.pm_uptime;
        const exec_mode = proce.pm2_env.exec_mode;
        const node_version = proce.pm2_env.node_version;
        const unstable_restart = proce.pm2_env.unstable_restarts;

        metadata = { app_name, hostname, ip, restart, unstable_restart, uptime, exec_mode, node_version };
        scheduler.emit('anaylzed', { type: 'metadata', data: metadata });

        const axm_monitor = proce.pm2_env.axm_monitor;

        if (PM2PROCESS[1] === app_name) {
          for (const key of Object.keys(axm_monitor)) {
            if (!axmMap[key]) {
              continue;
            }
            server_info[axmMap[key]] = axm_monitor[key].value;
          }

          scheduler.emit('anaylzed', { type: 'server_info', data: server_info });
          continue;
        }

        for (const key of Object.keys(axm_monitor)) {
          if (!axmMap[key]) {
            continue;
          }
          metrics[axmMap[key]] = axm_monitor[key].value;
        }

        metrics.app_name = app_name;
        metrics.hostname = hostname;
        metrics.ip = ip;
        scheduler.emit('anaylzed', { type: 'metrics', data: metrics });
      }
      return null;
    } catch (err) {
      throw err;
    }
  }
}

export default Analyzer;
