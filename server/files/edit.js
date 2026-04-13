/** * Hilfsfunktion: Füllt das Formular mit Daten vom Server
 */
function setMovie(movie) {
  // Diese Zeilen löschen das Rätselraten - wir sagen genau, was wohin soll:
  document.getElementById('imdbID').value = movie.imdbID || "";
  document.getElementById('Title').value = movie.Title || "";
  document.getElementById('Year').value = movie.Year || "";
  document.getElementById('Plot').value = movie.Plot || "";
  document.getElementById('Poster').value = movie.Poster || "";

  const genreSelect = document.getElementById('Genres');
  if (movie.Genres && Array.isArray(movie.Genres)) {
    for (const option of genreSelect.options) {
      option.selected = movie.Genres.includes(option.value);
    }
  }
}
/** * აქ გროვდება ყველა ინფორმაცია ფორმულარიდან
 */
function getMovie() {
  const movie = {};
  const elements = Array.from(document.forms[0].elements).filter(
      (element) => element.id,
  );

  for (const element of elements) {
    const name = element.id;
    let value;

    if (name === "Genres") {
      value = [];
      const options = element.options;
      for (let index = 0; index < options.length; index++) {
        const option = options[index];
        if (option.selected) {
          value.push(option.value);
        }
      }
    } else if (name === "Metascore" || name === "Runtime" || name === "imdbRating") {
      value = Number(element.value);
    } else if (name === "Actors" || name === "Directors" || name === "Writers") {
      value = element.value.split(",").map((item) => item.trim());
    } else {
      value = element.value;
    }
    movie[name] = value;
  }
  return movie;
}

/** * Task 3.3:
 */
function putMovie() {
  const movie = getMovie();
  const id = movie.imdbID;
  const imdbID = new URLSearchParams(window.location.search).get("imdbID");
  const updatedMovie = getMovie();

  const saveXhr = new XMLHttpRequest();
  saveXhr.open("PUT", "/movies/" + id);
  saveXhr.setRequestHeader("Content-Type", "application/json");

  saveXhr.onload = function () {
    if (saveXhr.status === 200 || saveXhr.status === 204) {
      // Bei Erfolg zurück zur Startseite
      location.href = "index.html";
    } else {
      alert("Saving of movie data failed. Status code was " + saveXhr.status);
    }
  };

  saveXhr.send(JSON.stringify(movie));
}

const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get("imdbID");

if (imdbID) {
  const loadXhr = new XMLHttpRequest();
  loadXhr.open("GET", "/movies/" + imdbID);
  loadXhr.onload = function () {
    if (loadXhr.status === 200) {
      const movieData = JSON.parse(loadXhr.responseText);
      setMovie(movieData);
    } else {
      alert("Loading of movie data failed. Status: " + loadXhr.status);
    }
  };
  loadXhr.send();
}