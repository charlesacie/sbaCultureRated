const artists = require('../models/artist');

const getArtists = (req, res) => {
  res.render('artist', { artists });
};

const getArtistById = (req, res) => {
  const artist = artists.find(a => a.id === parseInt(req.params.id));
  if (artist) {
    res.render('artistDetail', { artist });
  } else {
    res.status(404).send('Artist not found');
  }
};

const rateArtist = (req, res) => {
  const artist = artists.find(a => a.id === parseInt(req.params.id));
  if (artist) {
    const userRating = parseInt(req.body.userRating);
    if (userRating >= 1 && userRating <= 10) {

      artist.userRatings = artist.userRatings || [];
      artist.userRatings.push(userRating);

      const totalRatings = artist.userRatings.length;
      const averageRating = artist.userRatings.reduce((sum, rating) => sum + rating, 0) / totalRatings;

      res.send(`Thank you! You rated ${artist.name} a ${userRating}/10. The average rating is now ${averageRating.toFixed(1)}/10.`);
    } else {
      res.status(400).send('Rating must be between 1 and 10.');
    }
  } else {
    res.status(404).send('Artist not found');
  }
};

module.exports = {
  getArtists,
  getArtistById,
  rateArtist
};
