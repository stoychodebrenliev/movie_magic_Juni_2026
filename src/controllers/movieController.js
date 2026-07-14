import { Router } from "express";
import movieService from "../services/movieService.js";
import artistService from "../services/artistService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const movieController = Router();

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    
    const movies = await movieService.getAll(filter);
    
    res.render('movies/search', { movies, filter })
});

movieController.get('/create', isAuth, (req, res) => {
    res.render('movies/create');
});

movieController.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    const userId = req.user.id;


    await movieService.create(newMovie, userId);
    
    res.redirect('/');
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

    export default movieController;