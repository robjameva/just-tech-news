const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars setup
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT: ${PORT}`));
});