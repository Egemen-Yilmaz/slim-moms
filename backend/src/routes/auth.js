const express = require('express');
const router = express.Router();
const { register, login, refresh, logout, getCurrentUser } = require('../controllers/auth');
const { protect } = require('../middlewares/auth');

// /api/auth/register
router.post('/register', register);

// /api/auth/login
router.post('/login', login);

// /api/auth/refresh
router.post('/refresh', refresh);

// /api/auth/logout
router.post('/logout', logout);

// Korumalı Profil Rotası
router.get('/current', protect, getCurrentUser);

module.exports = router;