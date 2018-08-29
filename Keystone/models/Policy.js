var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Policy Model
 * ==========
 */
var Policy = new keystone.List('Policy', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
});

Policy.add({
  title: { type: String, required: true },
  categories: { type: Types.Relationship, ref: 'PostCategory', many: true },
  content:  { type: Types.Html, wysiwyg: true, height: 400 }
});

Policy.schema.virtual('content.full').get(function () {
  return this.content.extended || this.content.brief;
});

Policy.defaultColumns = 'title, state|20%';
Policy.register();