var express = require('express');
var app = express();
var port = 5000;
var bookRouter = express.Router();
//inserindo os diretórios estáticos.
// o app use nos permite configurar algum middleware
app.use(express.static('public'));
/*app.use(express.static('src/views'));*/
app.set('views', 'src/views');
app.set('view engine', 'ejs');
//app.set('view engine', 'jade');
/*
var handlebars = require('express-handlebars');
app.engine('.hbs', handlebars({ extname: '.hbs' }));
app.set('view engine', '.hbs');
*/
var books = [{
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevick Tolstoy',
    read: false
},{
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevick Tolstoy',
    read: false
},{
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevick Tolstoy',
    read: false
},{
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevick Tolstoy',
    read: false
}
];

bookRouter.route('/')
    .get(function(req, res) {
        //res.send('Hello Books');
        res.render('books', {
        title: 'Hello from render',
        nav: [{
                Link: '/Books',
                Text: 'Books'
            },
            {
                Link: '/Authors',
                Text: 'Authors'
            }
        ],
        book: books
    });
    });

bookRouter.route('/single')
    .get(function(req, res) {
        res.send('Hello Single Books');
    });

app.use('/Books', bookRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: [{
                Link: '/Books',
                Text: 'Books'
            },
            {
                Link: '/Authors',
                Text: 'Authors'
            }
        ]
    });
});

app.get('/books', function(req, res) {
    res.send('Hello Books');
});

app.listen(port, function(err) {
    console.log('running server on port ' + port);
});