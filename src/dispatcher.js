class Dispatcher {
  constructor(Scheduler) {
    this.Scheduler = Scheduler;
  }

  async dispatch(data) {
    try {
      logger.debug('dispatch data---->', data);
    } catch (err) {
      throw err;
    }
  }
}

export default Dispatcher;
