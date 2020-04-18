'use strict'
const path = require('path');
const express = require('express');
const multer = require('multer');

const app = express();
const port = 8000;
// ファイル名を変更して保存
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
})
  
// const upload = multer({ dest: 'uploads/' })
const upload = multer({ storage: storage });

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs')
});

app.get('/upload', (req, res) => {
  res.render('upload.ejs');
});

app.post('/upload', upload.single('file'), function (req, res) {
    res.send(req.file.originalname + 'ファイルのアップロードが完了しました。');
})

app.listen(port,function(){
	console.log(`listening on port ${port}!`);
})	

