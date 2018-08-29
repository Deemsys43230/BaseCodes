/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);
keystone.pre('routes', keystone.security.csrf.middleware.init);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function (app) {

	app.all('/api*', keystone.middleware.cors);
	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/gallery', routes.views.gallery);
	app.all('/contact', routes.views.contact);
	app.get('/pages/:page', routes.views.page);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

	  // API
	  app.get('/api/people', routes.api.people.list);
	  app.get('/api/people/:id', routes.api.people.get);
	  app.post('/api/people', routes.api.people.create);
	  app.put('/api/people/:id', routes.api.people.update);
	  app.delete('/api/people/:id', routes.api.people.remove);

	  //Api For Privacy Policy
	  app.get('/api/policy', routes.api.policy.list);
	  app.get('/api/policy/:id', routes.api.policy.get);
	  app.post('/api/policy', routes.api.policy.create);
	  app.put('/api/policy/:id', routes.api.policy.update);
	  app.delete('/api/policy/:id', routes.api.policy.remove);

		//Api For Privacy Policy
		app.get('/api/terms', routes.api.terms.list);
		app.get('/api/terms/:id', routes.api.terms.get);
		app.post('/api/terms', routes.api.terms.create);
		app.put('/api/terms/:id', routes.api.terms.update);
		app.delete('/api/terms/:id', routes.api.terms.remove);


		//Api For Blog Post
		app.get('/api/blog/post', routes.api.post.list);
		// app.get('/api/blog/post/:id', routes.api.post.get);
		app.get('/api/blog/post/:postTypes', routes.api.post.get);
		app.post('/api/blog/post', routes.api.post.create);
		app.put('/api/blog/post/:id', routes.api.post.update);
		app.delete('/api/blog/post/:id', routes.api.post.remove);
};
