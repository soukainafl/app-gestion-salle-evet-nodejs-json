const express = require('express');
const path = require('path');
const app = express();
const Joi = require('joi');
const fs = require('fs');
const data1 = fs.readFileSync('data/login.json');
// var routeLogin=require('public/js/login.js');
const data2 = fs.readFileSync('data/salle.json');
const login = JSON.parse(data1);
const salle = JSON.parse(data2);
var bodyParser = require('body-parser');

// // apI login
// app.use(routeLogin);


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser .urlencoded({extended:false}));
app.use(bodyParser .json());

app.get('/login', function(req, res){
    res.sendFile(__dirname + "/login.html");
});
app.get('/location', function(req, res){
    res.sendFile(__dirname + "/location.html");
});

app.post('/save',function(req, res){
    
    var name = req.body.name;
    var ville = req.body.ville;
    var prix_par_jour = req.body.prix_par_jour;
    var nbr_de_personne=req.body.nbr_de_personne;
    var option = req.body.option;
    var date_reservation = req.body.date_reservation;

fs.readFile('data/salle.json', 'utf-8', function (err,data) {
	if (err) throw err;

	var arrayOfObjects = JSON.parse(data);
	arrayOfObjects.push({
       id : arrayOfObjects.length +1,
       name:name,
        ville: ville,
        prix_par_jour: prix_par_jour,
        nbr_de_personne:nbr_de_personne,
        option: option,
        date_reservation: date_reservation
	});
 
    console.log(option);

    fs.writeFile('data/salle.json', JSON.stringify(arrayOfObjects,null,5), 'utf-8', function(err) {
        if (err) throw err;
        console.log('Done!');
        res.sendFile(__dirname + "/location.html");

    });
});

});

app.get('/user',function(req, res){

    fs.readFile('data/salle.json', 'utf-8', function(err, data) {
        if (err) throw err;
    
        var arrayOfObjects = JSON.parse(data);
      
        res.send(arrayOfObjects);
        console.log(arrayOfObjects);
        
    });
})

//LOGIN//

app.post('/',function(req, res){
    var username = req.body.username;
    var password = req.body.password;


fs.readFile('./users.json', 'utf-8', function(err, data) {
	if (err) throw err;

	var arrayOfObjects = JSON.parse(data);


    console.log(arrayOfObjects);

    arrayOfObjects.forEach(element => {
        if (username === element.username && password === element.password ) {

      
      //  res.render('/loction.html',{list});
                res.sendFile(__dirname + "/page1.html");

        }else
        res.sendFile(__dirname + "/404.html");




    });

});

});




app.listen(8080,function(){
      
    console.log("Server listing on port 8080...");

});