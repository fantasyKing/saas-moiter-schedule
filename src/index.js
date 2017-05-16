import simpleLogger from 'simple-logger';

import Scheduler from './scheduler';
import config from './config/index';

const logger = simpleLogger.getLogger(config.logger.category);
logger.setLevel(config.logger.level);

global.logger = logger;

async function main() {
  try {
    console.log('main start');
    const scheduler = new Scheduler();
    console.log('main init');
    scheduler.assembly();
    console.log('main assembly');
    scheduler.schedule();
    console.log('main schedule');
  } catch (err) {
    console.log('main err =', err);
    process.exit();
  }
}

process.on('SIGINT', () => {
  console.log('process exit');
  process.exit(0);
});

process.on('uncaughtException', err => {
  logger.error({ err }, 'uncaughtException:');
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

main();
