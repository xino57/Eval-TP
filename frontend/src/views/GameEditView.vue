<template>
  <div class="container pt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3>Édition du jeu</h3>
          </div>
          
          <div class="card-body">
            <div v-if="isLoading" class="text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Chargement...</span>
              </div>
            </div>

            <form @submit.prevent="handleSave" v-else>
              
           
              <div class="mb-3">
                <label for="titre" class="form-label">Titre</label>
                <input
                  type="text"
                  class="form-control"
                  id="titre"
                  v-model="game.titre"
                  required
                >
              </div>

              
              <div class="mb-3">
                <label for="genre" class="form-label">Genre</label>
                <select
                  class="form-select"
                  id="genre"
                  v-model="game.genre"
                  required
                >
                  <option value="">Sélectionner un genre</option>
                  <option value="Plateforme">Plateforme</option>
                  <option value="Action-Adventure">Action-Adventure</option>
                  <option value="Rogue-like">Rogue-like</option>
                </select>
              </div>

             
              <div class="mb-4">
                <label for="note" class="form-label">Note (sur 10)</label>
                <input
                  type="number"
                  class="form-control"
                  id="note"
                  v-model.number="game.note"
                  min="0"
                  max="10"
                  required
                >
              </div>

            
              <div class="d-flex justify-content-between">
                <BButton variant="secondary" @click="handleCancel">
                  Annuler
                </BButton>

                <div>
                  <BButton variant="danger" @click="handleDelete" class="me-2">
                    Supprimer
                  </BButton>
                  
                  <BButton variant="success" type="submit">
                    Enregistrer
                  </BButton>
                </div>
              </div>

            </form>

         
            <pre class="mt-3">{{ game }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { storeToRefs } from 'pinia'

const router = useRouter()
const props = defineProps({
    id: {
      type: String,
      required: true
    }
})
const gameStore = useGameStore()
const { game } = storeToRefs(gameStore)

const { getGameById } = gameStore


const isLoading = ref(true)




const handleSave = () => {
  console.log('Sauvegarder:', game.value)
  router.push('/')
}

const handleCancel = () => {
  router.push('/')
}

const handleDelete = () => {
  if (confirm('Supprimer ce jeu ?')) {
    console.log('Supprimer:', game.value.id)
    router.push('/')
  }
}

onMounted(async () => {
  await getGameById(props.id)  
  isLoading.value = false; 
})


</script>
