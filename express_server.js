const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const uuidv4 = require('uuid/v4');
app.set('view engine', 'ejs');

const urlsForUser = (id) => {
  const filteredDB = {};

  for (const shortURLs in urlDatabase) {
    if (urlDatabase[shortURLs].userID === id) {
      filteredDB[shortURLs] = urlDatabase[shortURLs];
    }
  }
  return filteredDB;
};

const updateLongURL = (shortURL, longURL, userID) => {
  
  urlDatabase[shortURL] = {longURL: longURL, userID: userID};
};

const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  },
  "rando": {
    id: "rando",
    email: "r@b",
    password: "haha"
  }
};

const userCreater = (id, email, password) => {
  users[id] = { id, email, password };
};

const validator = (email) => {
  for (keys in users) {
    if (users[keys].email === email) {
      return { valid: true, user: users[keys] }
    }
  }
  return { valid: false }
};

const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "userRandomID" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "user2RandomID" }
};

app.get("/", (req, res) => {
  res.send('Hello!');
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/urls', (req, res) => {

  // filer urlDatabase based on user ID
  usersShortURLs = urlsForUser(req.cookies.user_id);

  let templateVars = { urls: usersShortURLs, user: users[req.cookies.user_id] };
  //console.log('line 34 -->', templateVars);
  //console.log(req.cookies);
  //console.log(users[req.cookies.user_id].email);
  res.render('urls_index', templateVars);
});

app.get('/urls/new', (req, res) => {
  let templateVars = { user: users[req.cookies.user_id] };
  if (!req.cookies.user_id){
    console.log('we got one');
    res.redirect('/login')
  } else {
  //console.log(req.cookies);
  res.render('urls_new', templateVars);
  }
});

app.get('/urls/:shortURL', (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL].longURL, user: users[req.cookies.user_id] };
  res.render('urls_show', templateVars);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL].longURL;
  res.redirect(longURL);
});

app.post("/register", (req, res) => {
  if (req.body.email.length === 0 || req.body.password.length === 0) {
    res.status(400).send('Error: email or password left blank.');

  } else if (validator(req.body.email).valid) {
    res.status(400).send('Error: email already registered.')
  } else {
    id = uuidv4().slice(0, 6);
    userCreater(id, req.body.email, req.body.password);
    res.cookie('user_id', id);
    res.redirect("/urls")
  }
});

app.get("/register", (req, res) => {
  let templateVars = { user: users[req.cookies.user_id] };

  res.render('registration', templateVars);
});

app.get("/login", (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], user: users[req.cookies.user_id] };

  res.render('login', templateVars);
})

app.post("/login", (req, res) => {

  const email = req.body.email;
  const validatedUser = validator(email);
  if (!validatedUser.valid) {
    res.status(403).send('Error: Log in failed.');

  } else if (validatedUser.user.password === req.body.password) {
    res.cookie('user_id', validator(email).user.id);
  }

  res.redirect("/urls");
});

app.post("/logout", (req, res) => {

  res.clearCookie('user_id');
  res.redirect("/urls")
})

app.post('/urls/:shortURL/delete', (req, res) => {

  // const { shortURL } = req.params;
  // const id = req.params.shortURL;

  const shortURL = req.params.shortURL;
  
  delete urlDatabase[shortURL];
  res.redirect('/urls')
});

app.post('/urls/:id/update', (req, res) => {
  const longURL = req.body.longURL;
  const shortURL = req.params.id;
  const IDCode = req.cookies.user_id;
  // console.log('line 68 -->', name);
  // console.log('line 69 -->', urlDatabase);
  // console.log('line 70 -->', req.body);
  // console.log('line 71 -->', urlCode);
  updateLongURL(shortURL, longURL, IDCode);
  res.redirect(`/urls/`);
})

app.post("/urls", (req, res) => {
  let shortURLCode = uuidv4().slice(0, 6);
  urlDatabase[shortURLCode] = {longURL: req.body.longURL, userID: req.cookies.user_id };
  console.log('urlDatabase', urlDatabase)
  res.redirect(`/urls/${shortURLCode}`);
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});