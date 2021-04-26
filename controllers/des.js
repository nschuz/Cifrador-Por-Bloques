const fs = require("fs");
const {algorithm, mode, padding, createEncryptStream} = require('cryptian');
const Jimp = require('jimp');

//let image = fs.readFileSync('Imagen1.bmp'); //Image
//let image = fs.readFileSync('Cifrada_eCBC.bmp'); //Image
//const key = Buffer.from("123d0e276d0140d3", "hex"); //Key 8 bytes
//const iv = Buffer.from('123ca40f5afaeea2', 'hex'); // Initialization vector. (8 bytes)
//let algorithmMode = "des-cbc"; //Modo de cifrado

let cipher = (key, iv, image, algorithmMode, originalName) => {
  switch (algorithmMode) {
    case "des-ecb":
      Jimp.read("uploads/"+image)
        .then(image => {
          console.log(image)
          let fullData = image.bitmap.buffer.toString('hex'); //Obtenemos toda la información de la imagen en hexadecimal
          let offset = image.bitmap.offset; //El offset nos indica la posicion donde inician los bits de colores
          let header = fullData.slice(0, offset * 2);
          let data = fullData.slice(offset * 2);
          let buffData = Buffer.from(data, "hex");
          let buffHeader = Buffer.from(header, "hex");

          const des = new algorithm.Des();
          des.setKey(key);
          const cipher = new mode.ecb.Cipher(des, iv);

          let cipherData = cipher.transform(buffData, "hex");

          let outputData = Buffer.concat([buffHeader, cipherData]);

          console.log("Cabecera:")
          console.log(buffHeader.toString('hex'));

          console.log("Cabecera + Data")
          console.log(outputData);

          image.bitmap.data = outputData;

          fs.writeFileSync('public/img/'+ originalName +'_eECB.bmp', outputData); //Save
          return null;
          /*return image
            .write('Original(Cifrada).bmp'); // save*/
        })
        .catch(err => {
          console.error(err);
        });
      break;
    case "des-cbc":
      Jimp.read("uploads/"+image)
        .then(image => {
          console.log(image)
          let fullData = image.bitmap.buffer.toString('hex'); //Obtenemos toda la información de la imagen en hexadecimal
          let offset = image.bitmap.offset; //El offset nos indica la posicion donde inician los bits de colores
          let header = fullData.slice(0, offset * 2);
          let data = fullData.slice(offset * 2);
          let buffData = Buffer.from(data, "hex");
          let buffHeader = Buffer.from(header, "hex");
          const des = new algorithm.Des();
          des.setKey(key);
          const cipher = new mode.cbc.Cipher(des, iv);
          let cipherData = cipher.transform(buffData, "hex");
          let outputData = Buffer.concat([buffHeader, cipherData]);
          console.log("Cabecera:")
          console.log(buffHeader.toString('hex'));
          console.log("Cabecera + Data")
          console.log(outputData);
          image.bitmap.data = outputData;
          fs.writeFileSync('public/img/'+ originalName +'_eCBC.bmp', outputData); //Save
          return null;
        })
        .catch(err => {
          console.error(err);
        });
      break;
    case "des-cfb":
      Jimp.read("uploads/"+image)
        .then(image => {
          console.log(image)
          let fullData = image.bitmap.buffer.toString('hex'); //Obtenemos toda la información de la imagen en hexadecimal
          let offset = image.bitmap.offset; //El offset nos indica la posicion donde inician los bits de colores
          let header = fullData.slice(0, offset * 2);
          let data = fullData.slice(offset * 2);
          let buffData = Buffer.from(data, "hex");
          let buffHeader = Buffer.from(header, "hex");
          const des = new algorithm.Des();
          des.setKey(key);
          const cipher = new mode.cfb.Cipher(des, iv);
          let cipherData = cipher.transform(buffData, "hex");
          let outputData = Buffer.concat([buffHeader, cipherData]);
          console.log("Cabecera:")
          console.log(buffHeader.toString('hex'));
          console.log("Cabecera + Data")
          console.log(outputData);
          image.bitmap.data = outputData;
          fs.writeFileSync('public/img/'+ originalName +'_eCFB.bmp', outputData); //Save
          return null;
        })
        .catch(err => {
          console.error(err);
        });
      break;
    case "des-ofb":
      Jimp.read("uploads/"+image)
        .then(image => {
          console.log(image)
          let fullData = image.bitmap.buffer.toString('hex'); //Obtenemos toda la información de la imagen en hexadecimal
          let offset = image.bitmap.offset; //El offset nos indica la posicion donde inician los bits de colores
          let header = fullData.slice(0, offset * 2);
          let data = fullData.slice(offset * 2);
          let buffData = Buffer.from(data, "hex");
          let buffHeader = Buffer.from(header, "hex");
          const des = new algorithm.Des();
          des.setKey(key);
          const cipher = new mode.ofb.Cipher(des, iv);
          let cipherData = cipher.transform(buffData, "hex");
          let outputData = Buffer.concat([buffHeader, cipherData]);
          console.log("Cabecera:")
          console.log(buffHeader.toString('hex'));
          console.log("Cabecera + Data")
          console.log(outputData);
          image.bitmap.data = outputData;
          fs.writeFileSync('public/img/'+ originalName +'eOFB.bmp', outputData); //Save
          return null;
        })
        .catch(err => {
          console.error(err);
        });
      break;
  }
}

