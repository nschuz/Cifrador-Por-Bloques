let checkOption = (select) => { //Funcion que valida visualmente los alfabetos
  document.getElementById("textarea__custom--alphabet").setAttribute("readonly", "");
  document.getElementById("button_random--generate").setAttribute("style", "cursor: not-allowed;");
  document.getElementById("button__random--alphabet").setAttribute("disabled", "");
  if(select.value === "Custom") {
    document.getElementById("textarea__custom--alphabet").removeAttribute("readonly");
  } else if(select.value === "Random"){
    document.getElementById("button_random--generate").removeAttribute("style");
    document.getElementById("button__random--alphabet").removeAttribute("disabled");
  }
}


let getGCD = () => { //Funcion algoritmo de euclides
  let a = document.getElementById("alpha").value;
  let b = document.getElementById("beta").value;
  if(a === "" || b === "") return alert("Ingresa los valores de a y n");
  let iaux; //auxiliar
  let biggerNumber = Math.max(a, b);
  let smallestNumber = Math.min(a, b);
  do {
    iaux = smallestNumber;
    smallestNumber = biggerNumber % smallestNumber;
    biggerNumber = iaux;
  } while (smallestNumber !== 0);
  if(biggerNumber === 1) {
    euclidesExt(a,b);
  } else{
    document.getElementById("gcd").innerHTML = `The GCD of (${a},${b}) = ${biggerNumber}`;
  }
}

function euclidesExt(valor1, valor2) { //Algoritmo de euclides extendido
  let z;
  let x = parseInt(valor1);
  let y = parseInt(valor2);
  let gx = y;
  let gy = x;
  let a = 0, b = 1;
  let a1 = 1, a2 = 0;
  let b1 = 0, b2 = 1;
  let q, r, mcd, sv, cadena;

  if (x < y) {
    z = x;
    x = y;
    y = z;
  }
  while (y !== 0) {
    q = Math.floor(x / y);
    r = x % y;
    x = y;
    y = r;
    if (r !== 0) {
      a = a1 - q * a2;
      b = b1 - q * b2;
      a1 = a2;
      b1 = b2;
      a2 = a;
      b2 = b;
    }
  }

  mcd = x;
  console.log("mcd:" + mcd)
  document.getElementById("gcd").innerHTML = `The GCD of (${valor1},${valor2}) = <b>${mcd}</b>`;
  sv = b;
  if (a < 0) a = "(" + a + ")";
  if (b < 0) b = "(" + b + ")";
  console.log("gx: "+ gx + " gy: "+ gy)
  cadena = `${mcd} = ${a}*${gx} + ${b}*${gy}`;
  console.log("Cadena: "+ cadena)
  document.getElementById("expresion").innerHTML = `Is expressed as: <b>${cadena}</b>`;
  if (sv < 0) sv = gx + sv;
  if (mcd === 1) {
    console.log("El inverso multiplicativo de "+ y + " modulo " + x + " es: "+ sv)
    document.getElementById("inverso").innerHTML = "The multiplicative inverse of "+ valor1 + " module " + valor2 + " is: <b>"+ sv + "</b>";
  }
  else {
    console.log("El inverso multiplicativo de "+ y + " modulo " + x + " es: "+ "No existe")
    document.getElementById("inverso").innerHTML = "The multiplicative inverse of "+ valor1 + " module " + valor2 + "<b>does not exist.</b>";
  }
}

let setRandomAlphabet = (select) => { //Funcion que genera un alfabeto random
  document.getElementById("textarea__random--alphabet").value = generateRandomAlphabet();
}


let generateRandomAlphabet = (characters = 'abcdefghijklmnopqrstuvwxyz0123456789', length = Math.random() * (36 - 20) + 20) => { //Funcion que genera un alfabeto random
  //length = Math.random() * (36 - 20) + 20;
  var result           = '';
  //var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  let aux;
  for ( var i = 0; i < length; i++ ) {
    aux = characters.charAt(Math.floor(Math.random() * charactersLength)).toLowerCase();
    if(!result.includes(aux)) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  }
  console.log(result);
  return result;
}

