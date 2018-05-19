/**
 * @name MongoClient
 * @description Conexión general al sistema de mongodb
 * @requires mongodb,express,js-sha1
 */
"use strict";

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
var port = 3500;
var database = "tads";
var collections = {
    Usuarios: "usuarios",
    Metodos: "metodos",
    TipoMetodos: "tipometodos",
    Ingresos: "ingresos",
    Egresos: "egresos"
};
var express = require("express");
var sha1 = require('js-sha1');
var app = express();
var dbapi = undefined;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST,PUT,DELETE,OPTIONS,PURGE,GET");
    next();
});

app.use(express.json());
app.use(express.urlencoded());

app.post('/login', (req, res, next) => {
    var $db = dbapi.db(database);
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
app.post('/nuevousuario', (req, res, next) => {
    var $db = dbapi.db(database);
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
});
app.post('/agregarmetodo', (req, res, next) => {
    var $db = dbapi.db(database);
    $db.collection(collections.Metodos).insertOne(req.body, 
    (err, response) => {
        if(err) res.send({
            error: "Ocurrió un error al guardar el método.",
            mongo: err});
        else res.send({
            success: "Método guardado con éxito."
        });
    });
});
app.put('/metodos', (req, res, next) => {
    var $db = dbapi.db(database);
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
});
app.get('/tiposmetodo', (req, res, next) => {
    var $db = dbapi.db(database);
    $db.collection(collections.TipoMetodos).find().toArray((err, response) => {
        if(err) res.send({
            error: "No se encontraron resultados.",
            mongo: err});
        else res.send({
            success: "ok",
            data: response
        });
    });
});
app.put('/info', (req, res, next) => {
    var $db = dbapi.db(database);
    $db.collection(collections.Usuarios).findOne({
        _id_: req.body._id_
    }, (err, response) => {
        if(err) res.send({
            error: "No se encontraron resultados.",
            mongo: err});
        else res.send({
            success: "ok",
            data: response
        });
    });
});
app.put('/cambiarmetodo', (req, res, next) => {
    var $db = dbapi.db(database);
    $db.collection(collections.Usuarios).updateOne({
        _id_: req.body._id_
    }, { $set: { cobro: req.body.cobro } }, (err, response) => {
        if(err) res.send({
            error: "No se pudo asignar al nuevo método de cobro.",
            mongo: err});
        else res.send({
            success: "ok",
            data: response
        });
    });
});
app.post('/eliminarmetodo', (req, res, next) => {
    var $db = dbapi.db(database);
    $db.collection(collections.Metodos).deleteOne({
        _id_: req.body._id_,
        tipo: req.body.index
    }, (err, response) => {
        if(err) res.send({
            error: "No se encontró ninguna coincidencia del método para este usuario.",
            mongo: err});
        else res.send({
            success: "ok"
        });
    });
});
app.post('/nuevoingreso', (req, res, next) => {
    var $db = dbapi.db(database);
    $db.collection(collections.Ingresos).insertOne(req.body, 
    (err, response) => {
        if(err) res.send({
            error: "Error al almacenar el ingreso.",
            mongo: err});
        else res.send({
            success: "Ingreso agregado con éxito."
        });
    });
});
app.post('/ingresos', (req, res, next) => {
    var $db = dbapi.db(database);
    $db.collection(collections.Ingresos).find({
        _id_: req.body._id_
    }).toArray((err, response) => {
        if(err) res.send({
            error: "No se encontró nada en los ingresos.",
            mongo: err});
        else res.send({
            success: "ok",
            data: response
        });
    });
});
app.post('/nuevoegreso', (req, res, next) => {
    var $db = dbapi.db(database);
    $db.collection(collections.Egresos).insertOne(req.body, 
    (err, response) => {
        if(err) res.send({error:"No se pudo insertar el egreso.",
        mongo:err});
        else res.send({
            success:"ok"
        });
    });
});
app.post('/egresos', (req, res, next) => {
    var $db = dbapi.db(database);
    $db.collection(collections.Egresos).find({
        _id_: req.body._id_
    }).toArray((err, response) => {
        if(err) res.send({error:"No se encontraron resultados de egresos.",
        mongo:err});
        else res.send({
            success:"ok",
            data: response
        });
    });
});
app.post('/monto', (req, res, next) => {
    var $db = dbapi.db(database);
    $db.collection(collections.Metodos).findOne({
        _id_: req.body._id_,
        tipo: req.body.tipo
    }, (err, response) => {
        if(err) res.send({error:"Error al encontrar el monto del usuario.",
        mongo:err});
        else res.send({
            success:"ok",
            monto: response.monto ? response.monto : 0
        });
    });
});

MongoClient.connect(url, (err, db) => {
    if(err) console.error(err);
    else {
        app.listen(port, () => {
            dbapi = db;
            console.log('Escuchando en http://localhost:' + port + ' ...');
        });
    }
});
