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

const queryString = window.location.search;
console.log(queryString);

const urlParams = new URLSearchParams(queryString);
console.log(urlParams.get('imagen'));

let imagen = document.getElementById('img__output');
imagen.src = urlParams.get('imagen');

let downloadImage = document.getElementById('button__download');
downloadImage.href = urlParams.get('imagen');

if(urlParams.get('imagen') !== null){
  let pDownload = document.getElementById('p__download');
  pDownload.hidden = false;
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#img__input')
        .attr('src', e.target.result)
        .width(300)
        .height(250);
    };
    reader.readAsDataURL(input.files[0]);
  }
}




