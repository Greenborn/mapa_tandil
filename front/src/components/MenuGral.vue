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
    z-index: var(--zindex-menu);
    left: 0;
    width: 100vw;
    padding: .75rem;
    background: var(--color-primario);
    box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
}
.btn-group .btn {
    color: var(--color-primario);
    background: var(--color-superficie);
    border: 1.5px solid var(--color-primario);
    margin: 0 0.2rem;
    font-weight: 500;
    transition: background 0.2s, color 0.2s;
}
.btn-group .btn.active, .btn-group .btn:focus, .btn-group .btn:hover {
    background: var(--color-primario);
    color: var(--color-superficie);
    border-color: var(--color-primario);
}
.btn-group .btn-success, .btn-group .btn-outline-success {
    border-color: var(--color-secundario);
    color: var(--color-secundario);
}
.btn-group .btn-success.active, .btn-group .btn-outline-success.active,
.btn-group .btn-success:focus, .btn-group .btn-outline-success:focus,
.btn-group .btn-success:hover, .btn-group .btn-outline-success:hover {
    background: var(--color-secundario);
    color: var(--color-superficie);
    border-color: var(--color-secundario);
}
</style>