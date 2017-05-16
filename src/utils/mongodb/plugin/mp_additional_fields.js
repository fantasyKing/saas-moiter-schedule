/**
 * Created on 4/7/16.
 */
export default function (schema, options) {
  let updatedAt = 'updated_at';
  let createdAt = 'created_at';
  let updatedAtType = Date;
  let createdAtType = Date;

  if (typeof options === 'object') {
    if (typeof options.updatedAt === 'string') {
      updatedAt = options.updatedAt;
    } else if (typeof options.updatedAt === 'object') {
      updatedAt = options.updatedAt.name || updatedAt;
      updatedAtType = options.updatedAt.type || updatedAtType;
    }
    if (typeof options.createdAt === 'string') {
      createdAt = options.createdAt;
    } else if (typeof options.createdAt === 'object') {
      createdAt = options.createdAt.name || createdAt;
      createdAtType = options.createdAt.type || createdAtType;
    }
  }

  const dataObj = {};
  dataObj[updatedAt] = updatedAtType;
  if (schema.path(createdAt)) {
    schema.add(dataObj);
    schema.virtual(createdAt)
      .get(function () {
        if (this[`_${createdAt}`]) return this[`_${createdAt}`];
        this[`_${createdAt}`] = this._id.getTimestamp();
        return this[`_${createdAt}`];
      });
    schema.pre('save', function (next) {
      if (this.isNew) {
        this[updatedAt] = this[createdAt];
      } else if (this.isModified()) {
        this[updatedAt] = new Date;
      }
      next();
    });
  } else {
    dataObj[createdAt] = createdAtType;
    schema.add(dataObj);
    schema.pre('save', function (next) {
      if (!this[createdAt]) {
        this[createdAt] = this[updatedAt] = new Date;
      } else if (this.isModified()) {
        this[updatedAt] = new Date;
      }
      next();
    });
  }

  if (!schema.methods.hasOwnProperty('touch')) {
    schema.methods.touch = function (callback) {
      this[updatedAt] = new Date;
      this.save(callback);
    };
  }
}
