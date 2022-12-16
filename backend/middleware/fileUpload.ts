import multer from 'multer';
import { nanoid } from 'nanoid';

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
} as const;

const fileUpload = multer({
  limits: { fileSize: 10000000 },
  storage: multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, 'uploads/images');
    },
    filename: (_, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype as keyof typeof MIME_TYPE_MAP];
      cb(null, nanoid() + '.' + ext);
    }
  }),
  fileFilter: (_, file, cb) => {
    if (Object.keys(MIME_TYPE_MAP).includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid mime type!'));
    }
  }
});

export default fileUpload;
