<template>
    <div class="detalle-conte" v-if="props?.info !== null && props.info?.id != undefined">
        <div class="w-100">

            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col"><h5 class="card-title">{{ props.info?.titulo }}</h5></div>
                        <div class="col-auto">
                            <button type="button" class="btn-close" aria-label="Close" @click="emit('close')"></button>
                        </div>
                    </div>
                    <p class="card-text" v-html="linkify(props.info?.detalles)"></p>
                </div>
                <ul class="list-group list-group-flush">
                    
                    <li class="list-group-item">{{ fechaDateToString(new Date(props.info?.ts), '-') }}</li>
                    <li class="list-group-item"><img class="mt-1" v-for="img in get_images()" :key="img" :src="img.src" /></li>
                    <li class="list-group-item"><b>IP:</b> {{ props.info?.ipv4 }}</li>
                    <!--<li class="list-group-item"><b>IPv6:</b> {{ props.info?.ipv6 }}</li>-->
                    <li class="list-group-item"><b>Dispositivo:</b> {{ props.info?.user_agent }}</li>
                    <li class="list-group-item"><b>ID:</b> {{ props.info?.id }}</li>
                </ul>
            </div>

        </div>
    </div>
</template>

<script setup>
/* eslint-disable */
import { fechaDateToString } from '@/helpers/formatter'
const props = defineProps(['info'])
const emit = defineEmits(['close'])

function linkify(text) { 
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig; 
    return text.replace(urlRegex, function(url) { 
        return '<a href="' + url + '" target="_blank">' + url + '</a>'; 
    }); 
}

function get_images() {
    if (!props.info?.imagenes) return []
    let info = JSON.parse(props.info?.imagenes)
    for (let i = 0; i < info.length; i++) {
        info[i]['src'] = import.meta.env.VITE_API_URL + info[i]?.id + info[i]?.extension
    }
    return info
}
</script>

<style lang="scss" scoped>
.detalle-conte {
    z-index: 2500;
    position: absolute;
    max-width: 26rem;
    right: .5rem;
    top: 4.5rem;
    box-shadow: 0 4px 24px rgba(25, 118, 210, 0.13), 0 1.5px 4px rgba(25, 118, 210, 0.08);
    border-radius: 1.2rem;
    background: var(--color-superficie, #fff);
    padding: 1.2rem 0.7rem;
    margin-top: 1.2rem;

    img {
        width: 100%;
        height: auto;
        border-radius: 0.7rem;
        box-shadow: 0 1px 4px rgba(25, 118, 210, 0.08);
        margin-bottom: 0.5rem;
    }

    .card{
        background: transparent;
        border: none;
        box-shadow: none;
        overflow-y: auto;
        max-height: 70vh;
    }
    .card-title {
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--color-primario);
    }
    .card-text {
        color: var(--color-texto-principal);
        font-size: 1.05rem;
        margin-bottom: 0.7rem;
    }
    .list-group-item {
        background: var(--color-superficie, #fff);
        border: none;
        color: var(--color-texto-secundario);
        font-size: 0.97rem;
        padding: 0.5rem 0.7rem;
    }
    .btn-close {
        filter: brightness(0.7);
        transition: filter 0.2s;
    }
    .btn-close:hover {
        filter: brightness(1);
    }
}
</style>