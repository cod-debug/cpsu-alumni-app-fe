<template>
    <q-card class="bg-secondary text-white">
        <q-card-section>
            <div class="flex justify-between items-center">
                <div class="text-h5">{{ title }}</div>
                <div style="font-size: 6em;">
                    <q-icon :name="icon" />
                </div>
            </div>
            <div class="q-py-sm text-center">
                <div class="text-h3">{{ $helper.formatNumber(count) }}</div>
            </div>
        </q-card-section>
        <q-inner-loading :showing="is_loading" label="Please wait..." label-class="text-teal"
            label-style="font-size: 1.1em" />
    </q-card>
</template>
<script>
export default {
    props: {
        is_loading: Boolean,
        title: String,
        count: Number,
        icon: String,
    }
}
</script>