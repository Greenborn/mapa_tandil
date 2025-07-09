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
                                <button type="button" class="btn btn-outline-secondary"
                                    @click="emit('navigate', { id: 'MAP' })">Cancelar</button>
                                <button type="button" class="btn btn-outline-primary" @click="enviar">Enviar</button>
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
    background: rgba(255, 255, 255, .4);
}

.contenido {
    background: rgba(255, 255, 255, .8);
}
</style>