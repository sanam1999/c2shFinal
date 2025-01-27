require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

const listingRouter = require('./rauters/listing.js')
const reviewRouter = require('./rauters/reviews.js')
const userRouter = require('./rauters/user.js');
const eventRouter = require('./rauters/events.js');
const account = require('./rauters/account.js');
const aminpanal = require('./rauters/admin.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require("passport-local");
const User = require('./models/user.js');
const { isAuthenticated } = require('./utils/Middleware.js');
const UserInfo = require("./models/userInfo");
const { userInfo } = require('os');




// Database connection
mongoose.connect(process.env.mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Set view engine
app.set("view engine", 'ejs');
app.use(express.static('public'));
app.set("views", path.join(__dirname, "../forntend/views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "../forntend/public")));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());

const Store = MongoStore.create({
    mongoUrl: process.env.mongoURI,
    crypto: { secret:  process.env.secreT },
    touchAfter: 24 * 60 * 60,
});

const sessionOptions = {
    store: Store,
    secret: process.env.secreT ,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
    },
};

app.use(session(sessionOptions));
app.use(flash());

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(async(req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curUser = req.user;
    next();
});

app.use(("/und"),(req, res) => {
    res.render("und.ejs");
  
});







// Routes
app.use('/user', userRouter);
app.use('/account', account);
app.use('/admin', aminpanal);
app.use('/', listingRouter);


// app.use('/listings', isAuthenticated, listingRouter);
// app.use('/event', isAuthenticated, eventRouter);


// Error handling middleware
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("home/error", { error: { statusCode, message } });
});

// Listen
const port = 8001;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
