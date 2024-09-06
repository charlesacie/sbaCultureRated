const express = require('express');
const path = require('path');
const artistRoutes = require('./routes/artistRoutes');
const app = express();

const artists = require('./models/artist');

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const logRequests = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
app.use(logRequests);

const checkAuth = (req, res, next) => {

  const isAuthenticated = true;
  if (isAuthenticated) {
    next();
  } else {
    res.status(403).send('Not authorized');
  }
};
app.use(checkAuth);


app.use(artistRoutes);

app.post('/artist', (req, res) => {
  const { name, versatility, popularity, longevity, image } = req.body;
  const newArtist = {
    id: artists.length + 1,  
    name,
    versatility,
    popularity,
    longevity,
    image
  };
  artists.push(newArtist);  
  res.status(201).json(newArtist);  
});

app.get('/', (req, res) => {
  res.render('home');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
