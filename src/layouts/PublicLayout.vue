<template>
    <div>
      <q-toolbar class="q-py-md toolbar">
        <q-item stretch flat class="items-center">
          <img alt="Quasar logo" src="~assets/logo.png" style="width: 60px;">
          <div class="text-h5 text-bold">CPSU GRADUATE SCHOOL ALUMNI</div>
        </q-item>
        
      <q-space />
        <q-btn-toggle
            v-model="selected_route"
            flat stretch
            :options="options"
            style="height: 30px;"
            class="self-center quasar-toolbar-toggle"
            toggle-color="public-primary"
            :class="(toggle_headers ? 'show': 'hide')"
        />
        <q-btn color="secondary" :icon="toggle_headers ? 'close' : 'menu'" class="navbar-btn-toggle" @click="toggle_headers = !toggle_headers"></q-btn>
        <q-btn v-if="logged_in_user" title="Sign Out" icon="logout" color="teal" @click="signOut" class="q-ml-sm" />
      </q-toolbar>
      <main class="public-page-main q-px-lg">
        <div class="glow-effect"></div>
        <div class="glow-effect-2"></div>
        <router-view />
        <div class="footer q-px-md flex flex-row-md flex-col-lg justify-between items-center">
            <div class="footer-text-item text-white flex items-center"><q-icon name="fmd_good" /> Barangay Camingawan, Kabankalan City, Philippines</div>
            <div class="footer-text-item text-white flex items-center"><q-icon name="facebook" /> CPSU Graduate School</div>
            <div class="footer-text-item flex items-center text-white"><q-icon name="email" /><a href="mailto:cpsu_gs@cpsu.edu.ph" class="text-white">cpsu_gs@cpsu.edu.ph</a></div>
            <div class="footer-text-item flex items-center text-white"><q-icon name="public" /><a href="https://www.cpsu.edu.ph" target="_blank" class="text-white">cpsu.edu.ph</a></div>
        </div>
        <app-alumni-chat-box ref="alumni_chatbox" />
      </main>
    </div>
  </template>

<script>
    import AlumniChatBox from 'components/general/AlumniChatBox.vue';
    export default {
        data: () => {
            return {
                toggle_headers: false,
                selected_route: "home-page",
                logged_in_user: JSON.parse(localStorage.getItem('user_data') || false),
                options: [
                    {
                        label: "Home",
                        value: "home-page",
                        to: { name: "home-page" }
                    },
                    {
                        label: "Events",
                        value: "events-page",
                        to: { name: "events-page" }
                    },
                    {
                        label: "About Us",
                        value: "about-page",
                        to: { name: "about-page" }
                    },
                    {
                        label: "Contact Us",
                        value: "contact-page",
                        to: { name: "contact-page" }
                    },
                ],
            }
        },

        methods: {
            gotoAdminLogin(){
                var pressedKeys = {};
                var vm = this;

                function handleKeyDown(event) {
                    pressedKeys[event.keyCode] = true;

                    if (pressedKeys[16] && pressedKeys[18] && (pressedKeys[65] || pressedKeys[97])) {
                        vm.$router.push({name: 'login'});
                    }
                }

                function handleKeyUp(event) {
                    delete pressedKeys[event.keyCode];
                }
                document.addEventListener('keydown', handleKeyDown);
                document.addEventListener('keyup', handleKeyUp);
            },
            signOut(){
                localStorage.clear();
                window.location.reload();
            }
        },

        mounted(){
            this.selected_route = this.$route.name;
            this.gotoAdminLogin();
            if(!this.logged_in_user) {
                this.options.push(
                    {
                        label: "Sign In",
                        value: "sign-in-page",
                        to: { name: "sign-in-page" },
                        class: "bg-public-primary text-white"
                    }
                );
            } else {
                this.options.push(
                    {
                        label: "Profile",
                        value: "profile-page",
                        to: { name: "profile-page" }
                    }
                );
            }
        },
        components: {
            appAlumniChatBox: AlumniChatBox,
        },
    }
</script>