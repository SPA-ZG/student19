<template>
    <div>
      <h2>{{ movie.title }}</h2>
      <p :class="getRatingClass">{{ formattedRating }}</p>
      <div class="media-container">
        <img :src="getMoviePosterUrl(movie.poster_path)" :alt="movie.title" />

      </div>
      <p>{{ movie.overview }}</p>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    movie: Object,
    trailerUrl: String,
  })
  
  const getRatingClass = computed(() => {
  const rating = props.movie.vote_average;
  if (rating >= 7) {
    return 'high-rating';
  } else if (rating >= 5) {
    return 'medium-rating';
  } else {
    return 'low-rating';
  }
});
  
  const formattedRating = computed(() => {
  return `Ocjena: ${props.movie.vote_average} / 10`;
});
  
  const getMoviePosterUrl = (posterPath) => {
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
};
  </script>

  <style scoped>
  div {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #ccc8c898;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
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