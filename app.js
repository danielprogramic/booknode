var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();
var port = process.env.PORT || 5000;
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
var authRouter = require('./src/routes/authRoutes')(nav);
var authorRouter = require('./src/routes/authorRoutes')(nav);
//inserindo os diretórios estáticos.
// o app use nos permite configurar algum middleware
app.use(express.static('public'));
//verifica se ha um body q esta vindo
//em que e json vai criar um objeto req.body para nós usar
// um para json e outro para urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    secret: 'library'
}));
//impor js do passport
require('./src/config/passport')(app);

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
app.use('/Authors', authorRouter);
app.use('/Auth', authRouter);

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