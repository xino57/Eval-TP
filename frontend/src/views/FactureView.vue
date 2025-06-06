<template>
  <div class="container-fluid pt-4">
    <div class="row">
      <div class="col-12">

        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="display-6 text-primary">
            <i class="fas fa-file-invoice-dollar me-3"></i>Gestion des Factures
          </h1>
          <button class="btn btn-success btn-lg shadow" @click="$router.push('/facture/new')">
            <i class="fas fa-plus me-2"></i>Nouvelle Facture
          </button>
        </div>

        
        <div class="card shadow-sm" v-if="factures && factures.length > 0">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0">
              <i class="fas fa-table me-2"></i>Liste des Factures
            </h5>
          </div>
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover table-striped mb-0">
                <thead class="table-dark sticky-top">
                  <tr>
                    <th scope="col" class="text-center">#</th>
                    <th scope="col">ID Facture</th>
                    <th scope="col">Description</th>
                    <th scope="col">Client</th>
                    <th scope="col">Prestation</th> 
                    <th scope="col" class="text-end">Montant HT</th>
                    <th scope="col" class="text-end">Montant TTC</th>
                    <th scope="col" class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(facture, index) in factures" :key="getFactureProperty(facture, 'id')"
                    class="align-middle">
                    <td class="text-center fw-bold text-muted">{{ index + 1 }}</td>
                    <td>
                      <span class="badge bg-secondary fs-6">{{ getFactureProperty(facture, 'id') }}</span>
                    </td>
                    <td>
                      <div class="d-flex align-items-center">
                        <i class="fas fa-file-invoice text-primary me-2"></i>
                        <div>
                          <div class="fw-semibold">{{ getFactureProperty(facture, 'description') || 'Sans description'
                            }}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div class="d-flex align-items-center">
                        <i class="fas fa-user text-primary me-2"></i>
                        <div>
                          <div class="fw-semibold">{{ getFactureProperty(facture, 'client') || 'Sans client' }}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div class="d-flex align-items-center">
                        <i class="fas fa-briefcase text-success me-2"></i>
                        <div>
                          <span class="badge bg-warning-soft text-warning fs-6">
                            {{ getFactureProperty(facture, 'prestation') || 'Non définie' }}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td class="text-end">
                      <span class="badge bg-success-soft text-success fs-6">
                        {{ formatPrice(getFactureProperty(facture, 'montantHT')) }}
                      </span>
                    </td>
                    <td class="text-end">
                      <span class="badge bg-info-soft text-info fs-6">
                        {{ formatPrice(getFactureProperty(facture, 'montantTTC')) }}
                      </span>
                    </td>
                    <td class="text-center">
                      <div class="d-flex gap-2 justify-content-center">
                        <button @click="goToEditFacture(getFactureProperty(facture, 'id'))"
                          class="btn btn-outline-secondary btn-sm" title="Modifier">
                          Modifier
                        </button>

                        <button @click="onDeleteFacture(getFactureProperty(facture, 'id'))"
                          class="btn btn-outline-danger btn-sm" title="Supprimer">
                          Supprimer
                        </button>
                      </div>
                    </td>

                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-footer bg-light text-muted">
            <small>
              <i class="fas fa-info-circle me-1"></i>
              {{ factures.length }} facture(s) au total
            </small>
          </div>
        </div>

        <div class="text-center py-5" v-if="factures.length === 0 && !error">
          <div class="card border-0 bg-light shadow-sm">
            <div class="card-body py-5">
              <i class="fas fa-file-invoice fa-4x text-muted mb-3"></i>
              <h3 class="text-muted">Aucune facture</h3>
              <p class="text-muted mb-4">Vous n'avez pas encore créé de facture.</p>
              <button class="btn btn-primary btn-lg" @click="goToNewFacture">
                <i class="fas fa-plus me-2"></i>Créer ma première facture
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFactureStore } from '@/stores/facture'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { factureInterface } from '@/interfaces/facture'

const factureStore = useFactureStore()
const { factures, error } = storeToRefs(factureStore)
const { getAllFactures, deleteFacture } = factureStore
const router = useRouter()

const getFactureProperty = (facture, property) => {
  if (property in factureInterface) {
    return facture[property] || factureInterface[property]
  }
  console.warn(`Propriété ${property} non définie dans l'interface facture`)
  return facture[property]
}

const goToNewFacture = () => {
  router.push('/facture/new')
}

const goToEditFacture = (factureId) => {
  router.push(`/facture/edit/${factureId}`)
}

const formatPrice = (price) => {
  if (!price) return '0,00 €'
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}

const onDeleteFacture = async (factureId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
    try {
      await deleteFacture(factureId)
    } catch (err) {
      alert('Erreur lors de la suppression: ' + err.message)
    }
  }
}

onBeforeMount(async () => {
  await getAllFactures()
})

</script>

<style scoped>
.card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1) !important;
}

.display-6 {
  font-weight: 600;
}

.table-responsive {
  max-height: 70vh;
}

.sticky-top {
  position: sticky;
  top: 0;
  z-index: 10;
}

.bg-success-soft {
  background-color: rgba(25, 135, 84, 0.1) !important;
}

.bg-info-soft {
  background-color: rgba(13, 202, 240, 0.1) !important;
}

.bg-warning-soft {
  background-color: rgba(255, 193, 7, 0.1) !important;
}

.btn-group .btn {
  border-radius: 0.375rem;
  margin: 0 1px;
}

.fw-semibold {
  font-weight: 600;
}

.badge.fs-6 {
  font-size: 0.875rem !important;
}
</style>
