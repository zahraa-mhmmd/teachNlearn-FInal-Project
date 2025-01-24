const router = require('express').Router();
const dotenv = require('dotenv');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuid } = require('uuid');
const verifyToken = require('./verifyToken');

// Load environment variables
dotenv.config({ path: '../../config/.env' });

// Create S3 client instance
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

// Multer memory storage setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to upload image to S3
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  console.log(req);  // Check if the file is attached to the request
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        message: 'Please make sure the file is attached with the correct field name ("image").',
      });
    }

    const myFile = req.file.originalname.split('.');
    const fileType = myFile[myFile.length - 1];
    const uniqueKey = `${uuid()}.${fileType}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: uniqueKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
    const data = await s3.send(command);

    res.status(200).json({
      message: 'Upload successful',
      key: uniqueKey,
      location: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueKey}`,
      data,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(400).json({
      error: 'Failed to upload image',
      details: error.message,
    });
  }
});


module.exports = router;
