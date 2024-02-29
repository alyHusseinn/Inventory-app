const Song = require("../models/song");
const Artist = require("../models/artist");
const Genre = require("../models/genre");

exports.isAuthorized_to_update_song = async (req, res, next) => {
    // next if song.created_by.username == req.user.username
    // else req.status(403).send("unAuthorized");
    const song = await Song.findById(req.params.id).populate("created_by").exec();
    if(song.created_by.username == req.user.username){
        next();
    }else {
        res.status(401).send("unAuthorized").end();
    }
}

exports.isAuthorized_to_update_artist = async (req, res, next) => {
    // next if artist.created_by.username == req.user.username
    // else req.status(403).send("unAuthorized");
    const artist = await Artist.findById(req.params.id).populate("created_by").exec();
    if(artist.created_by.username == req.user.username){
        next();
    }else {
        res.status(401).send("unAuthorized");
    }
}

exports.isAuthorized_to_update_genre = async (req, res, next) => {
    // next if genre.created_by.username == req.user.username
    // else req.status(403).send("unAuthorized");
    const genre = await Genre.findById(req.params.id).populate("created_by").exec();
    if(genre.created_by.username == req.user.username){
        next();
    }else {
        res.status(401).send("unAuthorized");
    }
}