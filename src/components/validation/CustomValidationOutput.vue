<template>
    <div v-if="errors && errors[property]">
        <label class="text-red-8 text-caption q-pl-sm" v-for="(error, key) in errors[property]" :key="key">{{ error
            }}</label>
    </div>
</template>

<script>
export default {
    props: {
        errors: {
            type: Object,
            required: true
        },
        property: {
            type: String,
            required: true
        }
    }
}
</script>