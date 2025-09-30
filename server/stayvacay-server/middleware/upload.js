// upload.js
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

// Create S3 client (v3)
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer middleware for uploading directly to S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read', // makes files publicly accessible
    key: function (req, file, cb) {
      const safeName = file.originalname.replace(/\s+/g, "-"); // replace spaces with dashes
      cb(null, `properties/${Date.now()}-${safeName}`);
    },
  }),
});

export default upload;
