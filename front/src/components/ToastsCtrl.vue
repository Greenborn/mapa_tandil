<template>
    <div class="cont-toasts">
        <div v-if="show" class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">{{ config.title }}</strong>
                <small>{{ config.title_small }}</small>
                <button v-if="config.close_btn" type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" 
                    @click="show = !show"></button>
            </div>
            <div class="toast-body">
                {{ config.msg }}
                <button v-for="btn_cfg in config.btn_body" :key="btn_cfg"
                    type="button" :class="btn_cfg.class" @click="btn_body_click(btn_cfg)">
                    <i v-if="btn_cfg.icon" :class="btn_cfg.icon"></i> {{ btn_cfg.label }}
                </button>

                <div v-if="config.confirm_btn" class="mt-2 pt-2 border-top">
                    <button type="button" class="m-1 btn btn-secondary btn-sm" @click="emit('btn_click', false)">No</button>
                    <button type="button" class="btn btn-primary btn-sm" @click="emit('btn_click', true)">Si</button>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit  = defineEmits(['btn_click'])
defineExpose({ present, dissmiss })

const config = ref({
    title: '', title_small: '',
    close_btn: true, confirm_btn: false,
    msg: 'TOAST!',
    btn_body: []
})

async function btn_body_click(cfg){
    return await cfg.callback(cfg)
}

const show = ref(false)

function present(cfg){
    config.value = {...config.value, ...cfg}
    show.value   = true
}

function dissmiss(){
    show.value = false
}
</script>

<style lang="scss">
    .cont-toasts{
        position: fixed;
        z-index: 3000;
    }
</style>