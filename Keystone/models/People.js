var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * People Model
 * ==========
 */
var People = new keystone.List('People');

People.add({
  name: { type: Types.Name, required: true },
  height: { type: Types.Number, required: true, initial: false },
  mass: { type: Types.Number, initial: false },
  gender: { type: String },
});


/**
 * Registration
 */
People.register();