'use strict';

var path = process.cwd();
//var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PollHandler = require(path + '/app/polls/pollHandler.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

//	var clickHandler = new ClickHandler();

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));
		
	app.route('/new_poll')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/new_poll.html');
		})
		.post(isLoggedIn, function (req, res) {
			PollHandler.newPoll(req.body, req.user).save(function (err, poll) {
				if (err) return console.error(err);
				
			});
			res.send("success");
		});
		
	app.route('/my_polls')
		.get(isLoggedIn, function (req, res){
			res.sendFile(path + '/public/my_polls.html');
		});
		
	app.route('/my_polls/get')
		.get(isLoggedIn, function (req, res){
			PollHandler.findMyPolls(req.user, res);
		});

	/*app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);*/
};
