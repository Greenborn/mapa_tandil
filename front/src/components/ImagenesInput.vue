<template>
    <div class="row p-2">
        <div class="col">
            <input type="file" ref="file_input" id="myfile" name="myfile" accept=".png, .jpg, .jpeg .webp"
                multiple="multiple" @change="archivo_seleccionado">
            <p><small>Max. {{ props.config.max_files }} archivos,
                    <span v-if="props.config?.max_file_size">{{ props.config.max_file_size / 1048576 }} MB c/u</span>
                </small></p>
        </div>
    </div>

    <div class="row">
        <div class="col-12" v-for="(file, index) in archivos" :key="index">
            <div class="row">
                <div class="col p-1">
                    <img class="w-100" :src="file.src" />
                    <button type="button" class="btn-rel btn btn-danger"
                        @click="archivos.splice(index, 1)">Quitar</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';

const props = defineProps(['modelValue', 'config'])
const emit = defineEmits(['update:modelValue'])

const archivos = ref(props.modelValue ? props.modelValue : [])
const file_input = ref()

async function archivo_seleccionado(evnt) {
    archivos.value = []
    let files = evnt.target.files

    if (files.length == 0)
        return file_input.value.value = ""

    if (files.length > props?.config?.max_files) {
        file_input.value.value = ""
        return alert('Solo se permiten ' + props.config.max_files + ' archivos.')
    }

    for (let i = 0; i < files.length; i++)
        if (files[i].size > props?.config?.max_file_size) {
            file_input.value.value = ""
            return alert('El archivo ' + files[i].name + ' supera el tamaño permitido de ' + (props.config.max_file_size / 1048576) + ' MB.')
        }

    for (let i = 0; i < files.length; i++) {
        let reader = new FileReader()

        reader.readAsDataURL(files[i])
        reader.onload = async () => {
            archivos.value.push({
                src: URL.createObjectURL(files[i]),
                base64: await redimensionarImagen(String(reader.result), props.config?.max_width, props.config?.max_height)
            })
            emit('update:modelValue', archivos.value)
        }
    }
}

async function redimensionarImagen(base64, maxWidth, maxHeight) {
    const split_ = base64.split(',');
    const bytes = atob(split_[1]);

    const arrayBuffer = new ArrayBuffer(bytes.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < bytes.length; i++) {
        uint8Array[i] = bytes.charCodeAt(i);
    }

    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);

    const image = await new Promise(resolve => {
        const img = new Image();
        img.onload = () => {
            resolve(img);
        };
        img.src = url;
    });

    const { width, height } = image;
    if (width <= maxWidth && height <= maxHeight) {
        return base64;
    }

    const ratio = Math.min(maxWidth / width, maxHeight / height);
    const newWidth = Math.round(width * ratio);
    const newHeight = Math.round(height * ratio);

    const canvas = document.createElement('canvas');
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, newWidth, newHeight);

    const base64Resized = canvas.toDataURL('image/jpeg');

    return base64Resized;
}
</script>

<style scoped>
.btn-rel {
    position: relative;
    left: 1rem;
    bottom: 3rem;
}
</style>