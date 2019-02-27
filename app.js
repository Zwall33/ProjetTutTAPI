
//Serveur

//import NOM from 'MODULE';
import createError from 'http-errors';
import express from'express';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import dbIndex from './routes/dbroute';
import cors from 'cors';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));// "Chemin par défaut HTML"     '"./"la_page.html'
app.set('view engine', 'ejs');// Permet l'utilisation de .ejs
app.set('port', process.env.PORT || 4300);///////////////////////////////////////////////////////////////////////
app.use(logger('dev'));////////////////////////////////////////////////////////////////////////
app.use(cookieParser());///////////////////////////////////////////////////////////////////////
app.use(express.static(path.join(__dirname, 'public')));// Chemin par défaut pour js,css etc...  
app.use('*', cors({ origin: '*' }));// cors
app.use(bodyParser.urlencoded({ extended: true }));// Compo URL
app.use(bodyParser.json());//Gestion envoie/reception json
app.use('/', indexRouter);// current route 
app.use('/dbIndex', dbIndex)// database route

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
  res.render('error');
}); 

module.exports = app;// Rendre fichier importable