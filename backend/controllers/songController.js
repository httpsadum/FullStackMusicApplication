const db = require("../db") ;

//getAll
exports.getAll = (req,res) => {
    db.all("SELECT * FROM songs", [], (err,rows) =>{
        if (err) return res.status(500).json({error:err.message}) ;
        res.json(rows) ;
    }) ;
} ;

//getOne
exports.getOne = (req,res) => {
    db.get("SELECT * FROM songs WHERE id = ?", [req.params.id], (err,rows) =>{
        if (err) return res.status(500).json({error:err.message}) ;
        if (!rows) return res.status(404).json({message: "Not found"}) ;
        res.json(rows) ;
    }) ;
} ;

//create
exports.create = (req,res) => {
    const {songName, releaseYear, albumId} = req.body ;

    db.run("INSERT INTO songs (songName, releaseYear, albumId) VALUES (?, ?, ?)", 
        [songName, releaseYear, albumId, req.params.id], function(err) {
        if (err) return res.status(400).json({error:err.message}) ;
        res.json({updated: this.changes}) ;
    }) ;
} ;

//update
exports.update = (req,res) => {
    db.run("UPDATE songs SET songName = ?, releaseYear = ?, albumId = ? WHERE id = ?", 
        [songName, releaseYear, albumId, req.params.id], function(err) {
        if (err) return res.status(400).json({error:err.message}) ;
        res.json({updated: this.changes}) ;
    }) ;
} ;

//delete
exports.remove = (req,res) => {
    db.run("DELETE FROM songs WHERE id = ?", 
        [req.params.id], function(err) {
        if (err) return res.status(500).json({error:err.message}) ;
        res.json({deleted: this.changes}) ;
    }) ;
} ;