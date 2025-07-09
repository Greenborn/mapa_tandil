<template>
    <DetallePunto :info="selected" @close="select_none" />
    <div class="cont-modal">
        <ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: calc(100vh - 3.5rem)"
            ref="map_ref">
            <ol-view ref="view" :center="center" :rotation="rotation" :zoom="zoom" :projection="projection" />

            <ol-tile-layer><ol-source-osm /></ol-tile-layer>

            <ol-vector-layer>
                <ol-source-vector ref="vectorsource" :projection="projection">
                    <ol-feature v-for="marcador in marcadores" :key="marcador" :properties="marcador">
                        <ol-geom-point :coordinates="marcador?.coordinate"></ol-geom-point>
                        <!--<ol-style>
                            <ol-style-icon :src="marcador?.icon" :scale="marcador?.size"></ol-style-icon>
                        </ol-style>-->
                        <ol-style>
                            <ol-style-stroke color="red" :width="2"></ol-style-stroke>
                            <ol-style-fill color="rgba(255,255,255,0.1)"></ol-style-fill>
                            <ol-style-circle :radius="15">
                                <ol-style-fill color="red"></ol-style-fill>
                            </ol-style-circle>
                        </ol-style>
                    </ol-feature>

                    <ol-interaction-select ref="select_interaction" @select="featureSelected" :condition="selectCondition">
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

                <ol-overlay :position="selectedCityPosition" v-if="selectedTitulo != ''">
                    <template v-slot="slotProps">
                        <div class="overlay-content">
                            {{ selectedTitulo }} <span class="d-none">{{ slotProps.position }}</span>
                        </div>
                    </template>
                </ol-overlay>
            </ol-vector-layer>

        </ol-map>
    </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';

//import markerIcon from "@/assets/logo.png";
import { get_reclamos } from '@/api/reclamos'
import DetallePunto from './DetallePunto.vue';

const vectorsource = ref(null);
const map_ref = ref(null)
const view = ref(null);
const select_interaction = ref()

const extent = inject("ol-extent");
const selectConditions = inject("ol-selectconditions")
const selectCondition = selectConditions.SingleClick;
const selectedTitulo = ref("");
const selectedCityPosition = ref([]);
const selected = ref(null)

const center = ref([-59.135030396398676, -37.33961347533027]);
const projection = ref('EPSG:4326');
const zoom = ref(15);
const rotation = ref(0);

const marcadores = ref([])

const selectedFeatures = ref([]);

function select_none() {
    selected.value = null
}

function featureSelected(event) {
    if (event.selected.length == 1) {
        selectedCityPosition.value = extent.getCenter(
            event.selected[0].getGeometry().extent_
        );
        selected.value = event.selected[0].values_
        try {
            parent.location.hash = "map_req?id=" + selected.value.id
            view.value.setCenter(JSON.parse(selected.value.posicion))
        } catch (error) {
            console.log(error)
        }

        selectedTitulo.value = event.selected[0].values_.titulo;
    } else {
        selectedTitulo.value = "";
        selected.value = null
    }

    selectedFeatures.value = event.selected;
}

function marcar_seleccionado( punto ){
    selected.value = punto
    //var source = vectorsource.value.source.getFeatures();
    //console.log(select_interaction.value.select, source)
    //vectorsource.value.source.selectFeature(source[0])
    try {
        selectedCityPosition.value = extent.getCenter(JSON.parse(selected.value.posicion) )
        parent.location.hash = "map_req?id=" + selected.value.id
        view.value.setCenter(JSON.parse(selected.value.posicion))
    } catch (error) {
        console.log(error)
    }

    selectedTitulo.value = punto.titulo;
}

async function update_reclamos() {
    marcadores.value = []
    let res = await get_reclamos()
    if (res.stat) {
        for (let i = 0; i < res.data.length; i++) {
            let reclamo = res.data[i]
            //console.log(reclamo)
            marcadores.value.push({ ...reclamo, coordinate: JSON.parse(reclamo.posicion) })

             
        }

        let url_actual = parent.location.hash
        let id_req = url_actual.split("map_req?id=")[1]    
        setTimeout(()=>{
                if (id_req != undefined)
                    for (let i=0; i < marcadores.value.length; i++)
                        if (marcadores.value[i]?.id == id_req){
                            marcar_seleccionado(marcadores.value[i])
                            break
                        }
            }, 2000)
    }
}

onMounted(async () => {
    await update_reclamos()
})
</script>

<style lang="scss" scoped></style>