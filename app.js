const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator/check');
const flash = require('connect-flash');
const session = require('express-session');

mongoose.connect('mongodb://localhost/bitbot');
let db = mongoose.connection;
db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Connected to mongo db')
})

const app = express();
let Article = require('./models/article')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'keyboard cats',
    resave: true,
    saveUninitialized: true
}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.get('/', (req, res) => {
    Article.find({}, (err, articles) => {
        if(err) throw err;
        res.render('index', { articles: articles, title: 'Articles' })
    });
});

app.get('/article/add', (req, res) => {
    res.render('add_article', { title: 'Add Article'});
});

app.post('/article/add',[
    check('title').exists(),
    check('author').exists(),
    check('body').exists()
], (req, res, next) => {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    console.log(article.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }
    article.save((err) => {
        if(err) {
            console.log(err);
            return;
        } else {
            req.flash('success','Article Added');
            res.redirect('/');
        }
    })
});

app.get('/article/:id', (req,res) => {
    Article.findById(req.params.id, (err, article) => {
        if(err) throw err;
        res.render('article', { article })
    });
});

app.get('/article/edit/:id', (req,res) => {
    Article.findById(req.params.id, (err, article) => {
        if(err) throw err;
        res.render('edit_article', { article, title: 'Edit Article' })
    });
});

app.post('/article/edit/:id', (req, res) => {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;
    let query = {_id: req.params.id }
    Article.update(query, article, (err) => {
        if(err) {
            console.log(err);
            return;
        } else {
            req.flash('success', 'Article Updated');
            res.redirect('/');
        }
    })
});

app.delete('/article/:id', (req, res) => {
    let query = {_id: req.params.id }
    Article.remove(query, (err) => {
        if(err) throw err;
        res.sendStatus(200);
    })
});


app.listen(3005, () => {
    console.log('server started on port 3005');
})