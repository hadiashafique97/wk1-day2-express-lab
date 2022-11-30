const express = require ('express')
const fs = require ('fs')
const app = express()

app.engine('madeline', (filePath, options, callback) => { 
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    // this is an extremely simple view engine we'll be more complex later
    const rendered = content.toString()
      .replace('#body#', '<body>' + options.body + '</body>')
      .replace('#message#', '<h1>' + options.message + '</h1>').replace('#content#','<div>'+ options.content + '</div>' )
    
    .replace('#title#','<title>'  + options.title +'</title>')
    .replace('#list1#', '<li>' +options.list1 + '</li>')
    .replace('#list2#', '<li>' +options.list2 + '</li>')
    .replace('#list3#', '<li>' +options.list3 + '</li>')
    .replace('#choose#', '<form>' +options.choose + '</form>')
    return callback(null, rendered)
  })
})
app.set('views', './views') // specify the views directory
app.set('view engine', 'madeline')

app.get('/home', function(req,res){
    res.render('template', { body: 'Hey', message: 'Hello there!', content: 'Node.js is an environment that allows us to run Javascript code outside the browser, Node.js uses the Express Library ' })
})
app.get('/about', function(req,res){
    res.render('template', { body: 'About Info', message: 'WHY?', content: 'I am just practicing express.js and the ways on how I can create an engine with different routes' })
})
app.get('/more-info', function(req,res){
    res.render('about', { title: 'Express', body:'EXPRESS' , message: 'Some keywords to remember when it comes to Express',list1: 'Routes',list2 : 'Server', list3 : 'HTTP' })
})

app.get('/', function(req,res){
    res.render('template', { body: 'Welcome', message: 'Intro to the Stacks?', content: 'Take notes if you come across something you don\'t know ' })
})

app.get('/current', function (req, res){
  res.render('about', {body: ' what are you feeling', message: 'Rate your skill level', content: 'below rate your skill level and how you are currently feeling about the content discussed ', list1 : 'good', list2: 'need improvement', list3:'just bad'
  })
})
app.get('/notes', function (req, res){
  res.send("Just because ")
})
app.get('/why', function (req, res){
  res.send("why not ")
})
app.get('/hello/:age', function (req, res){
  if (req.params.age >= 18){
res.send('Access Granted')  
}else{
  res.send( "You are under Age")// ask for help because its only display this message
}
})
app.get('/hello/:firstname/:lastname', function (req, res){
  res.send('Hello and welcome ' + req.params.firstname + ' ' + req.params.lastname)
})

app.get('/who/:username', function (req, res){
  res.send('Hello and welcome ' + req.params.username)
})

app.listen(3000, function() {
    console.log('Listening on port 3000');
   })