<template>
    <div>
      <h1>{{ show.name }}</h1>
      <img :src="getShowPosterUrl(show.poster_path)" :alt="show.name" />
      <p>First Air Date: {{ show.first_air_date }}</p>
      <p>Rating: {{ show.vote_average }}</p>
      <p>{{ show.overview }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useTvShowStore } from '../stores/tvShowsStore'
  
  const route = useRoute()
  const tvShowStore = useTvShowStore()
  const show = ref({})
  
  onMounted(async () => {
    await tvShowStore.fetchTvShows()
    show.value = tvShowStore.tvShows.find(tvShow => tvShow.id === Number(route.params.id))
  })
  
  const getShowPosterUrl = (posterPath) => {
    if(posterPath === null) return `https://image.tmdb.org/t/p/w500/v9nGSRx5lFz6KEgfmgHJMSgaARC.jpg`
    return `https://image.tmdb.org/t/p/w500${posterPath}`
  }
  </script>