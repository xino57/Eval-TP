<template>
  <div class="container pt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-header bg-success text-white">
            <h4 class="mb-0">
              <i class="fas fa-plus me-2"></i>Nouvelle Facture
            </h4>
          </div>
          
          <div class="card-body">
            <form @submit.prevent="createFacture">
            
              <div class="mb-3">
                <label for="description" class="form-label">Description *</label>
                <textarea
                  id="description"
                  v-model="description"
                  class="form-control"
                  rows="3"
                  placeholder="Description de la facture..."
                  required
                ></textarea>
              </div>

       
              <div class="mb-3">
                <label for="montantHT" class="form-label">Montant HT *</label>
                <div class="input-group">
                  <input
                    id="montantHT"
                    v-model.number="montantHT"
                    type="number"
                    step="0.01"
                    min="0"
                    class="form-control"
                    placeholder="0.00"
                    required
                  />
                  <span class="input-group-text">€</span>
                </div>
              </div>

        
              <div class="mb-3">
                <label for="montantTTC" class="form-label">Montant TTC *</label>
                <div class="input-group">
                  <input
                    id="montantTTC"
                    v-model.number="montantTTC"
                    type="number"
                    step="0.01"
                    min="0"
                    class="form-control"
                    placeholder="0.00"
                    required
                  />
                  <span class="input-group-text">€</span>
                </div>
              </div>

           
              <div class="d-flex gap-2 justify-content-end">
                <button 
                  type="button" 
                  class="btn btn-secondary"
                  @click="$router.push('/factures')"
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  class="btn btn-success"
                  :disabled="loading"
                >
                  <span v-if="loading">
                    <div class="spinner-border spinner-border-sm me-2"></div>
                    Création...
                  </span>
                  <span v-else>
                    <i class="fas fa-save me-1"></i>Créer
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useFactureStore } from '@/stores/Facture'

const router = useRouter()
const factureStore = useFactureStore()

const description = ref('')
const montantHT = ref(0)
const montantTTC = ref(0)
const loading = ref(false)


const createFacture = async () => {
  loading.value = true
  
  try {
    await factureStore.createFacture({
      description: description.value.trim(),
      montantHT: montantHT.value,
      montantTTC: montantTTC.value
    })
    
    router.push('/factures')
  } catch (error) {
    alert('Erreur lors de la création: ' + error.message)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.card {
  border-radius: 15px;
}

.card-header {
  border-radius: 15px 15px 0 0 !important;
}

.form-control:focus {
  border-color: #198754;
  box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
}
</style>
