var keystone = require('keystone');

var Policy = keystone.list('Policy');

/**
 * List People
 */
exports.list = function(req, res) {
    Policy.model.find(function(err, items) {

    if (err) return res.json({ err: err });

    res.json({
        policy: items
    });

  });
}

/**
 * Get People by ID
 */
exports.get = function(req, res) {
    Policy.model.findById(req.params.id).exec(function(err, item) {

    if (err) return res.json({ err: err });
    if (!item) return res.json('not found');

    res.json({
        policy: item
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
        policy: item
    });

  });
}

/**
 * Patch People by ID
 */
exports.update = function(req, res) {

    Policy.model.findById(req.params.id).exec(function(err, item) {

    if (err) return res.json({ err: err });
    if (!item) return res.json({ err: 'not found' });

    var data = (req.method == 'PUT') ? req.body : req.query;

    item.getUpdateHandler(req).process(data, function(err) {

      if (err) return res.json({ err: err });

      res.json({
        people: item
      });

    });

  });
}

/**
 * Delete People by ID
 */
exports.remove = function(req, res) {
    Policy.model.findById(req.params.id).exec(function (err, item) {

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