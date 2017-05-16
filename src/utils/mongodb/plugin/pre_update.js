export default function (schema) {
  schema.pre('update', function preUpdate(next) {
    const newDate = new Date();
    this._update.updated_at = newDate;
    if (this._update.$currentDate) {
      delete this._update.$currentDate;
    }
    if (this._update['$setOnInsert']) {
      this._update['$setOnInsert'].created_at = newDate;
      delete this._update['$setOnInsert'].updated_at;
      return next();
    }
    return next();
  });
  schema.pre('findOneAndUpdate', function preFindOneAndUpdate(next) {
    const newDate = new Date();
    this._update.updated_at = newDate;
    if (this._update.$currentDate) {
      delete this._update.$currentDate;
    }
    if (this._update['$setOnInsert']) {
      this._update['$setOnInsert'].created_at = newDate;
      delete this._update['$setOnInsert'].updated_at;
      return next();
    }
    return next();
  });
}
