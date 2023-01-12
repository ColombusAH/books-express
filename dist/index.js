"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const jsonParser = body_parser_1.default.json();
app.use(jsonParser);
const PORT = 3001;
const db = {
    books: [{ id: 1, title: 'Harry Potter', genre: 'Fantasy', authorId: 1 }],
    authors: [{ id: 1, name: 'J.K. Rowling', age: 50 }],
    genres: ['Fantasy', 'Sci-Fi', 'Thriller'],
};
app.get('/', (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).send('Server is up and running!');
});
// GET ALL BOOKS
app.get('/books', (req, res) => {
    res.status(http_status_codes_1.StatusCodes.OK).send({
        total: db.books.length,
        results: db.books
    });
});
// add a new book
app.post('/books', (req, res) => {
    const { title, genre, authorId } = req.body;
    const book = {
        id: db.books.length + 1,
        title,
        genre,
        authorId
    };
    db.books.push(book);
    console.log(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).send(book);
});
app.delete('/books/:id', (req, res) => {
    const id = +req.params.id;
    console.log('the param id id ', req.params);
    const book = db.books.find((book) => book.id === id);
    if (!book) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send(http_status_codes_1.ReasonPhrases.NOT_FOUND);
        return;
    }
    db.books = db.books.filter((book) => book.id !== id);
    res.status(http_status_codes_1.StatusCodes.OK).send(book);
});
app.listen(PORT, () => {
    console.log('SERVER IS UP ON PORT:', PORT);
});
