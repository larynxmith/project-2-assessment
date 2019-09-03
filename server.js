const express = require('express');
const methodOverride = require('method-override');
db = require('./models')

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));

// WRITE YOUR ROUTES HERE /////////////////////

// GET route for Page
app.get('/', (req, res) => {
    db.widget.findAll()
    .then(widgets => {
        res.render('index', { widgets })
    })
})

//POST route for Widgets
app.post('/', (req, res) => {
    db.widget.create(req.body)
    .then(addedWidget => {
        res.redirect('/')
    })
    .catch(err => {
        console.log(err)
        res.send('No Go!')
    })
})

//DELETE for Widgets
app.delete('/', (req, res) => {
    console.log('Delete initiated')
    db.widget.destroy( {
        where: req.body
    })
    .then(() => {
        res.redirect('/')
    })
})


// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(3000);

