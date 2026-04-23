// const multer = require('multer'); //You’re bringing in the library that can: read FormData, handle file uploads
// const storage = multer.memoryStorage(); //It tells multer “Don’t save the file on disk… keep it in RAM (memory)”
// const upload = multer({ storage });

// module.exports = upload;

import multer from 'multer'; // handles file uploads

const storage = multer.memoryStorage(); // store file in memory (needed for cloudinary buffer)

const upload = multer({ storage });

export default upload;