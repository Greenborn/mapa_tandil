<template>
    <div class="cont-modal">
        <div class="row justify-content-center border-top pt-2 w-100">
            <div class="col col-sm-10 col-md-8 col-lg-6 col-xxl-4 contenido">

                <div class="row justify-content-center">
                    <div class="col-auto">
                        <!-- AQUI VA LOGO -->
                    </div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-auto p-4">
                        <h1 class="text-center">Mapa - Reclamos</h1>

                        <p>
                            Este mapa nace con la idea de poder contar con un registro público de reclamos referentes a
                            la
                            ciudad de Tandil, Bs As, Argentina. Referenciando cada uno de ellos con una ubicación
                            geográfica, una descripción,
                            fecha y hora, y al menos una foto que lo atestigue.
                        </p>

                        <p>
                            Así mismo se registra la IP y el dispositivo desde el que se envia el reclamo, para poder
                            identificar
                            la fuente de información.
                        </p>

                        <p>
                            Al usar este sitio acepta que <b>cada uno es responsable del contenido que publica</b>.
                            Si observa contenido falaz o inapropiado, puede reportarlo por mensaje privado a
                            <a href="https://web.facebook.com/greenborn.software">Greenborn</a> indicando el id de
                            reclamo, haciendo captura de pantalla
                            o especificando referencias de la publicación a reportar.
                        </p>

                        <h2 class="text-center mt-5">¿Como registro un reclamo?</h2>

                        <ul class="list-group">
                            <li class="list-group-item">1. Hacer click en <b>"+ Reclamo"</b></li>
                            <li class="list-group-item">2. Hacer click en la zona del mapa (puede hacer zoom de ser necesario)</li>
                            <li class="list-group-item">3. Hacer click en <b>"SI"</b> para confirmar la ubicación</li>
                            <li class="list-group-item">4. Completar los detalles del reclamo y apretar en <b>"ENVIAR</b></li>
                        </ul>

                        <h2 class="text-center mt-5">¿Como veo la información cargada?</h2>

                        <p>Debe hacer click en el punto del mapa, y se mostrará la información completa.</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.cont-modal {
    background: rgba(245, 247, 250, 0.7);
}

.contenido {
    background: var(--color-superficie, #fff);
    box-shadow: 0 4px 24px rgba(25, 118, 210, 0.13), 0 1.5px 4px rgba(25, 118, 210, 0.08);
    border-radius: 1.2rem;
    padding: 2rem 1.5rem;
    margin-top: 1.2rem;
    color: var(--color-texto-principal);
}

a {
    color: var(--color-primario);
    text-decoration: underline dotted;
    transition: color 0.2s;
}

a:hover {
    color: var(--color-acento);
    text-decoration: underline;
}

.list-group-item {
    background: var(--color-superficie, #fff);
    border: none;
    color: var(--color-texto-secundario);
    font-size: 1.05rem;
    padding: 0.5rem 0.7rem;
    border-radius: 0.5rem;
    margin-bottom: 0.3rem;
    transition: background 0.2s, color 0.2s;
}

.list-group-item:hover {
    background: var(--color-primario, #1976D2);
    color: #fff;
}
</style>