let decipher = (key, iv, image, algorithmMode, originalName) => {
  switch (algorithmMode) {
    case "des-ecb":
      Jimp.read("uploads/"+image)
        .then(image => {
          console.log(image)
          let fullData = image.bitmap.buffer.toString('hex'); //Obtenemos toda la información de la imagen en hexadecimal
          let offset = image.bitmap.offset; //El offset nos indica la posicion donde inician los bits de colores
          let header = fullData.slice(0, offset * 2);
          let data = fullData.slice(offset * 2);
          let buffData = Buffer.from(data, "hex");
          let buffHeader = Buffer.from(header, "hex");

          const des = new algorithm.Des();
          des.setKey(key);
          const decipher = new mode.ecb.Decipher(des, iv);
          let decipherData = decipher.transform(buffData, "hex")

          let outputData = Buffer.concat([buffHeader, decipherData]);

          console.log("Cabecera:")
          console.log(buffHeader.toString('hex'));

          console.log("Cabecera + Data")
          console.log(outputData);

          image.bitmap.data = outputData;

          fs.writeFileSync('public/img/'+ originalName +'_dECB.bmp', outputData); //Save
          return null;
          /*return image
            .write('Original(Cifrada).bmp'); // save*/
        })
        .catch(err => {
          console.error(err);
        });

      break;
    case "des-cbc":
      Jimp.read("uploads/"+image)
        .then(image => {
          console.log("../uploads/"+image)
          let fullData = image.bitmap.buffer.toString('hex'); //Obtenemos toda la información de la imagen en hexadecimal
          let offset = image.bitmap.offset; //El offset nos indica la posicion donde inician los bits de colores
          let header = fullData.slice(0, offset * 2);
          let data = fullData.slice(offset * 2);
          let buffData = Buffer.from(data, "hex");
          let buffHeader = Buffer.from(header, "hex");
          const des = new algorithm.Des();
          des.setKey(key);
          const decipher = new mode.cbc.Decipher(des, iv);
          let decipherData = decipher.transform(buffData, "hex")
          let outputData = Buffer.concat([buffHeader, decipherData]);
          console.log("Cabecera:")
          console.log(buffHeader.toString('hex'));
          console.log("Cabecera + Data")
          console.log(outputData);
          image.bitmap.data = outputData;
          fs.writeFileSync('public/img/'+ originalName +'_dCBC.bmp', outputData); //Save
          return null;
        })
        .catch(err => {
          console.error(err);
        });
      break;
    case "des-cfb":
      Jimp.read("uploads/"+image)
        .then(image => {
          console.log("../uploads/"+image)
          let fullData = image.bitmap.buffer.toString('hex'); //Obtenemos toda la información de la imagen en hexadecimal
          let offset = image.bitmap.offset; //El offset nos indica la posicion donde inician los bits de colores
          let header = fullData.slice(0, offset * 2);
          let data = fullData.slice(offset * 2);
          let buffData = Buffer.from(data, "hex");
          let buffHeader = Buffer.from(header, "hex");
          const des = new algorithm.Des();
          des.setKey(key);
          const decipher = new mode.cfb.Decipher(des, iv);
          let decipherData = decipher.transform(buffData, "hex")
          let outputData = Buffer.concat([buffHeader, decipherData]);
          console.log("Cabecera:")
          console.log(buffHeader.toString('hex'));
          console.log("Cabecera + Data")
          console.log(outputData);
          image.bitmap.data = outputData;
          fs.writeFileSync('public/img/'+ originalName +'_dCFB.bmp', outputData); //Save
          return null;
        })
        .catch(err => {
          console.error(err);
        });
      break;
    case "des-ofb":
      Jimp.read("uploads/"+image)
        .then(image => {
          console.log("../uploads/"+image)
          let fullData = image.bitmap.buffer.toString('hex'); //Obtenemos toda la información de la imagen en hexadecimal
          let offset = image.bitmap.offset; //El offset nos indica la posicion donde inician los bits de colores
          let header = fullData.slice(0, offset * 2);
          let data = fullData.slice(offset * 2);
          let buffData = Buffer.from(data, "hex");
          let buffHeader = Buffer.from(header, "hex");
          const des = new algorithm.Des();
          des.setKey(key);
          const decipher = new mode.ofb.Decipher(des, iv);
          let decipherData = decipher.transform(buffData, "hex");
          let outputData = Buffer.concat([buffHeader, decipherData]);
          console.log("Cabecera:")
          console.log(buffHeader.toString('hex'));
          console.log("Cabecera + Data")
          console.log(outputData);
          image.bitmap.data = outputData;
          fs.writeFileSync('public/img/'+ originalName +'_dOFB.bmp', outputData); //Save
          return null;
        })
        .catch(err => {
          console.error(err);
        });
      break;
  }
}

//cipher(key, iv, image, algorithmMode);

//decipher(key, iv, image, algorithmMode);

module.exports = {
  cipher,
  decipher
}