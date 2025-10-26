import { BASE_URL, authorization, ENDPOINTS } from './info.js';

const movieList = document.getElementById('movieList')
const template = document.getElementById('movieTemplate')

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: authorization
  }
};

async function fetchMovies(type){
  try{
    const response = await fetch(BASE_URL + ENDPOINTS[type], options);
    const data = await response.json();
    renderMovies(data.results);
  } catch (error){
    console.error('Error fetching the movies', error);
  }
}

// let movies = data.results;  // happens internally
// then the function runs using that movies variable

function renderMovies(movies) {
  movieList.innerHTML = '';
  const fragment = document.createDocumentFragment();

  movies.forEach(movie => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.title').textContent = movie.title;
    clone.querySelector('.overview').textContent = movie.overview;
    clone.querySelector('.otitle').innerHTML += movie.original_title;
    clone.querySelector('.release-date').innerHTML += movie.release_date;
    clone.querySelector('img').src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
    clone.querySelector('img').alt = movie.title;
    fragment.appendChild(clone);
  });

  movieList.appendChild(fragment)
}

const sectionTitle = document.querySelector('main h2');
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();

    // 1️⃣ Change the section title
    sectionTitle.textContent = link.textContent;

    // 2️⃣ Fetch movies based on data-type
    fetchMovies(link.dataset.type);

    // 3️⃣ Toggle the active-link class
    navLinks.forEach(l => l.classList.remove('active-link')); // remove from all
    link.classList.add('active-link'); // add to clicked link
  });
});

fetchMovies('NOW_PLAYING');


// renderMovies = mailbox function
// movies = the letter inside
// data.results = what you drop in the mailbox