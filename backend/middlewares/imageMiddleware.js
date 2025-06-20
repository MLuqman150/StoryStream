const multer = require('multer');
const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
})

const upload = multer({ storage: storage,  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  } })

module.exports = upload