let generateRandomKey = () => { //Funcion que genera una llave random respecto al alfabeto
  let alfabeto = document.getElementById("select__alphabet").value;
  let result;
  switch (alfabeto){
    case 'English alphabet (26 chars)':
      result = generateRandomAlphabet("abcdefghijklmnopqrstuvwxyz", Math.random() * (8 - 1) + 1);
      break;
    case 'Spanish alphabet (27 chars)':
      result = generateRandomAlphabet("abcdefghijklmnñopqrstuvwxyz", Math.random() * (8 - 1) + 1);
      break;
    case 'Symbols (¡!¿?{}&)':
      result = generateRandomAlphabet("¡!¿?{}&", Math.random() * (6 - 1) + 1);
      break;
    case 'Letters (A-L)':
      result = generateRandomAlphabet("abcdefghijkl", Math.random() * (8 - 1) + 1);
      break;
    case 'Digits (0-9)':
      result = generateRandomAlphabet("0123456789", Math.random() * (6 - 1) + 1);
      break;
    case 'English alphabet and symbols (A-Z -+*)':
      result = generateRandomAlphabet("abcdefghijklmnopqrstuvwxyz-+*", Math.random() * (6 - 1) + 1);
      break;
    case 'Ascii code':
      result = generateRandomAlphabet("?@ABCDEFGHIJKLMNOPQRSTUVWXYZ☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ ", Math.random() * (12 - 1) + 1);
      break;
    case 'Custom':
      let customAlphabet = document.getElementById('textarea__custom--alphabet').value;
      result = generateRandomAlphabet(customAlphabet, Math.random() * (customAlphabet.length-1 - 1) + 1);
      break;
    case 'Random':
      let randomAlphabet = document.getElementById('textarea__random--alphabet').value;
      result = generateRandomAlphabet(randomAlphabet, Math.random() * (randomAlphabet.length-1 - 1) + 1);
      break;
  }
  document.getElementById('textarea__key').value = result;
}

let generateOutputVigenere = () => { //Cifrado vigenere
  //Obtenemos el alfabeto
  let optionAlphabet = document.getElementById("select__alphabet").value;
  let alphabet;
  if(optionAlphabet === "Custom"){
    alphabet = document.getElementById("textarea__custom--alphabet").value;
  } else if(optionAlphabet === "Random"){
    alphabet = document.getElementById("textarea__random--alphabet").value;
  } else{
    alphabet = optionAlphabet;
  }
  console.log(alphabet);

  //Obtenemos la llave

  let key = document.getElementById("textarea__key").value;
  console.log(key);

  //Obtenemos el contenido a cifrar
  let phrase = document.getElementById("textarea__plaintext").value;
  phrase = phrase.toLowerCase();
  console.log(phrase);

  //Una vez obtenido eso, validamos y ciframos

  if(alphabet !== "" || key !== null || phrase !== null){

    let operation = document.getElementById("select__option").value;
    operation = operation.toLowerCase();

    if(operation === "cipher"){
      let textCipher = cipher(key, phrase, alphabet);
      let output = document.getElementById("textarea__output");
      output.value = textCipher.toUpperCase();
      console.log(textCipher);
    }
    else if(operation === "decipher"){
      let textDecipher = decipher(key, phrase, alphabet);
      document.getElementById("textarea__output").value = textDecipher;
      console.log(textDecipher);
    }
  }
}

function isalpha(str, alphabet) { //Funcion que checa si la llave esta en el alfabeto
  switch (alphabet) {
    case 'Ascii code': return true;
    case 'Digits (0-9)': return (/^[0-9]+$/).test(str);
    case 'Letters (A-L)': return (/^[A-La-l]+$/).test(str);
    case 'English alphabet (26 chars)': return (/^[a-zA-Z]+$/).test(str);
    case 'Spanish alphabet (27 chars)': return (/^[a-zñÑA-Z]+$/).test(str);
    case 'English alphabet and symbols (A-Z -+*)': return (/^[a-z-+*A-Z]+$/).test(str);
    case 'Symbols (¡!¿?{}&)': return (/^[!¡¿?{}&]+$/).test(str);
    default:
      if(alphabet.indexOf(str) === -1) return false;
      else return true;
  }
}

