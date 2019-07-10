const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
var cookieParser = require('cookie-parser');
app.use(cookieParser());
const uuidv4 = require('uuid/v4');
app.set('view engine', 'ejs');


const updateLongURL = (shortURL, longURL) => {
  urlDatabase[shortURL] = longURL;
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
  }
};

const userCreater = (id, email, password) => {
  users[id] = {id, email, password};
};

const emailDuplicateChecker = (email) => {
  for (keys in users) {
    if (users[keys].email === email) {
      return true;
    }
  }
  return false;
};

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.send('Hello!');
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/urls', (req, res) => {
  let templateVars = { urls: urlDatabase, user: users[req.cookies.user_id] };
  //console.log('line 34 -->', templateVars);
  //console.log(req.cookies);
  //console.log(users[req.cookies.user_id].email);
  res.render('urls_index', templateVars);
});

app.get('/urls/new', (req, res) => {
  let templateVars = { user: users[req.cookies.user_id] };
  //console.log(req.cookies);
  res.render('urls_new', templateVars);
  
});

app.get('/urls/:shortURL', (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], user: users[req.cookies.user_id] };
  res.render('urls_show', templateVars);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/u/:shortURL", (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

app.post("/register", (req, res) => {
  if (req.body.email.length === 0 || req.body.password.length === 0) {
    res.status(400).send('Error: email or password left blank.');
    
  } else if (emailDuplicateChecker(req.body.email)) {
    res.status(400).send('Error: email already registered.')
  } else {
    id = uuidv4().slice(0,6);
  userCreater(id, req.body.email, req.body.password);
  res.cookie('user_id', id);
  res.redirect("/urls")
  }
});

app.get("/register", (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], user: users[req.cookies.user_id] };
  //console.log('line 60 -->', req.body.email);
  //console.log()
  res.render('registration', templateVars);
})

app.post("/login", (req, res) => {
  //console.log('line 56 -->', req.body.username);
  res.cookie('username', req.body.username)

  res.redirect("/urls");
});

app.post("/logout", (req, res) => {

  res.clearCookie('username');
  res.redirect("/urls")
})

app.post('/urls/:shortURL/delete', (req, res) => {

  // const { shortURL } = req.params;
  // const id = req.params.shortURL;

  const shortURL = req.params.shortURL;
  //console.log('line 52-->', req.params);
  //console.log('line 53 -->', urlDatabase[shortURL]);
  //console.log('line 54 -->', shortURL);
  delete urlDatabase[shortURL];
  res.redirect('/urls')
});

app.post('/urls/:id/update', (req, res) => {
  name = req.body.longURL;
  urlCode = req.params.id;
  // console.log('line 68 -->', name);
  // console.log('line 69 -->', urlDatabase);
  // console.log('line 70 -->', req.body);
  // console.log('line 71 -->', urlCode);
  updateLongURL(urlCode, name);
  res.redirect(`/urls/`);
})

app.post("/urls", (req, res) => {
  let shortURLCode = uuidv4().slice(0,6);
  urlDatabase[shortURLCode] = req.body.longURL;
  res.redirect(`/urls/${shortURLCode}`);
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});