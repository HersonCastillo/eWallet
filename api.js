/**
 * @name MongoClient
 * @description Conexión general al sistema de mongodb
 */
"use strict";

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
var database = "tads";
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

app.get('/usuarios', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if(err) console.error(err);
        var $db = db.db(database);
        $db.collection("usuarios").find({}).toArray((err, result) => {
            res.send(result);
        });
        db.close();
    });
});
app.post('/login', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if(err) console.log(err);
        var $db = db.db(database);
        $db.collection("usuarios").find({
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
                        status: 200
                    });
                    return;
                } else res.send({
                    error: "Usuario no encontrado.",
                    status: 200
                })
            }
        });
    });
});
app.post('/nuevousuario', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if(err) console.error(err);
        var $db = db.db(database);
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

app.listen(port, () => {
    console.info('Conectado en el puerto [' + port + '] ...');
});