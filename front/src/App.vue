<template>
  <div class="container-fluid">
    <MenuGral @btn_click="click_menu" />

    <MapGral v-if="ultimo_click_menu.id === 'MAP' "/>
    <MapAddReclamo v-if="ultimo_click_menu.id === 'NEW_RECLAMO'" @navigate="click_menu"/>

    <HelpPage v-if="ultimo_click_menu.id === 'HELP'" />
    <FormReclamo v-if="ultimo_click_menu.id === 'RECLAMO_PASO_3'" :context="context" @navigate="click_menu" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

import MapGral from './components/map-view/MapGral.vue'
import MenuGral from './components/MenuGral.vue';
import HelpPage from './components/HelpPage.vue';
import FormReclamo from './components/FormReclamo.vue';
import MapAddReclamo from './components/map-view/MapAddReclamo.vue';

const context = ref({
  posicion: []
})

//const mapa_ref = ref(null)
const ultimo_click_menu = ref({ id: "MAP" })

async function click_menu(enlace) {
  ultimo_click_menu.value = enlace
  context.value = {...context.value, ...enlace?.context}
}
</script>

<style lang="scss">
:root {
  --color-primario: #1976D2;
  --color-secundario: #43A047;
  --color-fondo: #F5F7FA;
  --color-superficie: #FFFFFF;
  --color-texto-principal: #212121;
  --color-texto-secundario: #757575;
  --color-acento: #FF9800;
  --color-error: #D32F2F;
}
body, .container-fluid {
  background: var(--color-fondo);
  color: var(--color-texto-principal);
  font-family: 'Roboto', 'Open Sans', Arial, sans-serif;
}
.cont-modal{
  position: absolute;
  top: 0px;
  z-index: 1000;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding-top: 3.5rem;
  overflow: scroll;
}

.overlay-content {
  background: #4a0000 !important;
  color: white;
  box-shadow: 0 5px 10px rgb(2 2 2 / 20%);
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 1rem;
  font-weight: bold;
}
</style>
