<template>
    <q-page class="q-pt-xl q-px-md">
        <div class="text-h5">DASHBOARD</div>
        <q-card>
            <q-card-section class="q-pa-none">
                <div class="flex" style="height: 80vh;">
                    <div style="width: 250px; height: 100%; overflow: auto; border-right: 1px solid #dadada;">
                        <q-card v-for="(item, key) in chats" :key="key" flat
                            style="border-bottom: 1px solid lightgray; cursor: pointer;" square @click="openChat(item)">
                            <q-card-section class="q-py-sm">
                                <div class="flex items-center" style="gap: 1rem;">
                                    <div class="table-avatar-holder"
                                        :class="!item.avatar_url ? 'bg-primary text-white' : ''">
                                        <img :src="`${item.avatar_url}`" v-if="item.avatar_url" />
                                        <div v-else class="text-h5 text-uppercase">{{ item.first_name[0] }}{{
                            item.last_name[0]
                        }}</div>
                                    </div>
                                    <div style="flex-grow: 1;">
                                        {{ item.first_name }}
                                        {{ item.last_name }}
                                    </div>
                                </div>
                            </q-card-section>
                        </q-card>
                        <button @click="showMore()" :disabled="last_page <= 1"
                            style="cursor: pointer; width: 100%; outline: 0; border: 0; background: transparent;"
                            class="text-accent q-py-sm">Show More</button>
                    </div>
                    <div style="flex-grow: 1;" class="bg-green-1">
                        <div class="flex justify-between" style="flex-direction: column;height: 80vh;"
                            v-if="selected_chat">
                            <div class="">
                                <div class="text-right q-pa-sm cursor-pointer" @click="closeChat">
                                    [close]
                                </div>
                            </div>
                            <div style="flex-grow: 1; overflow: auto; height: 65vh;">
                                <div>
                                    <div v-for="(item, key) in messages" :key="key" class="q-pa-lg">
                                        <q-chat-message :text="[item.message]" v-if="message.user_from === user_data.id"
                                            sent text-color="white" bg-color="primary">
                                            <template v-slot:name>me</template>
                                            <template v-slot:stamp>{{ $helper.timeSince(item.created_at) }}</template>
                                        </q-chat-message>
                                        <q-chat-message bg-color="amber" v-else>
                                            <template v-slot:name>{{ selected_chat.first_name }}</template>
                                            <div>
                                                {{ item.message }}
                                            </div>
                                        </q-chat-message>
                                    </div>
                                </div>
                            </div>
                            <div style=" width: 100%;">
                                <q-input v-model="message" label="Write message" class="q-px-sm">
                                    <template v-slot:append>
                                        <q-btn flat>
                                            <q-icon name="send" />
                                        </q-btn>
                                    </template>
                                </q-input>
                            </div>
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
export default {
    data: () => {
        return {
            user_data: JSON.parse(localStorage.getItem('user_data')),
            chats: [],
            message: "",
            limit: 10,
            current_page: 1,
            last_page: 0,
            selected_chat: null,
            messages: [],
        }
    },
    methods: {
        async getChats() {
            let payload = {
                user_from: '',
                user_to: '',
                message: this.message,
                limit: this.limit,
            }
            let { data, status } = await this.$store.dispatch('chats/getAllChats', payload);

            if ([200, 201].includes(status)) {
                this.chats = data.data;
                this.last_page = data.last_page;
            }
        },
        openChat(item) {
            this.selected_chat = item;
            this.messages = [...item.received_messages, ...item.sent_messages];
        },
        closeChat() {
            this.selected_chat = null;
        },
        showMore() {
            this.limit = this.limit + 10;
            this.getChats();
        },
        initApp() {
            this.getChats();
        }
    },
    mounted() {
        this.initApp();
    },
}
</script>