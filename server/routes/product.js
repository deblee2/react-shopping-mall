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

router.post('/', (req, res) => { //??
  // 받아온 정보들을 DB에 넣어준다.
  const product = new Product(req.body)

  product.save((err) => {
    if(err) return res.status(400).json({ success: false, err })
    return res.status(200).json({ success: true })
  })

})

router.post('/products', (req, res) => {
  // product collection에 들어 있는 모든 상품 정보를 가져오기
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit): 20;
  let skip = req.body.skip ? parseInt(req.body.skip): 0;

  let findArgs = {};
  for(let key in req.body.filters) {
    if(req.body.filters[key].length > 0){

      if (key === "price") {
        findArgs[key] = {
          // greater than equal
          $gte: req.body.filters[key][0],
          // less than equal
          $lte: req.body.filters[key][1]
        }
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  console.log('findArgs', findArgs)

  // Product 모델 이용해서 find 메소드 사용
  Product.find(findArgs)
    // 상품을 누가 등록했는지에 대한 정보가 writer의 unique한 아이디가 나와있다
    // 근데 등록한 사람의 이름, 이메일 주소 등이 다 필요함
    .populate("writer") // 이 사람에 대한 모든 정보를 가져올 수 있음
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if(err) return res.status(400).json({ success: false, err })
      return res.status(200).json({ 
        success: true, productInfo,
        postSize: productInfo.length 
      })
    })

})

module.exports = router;
