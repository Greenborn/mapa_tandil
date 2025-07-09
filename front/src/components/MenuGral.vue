<template>
    <div class="cont-gral-menu">
        <div class="row justify-content-center">
            <div class="col-auto">
                <div class="btn-group btn-group-sm" role="group">
                    <button type="button" v-for="(enlace, i) in ENLACES" :key="enlace.id" 
                        @click="click_evnt(enlace, i)" :class="css_class(enlace, i)">{{ enlace.label }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const ENLACES = [
    { label: 'Mapa', icon: '', class: 'btn btn-outline-primary', id: 'MAP' },
    { label: '¿Cómo se usa?', icon: '', class: 'btn btn-outline-primary', id: 'HELP' },
    { label: '+ Reclamo', icon: '', class: 'btn btn-outline-success', id: 'NEW_RECLAMO' },
    //{ label: '+ Evento', icon: '', class: 'btn btn-outline-success', id: 'NEW_EVENTO' },
]

const selected = ref(0)

function css_class(enlace, i){
    return enlace.class + (i == selected.value ? ' active' : '')
}

function click_evnt(enlace, i){
    selected.value = i
    return emit('btn_click', enlace)
}

const emit  = defineEmits(['btn_click'])
</script>

<style lang="scss" scoped>
.cont-gral-menu {
    position: fixed;
    top: 0px;
    z-index: 1200;
    left: 0;
    width: 100vw;
    padding: .75rem;
    background: rgba(255, 255, 255, .95);
}
</style>