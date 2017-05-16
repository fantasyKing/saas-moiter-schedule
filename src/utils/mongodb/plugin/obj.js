/**
 * Created on 3/26/16.
 */
function isDateType(data) {
  return !!(data && typeof data.toUTCString === 'function');
}

function date_to_string(source) {
  if (!source) { return source; }

  if (typeof source.toUTCString === 'function') {
    return source.toString();
  }

  if (isDateType(source.created_at)) {
    source.created_at = source.created_at.toISOString();
  }

  if (isDateType(source.updated_at)) {
    source.updated_at = source.updated_at.toISOString();
  }

  if (isDateType(source.display_time)) {
    source.display_time = source.display_time.toISOString();
  }
  return source;
}

export default function (schema) {
  schema.methods.obj = function (options) {
    let obj = this.toObject();
    delete obj._id;
    delete obj.__v;
    if (options) {
      if (Array.isArray(options.stringify)) {
        for (const field of options.stringify) {
          if (obj[field]) {
            obj[field] = obj[field].toString() || '';
          } else {
            obj[field] = '';
          }
        }
      }

      if (Array.isArray(options.delete)) {
        for (const field of options.delete) {
          delete obj[field];
        }
      }
    }
    obj = date_to_string(obj);
    return obj;
  };
}
