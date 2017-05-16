import EventEmitter from 'events';

import config from './config';
import Loader from './loader';
import Poller from './poller';
import Analyzer from './analyzer';
import Dispatcher from './dispatcher';

const { pollInterval = 0.9, scheduleInterval = 60 * 60 } = config;

class Scheduler extends EventEmitter {
  assembly() {
    this.Loader = new Loader(this);
    this.Poller = new Poller(this);
    this.Analyzer = new Analyzer(this);
    this.Dispatcher = new Dispatcher(this);

    this.on('loaded', this.poll);

    this.on('polled', this.anaylze);

    this.on('anaylzed', this.dispatch);

    this.on('error', this.handlerError);
  }

  schedule = async () => {
    try {
      logger.debug('start loading all monited servers');
      const result = await this.Loader.loadAll();
      logger.debug('finish loading all monited servers');

      this.emit('loaded', result);

      setTimeout(() => {
        try {
          this.schedule();
        } catch (err) {
          this.emit('error', { key: 'Schedule.schedule.interval.error', err });
        }
      }, parseInt(scheduleInterval) * 1000);
    } catch (err) {
      this.emit('error', { key: 'Schedule.schedule.error', err });
    }
  }

  poll = (result) => {
    try {
      if (this.pollInterval) {
        clearInterval(this.pollInterval);
      }

      this.pollInterval = setInterval(async () => {
        for (const name of Object.keys(result)) {
          const server = Object.assign({}, result[name]);
          this.Poller.poll(server, this); // emit polled event
        }
      }, parseInt(pollInterval) * 1000);
    } catch (err) {
      this.emit('error', { key: 'Scheduler.poll.error', err });
    }
  }

  anaylze = async (data) => {
    try {
      const result = await this.Analyzer.analyze(data);

      if (result) {
        this.emit('anaylzed', result);
      }
    } catch (err) {
      this.emit('error', { key: 'Schedule.anaylze.error', err });
    }
  }

  dispatch = async (data) => {
    try {
      await this.Dispatcher.dispatch(data);
    } catch (err) {
      this.emit('error', { key: 'Schedule.dispatch.error', err });
    }
  }

  handlerError = (data) => {
    const { key, err } = data;
    logger.error(key, err);
  }
}

export default Scheduler;