function process(key, phrase, alphabet, flag = 1) { //Funcion para cifrar o decifrar vigerene
  // check if arguments are correct
  /*if (typeof key !== 'string' || typeof phrase !== 'string' || typeof alphabet !== 'string') {
    throw new Error('vignere: key, phrase and alphabet must be strings');
  }*/

  // throw error if key is not valid
  for(let i = 0; i<key.length; i++) {
    if (!isalpha(key[i], alphabet)) {
    
      imprimirAlerta("Inserte una llave correcta" , "error");
      throw new Error('vignere: the characters of the key are not defined in the alphabet');
    }
  }
  // pass key key all to lower case
  key = key.toLowerCase();

  const phraseLength = phrase.length;
  const keyLength = key.length;

  let newAlphabet = "";
  switch (alphabet) {
    case 'Ascii code':
      newAlphabet = "?@ABCDEFGHIJKLMNOPQRSTUVWXYZ☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜø£Ø×ƒáíóúñÑªº¿®¬½¼¡«»░▒▓│┤ÁÂÀ©╣║╗╝¢¥┐└┴┬├─┼ãÃ╚╔╩╦╠═╬¤ðÐÊËÈıÍÎÏ┘┌█▄¦Ì▀ÓßÔÒõÕµþÞÚÛÙýÝ¯´­±‗¾¶§÷¸°¨·¹³²■ ";
      break;
    case 'Digits (0-9)':
      newAlphabet = "0123456789";
      break;
    case 'Letters (A-L)':
      newAlphabet = "ABCDEFGHIJKL";
      break;
    case 'English alphabet (26 chars)':
      newAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      break;
    case 'Spanish alphabet (27 chars)':
      newAlphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
      break;
    case 'English alphabet and symbols (A-Z -+*)':
      newAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ-+*";
      break;
    case 'Symbols (¡!¿?{}&)':
      newAlphabet = "¡!¿?{}&";
      break;
    default:
      newAlphabet = alphabet;
      break;
  }
  const lowerReference = newAlphabet.toLowerCase();
  const upperReference = newAlphabet.toUpperCase();

  let i = 0,
    wi = 0,
    ci,
    pos,
    result = '';

  for (; i < phraseLength; i++) {
    pos = phrase[i]; //pos = a cada letra de nuestras palabras
    if (isalpha(pos, alphabet)) { //Si la letra se encuentra en el alfabeto
      if (flag > 0) { // Cifrar
        //Obtenemos la posicion de la letra con nuestro alfabeto y le sumamos la posicion de la llave
        ci = lowerReference.indexOf(pos.toLowerCase()) + lowerReference.indexOf(key[wi]);
      } else { //Decifrar
        ci = lowerReference.indexOf(pos.toLowerCase()) - lowerReference.indexOf(key[wi]);
        ci = ci < 0 ? newAlphabet.length + ci : ci;
      }
      //Si el numero excede la longitud del alfabeto obtenemos su modulo
      ci %= newAlphabet.length;
      // take cipher from lower or upper reference
      result = lowerReference.indexOf(pos) === -1 ? result + upperReference[ci] : result + lowerReference[ci];
      // reset key index when it exceeds key length
      wi = wi + 1 === keyLength ? 0 : wi + 1;
    } else { //Si no esta en el alfabeto no se va a cifrar
      result += pos;
    }
  }
  return result;
}

function cipher(w, p, alphabet) {
  return process(w, p, alphabet);
}

function decipher(w, p, alphabet) {
  return process(w, p, alphabet, -1);
}




