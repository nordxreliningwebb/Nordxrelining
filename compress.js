const sharp = require('sharp');
sharp('public/valkommen.jpeg')
  .resize(800)
  .jpeg({ quality: 75 })
  .toFile('public/valkommen-opt.jpeg')
  .then(() => {
    console.log('Compression done');
    const fs = require('fs');
    fs.renameSync('public/valkommen-opt.jpeg', 'public/valkommen.jpeg');
    console.log('Replaced original');
  })
  .catch(err => console.error(err));
