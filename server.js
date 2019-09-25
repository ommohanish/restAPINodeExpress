const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
var db;

const MongoClient = require('mongodb').MongoClient;

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}))
MongoClient.connect('mongodb://130.6.49.174:27017',(err,client) => {
if(err)
return console.log(err);
db=client.db('idrs_db');
app.listen(3000,() => {
console.log('Listening on PORT 3000');
})
})

// app.get('/',function(request,response){
// response.send('Welcome to Node');})

app.get('/', (req,res)=> {
// res.sendFile(__dirname + '/index.html');
db.collection('quotes11').find().toArray((err,results)=>{
// console.log(results);
if(err)
return console.log(err);

res.render('index.ejs',{quotes:results});

});
// console.log(cursor);
})
app.post('/quotes',(req,res) => {
db.collection('quotes11').save(req.body, (err,result) => {
if(err)
return console.log(err);
console.log('saved to the database');
res.redirect('/');
})

})
