import request from './utils/request';

class Poller {
  constructor(Scheduler) {
    this.Scheduler = Scheduler;
  }

  poll(server, scheduler) {
    try {
      const { name, hosts } = server;

      for (const host of hosts) {
        this.pollServerStatus(name, host, scheduler);
      }
    } catch (err) {
      this.Scheduler.emit('error', { key: 'Poller.poll.error', err });
    }
  }

  async pollServerStatus(name, host, scheduler) {
    try {
      logger.debug('start polling host', host);
      const hostFormat = `http://${host}:9615`;
      const serverStatus = await request.get(hostFormat);

      const result = { name, hostIp: host, monitInfo: serverStatus };
      scheduler.emit('polled', result); // go to analyzed
    } catch (err) {
      this.Scheduler.emit('error', { key: 'Poller.pollServerStatus.error', err });
    }
  }
}

export default Poller;
