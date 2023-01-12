import express, { Application, Request, Response,} from 'express';
import {
	ReasonPhrases,
	StatusCodes,

} from 'http-status-codes';

import bodyParser from 'body-parser';

const app: Application = express();
const jsonParser = bodyParser.json();
app.use(jsonParser);


const PORT: number = 3001;

interface IBook {
    id: number;
    title: string;
    genre: string;
    authorId: number;
}

interface IAuthor {
    id: number;
    name: string;
    age: number;
}

interface DB {
    books: IBook[];
    authors: IAuthor[];
    genres: string[];
}

const db: DB = {
    books: [{ id: 1, title: 'Harry Potter', genre: 'Fantasy', authorId: 1}],
    authors: [{ id: 1, name: 'J.K. Rowling', age: 50}],
    genres: ['Fantasy', 'Sci-Fi', 'Thriller'],
};

app.get('/', (req: Request, res: Response): void => {
    res.status(StatusCodes.OK).send('Server is up and running!')
});


// GET ALL BOOKS
app.get('/books', (req: Request, res: Response): void => {
    res.status(StatusCodes.OK).send({
        total: db.books.length,
        results: db.books
    })
});

// add a new book

app.post('/books', (req: Request, res: Response): void => {
    const { title, genre, authorId } = req.body;
    const book: IBook = {
        id: db.books.length + 1,
        title,
        genre,
        authorId
    }
    db.books.push(book);
   console.log(req.body)

   res.status(StatusCodes.CREATED).send(book);
});

app.delete('/books/:id', (req: Request, res: Response): void => {
    const id = +req.params.id;
    console.log('the param id id ', req.params)
    const book = db.books.find((book) => book.id === id);
    if (!book) {
        res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
        return;
    }
    db.books = db.books.filter((book) => book.id !== id);
    res.status(StatusCodes.OK).send(book);
});

app.listen(PORT, (): void => {
    console.log('SERVER IS UP ON PORT:', PORT);
});