<template>
  <div class="container pt-4">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow-lg">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0">
              <i class="fas fa-edit me-2"></i>Modifier la facture #{{ factureId }}
            </h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit" v-if="formData">
              <div class="mb-3">
                <label for="description" class="form-label">
                  <i class="fas fa-file-text me-1"></i>Description *
                </label>
                <textarea
                  id="description"
                  v-model="formData.description"
                  class="form-control"
                  rows="3"
                  placeholder="Description de la facture..."
                  required
                ></textarea>
              </div>

              <div class="mb-3">
                <label for="montantHT" class="form-label">
                  <i class="fas fa-euro-sign me-1"></i>Montant HT *
                </label>
                <div class="input-group">
                  <input
                    id="montantHT"
                    v-model.number="formData.montantHT"
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
                <label for="montantTTC" class="form-label">
                  <i class="fas fa-coins me-1"></i>Montant TTC *
                </label>
                <div class="input-group">
                  <input
                    id="montantTTC"
                    v-model.number="formData.montantTTC"
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
                  @click="onCancel"
                >
                  <i class="fas fa-times me-1"></i>Annuler
                </button>
                <button 
                  type="submit" 
                  class="btn btn-primary"
                  :disabled="submitting"
                >
                  <span v-if="submitting">
                    <div class="spinner-border spinner-border-sm me-2" role="status"></div>
                    Modification...
                  </span>
                  <span v-else>
                    <i class="fas fa-save me-1"></i>Sauvegarder
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
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFactureStore } from '@/stores/facture'

const route = useRoute()
const router = useRouter()
const factureId = route.params.id

const onCancel = () => {
  router.push('/factures')
}

const factureStore = useFactureStore()
const { getFactureById, updateFacture } = factureStore

const formData = ref(null)
const submitting = ref(false)

const handleSubmit = async () => {
  submitting.value = true
  try {
    await updateFacture(factureId, {
      description: formData.value.description,
      montantHT: formData.value.montantHT,
      montantTTC: formData.value.montantTTC
    })
    router.push('/factures')
  } catch (err) {
    console.error('Erreur lors de la modification:', err)
  } finally {
    submitting.value = false
  }
}

onBeforeMount(async () => {
  try {
    const factureData = await getFactureById(factureId)
    formData.value = {
      description: factureData.description,
      montantHT: factureData.montantHT,
      montantTTC: factureData.montantTTC
    }
  } catch (err) {
    console.error('Erreur lors du chargement:', err)
    if (err.response?.status === 404) {
      router.push('/factures')
    }
  }
})
</script>

<style scoped>
.card {
  border: none;
  border-radius: 15px;
}

.card-header {
  border-radius: 15px 15px 0 0 !important;
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}

.alert {
  border-radius: 10px;
}

.btn {
  border-radius: 8px;
  padding: 0.5rem 1.5rem;
}

.input-group-text {
  background-color: #f8f9fa;
  border-color: #dee2e6;
}
</style>
