/*
const promise = new Promise((resolve, reject) => { // resolve (devuelve la respuesta esperada ) reject (cuando hubo un errror)
    const number = Math.floor(Math.random() * 12); // Math.floor --> redodear el numero entero menor
    setTimeout( () =>number > 4? //setTimeOut --> forzar un timepo de espera, en este caso serian 2 segundos - if resumido --> number > 4?  es la condicion del if
    resolve(number): reject(new Error('Menor a 4')),// lo que esta dentro del if 
    2000); // primero pasan los dos segundo y despues pasa el if completo 
    });
    promise 
    .then(number => console.log(number)) // si la promesa se resuelve, ejecuto el then --> esto es lo que MUESTRA despues de que paso el RESOLVE
    .catch(error => console.error(error)); // si la promesa no resuelve, ejecuto el catch --> esto es lo que MUESTRA despues de que paso el REJECT
*/



//cuando buscamos una serie o pelicula, es un array de series o peliculas, entonces con el res.search recorro ese array
//cuando buscamos un episodio, es una sola respuesta, entonces accedemos directamente a sus atributos
function buscarPelicula(e)  {
    if (e) {
        e.preventDefault();
      }
    
      // para que no se borre al toque
    const Nombre = document.getElementById("nombre").value; // le doy un ID al nombre del html
    const Opcion = document.getElementById("opcion").value; // le doy un Id al form del html
    const Año = document.getElementById("año").value; // le doy en Id al año del html
    const Temporada = document.getElementById("temporada"); //agarro la temporada
    const Episodio = document.getElementById("episodio"); //agarro el numero de episodio

    /*/
    const Temporada = document.getElementById("temporada").value; // le doy un Id al form del html
    const Espisodio = document.getElementById("espisodio").value; // le doy en Id al año del html
    */

    console.log(Nombre); // para que me muestre el nombre que le escribimos nosotros 
    console.log(Opcion)
    console.log(Año)

    let URL = "hola";

    if (Opcion === "Episodio") {
       URL = 'http://www.omdbapi.com/?apikey=7722b192&t=' + Nombre + '&type=episode' + '&season=' + Temporada.value + '&episode=' + Episodio.value;
    }
    else{
        URL = 'https://www.omdbapi.com/?apikey=7722b192&s=' + Nombre + '&type=' + Opcion + '&y=' + Año;
    }

    fetch(URL) //le agregamos al link lo que queremos buscar, lo encontramos en el cuadrito de OMDB
    .then(res => res.json()) // La respuesta la convierto en JSON 
    .then(res => {
        console.log(res);
        const results = document.getElementById('results');
        results.innerHTML = ''; //establecemos el contenido HTML

        if (Opcion === "Episodio") {
            const fila = document.createElement('tr');
    
            const Titulo = document.createElement('td');
            Titulo.innerText = res.Title;
            fila.appendChild(Titulo);
    
            const AñoPelicula = document.createElement('td');
            AñoPelicula.innerText = res.Year;
            fila.appendChild(AñoPelicula);
    
            const TipoPelicula = document.createElement('td');
            TipoPelicula.innerText = res.Type;
            fila.appendChild(TipoPelicula);
    
            const Actores = document.createElement('td');
            Actores.innerText = res.Actors;
            fila.appendChild(Actores);
    
            const Director = document.createElement('td');
            Director.innerText = res.Director;
            fila.appendChild(Director);
    
            const Trama = document.createElement('td');
            Trama.innerText = res.Plot;
            fila.appendChild(Trama);
    
            results.appendChild(fila);
          } else {        
        if (res.Search) { //verificamos que la busqueda haya encontrado algun resultado
        
            res.Search.forEach(movie => { //
                const fila = document.createElement('tr');
      
                const Titulo = document.createElement('td');
                Titulo.innerText = movie.Title;
                fila.appendChild(Titulo);
      
                const AñoPelicula = document.createElement('td');
                AñoPelicula.innerText = movie.Year;
                fila.appendChild(AñoPelicula);
      
                const TipoPelicula = document.createElement('td');
                TipoPelicula.innerText = movie.Type;
                fila.appendChild(TipoPelicula);

              
                fetch('https://www.omdbapi.com/?apikey=7722b192&i=' + movie.imdbID) //agarra el id de la pelicula desde el JSON
                  .then(res => res.json())
                  .then(res => {

                    const Actores = document.createElement('td');
                    Actores.innerText = res.Actors;
                    fila.appendChild(Actores);
      
                    const Director = document.createElement('td');
                    Director.innerText = res.Director;
                    fila.appendChild(Director);
      
                    const Trama = document.createElement('td');
                    Trama.innerText = res.Plot;
                    fila.appendChild(Trama);


                  })
                  .catch(error=>console.error(error));
      
                results.appendChild(fila);
              });
        }
        else
        {

            const filaA = document.createElement('tr');
            const Mensaje = document.createElement('td');
            Mensaje.colSpan = 6; //alarga el mensaje a las 6 columnas
            Mensaje.innerText = 'No se encontró lo que estabas buscando.';
            filaA.appendChild(Mensaje);
            results.appendChild(filaA);
            

        }
    }
    })
    
    .catch(err => console.error("error", err))

console.log("Fin consulta - fetch")
}


const form = document.querySelector('form'); //va a buscar el formulario
form.addEventListener('submit', buscarPelicula); //del formulario escucha el evento del submit y va a ejecutar la funcion buscarPelicula


//HAY QUE HACER UN FETCH APARTE PARA LAS SERIES
