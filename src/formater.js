class Formater {
  format(params, scheduler) {
    const { type, data } = params;

    switch (type) {
      case 'server':
        scheduler.emit('formated', { type, data });
        break;
      case 'process':
        scheduler.emit('formated', { type, data });
        break;
      case 'metadata':
        this.formatMetadata(type, data, scheduler);
        break;
      case 'server_info':
        this.formatServerInfo(type, data, scheduler);
        break;
      case 'metrics':
        this.formatMetrics(type, data, scheduler);
        break;
      default:
        return;
    }
  }

  formatMetadata(type, data, scheduler) {
    const { uptime } = data;
    const now = Date.now();

    data.uptime = now - uptime;

    scheduler.emit('formated', { type, data });
  }

  formatServerInfo(type, data, scheduler) {
    const { cpu_usage, avail_disk, free_memory, network_in, network_out } = data;
    data.cpu_usage = this.__percentToFloat(cpu_usage);
    data.avail_disk = this.__percentToFloat(avail_disk);
    data.free_memory = this.__percentToFloat(free_memory);

    data.network_in = this.__networkFormat(network_in) || 0;
    data.network_out = this.__networkFormat(network_out) || 0;

    delete data.loop_delay;
    scheduler.emit('formated', { type, data });
  }

  formatMetrics(type, data, scheduler) {
    const { loop_delay, http_latency, qps, network_download, network_upload, global_size, port, files_count } = data;
    data.loop_delay = loop_delay && this.__timeFormat(loop_delay) || 0;

    data.network_download = network_download && this.__networkFormat(network_download) || 0;

    data.network_upload = network_upload && this.__networkFormat(network_upload) || 0;

    data.global_size = global_size && this.__sizeFormat(global_size) || 0;

    data.http_latency = http_latency && this.__timeFormat(http_latency) || 0;

    data.qps = qps && parseFloat(qps) || 0;

    data.port = port || '';

    data.files_count = files_count || 0;


    scheduler.emit('formated', { type, data });
  }

  __percentToFloat(str) {
    if (!str) {
      return 0;
    }

    const numStr = str.substring(0, str.length - 1);
    const num = parseFloat(numStr) / 100;

    return num;
  }

  __networkFormat(str) {
    const numStr = str.replace(/\s*(MB\/s)/gi, '');
    return parseFloat(numStr);
  }

  __timeFormat(str) {
    const numStr = str.replace(/\s*(ms)/gi, '');
    return parseFloat(numStr);
  }

  __sizeFormat(str) {
    const numStr = str.replace(/\s*(MB)/gi, '');
    return parseFloat(numStr);
  }
}

export default Formater;
