/**
 * @name MongoClient
 * @description Conexión general al sistema de mongodb
 */
"use strict";

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";
var express = require("express");
var app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(express.urlencoded());

app.get('/usuarios', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if(err) console.error(err);
        var $db = db.db("tads");
        $db.collection("usuarios").find({}).toArray((err, result) => {
            res.send(result);
        });
        db.close();
    });
});

app.post('/nuevousuario', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if(err) console.error(err);
        var $db = db.db("tads");
        var usuario = {
            id: req.body.id,
            nombre: req.body.nombre
        };
        $db.collection("usuarios").insertOne(usuario, (err, result) => {
            if(err) console.error(err);
            else{
                res.send({
                    state: 200,
                    msg: "Usuario insertado con éxito.",
                    data: usuario,
                    serverResult: result
                });
            }
        });
        db.close();
    });
});

const port = 3500;

app.listen(3500, () => {
    console.info('Conectado en el puerto [' + port + '] ...');
});