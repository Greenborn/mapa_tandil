<template>
    <div class="cont-modal">
        <div class="container">

            <div class="row justify-content-center border-top">
                <div class="col col-sm-10 col-md-8 col-lg-6 col-xxl-4 contenido">

                    <div class="row justify-content-center">
                        <div class="col-auto p-2">
                            <h2>Nuevo Reclamo</h2>
                        </div>
                    </div>

                    <div class="row justify-content-center border-top">
                        <div class="col p-2">
                            <div class="mb-3">
                                <label for="titulo" class="form-label">Título</label>
                                <input type="text" class="form-control" id="titulo" placeholder="Calle en mal estado..."
                                    v-model="model.titulo">
                            </div>

                            <div class="mb-3">
                                <label for="detalles" class="form-label">Detalles</label>
                                <textarea class="form-control" id="detalles" rows="3"
                                    v-model="model.detalles"></textarea>
                            </div>

                            <ImagenesInput v-model="model.imagenes" :config="config_img" />
                        </div>
                    </div>

                    <div class="row justify-content-center border-top">
                        <div class="col-auto p-2">
                            <div class="btn-group btn-group-sm" role="group">
                                <button type="button" class="btn btn-outline-secondary btn-lg px-4"
                                    @click="emit('navigate', { id: 'MAP' })">
                                    <i class="bi bi-x-circle me-2"></i>Cancelar
                                </button>
                                <button type="button" class="btn btn-primary btn-lg px-4 ms-2" @click="enviar">
                                    <i class="bi bi-send me-2"></i>Enviar
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { new_reclamo } from '@/api/reclamos'

import ImagenesInput from './ImagenesInput.vue';

const props = defineProps(['context'])
const emit = defineEmits(['navigate'])

const model = ref({
    titulo: '',
    detalles: '',
    imagenes: []
})

const config_img = ref({
    max_files: 3,
    //max_file_size: 1024 * 1024 * 1 //3MB
    max_width: 1366,
    max_height: 768
})

async function enviar() {
    if (!model.value.titulo || model.value.titulo == '')
        return alert("El Título no puede estar vacío.")

    if (!model.value.detalles || model.value.detalles == '')
        return alert("Es necesario completar los Detalles.")

    if (model.value.imagenes.length < 1)
        return alert("Es necesario subir al menos una imagen.")

    if (model.value.imagenes.length > 3)
        return alert("Se permite hasta 3 imágenes.")

    model.value['posicion'] = props.context?.posicion

    let res_ = await new_reclamo(model.value)
    if (res_.stat) {
        //await update_reclamos()
        alert("Reclamo subido correctamente.")
        return emit('navigate', { id: 'MAP' })
    } else {
        //console.log(res_)
        if (res_.error === true)
            return alert(res_?.msg?.response?.data ? res_.msg.response.data : 'Error Interno, reintente luego')

        alert(res_.error)
    }
}
</script>

<style lang="scss" scoped>
.cont-modal {
    background: rgba(245, 247, 250, 0.7);
    margin-top: 1.5rem;
}

.contenido {
    background: var(--color-superficie);
    box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
    border-radius: 1rem;
    padding: 1.5rem 1rem;
}
.btn-group .btn {
    color: var(--color-primario);
    background: var(--color-superficie);
    border: 1.5px solid var(--color-primario);
    margin: 0 0.4rem;
    font-weight: 600;
    font-size: 1.1rem;
    padding: 0.6em 1.4em;
    border-radius: 2em;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    box-shadow: 0 1px 4px rgba(25, 118, 210, 0.08);
}
.btn-group .btn.active, .btn-group .btn:focus, .btn-group .btn:hover {
    background: var(--color-primario);
    color: var(--color-superficie);
    border-color: var(--color-primario);
}
.btn-group .btn-outline-secondary {
    border-color: var(--color-acento);
    color: var(--color-acento);
}
.btn-group .btn-outline-secondary.active,
.btn-group .btn-outline-secondary:focus,
.btn-group .btn-outline-secondary:hover {
    background: var(--color-acento);
    color: var(--color-superficie);
    border-color: var(--color-acento);
}
</style>