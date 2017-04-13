var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
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
    bookRouter.route('/')
        .get(function(req, res) {
            var url =
                'mongodb://localhost:27017/libraryApp';
            //res.send('Hello Books');
            // res.render('bookListView', {
            //     title: 'Hello from render',
            //     nav: nav,
            //     book: books
            // });
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');

                collection.find({}).toArray(
                    function(err, results) {
                        res.render('bookListView', {
                            title: 'Books',
                            nav: nav,
                            book: results
                        });
                    }
                );
            });
        });
    bookRouter.route('/:id')
        .get(function(req, res) {
            var id = req.params.id;
            res.render('bookView', {
                title: 'Hello from render',
                nav: nav,
                book: books[id]
            });
        });
    return bookRouter
};

module.exports = router;