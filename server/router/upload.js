const express = require('express')
const multer = require('multer')
const upload = multer({dest: 'uploads/'})

const Result = require('../utils/Result')

const router = express.Router()

//上传征书墙书籍图片
router.post('/askingBook', upload.array('askingBook'), async (req, res) => {
    console.log(req.files)
    res.json(111)
})

module.exports = router