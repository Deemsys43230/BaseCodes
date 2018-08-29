var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Terms and Condtion Model
 * ==========
 */
var Terms = new keystone.List('Terms', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
});

Terms.add({
  title: { type: String, required: true },
  content:  { type: Types.Html, wysiwyg: true, height: 400 }
});

Terms.schema.virtual('content.full').get(function () {
  return this.content.extended || this.content.brief;
});

Terms.defaultColumns = 'title, state|20%';
Terms.register();