class Dispatcher {
  constructor(Scheduler) {
    this.Scheduler = Scheduler;
  }

  /**
   * 将监控数据通过socket发送给客户端
   * @param {Object} data
   */
  async dispatch(data) {
    try {
      logger.debug('dispatch data---->', data);
    } catch (err) {
      throw err;
    }
  }
}

export default Dispatcher;
