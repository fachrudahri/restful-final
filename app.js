const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const finalController = require('./app/controllers/final_controller');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//route handler
app.get('/', finalController.findAllFinal);
app.get('/final/detail/:code', finalController.findOneFinal);
app.get('/final/register', finalController.saveFinalForm)
app.post('/final/saved', finalController.saveFinal);
app.get('/final/update/:code', finalController.updateFinalForm);
app.post('/final/succes-update', finalController.updateFinal);
app.get('/final/delete/:code', finalController.deleteFinal);
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

module.exports = app;
