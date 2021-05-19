const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const path = require('path');
const exphbs = require('express-handlebars');
const {User} = require('./models');
const {Project} = require('./models');
const {Posts} = require('./models');

require("dotenv").config();

const sequelize = require('./config/connection');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge:1000*60*60*2
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public/')));
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');


app.use(routes);

app.get('/', (req,res) => {
  res.render('index');
});



app.get('/profile', async(req, res)=>{
  if (!req.session.user) {
    return res.redirect("/") }
   try{ 
  const postData = await Project.findAll({
      include: [{
        model: User,
        attributes: ['name'],
      },
      Posts
    ]
    });

    const post = postData.map((user) => user.get({plain: true}));
    console.log(post)
    res.render('profile', {
      post,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.get('/newPost', (req, res)=>{
  res.render('newPost');
})


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
