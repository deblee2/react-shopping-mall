const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

// 백엔드에서 프론트엔드로 파일 저장 및 정보 전달하는 단계

//=================================
//             Product
//=================================

const storage = multer.diskStorage({
    // destination: 어디에 파일이 저장 되는지
    destination: function (req, file, cb) {
      cb(null, 'uploads/') //모든 파일이 uploads에 저장됨
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage }).single("file")


// 이미 api/product 타고서 옴 
router.post('/image', (req, res) => {
    // 가져온 이미지를 저장을 해주면 된다.
    upload(req, res, (err) => {
        if(err) {
            return res.json({ success: false, err })
        }
        // 전달을 해줌
        return res.json({ success: true, filePath: res.req.file.path, 
            fileName: res.req.file.filename })
    })
})

router.post('/', (req, res) => {
  // 받아온 정보들을 DB에 넣어준다.
  const product = new Product(req.body)

  product.save((err) => {
    if(err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  })
  
})

module.exports = router;
