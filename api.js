/**
 * @name MongoClient
 * @description Conexión general al sistema de mongodb
 */
"use strict";

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
var port = 3500;
var database = "tads";
var collections = {
    Usuarios: "usuarios",
    Metodos: "metodos",
    TipoMetodos: "tipometodos"
}
var express = require("express");
var sha1 = require('js-sha1');
var app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST,PUT,DELETE,OPTIONS,PURGE,GET");
    next();
});

app.use(express.json());
app.use(express.urlencoded());

app.post('/login', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if(err) res.send({
            error: "Ocurró un error en la conexión.",
            mongo: err});
        var $db = db.db(database);
        $db.collection(collections.Usuarios).find({
            username: req.body.user,
            password: sha1(req.body.pass)
        }).toArray((err, response) => {
            if(err) res.send({
                error: "Ocurrió un error al obtener las listas de -usuarios-.", 
                mongo:err});
            else if(response.length > 0) res.send({
                success: "ok",
                data:
                    sha1(response[0].username + 
                        ':' + 
                        response[0].password),
                key: response[0]._id_
            });
            else res.send({ error: "Usuario no encontrado." });
        });
    });
});
app.post('/nuevousuario', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if(err) res.send({
            error: "Ocurró un error en la conexión.",
            mongo: err});
        else {
            var $db = db.db(database);
            req.body.password = sha1(req.body.password);
            $db.collection(collections.Usuarios).insertOne(req.body, 
            (err, response) => {
                if(err) res.send({
                    error: "Ocurrió un error al insertar el usuario.", 
                    mongo: err});
                else res.send({
                    success: "ok",
                    token: sha1(req.body.username + ':' + req.body.password)
                });
            });
        }
    });
});
app.post('/agregarmetodo', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if(err) res.send({
            error: "Ocurrió un error en la conexión",
            mongo: err});
        else {
            var $db = db.db(database);
            $db.collection(collections.Metodos).insertOne(req.body, 
            (err, response) => {
                if(err) res.send({
                    error: "Ocurrió un error al guardar el método.",
                    mongo: err});
                else res.send({
                    success: "Método guardado con éxito."
                });
            });
        }
    });
});
app.put('/metodos', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if(err) res.send({
            error: "Ocurrió un error en la conexión.",
            mongo: err});
        else {
            var $db = db.db(database);
            $db.collection(collections.Metodos).find({ 
                _id_: req.body._id_ 
            }).toArray((err, response) => {
                if(err) res.send({
                    error: "No se pudo establecer una búsqueda.",
                    mongo: err});
                else res.send({
                    success: "ok",
                    data: response
                });
            });
        }
    });
});
app.get('/tiposmetodo', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if(err) res.send({
            error: "Ocurrió un error en la conexión.",
            mongo: err});
        else {
            var $db = db.db(database);
            $db.collection(collections.TipoMetodos).find().toArray((err, response) => {
                if(err) res.send({
                    error: "No se encontraron resultados.",
                    mongo: err});
                else res.send({
                    success: "ok",
                    data: response
                });
            });
        }
    });
});
app.listen(port, () => {
    console.log('Escuchando en http://localhost:' + port + ' ...');
});