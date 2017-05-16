/**
 * Created on 3/26/16.
 */

import mongoose from 'mongoose';
import plugins from './plugin';
mongoose.Promise = global.Promise;

for (const plugin of plugins) {
  mongoose.plugin(plugin);
}
