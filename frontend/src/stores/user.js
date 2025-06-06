import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
// import userData from '@/seeds/user'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)


  console.log(import.meta.env.VITE_API_URL)

  // raccourcis vers les favoris du joueur
  const userFavs = computed(() => user.value.favs)

  // nombre de jeux favoris du joueur
  const userFavsCount = computed(() => user.value.favs.length)

  // liste des catégories des jeux favoris du joueur
  const userFavsGamesGenre = computed(() => {
    const genres = []
    user.value.favs.forEach((fav) => {
      if (!genres.includes(fav.genre)) {
        genres.push(fav.genre)
      }
    })
    return genres
  })

  const getUserById = async (id) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${id}`)
    user.value = response.data
  }

  const updateUser = async (data) => {
    console.log('update user')
    const response = await axios.patch(`${import.meta.env.VITE_API_URL}/users/${user.value.id}`, data)
    user.value = {
      ...response.data
    }
  }

  const addUserFav = async (game) => {
    if(!user.value?.favs) user.value.favs = []
    user.value.favs.push(game)
    await updateUser({favs: user.value.favs})
  }

  // supprimer un jeu des favoris du joueur
  const removeUserFav = async (game) => {
    if(!user.value.favs) return
    user.value.favs = user.value.favs.filter((fav) => fav.id !== game.id)
    await updateUser({favs: user.value.favs})
  }

  // vérifier si un jeu est dans les favoris du joueur
  const isGameInFavs = (game) => {
    if(!user.value?.favs) return false
    return user.value.favs.some((fav) => fav.id === game.id)
  }

  return {
    user,
    userFavs,
    isGameInFavs,
    getUserById,
    updateUser,
    addUserFav,
    userFavsCount,
    userFavsGamesGenre,
    removeUserFav
  }
})
