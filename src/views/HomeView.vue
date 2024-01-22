<script setup>
import { inject, onMounted , ref, watch} from 'vue'
import { useTvShowStore } from '../stores/tvShowsStore'

const movies = inject('movies')
const getMoviePosterUrl = inject('getMoviePosterUrl')
const tvShowStore = useTvShowStore()
const selectedShows = ref([])

const getReleaseYear = releaseDate => {
  if (releaseDate) {
    const year = new Date(releaseDate).getFullYear();
    return year;
  }
  return 'N/A';
}

onMounted(async () => {

  const savedWatchlist = localStorage.getItem('watchlist')
  if (savedWatchlist) {
    selectedShows.value = JSON.parse(savedWatchlist)
  }

  await tvShowStore.fetchTvShows()
})

const emit = defineEmits(['showSelected'])

const selectShow = (show) => {
  selectedShows.value.push(show)
  emit('showSelected', show)
  localStorage.setItem('watchlist', JSON.stringify(selectedShows.value))
}

watch(selectedShows, (newShows) => {
  localStorage.setItem('watchlist', JSON.stringify(newShows))
})

const removeShow = (show) => {
  selectedShows.value = selectedShows.value.filter(s => s.id !== show.id)
  localStorage.setItem('watchlist', JSON.stringify(selectedShows.value))
}
</script>

<template>
  <main>
    <div v-if="movies.length > 0">
      <h2>Movies</h2>
      <ul>
        <li v-for="movie in movies" :key="movie.id">
          <RouterLink :to="{ name: 'MovieDetails', params: { id: movie.id } }">
            <img :src="getMoviePosterUrl(movie.poster_path)" :alt="movie.title" />
            <p>{{ movie.title }}</p>
            <p>{{ getReleaseYear(movie.release_date) }}</p>
            <p>&#9733; {{ movie.vote_average }}</p>
          </RouterLink>
          <div class="button-container">
  <button class="add-button" @click="selectShow(movie)">Add to Watchlist</button>
</div>
        </li>
      </ul>
    </div>
    <div v-if="tvShowStore.tvShows.length > 0">
      <h2>TV Shows</h2>
      <ul>
        <li v-for="show in tvShowStore.tvShows" :key="show.id">
          
          <RouterLink :to="{ name: 'ShowDetails', params: { id: show.id } }">
            <img :src="getMoviePosterUrl(show.poster_path)" :alt="show.name" />
            <p>{{ show.name }}</p>
            <p>{{ getReleaseYear(show.first_air_date) }}</p>
            <p>&#9733; {{ show.vote_average }}</p>
          </RouterLink>
          <div class="button-container">
  <button class="add-button" @click="selectShow(show)">Add to Watchlist</button>
</div>
        </li>
      </ul>
    </div> 
    <div v-if="selectedShows.length > 0">
      <h2>Watchlist</h2>
      <ul>
        <li v-for="show in selectedShows" :key="show.id">
          
          <img :src="getMoviePosterUrl(show.poster_path)" :alt="show.name" />
          <div class="button-container">
          <button class="remove-button" @click="removeShow(show)">Remove</button>
        </div>

        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

li {
  width: 200px;
  margin: 15px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  overflow: hidden;
}

li:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.5);
}

img {
  width: 100%;
  height: auto;
}

p {
  text-align: center;
  padding: 10px;
  font-size: 18px;
}
/* Wrap the button in a container */
.button-container {
  display: flex;
  justify-content: center;
}

.add-button {
  background-color: #2d442e;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #000000;
}

.remove-button {
  background-color: #b91111;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #000000;
}
</style>