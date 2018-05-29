var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/bookshopAPI');
var Book = require('./models/bookModel');
var app = express();
var port = 3030;
var bookRouter = express.Router();

// var book1 = new Book({ title: 'Game of throne', author: 'David Paul', genre: 'Drama', read: true });

	// save model to database
	// book1.save(function (err, book) {
    //   if (err) 
    //   return console.error(err);
	//   console.log(book.title + " saved to bookstore collection.");
	// });

bookRouter.route('/Books')  // another method when the app is getting complex
    .get(function(req,res){
         var query = {};
         if(req.query.genre)
         {
            query.genre = req.query.genre
         }
           Book.find(query,function(err,books){
               if(err)
                res.status(500).send(err);
               else
                res.json(books)
           });
    });

bookRouter.route('/Books/:bookId')  // another method when the app is getting complex
    .get(function(req,res){
           Book.findById(req.params.bookId,function(err,book){
               if(err)
                res.status(500).send(err);
               else
                res.json(book)
           });
    });    

app.use('/api', bookRouter);    

app.get('/',function(req,res){   //one way of routing for a simple system
   res.send('welcome to my Api');
});

app.listen(port, function(){
    console.log('listening on port: ' + port);
});