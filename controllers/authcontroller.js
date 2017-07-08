var exports = module.exports = {}

exports.main = function(req, res) {

    res.render('main');

}

exports.student = function(req, res) {

    res.render('student');

}

exports.signup = function(req, res) {

    res.render('signup');

}

exports.signin = function(req, res) {

    res.render('signin');

}

exports.dashboard = function(req, res) {

    res.render('dashboard');

}

exports.logout = function(req, res) {

    req.session.destroy(function(err) {
        res.redirect('/');
    });

}
