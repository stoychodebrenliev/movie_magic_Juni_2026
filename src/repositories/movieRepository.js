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

async function attachArtist(movieId, artistId) {
    
    const result = await prisma.movie.update({
        where: {
            id: movieId },
        data: {
            cast: {
                connect: { id: artistId }
            }
        }
        });

        return result;
    }

export async function remove(movieId, userId) {
    const result = await prisma.movie.delete({
        where: {
            id: movieId,
            userId: userId
        }
    });

    return result;

}

export async function edit(movieId, movieData, userId) {
    const result = await prisma.movie.update({
        where: {
            id: movieId,
            userId: userId
        }, data: movieData
    });
    return result;
}

const movieRepository = {
    getAll,
    create,
    getById,
    attachArtist,
    remove,
    edit
}

export default movieRepository;