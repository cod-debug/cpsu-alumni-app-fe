<template>
    <q-card class="q-my-md">
        <q-card-section>
            <div class="flex items-center" style="gap: 2rem;">
                <div>
                    <div style="font-size: 3em; transform: scaleX(1.5);">
                        <q-icon name="label_important" color="primary" />
                    </div>
                </div>
                <div>
                    <label class="text-normal"><strong>{{ data.year }}</strong></label>
                    <div class="text-caption">{{ data.count }} Graduate{{ data.count > 1 ? 's' : '' }}</div>
                </div>
            </div>
        </q-card-section>
    </q-card>
</template>
<script>
export default {
    props: {
        data: Object,
    }
}
</script>