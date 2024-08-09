import express from 'express';
import multer from 'multer';
import { uploadSizeController } from '../domains/size/uploadsize/uploadsize.controller.js';

const router = express.Router();
// const upload = multer({ dest: 'private/uploads/' }); // 업로드된 파일을 저장할 디렉토리 설정

// router.post('/', upload.single('sizeImage'), uploadSizeController); // POST 요청 라우팅

export default router;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'private/uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
//   const upload = multer({ storage });

  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(new Error('Only JPEG and PNG files are allowed.'), false);
      }
    }
  });

  

router.post('/', upload.single('file'), (req, res, next) => {
    console.log(req.file);  // 파일 정보 로그
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }

    uploadSizeController(req, res, next);
});

  
  