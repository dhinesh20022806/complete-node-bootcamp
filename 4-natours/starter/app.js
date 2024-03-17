const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./router/tourRouter');
const userRouter = require('./router/userRouter');

const app = express();
// 1 Middleware
app.use(morgan('dev'));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the MiddleWare ');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// route handles

// router

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// app.get('/api/v1/tours', getAllTours)
// app.get('/api/v1/tours/:id',getTour)
// app.post('/api/v1/tours', createTour)
// app.patch("/api/v1/tours/:id",updateTour)
// app.delete("/api/v1/tours/:id",deleteTour)

module.exports = app;
