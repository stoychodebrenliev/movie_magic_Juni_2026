import {  Router} from 'express';

const artistController = Router();

artistController.get('/create', async (req, res) => {

    res.render('artists/create');
});

artistController.post('/create', async (req, res) => {
    const artistData = req.body;

    res.redirect('/');
});


export default artistController;