<template>
  <main>
    <h2>Search Movies</h2>
    <input v-model="query" @input="searchMovies" placeholder="Search for a movie..." />
    <ul v-if="results.length > 0">
      <li v-for="movie in results" :key="movie.id">
        <RouterLink :to="{ name: 'MovieDetails', params: { id: movie.id } }">
          <img :src="getMoviePosterUrl(movie.poster_path)" :alt="movie.title" />
          <p>{{ movie.title }}</p>
          <p>{{ getReleaseYear(movie.release_date) }}</p>
          <p>&#9733; {{ movie.vote_average }}</p>
        </RouterLink>
      </li>
    </ul>
  </main>
</template>

<script setup>
import { ref, inject } from 'vue'
import axios from 'axios'

const query = ref('')
const results = ref([])
const getMoviePosterUrl = inject('getMoviePosterUrl')

const searchMovies = async () => {
  if (query.value) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          api_key: '6432350038d99019ca71103d18e22f08',
          query: query.value
        }
      }
    )
    results.value = response.data.results
  } else {
    results.value = []
  }
}

const getReleaseYear = releaseDate => {
  if (releaseDate) {
    const year = new Date(releaseDate).getFullYear();
    return year;
  }
  return 'N/A';
}
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  list-style: none;
}

li {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  margin: 15px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

li img {
  width: 100%;
  height: auto;
  border-radius: 5px;
}

li p {
  margin: 10px 0 0;
  text-align: center;
}
</style>