async function affine(operation, a, b, word) {
  if( (typeof a !== 'number') || (typeof b !== 'number') ) return new Error("a y b deben ser números enteros")
  if(typeof operation !== 'string' || typeof word !== 'string') return new Error("Operacion y word deben ser strings")
  // If a and m are coprimes
  if(gcdCalc(a, 26) !== 1) return new Error("a " + a + " and m 26 are not coprimes");

  if (operation === "encrypt") {
    let wordencrypted = await encryptWord(word, a, b);
    console.log("palabra cifrada: "+ wordencrypted);
  } else if (operation === "decrypt") {
    let worddecipher = decryptWord(word, a, b);
    console.log("palabra decifrada: "+ worddecipher);
  } else {
    console.log("Invalid operation specified. Use encrypt or decrypt.");
    return;
  }

}

function gcdCalc(a, b) { //Calcula el mcd
  if (b) {
    return gcdCalc(b, a % b);
  } else {
    return Math.abs(a);
  }
}

function encryptWord(word, a, b, alphabet){ //Funcion que cifra affine
  var encryptedWord = [];
  var chars = word.split("");
  var currInt = 0;
  var currEnc = "";
  chars.forEach( function( currChar){
    currInt = parseInt(currChar, 36) - 10;
    // E(a,b)(n) = an + b mod 26
    currEnc = mod((a * currInt + b), alphabet.length);
    encryptedWord.push(String.fromCharCode(97 + currEnc));
  });
  return encryptedWord.join("");
}

function decryptWord(word, a, b, alphabet){ //Funcion que descifra affine
  var decryptedWord = [];
  var chars = word.split("");
  var currInt = 0;
  var currEnc = "";
  //a^-1 = m - a
  var a_1 = alphabet.length - a;
  chars.forEach( function( currChar){
    currInt = parseInt(currChar, 36) - 10;
    // D(y) = a^-1 * (y - b) mod 26
    currEnc = mod((a_1 * (currInt - b)), alphabet.length);
    decryptedWord.push(String.fromCharCode(97 + currEnc));
  });
  return decryptedWord.join("");
}

function mod(n, m) {
  var remain = n % m;
  return Math.floor(remain >= 0 ? remain : remain + m);
}


//Leer txt
function leerArchivo(e) { //Funcion que lee archivos
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    mostrarContenido(contenido);
  };
  lector.readAsText(archivo);
}

function mostrarContenido(contenido) { //Funcion para mostrar el contenido
  var elemento = document.getElementById('textarea__plaintext');
  elemento.innerHTML = contenido;
}



function leerArchivo2(e) { //Funcion para leer archivos
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    mostrarContenido2(contenido);
  };
  lector.readAsText(archivo);
}

function mostrarContenido2(contenido) {
  var elemento = document.getElementById('affine_textarea');
  elemento.innerHTML = contenido;
}


function leerArchivo3(e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    mostrarContenido3(contenido);
  };
  lector.readAsText(archivo);
}

function mostrarContenido3(contenido) {
  var elemento = document.getElementById('affine_textarea2');
  elemento.innerHTML = contenido;
}

document.getElementById('file_plain')
.addEventListener('change', leerArchivo, false);

document.getElementById('affine_input')
.addEventListener('change', leerArchivo2, false);

document.getElementById('affine_input2')
.addEventListener('change', leerArchivo3, false);


//imprimir alerta 
function  imprimirAlerta(mesanje , id){

  //Crea div
  const divMensaje = document.createElement('div');
  divMensaje.classList.add('text-center' , 'alert');

  //Agregar clase en base al tipo de error 
  if(id==='error'){
      divMensaje.classList.add('alert-danger');
  }else{
      divMensaje.classList.add('alert-succes');
  }

  //insertamos x mensaje 
  divMensaje.textContent=mesanje;

  //agregar al dom 
  //document.querySelector('alert-bar').appendChild(divMensaje);
  //vdocument.querySelector('#contenido').insertBefore(divMensaje , document.querySelector('.agregar-cita'));
  document.querySelector('#alert-bar').appendChild(divMensaje);
  //quitar la alerta despues de 10s
  setTimeout(() => {
      divMensaje.remove();
  }, 5000);
}

