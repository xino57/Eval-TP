import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useGameStore = defineStore('game', () => {

  const games = ref([])
  const game = ref(null)

  const gamesCount = computed(() => {
    return games.value?.length || 0
  })

  const gameStatsByGenre = computed(() => {
    const stats = []
    const genres = {}
    games.value.forEach((game) => {
      if (!genres[game.genre]) {
        genres[game.genre] = 1
      } else {
        genres[game.genre]++
      }
    })
    for (const genre in genres) {
      stats.push({
        name: genre,
        value: genres[genre],
      })
    }
    stats.sort((a, b) => b.value - a.value)
    return stats
  })

  const getAllGames = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/games`)
      games.value = response.data
    } catch (error) {
      console.error('Erreur lors du chargement des jeux:', error)
      games.value = []
    }
  }

  const getGameById = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/games/${id}`)
      game.value = response.data
    } catch (error) {
      console.error('Erreur lors du chargement du jeu:', error)
      game.value = null
    }
  }

  return {
    games,
    game,
    gamesCount,
    gameStatsByGenre,
    getAllGames,    
    getGameById,    
  }
})
