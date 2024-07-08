<template>
    <div class="q-my-lg">
        <div class="custom-container">
            <q-form class="shadow-2 q-pa-md q-pt-lg" @submit.prevent="submitSearch" greedy ref="search_form">
                <q-input color="grey-3" label-color="teal" outlined v-model="search_keyword" label="Search Job"
                    :rules="[val => val && val.length > 0 || 'This field is required.']">
                    <template v-slot:append>
                        <q-icon name="search" @click="submitSearch" color="teal" class="cursor-pointer" />
                    </template>
                </q-input>
            </q-form>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            search_keyword: "",
        }
    },
    methods: {
        async validate(evt) {
            return await this.$refs.search_form.validate();
        },
        async submitSearch() {
            if (await this.validate()) {
                console.log('submit search');
            }
        }
    }
}
</script>