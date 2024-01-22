import { defineStore } from 'pinia'

export const useTvShowStore = defineStore('tvShow', {
  state: () => ({
    tvShows: []
  }),
  actions: {
    async fetchTvShows() {
      const response = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=6432350038d99019ca71103d18e22f08')
      const data = await response.json()
      this.tvShows = data.results
    }
  }
})