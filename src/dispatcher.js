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
    } catch (err) {
      throw err;
    }
  }
}

export default Dispatcher;
