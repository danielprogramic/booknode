var express = require('express');
var bookRouter = express.Router();

var router = function(nav) {
    // var books = [{
    //     title: 'Daniel Douglas Machado',
    //     genre: 'Historical Fiction',
    //     author: 'aUtor 1',
    //     read: false
    // }, {
    //     title: 'Peterson Almeida Carvalho',
    //     genre: 'Historical Fiction',
    //     author: 'autor 2',
    //     read: false
    // }, {
    //     title: 'Camila assunção de costa',
    //     genre: 'Historical Fiction',
    //     author: 'autor 3',
    //     read: false
    // }, {
    //     title: 'Diego antunes',
    //     genre: 'Historical Fiction',
    //     author: 'autor 4',
    //     read: false
    // }];
    var bookController = require('../controllers/bookController')(null, nav);
    bookRouter.use(bookController.middleware);
    bookRouter.route('/')
        .get(bookController.getIndex);
    bookRouter.route('/:id')
        .get(bookController.getById);
    return bookRouter;
};

module.exports = router;