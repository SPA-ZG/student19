<template>
  <MovieCard :movie="movie" :trailerUrl="trailerUrl" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import MovieCard from '../components/MovieCard.vue'

const movie = ref({})
const trailerUrl = ref('') 
const route = useRoute()

const fetchMovieDetails = async () => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${route.params.id}`,
      {
        params: {
          api_key: '6432350038d99019ca71103d18e22f08',
          append_to_response: 'videos'
        }
      }
    )
    movie.value = response.data

    if (response.data.videos && response.data.videos.results.length > 0) {
      const trailer = response.data.videos.results[0]
      trailerUrl.value = `https://www.youtube.com/embed/${trailer.key}`
    }
  } catch (error) {
    console.error('Error fetching movie details:', error)
  }
}







onMounted(() => {
  fetchMovieDetails()
})
</script>


<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ccc8c898; /* light grey background */
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.media-container {
  display: flex;
  gap: 15%;
  flex-direction: row;
  width: 80%; /* Adjust as needed */
  height: auto; /* Adjust as needed */
  margin: auto; /* Center the container */
}

h2 {
  margin-bottom: 5px;
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
  margin-top: 30px;
  text-align: justify;
  line-height: 1.6;
}

.high-rating {
  color: green;
}

.medium-rating {
  color: orange;
}

.low-rating {
  color: red;
}
</style>
