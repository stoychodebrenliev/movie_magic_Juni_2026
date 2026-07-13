import { Router } from 'express';

const authController = Router();

authController.get('/register', (req, res) => {
  res.render('Register Page');
});

export default authController;