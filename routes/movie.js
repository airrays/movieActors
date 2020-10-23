const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const Actor = require('../models/actor')

module.exports = {
    getAll: function(req,res){
        Movie.find({}).populate({path:'actors',select:'name'}).exec(function(err,movies){
            if(err) return res.status(400).json(err);

            res.json(movies);
        });
    },
    createOne:function(req,res){
        let newMoviewDetails = req.body;
        newMoviewDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMoviewDetails,function(err,movie){
            if(err) return res.status(400).json(err);

            res.json(movie)
        })
    },
    getOne:function(req,res){
        Movie.findOne({_id:req.params.id})
        .populate('actors')
        .exec(function(err,movie){
            if(err) return res.status(400).json(err);
            if(!movie) return res.status(404).json();

            res.json(movie);
        });
    },
    updateOne: function(req,res){
        Movie.findOneAndUpdate({_id:req.params.id},
            req.body,
            function(err,movie){
                if(err) return res.status(400).json(err);
                if(!movie) return res.status(404).json();

                res.json(movie)
            })
    },
    deleteOne: function(req,res){
        Movie.deleteOne({_id:req.params.id},function(err,result){
            if(err) return(400).json(err);
            if(!result) return res.status(404).json();

            res.json(result)
        })
    },
    deleteActor: function(req,res){
        movieID=new mongoose.Types.ObjectId(req.params.mId);
        actorID=new mongoose.Types.ObjectId(req.params.aId);
        Movie.findOne({_id:movieID},function(err,movie){
            if(err) return(400).json(err);
            if(!movie) return res.status(404).json();
            Actor.findOne({_id:actorID},function(error,result){
                if(error) return(400).json(err);
                if(!result) return res.status(404).json();
                movie.actors.remove(result._id);
                movie.save(function(err){
                    if(err) throw err;
                    res.json(movie);
                })
            })
        })
    },

    getAllYear: function (req, res) {
        let year1 = req.params.year1;
        let year2 = req.params.year2;

        Movie.find({}).where('year').gte(year2).where('year').lte(year1).populate('actors').exec(function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteMovieByYear:function(req,res){
        y1=req.body.year1;
        y2=req.body.year2;
        Movie.find({}).where('year').gte(y1).where('year').lte(y2).deleteMany().exec(function(err,movies){
            if(err) return res.status(400).json(err);
            if(!movies) return res.status(404).json();
            res.json(movies);
        })
    },
    deleteMovieBeforeYear: function(req,res){
        y1=req.params.aYear;
        Movie.find({}).where('year').lte(y1).deleteMany().exec(function(err,movies){
            if(err) return res.status(400).json(err);
            if(!movies) return res.status(404).json();
            res.json(movies);
        })
    },
    addActor:function(req,res){
            Movie.findOne({ _id: req.params.id }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
    
                Actor.findOne({ _id: req.body.id }, function (err, actor) {
                    if (err) return res.status(400).json(err);
                    if (!actor) return res.status(404).json();
    
                    movie.actors.push(actor._id);
                    movie.save(function (err) {
                        if (err) return res.status(500).json(err);
    
                        res.json(movie);
                    })
                })
            });
    }
}