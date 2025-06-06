import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useFactureStore = defineStore('facture', () => {
  const factures = ref([])
  const facture = ref(null)
  const error = ref(null)

  const getAllFactures = async () => {
    error.value = null
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/factures`)
      factures.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des factures'
      console.error('Erreur getAllFactures:', err)
    }
  }

  const getFactureById = async (id) => {
    error.value = null
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/factures/${id}`)
      facture.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement de la facture'
      console.error('Erreur getFactureById:', err)
    }
  }

  const createFacture = async (factureData) => {
    error.value = null
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/factures`, factureData)
      factures.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la création de la facture'
      console.error('Erreur createFacture:', err)
    }
  }

  const updateFacture = async (id, factureData) => {
    error.value = null
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/factures/${id}`, factureData)
      const index = factures.value.findIndex(f => f.id == id)
      if (index !== -1) {
        factures.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la modification de la facture'
      console.error('Erreur updateFacture:', err)
    }
  }

  const deleteFacture = async (id) => {
    error.value = null
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/factures/${id}`)
      factures.value = factures.value.filter(f => f.id != id)
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la suppression de la facture'
      console.error('Erreur deleteFacture:', err)
      throw err
    }
  }

  return {
    factures,
    facture,
    error,
    getAllFactures,
    getFactureById,
    createFacture,
    updateFacture,
    deleteFacture
  }
})
