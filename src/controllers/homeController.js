import { Router } from 'express';
import movieService from '../services/movieService.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
  const filter = req.query;

  const movies = await movieService.getAll(req.query);
 
  res.render('home', { movies });  
});

homeController.get('/about', (req, res) => {
  res.render('about');
});

export default homeController;