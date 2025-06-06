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
                <label for="client" class="form-label">Client *</label>
                <select
                  id="client"
                  v-model="client"
                  class="form-select"
                  required
                >
                  <option value="">-- Sélectionner un client --</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Pierre Dupont">Pierre Dupont</option>
                  <option value="Marie Martin">Marie Martin</option>
                  <option value="David Johnson">David Johnson</option>
                  <option value="Sophie Dubois">Sophie Dubois</option>
                  <option value="Michael Brown">Michael Brown</option>
                  <option value="Camille Leroy">Camille Leroy</option>
                  <option value="Robert Wilson">Robert Wilson</option>
                  <option value="Julie Moreau">Julie Moreau</option>
                  <option value="Thomas Garcia">Thomas Garcia</option>
                  <option value="Laura Petit">Laura Petit</option>
                  <option value="Alexandre Bernard">Alexandre Bernard</option>
                  <option value="Emma Rousseau">Emma Rousseau</option>
                  <option value="Lucas Roux">Lucas Roux</option>
                </select>
              </div>

         
              <div class="mb-3">
                <label for="prestation" class="form-label">prestation *</label>
                <input
                  id="prestation"
                  v-model="prestation"
                  type="text"
                  class="form-control"
                  placeholder="Types de prestation (ex: Développement Web, Formation...)"
                  required
                />
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
import { useFactureStore } from '@/stores/facture'

const router = useRouter()
const factureStore = useFactureStore()

const description = ref('')
const client = ref('')
const prestation = ref('')  
const montantHT = ref(0)
const montantTTC = ref(0)
const loading = ref(false)

const createFacture = async () => {
  loading.value = true
  
  try {
    await factureStore.createFacture({
      description: description.value.trim(),
      client: client.value,
      prestation: prestation.value.trim(), 
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

.form-control:focus,
.form-select:focus {
  border-color: #198754;
  box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
}
</style>
