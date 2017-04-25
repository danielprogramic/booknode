var express = require('express');
var authorRouter = express.Router();

var router = function(nav) {

    authorRouter.route('/')
        .get(function(req, res) {
            res.render('authorView', {
                title: 'Author',
                nav: 'nav',
                books: 'results'
            });
        });
    return authorRouter;
};

module.exports = router;