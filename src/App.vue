<template>
  <div>
    <header>
      <div class="navbar">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/search">Search</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue'
import axios from 'axios'
import { RouterLink, RouterView } from 'vue-router'

const movies = ref([])

const fetchMovies = async () => {
  try {
    const response = await axios.get(
      'https://api.themoviedb.org/3/discover/movie',
      {
        params: {
          api_key: '6432350038d99019ca71103d18e22f08'
        }
      }
    )
    movies.value = response.data.results
  } catch (error) {
    console.error('Error fetching movies:', error)
  }
}

const getMoviePosterUrl = (posterPath) => {
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
};

provide('movies', movies)
provide('getMoviePosterUrl', getMoviePosterUrl)

onMounted(() => {
  fetchMovies()
})
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 2em;
}

img {
  width: 300px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

p {
  margin-top: 20px;
  text-align: justify;
  line-height: 1.6;
}


.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  overflow: hidden;
  font-family: Arial, sans-serif;
}

.navbar a {
  color: #f2f2f2;
  text-align: center;
  padding: 7px 7px;
  text-decoration: none;
}

.navbar a:hover {
  background-color: #ddd;
  color: black;
}

.navbar a.active {
  background-color: #4CAF50;
  color: white;
}
</style>