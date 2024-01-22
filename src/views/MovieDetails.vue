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

