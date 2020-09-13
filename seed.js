const mongoose = require('mongoose');
const Model = require('./database-mongo/index.js');

// listings stores documents of airbnb listings
const photos = [
  'https://5erflies.s3-us-west-1.amazonaws.com/htmls/mvp/pa_whirl.jpg',
  'https://5erflies.s3-us-west-1.amazonaws.com/htmls/mvp/ukelele.jpg',
  'https://5erflies.s3-us-west-1.amazonaws.com/htmls/mvp/drive.jpg',
  'https://5erflies.s3-us-west-1.amazonaws.com/htmls/mvp/hug.jpg',
  'https://5erflies.s3-us-west-1.amazonaws.com/htmls/mvp/pa_spon.jpg',
  'https://5erflies.s3-us-west-1.amazonaws.com/htmls/mvp/fish.png',
  'https://5erflies.s3-us-west-1.amazonaws.com/htmls/mvp/gary.png',
  'https://5erflies.s3-us-west-1.amazonaws.com/htmls/mvp/yay.jpg'
];
const cards = [];

const seedListing = () => {
  for (let r = 0; r < 8; r++) {
    const dataInfo = {
      id: r,
      picture: photos[r]
    }
    cards.push(dataInfo);
  }
}

seedListing();

Model.Card.create(cards, (err, result) => {
    if (err) {
      throw error;
    } else {
      console.log('success saving listing to db!');
    }
});