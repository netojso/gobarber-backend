import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const tmpPath = path.resolve(__dirname, '..' , '..', 'tmp');

export default {
  tmpFolder: tmpPath,
  uploadFolder: path.resolve(__dirname, '..', '..', 'tmp', 'upload'),
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..' , '..', 'tmp'),
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;

      return callback (null,  filename)
    }
  })
}
