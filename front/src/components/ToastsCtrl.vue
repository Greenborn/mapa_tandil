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
        z-index: var(--zindex-toast);
        top: 1.5rem;
        right: 1.5rem;
        min-width: 320px;
        max-width: 90vw;
        pointer-events: none;
    }
    .toast {
        background: var(--color-superficie, #fff);
        color: var(--color-texto-principal, #212121);
        border-radius: 1rem;
        box-shadow: 0 4px 24px rgba(25, 118, 210, 0.13), 0 1.5px 4px rgba(25, 118, 210, 0.08);
        border: none;
        padding: 0.7rem 1.2rem;
        margin-bottom: 1rem;
        pointer-events: all;
        opacity: 1;
        transition: opacity 0.3s, transform 0.3s;
    }
    .toast.show {
        opacity: 1;
        transform: translateY(0);
    }
    .toast[style*="display: none"] {
        opacity: 0;
        transform: translateY(-20px);
    }
    .toast-header {
        background: transparent;
        border-bottom: none;
        font-weight: 600;
        color: var(--color-primario, #1976D2);
        border-radius: 1rem 1rem 0 0;
    }
    .toast-body {
        font-size: 1.05rem;
        color: var(--color-texto-principal, #212121);
    }
    .btn-close {
        filter: brightness(0.7);
        transition: filter 0.2s;
    }
    .btn-close:hover {
        filter: brightness(1);
    }
    .btn {
        border-radius: 2em;
        font-weight: 600;
        font-size: 1rem;
        margin: 0 0.2rem;
        transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    }
    .btn-primary {
        background: var(--color-primario, #1976D2);
        border-color: var(--color-primario, #1976D2);
    }
    .btn-primary:hover, .btn-primary:focus {
        background: var(--color-acento, #FF9800);
        border-color: var(--color-acento, #FF9800);
        color: #fff;
    }
    .btn-secondary {
        background: var(--color-superficie, #fff);
        color: var(--color-primario, #1976D2);
        border-color: var(--color-primario, #1976D2);
    }
    .btn-secondary:hover, .btn-secondary:focus {
        background: var(--color-primario, #1976D2);
        color: #fff;
    }
</style>