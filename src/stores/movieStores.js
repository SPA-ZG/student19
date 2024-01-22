import { defineStore } from 'pinia'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: []
  }),
  actions: {
    async fetchMovies() {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY')
      const data = await response.json()
      this.movies = data.results
    }
  }
})