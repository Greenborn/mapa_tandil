<template>
    <ToastsCtrl ref="toasts_ref" @btn_click="toast_btn_click" />
    <div class="cont-modal">
        <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: calc(100vh - 3.5rem)"
            ref="map_ref">
            <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />

            <ol-tile-layer><ol-source-osm /></ol-tile-layer>

            <ol-vector-layer>
                <ol-source-vector ref="vectorsource" :projection="projection">

                    <ol-interaction-draw v-if="drawEnable" :type="drawType" @drawend="drawend">
                        <ol-style>
                            <ol-style-stroke color="blue" :width="2"></ol-style-stroke>
                            <ol-style-fill color="rgba(255, 255, 0, 0.4)"></ol-style-fill>
                            <ol-style-circle :radius="7">
                                <ol-style-fill color="#00dd11" />
                                <ol-style-stroke color="blue" :width="2" />
                            </ol-style-circle>
                        </ol-style>
                    </ol-interaction-draw>

                    <ol-interaction-select>
                        <ol-style>
                            <ol-style-circle :radius="7">
                                <ol-style-stroke color="green" :width="15"></ol-style-stroke>
                                <ol-style-fill color="rgba(255,255,255,0.5)"></ol-style-fill>
                            </ol-style-circle>
                        </ol-style>
                    </ol-interaction-select>
                </ol-source-vector>

                <ol-style>
                    <ol-style-stroke color="red" :width="2"></ol-style-stroke>
                    <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>
                    <ol-style-circle :radius="7">
                        <ol-style-fill color="red"></ol-style-fill>
                    </ol-style-circle>
                </ol-style>

            </ol-vector-layer>

        </ol-map>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import ToastsCtrl from '../ToastsCtrl.vue'

const emit = defineEmits(['navigate'])

const ultima_posicion = ref([])
const toasts_ref = ref(null)
const vectorsource = ref(null);
const map_ref = ref(null)
const view = ref(null);
const Feature = inject("ol-feature");
const Geom = inject("ol-geom");

const center = ref([-59.135030396398676, -37.33961347533027]);
const projection = ref('EPSG:4326');
const zoom = ref(15);
const rotation = ref(0);

const drawEnable = ref(false);
const drawType = ref("Point");
const ultimo_punto = ref(null);

function new_reclamo_p1() {
    if (ultimo_punto.value !== null)
        vectorsource.value.source.removeFeature(ultimo_punto.value)

    toasts_ref.value.present({
        title: 'Nuevo Reclamo', title_small: 'Paso 1',
        close_btn: false, confirm_btn: false,
        msg: 'Haga click en la ubicación del mapa.',
        btn_body: [
            {
                label: 'Ubicación Actual', class: 'm-1 btn btn-primary btn-sm', 
                icon: 'bi bi-crosshair',
                callback: async (cfg) => {
                    const options = {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0,
                    }

                    navigator.geolocation.getCurrentPosition(
                        (pos)=>{
                            let coords = pos.coords
                            coords = [coords.longitude, coords.latitude]
                            drawEnable.value = false
                            
                            const feature = new Feature({
                                geometry: new Geom.Point(coords),
                            });
                            vectorsource.value.source.addFeature(feature)
                            view.value.setCenter(coords)

                            ultimo_punto.value    = feature
                            ultima_posicion.value = coords
                            new_reclamo_p2()
                        }, 
                        (err)=>{
                            console.warn(`ERROR(${err.code}): ${err.message}`)
                            alert("No se pudo obtener la ubicación, es necesario permitir que el sitio acceda a su ubicación.")
                        }, options)
                    return cfg
                }
            }
        ]
    })
    drawEnable.value = true
}

function new_reclamo_p2() {
    drawEnable.value = false

    toasts_ref.value.present({
        title: 'Nuevo Reclamo', title_small: 'Paso 2',
        close_btn: false, confirm_btn: true,
        msg: '¿Confirma la ubicación seleccionada?',
        btn_body: []
    })
}

function drawend(event) {
    ultimo_punto.value = event.feature
    ultima_posicion.value = event.feature.values_.geometry.flatCoordinates

    new_reclamo_p2()
}

function toast_btn_click(evnt) {
    if (evnt)
        new_reclamo_p3()
    else
        new_reclamo_p1()
}

function new_reclamo_p3() {
    toasts_ref.value.dissmiss()
    emit('navigate', { id: 'RECLAMO_PASO_3', context: { posicion: ultima_posicion.value } })
}

onMounted(async () => {
    new_reclamo_p1()
})
</script>

<style lang="scss" scoped></style>