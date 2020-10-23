const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Actor = require('../models/actor');
const Movie = require('../models/Movie');

module.exports = {
    getAll: function (req, res) {
        Actor.find({}).populate('movies').exec(function (err, actors) {
            if (err) {
                return res.json(err);
            } else {
                res.json(actors);
            }
        });
    },
    creatOne: function (req, res) {
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        let actor = new Actor(newActorDetails);
        actor.save(function (err) {
            if (err) {
                throw err;
            } else {
                console.log('Done');
                res.json(actor);
            }
        });
    },
    getOne: function (req, res) {
        Actor.findOne({ _id: req.params.id })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.json(err);
                if (!actor) return res.json();
                res.json(actor)
            });
    },
    updateOne: function (req, res) {
        Actor.findOneAndUpdate({
            _id: req.params.id
        }),
            req.body, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(400).json();

                res.json(actor)
            }
    },
    deleteOne: function (req, res) {
        Actor.findOneAndRemove({ _id: req.params.id }, function (err,actor) {
            if(err) return res.status(400).json(err);
            if(!actor)return res.status(404).json();
            Movie.findOneAndDelete({"actors":req.params.id},function(error,result){
            if (error) return res.status(400).json(error);
            res.json(result);
            })
        })
    },
    deleteActorAndMovies: function (req, res) {
        Actor.findOneAndDelete({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.update(
                { "actors": req.params.id },
                { "$pull": { "actors": req.params.id } },
                function (error, result) {
                    if (error) return res.status(400).json(error);
                    res.json(result);
                }
            )
        })
    },
    addMovie: function (req, res) {
        Actor.findOne({ _id: req.params.id }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();

            Movie.findOne({ _id: req.body.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(actor);
                })
            })
        });
    },
    removeMovie: function(req, res){
        let movieID = new mongoose.Types.ObjectId(req.params.mId);
        let actorID = new mongoose.Types.ObjectId(req.params.id);

        Movie.findOne({_id: movieID }, function(err, movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({_id: actorID }, function(err, actor){
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.remove(movie._id);
                actor.save(function(err){
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            });
        });
    },
    
    //     Actor.update(
    //         {"_id":actorID},
    //         {"$pull":{"moview":movieID}},
    //         function(err,result){
    //             if(err) return res.status(400).json(err);
    //             if(!result) return res.status(404).json();
    //             res.json(result);
    //         }
    //     )
    // },

};