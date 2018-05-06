/**
 * @name MongoClient
 * @description Conexión general al sistema de mongodb
 */
"use strict";

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
var database = "tads";
var collections = {
    Usuarios: "usuarios"
}
var express = require("express");
var sha1 = require('js-sha1');
var app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(express.urlencoded());

app.post('/login', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if(err) console.log(err);
        var $db = db.db(database);
        $db.collection(collections.Usuarios).find({
            username: req.body.user,
            password: sha1(req.body.pass)
        }).toArray((err, result) => {
            if(err) res.send({
                error: "El control de mongodb excedió su límite.",
                status: 500
            });
            else {
                if(result.length > 0){
                    res.send({
                        success: "ok",
                        status: 200,
                        data: sha1(result[0].username + ':' + result[0].password)
                    });
                } else res.send({
                    error: "Usuario no encontrado.",
                    status: 200
                })
            }
        });
    });
});
app.post('/validToken', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if(err) console.error(err);
        else {
            var $db = db.db(database);
            var usuarios = [];
            $db.collection(collections.Usuarios).find({}).toArray((err, response) => {
                if(err) console.error(err);
                else response.forEach(e => {
                    usuarios.push(sha1(e.username + ':' + e.password));
                    
                });
                if(usuarios.length > 0){
                    let result = false;
                    usuarios.forEach(e => {
                        if(e == req.body.token){
                            result = true;
                            return;
                        }
                    });
                    res.send({ auth: result });
                } else res.send({ auth: false });
            });
        }
    });
});

const port = 3500;

app.listen(port, () => {
    console.info('Conectado en el puerto [' + port + '] ...');
});