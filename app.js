var express = require('express');
var app = express();
var port = 5000;
var nav = [{
        Link: '/Books',
        Text: 'Books'
    },
    {
        Link: '/Authors',
        Text: 'Authors'
    }
];
//var bookRouter = express.Router();
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
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
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);

app.get('/', function(req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: [{
                Link: '/Books',
                Text: 'Book'
            },
            {
                Link: '/Authors',
                Text: 'Author'
            }
        ]
    });
});
/*
app.get('/books', function(req, res) {
    res.send('Hello Books');
});
*/
app.listen(port, function(err) {
    console.log('running server on port ' + port);
});