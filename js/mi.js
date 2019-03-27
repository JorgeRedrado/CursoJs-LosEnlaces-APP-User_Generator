// 1) Variables
const boton = $("#boton");
const numero = $("#numero");
const contenido = $("#contenido");
const numerousuarios = $("#numerousuarios");
const busqueda = $("#busqueda");
let listadousuarios = [];
let listadonombres = [];

// 2) Funciones
const MostrarUsuarios = () => {
  let indices = [];
  listadonombres.forEach((usuario, index) => {
    if (usuario.search(busqueda.val()) != -1) {
      indices.push(index);
    }
  });
  console.log(indices);
  let micontenido = "";
  for (let i = 0; i < data.results.length; i++) {
    let nombre = `${listadousuarios[indices[i]].name.title}.
     ${listadousuarios[indices[i]].name.first} 
     ${listadousuarios[indices[i]].name.last}`;
    let rutaimagen = listadousuarios[indices[i]].picture.large;
    micontenido +=
      /*html*/
      `<div class="d-inline">
      <figure class="figure">
      <img src="${rutaimagen}" class="figure-img img-fluid rounded-circle" alt="${nombre}">
      <figcaption class="figure-caption text-center">${nombre}</figcaption>
      </figure>
      </div>
    `;
  }
  $("#contenido").fadeOut("fast", function() {
    $(this)
      .fadeIn("fast")
      .html(micontenido);
  });
};

const LlamarAPI = miurl => {
  $.ajax({
    url: miurl,
    dataType: "json",
    success: function(data) {
      console.log(data.results);
      listadousuarios = data.results;
      numerousuarios.val(listadousuarios.length);
      listadonombres = [];
      listadousuarios.forEach(usuario => {
        listadonombres.push(usuario.name.first + " " + usuario.name.last);
      });
      console.log(listadonombres);
      $("#busqueda").autocomplete({
        source: listadonombres
      });
    },
    error: function() {
      console.log("Ha habido un error ...");
      alert("Ha habido un error en la llamada a la API ...");
    }
  });
};

const PrepararURL = e => {
  e.preventDefault();
  //console.log(e);
  let miurl;
  if (e.target.id === "boton") {
    let n = numero.val();
    miurl =
      "https://randomuser.me/api/?nat=es&inc=gender,name,nat,picture&results=" +
      n;
  }
  LlamarAPI(miurl);
};
const Inicializar = () => {
  numerousuarios.val(listadousuarios.length);
};

// 3) Eventos
/* $("#boton").click(function(e) {
  e.preventDefault();
  LlamarAPI();
}); */
boton.on("click", LlamarAPI, PrepararURL);
$(Inicializar);
busqueda.on("keyup", MostrarUsuarios);
