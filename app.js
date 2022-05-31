let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');
const mongoose = require('mongoose')
const actors = require('./routes/actor')
const movies = require('./routes/movie');
let labActor=require('./routes/labActor')

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();
app.use("/", express.static(path.join(__dirname, "dist/lab10")));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(8080,function(err){
  if(!err){
  console.log(err)}
})

mongoose.connect('mongodb://localhost:27017/fit2095db',function(err){
  if(err){
    return console.log('Mongoose - Connection error: '+err);
  }
  console.log('Connect Successfully')
});

//RESTFul endpoints
app.get('/actors',actors.getAll);
app.post('/actors',actors.creatOne);
app.get('/actors/:id',actors.getOne);
app.put('/actors/:id',actors.updateOne);
app.post('/actors/:id/movies',actors.addMovie);
app.delete('/actors/:id',actors.deleteOne);
//app.delete('/actors/:id',actors.deleteActorAndMovies);
app.delete('/actors/:id/movies/:mId',actors.removeMovie)
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
//app.get('');
//Movie RESTFUl endPoints
app.get('/movies',movies.getAll);
app.post('/movies',movies.createOne);
app.get('/movies/:id',movies.getOne);
app.put('/movies/:id',movies.updateOne);
app.delete('/movies/:id',movies.deleteOne)
app.delete('/movies/:mId/:aId',movies.deleteActor);
app.get('/movies/:year1/:year2',movies.getAllYear);
app.delete('/movies',movies.deleteMovieByYear);
app.delete('/mocies/year/:aYear',movies.deleteMovieBeforeYear);
app.post('/movies/:id/actors',movies.addActor);
//
app.post('/labActor',labActor.createLabActor);








// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err)
});


