const express = require("express");
const { param } = require("express/lib/request");
var bodyParser = require("body-parser");

//Database
const database = require("./database");

//initialise express
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

/*
Route            /
Description      Get all the books
Access           PUBLIC
Parameter        NONE
Method           GET        
 */

booky.get("/",(req,res) => {
    return res.json({books: database.books})
});

/*
Route            /is
Description      Get specific book on ISBN
Access           PUBLIC
Parameter        isbn
Method           GET        
 */
booky.get("/is/:isbn",(req,res) => {
    const getSpecificBook =database.books.filter(
        (book) => book.ISBN=== req.params.isbn    
        );

        if(getSpecificBook.length === 0){
            return res.json({error: `No book found for the ISBN of ${req.params.isbn}`});

        }
        return res.json({book: getSpecificBook});
});

/*
Route            /c
Description      Get specific book on category
Access           PUBLIC
Parameter        category
Method           GET        
 */

booky.get("/c/:category",(req,res) => {
    const getSpecificBook =database.books.filter(
        (book) => book.category.includes(req.params.category)    
        )
        if(getSpecificBook.length === 0){
            return res.json({error: `No book found for the category of ${req.params.category}`})
        } 
        return res.json({book: getSpecificBook});
});

/*
Route            /l
Description      Get specific book on language
Access           PUBLIC
Parameter        language
Method           GET        
 */

booky.get("/l/:language",(req,res) => {
    const getSpecificBook =database.books.filter(
        (book) => book.Language.includes(req.params.language)    
        )
        if(getSpecificBook.length === 0){
            return res.json({error: `No book found for the language of ${req.params.language}`})
        } 
        return res.json({book: getSpecificBook});
});

/*
Route            /author
Description      Get all authors
Access           PUBLIC
Parameter        NONE
Method           GET        
 */

booky.get("/author",(req,res) => {
    return res.json({authors: database.author});
});

/*
Route            /author/book
Description      Get all authors
Access           PUBLIC
Parameter        isbn
Method           GET        
 */

booky.get("/author/book/:isbn",(req,res) => {
    const getSpecificAuthor =database.author.filter(
        (author) =>author.books.includes(req.params.isbn)
    );
    if(getSpecificAuthor.length === 0){
        return res.json({
            error: `No author found for the book of ${req.params.isbn}`
        });
    }
    return res.json({authors: getSpecificAuthor});
});

/*
Route            /publication
Description      Get all publications
Access           PUBLLIC
Parameter        NONE
Method           GET        
 */

booky.get("/publications",(req,res) => {
    return res.json({publications: database.publication});
});

/*
Route            /body/new
Description      add new book
Access           PUBLIC
Parameter        NONE
Method           POST     
 */

booky.post("/book/new",(req,res) => {
    const newBook = req.body;   //we have to push new book
    database.books.push(newBook);
    return res.json({updatedBooks: database.books});
});

/*
Route            /publication/new
Description      add new publications 
Access           PUBLIC
Parameter        NONE
Method           POST     
 */

booky.post("/publication/new",(req,res) => {
    const newPublication = req.body;   //we have to push new book
    database.publication.push(newPublication);
    return res.json(database.publication);
});

/*
Route           /publication/update/book
Description      Update /add new publications 
Access           PUBLIC
Parameter        isbn
Method           PUT     
 */

booky.put("/publication/update/book/:isbn",(req,res) => {
    //Update the publication database
    database.publication.forEach((pub) => {
        if(pub.id === req.body.pubId){
            return pub.books.push(req.params.isbn);
        }
    });

    //Update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publications = req.body.pubId;
            return; 
        }
    });

    return res.json(
        {
            books: database.books,
            publications: database.publication,
            message: "Successfully updated publications"
        }
    );
});

/*********DELETE********/
/*
Route           /book/delete
Description      delete a book 
Access           PUBLIC
Parameter        isbn
Method           DELETE    
 */

booky.delete("/book/delete/:isbn",(req,res) => {
    //whichever  book tht doesnot match with the isbn, just send it
    //and rest will be filtered out

    const updatedBookDatabase = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    )
    database.books = updatedBookDatabase;
    
    return res.json({books: database.books}); 
});

/*
Route           /book/delete/author
Description      delete an author from a book and vice versa
Access           PUBLIC
Parameter        isbn , authorId
Method           DELETE    
 */

booky.delete("/book/delete/author/:isbn/:authorId",(req,res) => {
    //Update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn) {
            const newAuthorList = book.author.filter(
                (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
            );
            book.author = newAuthorList;
            return;
        }
    });

    //Update the auther database
    database.author.forEach((eachAuthor) => {
        if(eachAuthor.id === parseInt(req.params.authorId)) {
            const newBookList = eachAuthor.books.filter(
                (book) => book !== req.params.isbn 
            );
            eachAuthor.books = newBookList;
            return;
        }
    });

    return res.json({
        book: database.books,
        author: database.author,
        message: "Auther was delete!!!"
    });
});

booky.listen(3000,() => {
    console.log("Server is up and running");
});
  

