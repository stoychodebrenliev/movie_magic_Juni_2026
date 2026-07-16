import {  Router} from 'express';
import artistService from '../services/artistService.js';
import { isAuth } from '../middlewares/authMiddleware.js';
import { getErrorMessage } from '../utils/errorUtils.js';
import { createArtistSchema } from '../schemas/artistSchema.js';

const artistController = Router();

artistController.get('/create', isAuth, async (req, res) => {

    res.render('artists/create');
});

artistController.post('/create', isAuth, async (req, res) => {
    try {
        const artistData = createArtistSchema.parse(req.body);

        await artistService.create(artistData);

        res.redirect('/');
    } catch (error) {
        const errorMessage = getErrorMessage(error);

        res.status(400).render("artists/create", { artist: req.body, error: errorMessage });
    }
});


export default artistController;