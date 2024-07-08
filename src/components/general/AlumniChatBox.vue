<template>
    <div class="chatbox--holder" v-if="logged_in_user">
        <q-btn class="chatbox--button" :icon="show_chats ? 'close' : 'chat'" :color="show_chats ? 'grey-8' : 'secondary'" rounded style="aspect-ratio: 1/1;" @click="show_chats = !show_chats" />
        <div class="chatbox--main" v-if="show_chats">
            <q-card style="height: 100%;">
                <div v-if="!selected_chat" class="q-pa-sm text-white bg-primary">
                    <div><q-icon name="chat" /> Alumni Chatbox</div>
                    <div class="text-caption">connect with other alumni</div>
                </div>
                <q-separator />
                <q-card-section  v-if="!selected_chat">
                    <div style="height: 100%; overflow: auto;">
                        <q-inner-loading
                            :showing="is_loading_users"
                            label="Please wait..."
                            label-class="text-teal"
                            label-style="font-size: 1.1em"
                        />
                        <q-card v-for="(item, key) in chats" :key="key" flat
                            style="border-bottom: 1px solid #f3f3f3; cursor: pointer;" square @click="openChat(item)">
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
                                <small class="text-grey-6 text-right absolute" style="bottom: 5px; right: 5px;">
                                    {{ item.last_message ? `last chat: ${$helper.timeSince(item.last_message.created_at)}` : ''}}
                                </small>
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
                </q-card-section>
                <div v-else class="column" style="height: 100%;">
                    <q-card-section>
                        <div class="flex items-center" style="gap: .5rem; flex: 0;">
                            <q-btn color="teal" dense rounded icon="arrow_back" flat size="sm" @click="closeChat" />
                            <div class="text-caption text-teal-6">{{ selected_chat.first_name }} {{ selected_chat.last_name }}</div>
                            <div></div>
                        </div>
                    </q-card-section>
                    <div style="flex: 1; border-top: 1px solid #DEDEDE; border-bottom: 1px solid #DEDEDE; overflow: auto;">
                        <div v-if="messages.length > 0">
                            <div v-for="(item, key) in messages" :key="key" class="q-px-lg">
                                <q-chat-message :text="[item.message]" v-if="item.user_from === logged_in_user.user_id"
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
                        <div v-else-if="!is_loading_messages" class="flex justify-center items-center text-caption-2 text-green-3"
                            style="position: relative; height: 100%;">
                            <div class="text-center">
                                <q-icon name="sentiment_very_satisfied" class="text-h4" />
                                <br />
                                Start conversation with <strong>{{ selected_chat.first_name }}</strong>
                            </div>
                        </div>
                    </div>
                    <div style="flex: 0;">
                        
                        <q-form @submit="sendMessage()">
                            <q-input v-model="message" dense label="Write message" class="q-px-sm"
                                :disable="is_submitting">
                                <template v-slot:append>
                                    <q-btn flat @click="sendMessage()" dense>
                                        <q-icon name="send" />
                                    </q-btn>
                                </template>
                            </q-input>
                        </q-form>
                    </div>
                </div>
            </q-card>
        </div>
    </div>
</template>

<script>
    import { Notify } from 'quasar';
    export default {
        data: () => {
            return {
                logged_in_user: JSON.parse(localStorage.getItem('user_data') || false),
                // messages
                is_submitting: false,
                is_loading_users: false,
                is_loading_messages: false,
                chats: [],
                message: "",
                limit: 10,
                current_page: 1,
                last_page: 0,
                selected_chat: null,
                messages: [],
                show_chats: false,
            }
        },
        methods: {
            async getChats() {
                let payload = {
                    user_from: this.logged_in_user.user_id,
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

            openChat(item) {
                this.messages = [];
                this.selected_chat = item;
                this.getChatsByUser();
            },
            closeChat() {
                this.selected_chat = null;
            },

            async getChatsByUser() {
                let payload = {
                    user_from: this.logged_in_user.user_id,
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
                        user_from: this.logged_in_user.user_id,
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
        },
        mounted(){
            
            if(this.logged_in_user) {
                this.getChats();
            }
        },
    }
</script>