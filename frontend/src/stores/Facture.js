import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useFactureStore = defineStore('facture', () => {
  const factures = ref([])
  const facture = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // READ - Récupérer toutes les factures
  const getAllFactures = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/factures`)
      factures.value = response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement des factures'
      console.error('Erreur getAllFactures:', err)
    } finally {
      loading.value = false
    }
  }

  // READ - Récupérer une facture par ID
  const getFactureById = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/factures/${id}`)
      facture.value = response.data
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors du chargement de la facture'
      console.error('Erreur getFactureById:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // CREATE - Créer une nouvelle facture
  const createFacture = async (factureData) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/factures`, factureData)
      factures.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la création de la facture'
      console.error('Erreur createFacture:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // UPDATE - Modifier une facture existante
  const updateFacture = async (id, factureData) => {
    loading.value = true
    error.value = null
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/factures/${id}`, factureData)
      
      // Mettre à jour la facture dans la liste
      const index = factures.value.findIndex(f => f.id == id)
      if (index !== -1) {
        factures.value[index] = response.data
      }
      
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la modification de la facture'
      console.error('Erreur updateFacture:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // DELETE - Supprimer une facture
  const deleteFacture = async (id) => {
    loading.value = true
    error.value = null
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/factures/${id}`)
      
      // Retirer la facture de la liste
      factures.value = factures.value.filter(f => f.id != id)
      
      return true
    } catch (err) {
      error.value = err.response?.data?.message || 'Erreur lors de la suppression de la facture'
      console.error('Erreur deleteFacture:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    factures,
    facture,
    loading,
    error,
    getAllFactures,
    getFactureById,
    createFacture,
    updateFacture,
    deleteFacture
  }
})
