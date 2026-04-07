window.onload = function () {
  const xhr = new XMLHttpRequest();
  xhr.onload = function () {
    const bodyElement = document.querySelector("body");
    if (xhr.status == 200) {
      const movies = JSON.parse(xhr.responseText);
      for (const movie of movies) {
        /* Task 1.3. Add your code from exercise 1 here
           and include a non-functional 'Edit' button
           to pass this test */
        const movieCard = document.createElement("div");
        movieCard.className = "movie-card";
        movieCard.id = movie.imdbID;

        movieCard.innerHTML = `
          <img src="${movie.poster}" alt="${movie.title}">
          <h2>${movie.title}</h2>
          <p>${movie.year}</p>
          <button onclick="location.href='edit.html?imdbID=${movie.imdbID}'">Edit</button>
        `;

        bodyElement.appendChild(movieCard);
      }

    } else {
      bodyElement.append(
          "Daten konnten nicht geladen werden, Status " +
          xhr.status +
          " - " +
          xhr.statusText
      );
    }
  };
  xhr.open("GET", "/movies");
  xhr.send();
};
