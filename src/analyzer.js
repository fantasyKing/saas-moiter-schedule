class Analyzer {
  async analyze(data) {
    try {
      const { name, hostIp, monitInfo } = data;

      if (typeof monitInfo !== 'object') {
        return null;
      }

      const { system_info, monit, processes } = monitInfo;

      system_info['ip'] = hostIp;

      const result = { name, processes: [], system_info, monit, host: hostIp };
      for (const NodeProcess of processes) {
        const { pid, pm_id, pm2_env } = NodeProcess;
        const processName = NodeProcess.name;
        const processMoit = NodeProcess.monit;

        const { exec_mode, axm_monitor } = pm2_env;

        const processInfo = { name: processName, pid, pm_id, exec_mode, axm_monitor, monit: processMoit };

        result['processes'].push(processInfo);
      }

      return result;
    } catch (err) {
      throw err;
    }
  }
}

export default Analyzer;
