<template>
  <div class="card bg-dark text-light mb-3 rounded-3">
    <div class="facture-header text-light h5 fw-bold text-center rounded-top-3">
      Facture #{{ facture?.id || '-' }}
    </div>
    <div class="facture-icon text-center py-4">
      <i class="fas fa-file-invoice fa-4x text-primary"></i>
    </div>
    <div class="card-body">
      <div class="row mb-2">
        <div class="col-12">
          <p class="mb-1 text-truncate" :title="facture?.description">
            <strong>Description:</strong> {{ facture?.description || 'Aucune description' }}
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <p class="mb-1">
            <strong>HT:</strong> {{ formatPrice(facture?.montantHT) }}
          </p>
        </div>
        <div class="col-6 text-end">
          <p class="mb-0">
            <strong>TTC:</strong> {{ formatPrice(facture?.montantTTC) }}
          </p>
        </div>
      </div>
    </div>
    <div class="card-footer d-flex gap-2" v-if="showButtons">
      <router-link class="btn btn-primary btn-sm flex-fill" :to="`/facture/${facture.id}`">
        <i class="fas fa-eye me-1"></i>Voir le détail
      </router-link>
      <router-link class="btn btn-secondary btn-sm flex-fill" :to="`/facture/edit/${facture.id}`">
        <i class="fas fa-edit me-1"></i>Modifier
      </router-link>
      <button @click="emit('delete', facture.id)" class="btn btn-danger btn-sm" title="Supprimer">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  facture: {
    type: Object,
    required: true,
  },
  showButtons: {
    type: Boolean,
    default: true,
  },
})


const emit = defineEmits(['delete'])

const formatPrice = (price) => {
  if (!price) return '0,00 €'
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(price)
}
</script>

<style scoped>
.facture-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  padding-top: 15px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0) 100%);
  z-index: 1;
}

.facture-icon {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  margin-top: 60px;
}

.bg-dark .card-body {
  background: #40454b;
  min-height: 100px;
}

.bg-dark .card-footer {
  background: #4d545c;
}

.card {
  transition: transform 0.2s ease-in-out;
  height: 100%;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
