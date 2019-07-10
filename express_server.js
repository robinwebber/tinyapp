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
const users = {};


const userCreater = (id, email, password) => {
  users[id] = {id, email, password};
}

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
  let templateVars = { urls: urlDatabase, username: req.cookies["username"]};
  //console.log('line 34 -->', templateVars);
  res.render('urls_index', templateVars);
});
app.get('/urls/new', (req, res) => {
  let templateVars = { username: req.cookies["username"] };
  //console.log(req.cookies);
  res.render('urls_new', templateVars);
  
});

app.get('/urls/:shortURL', (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], username: req.cookies["username"] };
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
  //console.log('line 72 email -->', req.body.email);
  //console.log('line 73 password -->', req.body.password);
  id = uuidv4().slice(0,6);
  userCreater(id, req.body.email, req.body.password);
  console.log(users);
  res.cookie('user_id', id);
  res.redirect("/urls")
});

app.get("/register", (req, res) => {
  let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL], username: req.cookies["username"] };
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