<template>
    <div class="row items-center" style="gap: 0.5rem;">
        <div class="q-my-md">
            <div style="width: 40px; aspect-ratio: 1/1; border-radius: 50%;"
                class="text-h5 flex items-center justify-center bg-primary text-white overflow-hidden">
                <img :src="avatar" v-if="avatar" style="width: 100%;" />
                <div v-else class="text-h5" >{{ name[0] }}</div>
            </div>
        </div>
        <div class="col-grow">
            <div class="text-dark row justify-between">
                <span>{{ name }}</span>
                <div class="text-caption" style="color: lightslategray;">{{ time_ago }}</div>
            </div>
            <div class="text-caption text-secondary" style="max-width: 100%; overflow: hidden;">"{{ message }}"</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        avatar: String,
        name: String,
        time_ago: String,
        message: String
    }
}
</script>