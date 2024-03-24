const express = require('express');
const exphbs = require('express-handlebars'); // Cambiado
const path = require('path');
const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

// Initializations
const app = express();
require('./config/passport');



// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

// Aquí utilizamos directamente la función create() de express-handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    runtimeOptions: {
        allowProtoMethodsByDefault: true
    }
});

// Usamos hbs.engine en lugar de exphbs
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());




//Global Variables
app.use((req,res ,next)=>{
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error = req.flash('error');
   next();
});



//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/note.routes'));
app.use(require('./routes/users.routes'));


// Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
