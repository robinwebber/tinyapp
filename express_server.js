const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.set('view engine', 'ejs');

const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 8);
};

const updateLongURL = (shortURL, longURL) => {
  urlDatabase[shortURL] = longURL;
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
  let templateVars = { urls: urlDatabase, username: req.cookies["username"]};
  console.log('line 34 -->', templateVars);
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
  let shortURLCode = generateRandomString();
  urlDatabase[shortURLCode] = req.body.longURL;
  res.redirect(`/urls/${shortURLCode}`);
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});