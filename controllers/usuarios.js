const {response} = require('express');

const multer = require('multer');
const path = require('path');
const helpers = require('./helpers');
const des = require('./des');

const usuariosGet = (req , res)=>{
  //express parasea los parmas
    const {q ,nombre='No name' , key}= req.query;
res.json({
    ok: true,
    msg: 'Get API-Controlador',
    q,
    nombre,
    key
})
}

const usuariosPut = (req , res)=>{
    //el id es  el nnombre que dimos  en las rutas :id
    const id =req.params.id;
    res.json({
        ok: true,
        msg: 'Put API-Controlador',
        id
    })
 }

const usuariosPost = (req , res)=>{
    const {nombre , edad} = req.body;
    res.json({
        ok: true,
        msg: 'Post API-Controlador',
        nombre ,
        edad
    })
}

const usuariosDelete = (req , res)=>{
    res.json({
        ok: true,
        msg: 'Delete API-Controlador'
    });
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});

const uploadImage = (req, res) =>{
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('input__file');

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        //console.log(req.body.select__cipher)
        console.log(req.file)
        console.log(req.body)

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (!req.file) {
            return res.send('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            return res.send(err);
        } else if (err) {
            return res.send(err);
        }
        let key = req.body.key;
        let iv = req.body.iv;
        let mode = req.body.select__operation;
        let operation = req.body.select__cipher;
        let originalname = req.file.originalname;
        let nameWithoutExt = originalname.slice(0,originalname.length - 4);
        let op = mode.slice(4).toUpperCase();

        if(operation === "Cipher"){
            des.cipher(key, iv, originalname, mode, nameWithoutExt);
            res.redirect('/?imagen=img/'+ nameWithoutExt +'_e'+op+'.bmp#output');
        } else if (operation === "Decipher"){
            des.decipher(key, iv, originalname, mode, nameWithoutExt);
            res.redirect('/?imagen=img/'+ nameWithoutExt +'_d'+op+'.bmp#output');
        }
    });

}


module.exports={
    usuariosGet,
    usuariosPut,
    usuariosDelete,
    usuariosPost,
    uploadImage
}