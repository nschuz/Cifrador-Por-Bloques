const { usuariosGet  , usuariosPut , usuariosDelete , usuariosPost, uploadImage} = require('../controllers/usuarios');

const  router = require('express').Router();

router.get('/',  usuariosGet)
router.put('/:id',  usuariosPut)
router.post('/',  usuariosPost)
router.delete('/',  usuariosDelete)
router.post('/upload-pic', uploadImage)


module.exports= router;