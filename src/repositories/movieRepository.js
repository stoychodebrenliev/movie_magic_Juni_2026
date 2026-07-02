import fs from 'fs/promises';
import {prisma} from '../lib/prisma.js';



async function getAll(filter = {}) {
    let movies = await prisma.movie.findMany();
    
if(filter.search) {
    movies = movies.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
}

if(filter.year) {
    movies = movies.filter(move => moive.year === filter.year);
}

if(filter.genre) {
    movies = movies.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase())
}

    return movies;
}
async function getById(movieId) {
    const movie = await prisma.movie.findUnique({
        where: {
            id: movieId
        }
    })
    

    if(!movie) {
        throw new Error ('No movie found!');
    }

    return movie; 
}

async function create(movieData) {
    
    const movie = await prisma.movie.create({
        data: movieData
    });
    return movie;
}

const movieRepository = {
    getAll,
    create,
    getById
}

export default movieRepository;