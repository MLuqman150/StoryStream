const fs = require('fs');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync('./uploads')) {
            fs.mkdirSync('./uploads');
        }
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        // let fileExt = file.originalname.split('.').pop();
        // cb(null, file.fieldname + '-' + Date.now() + '.' + fileExt)
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage,  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  } })

module.exports = upload
