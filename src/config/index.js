/**
 * Created on 5/12/17.
 */
import devCommon from './dev_common';
import testCommon from './test_common';
import prodCommon from './prod_common';
import preCommon from './pre_common';


const env = process.env.NODE_ENV || 'development';

let common = null;

switch (env) {
  case 'production':
    common = prodCommon;
    break;
  case 'pre':
    common = preCommon;
    break;
  case 'test':
    common = testCommon;
    break;
  default:
    common = devCommon;
}

const config = common;

export default config;
