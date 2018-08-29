var keystone = require('keystone');

var Post = keystone.list('Post');

/**
 * List People
 */
exports.list = function(req, res) {
    Post.model.find(function(err, items) {

    if (err) return res.json({ err: err });

    res.json({
        post: items
    });

  });
}

/**
 * Get People by ID
 */
exports.get = function(req, res) {
    Post.model.findById(req.params.id).exec(function(err, item) {
        console.log(items);
    if (err) return res.json({ err: err });
    // if (!item) return res.json('not found');

    res.json({
        post: items
    });

  });
}

/**
 * Get People by Posttype value
 */
exports.get = function(req, res) {
    console.log(req.params);
    Post.model.find({postTypes:req.params.postTypes}).exec(function(err, item) {
    if (err) return res.json({ err: err });
    if (!item) return res.json('not found');

    res.json({
        post: item
    });

  });
}

/**
 * Create a People
 */
exports.create = function(req, res) {

  var item = new People.model(),
    data = (req.method == 'POST') ? req.body : req.query;

  item.getUpdateHandler(req).process(data, function(err) {

    if (err) return res.json({ error: err });

    res.json({
        post: item
    });

  });
}

/**
 * Patch People by ID
 */
exports.update = function(req, res) {

    Post.model.findById(req.params.id).exec(function(err, item) {

    if (err) return res.json({ err: err });
    if (!item) return res.json({ err: 'not found' });

    var data = (req.method == 'PUT') ? req.body : req.query;

    item.getUpdateHandler(req).process(data, function(err) {

      if (err) return res.json({ err: err });

      res.json({
        post: item
      });

    });

  });
}

/**
 * Delete People by ID
 */
exports.remove = function(req, res) {
    Post.model.findById(req.params.id).exec(function (err, item) {

    if (err) return res.json({ dberror: err });
    if (!item) return res.json('not found');

    item.remove(function (err) {
      if (err) return res.json({ dberror: err });

      return res.json({
        success: true
      });
    });

  });
}