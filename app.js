const express = require("express");
const session = require('express-session');
const path = require("path");
const bodyParser = require("body-parser");
const user = require('./user')
const post = require('./post')
const app = express();
app.use(session({secret: 'my-secret', resave: true,
saveUninitialized: true}));
let sessions;
app.use(express.static(path.join(__dirname,"/public")));
app.use(bodyParser.json());

app.get('/', function(req,res){
  res.sendFile(__dirname + '/public/index.html');
})

app.get('/home', function (req, res) {
  if(sessions && sessions.username){
    res.sendFile(__dirname + '/public/home.html');
  }
  else{
    res.send('<h1 align="center">You must login</h1>');
  }
})

app.post('/signin', function (req, res) {
  sessions=req.session;
  const user_name=req.body.email;
  const password=req.body.password;
  user.validateSignIn(user_name,password,function(result){
    if(result){
      sessions.username = user_name;
      res.send('success');
    }
  });
})

app.post('/signup', function (req, res) {
  const name=req.body.name;
  const email=req.body.email;
  const password=req.body.password;

  if(name && email && password){
  	user.signup(name, email, password)
  }
  
})
app.post('/addpost', function (req, res) {
  const title = req.body.title;
  const posttext = req.body.posttext;
  const id = req.body.id;
  console.log(title ? ('title:' + title) : 'no title');
  console.log(posttext ? ('text:' + posttext) : 'no text');
  
  if(id == '' || id == undefined){
    
    post.addPost(title, posttext ,function(result){
      console.log('created new post')
      res.send(result);
    }); 
  }
  else{
    console.log('update post with id',id);
    post.updatePost(id, title, posttext ,function(result){
      res.send(result);
    }); 
  }
  
})

app.post('/getpost', function (req, res) {
  post.getPost(function(result){
    res.send(result);
  });
})
app.post('/getPostWithId', function(req,res){
  const id = req.body.id;
  
  post.getPostWithId(id, function(result){
    console.log(id);
    res.send(result);
  })
})
app.post('/deletePost', function(req,res){
  const id = req.body.id;
  post.deletePost(id, function(result){
    console.log('deleted post with id'+ id)
    res.send(result)
  })
})
app.listen(7777,function(){
    console.log("Started listening on port", 7777);
})


