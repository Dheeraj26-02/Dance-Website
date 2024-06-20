const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const bodyparser=require("body-parser");


mongoose.connect('mongodb://localhost/contactDance');

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
});

var Contact = mongoose.model('Contact', contactSchema);//Locking Schema and converted into Model.


app.use('/static', express.static('static'))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const para = {};
    res.status(200).render('home.pug', para);
})
app.get('/contact', (req, res) => {
    const para = {};
    res.status(200).render('contact.pug', para);
})


app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    console.log(req.body);
    console.log(myData);
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
})
    // res.status(200).render('contact.pug');
})

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});