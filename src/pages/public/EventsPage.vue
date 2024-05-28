<template>
    <div class="q-my-xl">
        <div class="row" style="min-height: calc(100vh - 196px);">
            <div class="col-md-6 col-sm-12 col-xs-12 flex justify-center">
                <div class="flex items-center justify-center q-px-lg">
                    <div>
                        <div class="text-h5 text-bold text-blue-5">NEWS AND UPDATES</div>
                        <div class="text-h4 text-public-primary text-bold">CPSU GRUAD SCHOOL</div>
                        <div class="text-h5 text-dark text-bold">DISTINGUISHED AWARDS 2023</div>
                        <div class="text-caption-1 q-my-lg">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum distinctio quia doloremque consequatur odio placeat consectetur quidem animi repellat eos. Officia, amet? Laborum, enim? Libero dolor natus aliquid perspiciatis tempora!
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12" style="height: inherit;">
                <div style="height: 100%;" class="flex items-center">
                    <q-carousel
                        style="width: 100%;"
                        animated
                        v-model="slide"
                        arrows
                        navigation
                        infinite
                    >
                        <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
                        <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
                        <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
                        <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
                    </q-carousel>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: () => {
            return {
                slide: 1,
            }
        }
    }
</script>