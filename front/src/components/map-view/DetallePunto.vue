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
        info[i]['src'] = process.env.VUE_APP_API_URL + info[i]?.id + info[i]?.extension
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

    img {
        width: 100%;
        height: auto;
    }

    .card{
        overflow: scroll;
        max-height: calc( 100vh - 4.5rem );
    }
}
</style>