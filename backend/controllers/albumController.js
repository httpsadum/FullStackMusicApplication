const db = require("../db") ;

//getAll
exports.getAll = (req,res) => {
    db.all("SELECT * FROM albums", [], (err,rows) =>{
        if (err) return res.status(500).json({error:err.message}) ;
        res.json(rows) ;
    }) ;
} ;

//getOne
exports.getOne = (req,res) => {
    db.get("SELECT * FROM albums WHERE id = ?", [req.params.id], (err,rows) =>{
        if (err) return res.status(500).json({error:err.message}) ;
        if (!rows) return res.status(404).json({message: "Not found"}) ;
        res.json(rows) ;
    }) ;
} ;

//create
exports.create = (req,res) => {
    const {name, releaseYear, listeners, artistId} = req.body ;

    db.run("INSERT INTO albums (name, releaseYear, listeners, artistId) VALUES (?, ?, ?, ?)", 
        [name, releaseYear, listeners, artistId], function(err) {
        if (err) return res.status(400).json({error:err.message}) ;
        res.status(201).json({ id: this.lastID });
    }) ;
} ;


//update
exports.update = (req,res) => {
    const {name, releaseYear, listeners, artistId} = req.body ;
    
    db.run("UPDATE albums SET name = ?, releaseYear = ?, listeners = ?, artistId = ? WHERE id = ?", 
        [name, releaseYear, listeners, artistId, req.params.id], function(err) {
        if (err) return res.status(400).json({error:err.message}) ;
        res.json({updated: this.changes}) ;
    }) ;
} ;

//delete
exports.remove = (req,res) => {
    db.run("DELETE FROM albums WHERE id = ?", 
        [req.params.id], function(err) {
        if (err) return res.status(500).json({error:err.message}) ;
        res.json({deleted: this.changes}) ;
    }) ;
} ;