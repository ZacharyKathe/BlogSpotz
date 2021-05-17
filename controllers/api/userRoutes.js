const router = require('express').Router();
const { User } = require('../../models');


router.post("/signup", (req, res) => {
  console.log( "this is working",req.body)
  User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
  }).then(newUser => {
      req.session.user = {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name
      };
      res.json(newUser)
  }).catch(err => {
      console.log(err);
      res.status(500).json(err);
  })
})

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.user = {
      id: userData.id,
      email: userData.email,
      username: userData.username
  };
  console.log(req.session)
  return res.json(req.session)

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});




module.exports = router;
