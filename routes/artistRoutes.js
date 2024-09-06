const express = require('express');
const router = express.Router();
const { getArtists, getArtistById, rateArtist } = require('../controllers/artistController');

router.get('/artist', getArtists);

router.get('/artist/:id', getArtistById);

router.post('/artist/:id/rate', rateArtist);

module.exports = router;
