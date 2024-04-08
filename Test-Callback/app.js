const btn = document.getElementById('btn');
const title = document.getElementById("tittle");
const input = document.getElementById("textInput");
const container = document.getElementById("container");


window.addEventListener("load", () => {
  //alert("la ventana termino de cargar");
});


btn.addEventListener('click', function() {
  // document.getElementById('titulo').innerHTML = "<h1>Cambio el titulo</h1>";
  // title.innerText = "cambio el titulo";
  const inputValue = input.value;
  container.innerText = inputValue;
  
})

btn.addEventListener('dblclick', () =>{
    fetch('/info.json')
    .then((responce) => {
        console.log(responce);
        return responce.json();
    }).then((text) =>{
        console.log(text);
    })
})