import { Router } from "express";
import movieService from "../services/movieService.js";
import artistService from "../services/artistService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import * as z from "zod";
import { createMovieSchema } from "../schemas/movieSchema.js";
import { prepareCategoryViewData } from "../utils/viewHelper.js";

const movieController = Router();

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    
    const movies = await movieService.getAll(filter);
    
    res.render('movies/search', { movies, filter })
});

movieController.get('/create', isAuth, (req, res) => {
     const categoryOptions = prepareCategoryViewData();

    res.render('movies/create', {
        pageTitle: 'Create Movie',
        categoryOptions
    });
});

movieController.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    const userId = req.user.id;

    try {
        const movieData = createMovieSchema.parse(newMovie);

        await movieService.create(movieData, userId);

        res.redirect('/');
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = z.flattenError(error).fieldErrors;

            const categoryOptions = prepareCategoryViewData(newMovie)

            const firstError = Object.values(errors).flat().at(0);

            res.status(400).render('movies/create', {movie: req.body, error: firstError, categoryOptions, pageTitle: 'Create Movie'})
            
        }

    }
});



movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId
    const userId = req.user?.id;

    const movie = await movieService.getById(movieId);

    const isOwner = movie.userId && movie.userId === userId;

    res.render('movies/details', { movie, pageTitle: 'Movie Details', isOwner });
});

movieController.get('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    
    const movie = await movieService.getById(movieId);

    const artists = await artistService.getAll();

    res.render('artists/attach', { pageTitle: 'Attach Movie', movie, artists });
    });

movieController.post('/:movieId/attach', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const artistId = req.body.artist;

    await movieService.attachArtist(movieId, artistId);

    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.id;

    await movieService.remove(movieId, userId);

    res.redirect('/');
});

movieController.get('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.id;

    const movie = await movieService.getById(movieId);

    if (movie.userId !== userId) {
        return res.status(401).send('You are not authorized to edit this movie');
    }

    res.render('movies/edit', { pageTitle: 'Edit Movie', movie });
});

movieController.post('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = Number(req.params.movieId);
    const userId = req.user.id;
    const movieData = req.body
    
    await movieService.edit(movieId, movieData, userId);

    res.redirect(`/movies/${movieId}/details`);
});

    export default movieController;