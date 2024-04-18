<template>
    <q-page class="q-pt-xl q-px-md">
        <div class="text-h5">MESSAGE</div>
        <q-card>
            <q-card-section class="q-pa-none">
                <div class="flex" style="height: 80vh;">
                    <div style="width: 250px; height: 100%; overflow: auto; border-right: 1px solid #dadada;">
                        <q-inner-loading
                            :showing="is_loading_users"
                            label="Please wait..."
                            label-class="text-teal"
                            label-style="font-size: 1.1em"
                        />
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
                            v-if="chats.length > 0" class="text-accent q-py-sm">Show More</button>
                        <div class="q-pa-sm text-center text-grey-5" v-else>
                            <q-icon name="sentiment_very_dissatisfied" class="text-h2" />
                            <br />
                            No available person to chat.
                        </div>
                    </div>
                    <div style="flex-grow: 1;" class="bg-green-1">
                        <div class="flex justify-between"
                            style="flex-direction: column;height: 100%; position: relative;" v-if="selected_chat">
                            
                            <q-inner-loading
                                :showing="is_loading_messages"
                                label="Please wait..."
                                label-class="text-teal"
                                label-style="font-size: 1.1em"
                            />
                            <div class="">
                                <div class="text-right q-pa-sm cursor-pointer" @click="closeChat">
                                    [close]
                                </div>
                            </div>
                            <div style="flex-grow: 1; overflow: auto; height: 65vh;">
                                <div v-if="messages.length > 0">
                                    <div v-for="(item, key) in messages" :key="key" class="q-px-lg">
                                        <q-chat-message :text="[item.message]" v-if="item.user_from === user_data.user_id"
                                            sent text-color="white" bg-color="primary">
                                            <template v-slot:name>me</template>
                                            <template v-slot:stamp>
                                                <q-tooltip>
                                                    {{  new Date(item.created_at) }}
                                                </q-tooltip>
                                                {{ $helper.timeSince(item.created_at) }}
                                            </template>
                                        </q-chat-message>
                                        <q-chat-message bg-color="amber" v-else>
                                            <template v-slot:name>{{ selected_chat.first_name }}</template>
                                            <div>
                                                {{ item.message }} 
                                            </div>
                                            <template v-slot:stamp>
                                                <q-tooltip>
                                                    {{  new Date(item.created_at) }}
                                                </q-tooltip>
                                                <div>
                                                    {{ $helper.timeSince(item.created_at) }}
                                                </div>
                                            </template>
                                        </q-chat-message>
                                    </div>
                                </div>
                                <div v-else-if="!is_loading_messages" class="flex justify-center items-center text-h4 text-green-3"
                                    style="position: relative; height: 100%;">
                                    <div class="text-center">
                                        <q-icon name="sentiment_very_satisfied" class="text-h2" />
                                        <br />
                                        Start conversation with <strong>{{ selected_chat.first_name }}</strong>
                                    </div>
                                </div>
                            </div>
                            <div style=" width: 100%;">
                                <q-form @submit="sendMessage()">
                                    <q-input v-model="message" label="Write message" class="q-px-sm"
                                        :disable="is_submitting">
                                        <template v-slot:append>
                                            <q-btn flat>
                                                <q-icon name="send" />
                                            </q-btn>
                                        </template>
                                    </q-input>
                                </q-form>
                            </div>
                        </div>
                        <div class="q-pa-md text-accent" v-else-if="chats.length > 0">
                            Select a user to start conversation
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script>
import { Notify } from 'quasar';
export default {
    data: () => {
        return {
            is_submitting: false,
            is_loading_users: false,
            is_loading_messages: false,
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
                user_from: this.user_data.user_id,
                user_to: '',
                message: this.message,
                limit: this.limit,
            }

            this.is_loading_users = true;
            let { data, status } = await this.$store.dispatch('chats/getAllChats', payload);

            if ([200, 201].includes(status)) {
                this.chats = data.data;
                this.last_page = data.last_page;
            }
            this.is_loading_users = false;
        },

        async getChatsByUser() {
            let payload = {
                user_from: this.user_data.user_id,
                user_to: this.selected_chat.user_id,
            }
            this.is_loading_messages = true;
            let { data, status } = await this.$store.dispatch('chats/getAllChatsByUser', payload);

            if ([200, 201].includes(status)) {
                this.messages = data.data.sort((a, b) => {
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
                });
            }
            this.is_loading_messages = false;
        },

        async sendMessage() {
            if (this.message.length > 0) {
                let payload = {
                    user_from: this.user_data.user_id,
                    user_to: this.selected_chat.user_id,
                    message: this.message
                }
                this.is_submitting = true;
                let { data, status } = await this.$store.dispatch('chats/send', payload);

                if ([200, 201].includes(status)) {
                    Notify.create({
                        message: data.message,
                        position: 'top-right',
                        type: 'positive',
                        timeout: 3000,
                    });
                    this.is_submitting = false;
                    this.message = "";
                    this.getChatsByUser();
                } else {
                    Notify.create({
                        message: data.message,
                        position: 'top-right',
                        type: 'negative',
                        timeout: 3000,
                    });
                    this.is_submitting = false;
                }
            } else {
                Notify.create({
                    message: 'Unable to send empty message',
                    position: 'top-right',
                    type: 'negative',
                    timeout: 3000,
                });
                this.is_submitting = false;
            }
        },

        openChat(item) {
            this.messages = [];
            this.selected_chat = item;
            this.getChatsByUser();
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