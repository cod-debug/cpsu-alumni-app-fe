<template>
    <div>
        <q-toolbar class="q-py-md toolbar" id="headerNav">
            <q-item stretch flat class="items-center">
                <img alt="Quasar logo" src="~assets/logo.png" style="width: 60px;">
                <div class="text-normal text-bold">CPSU GRADUATE SCHOOL ALUMNI</div>
            </q-item>

            <q-space />
            <q-btn-toggle v-model="selected_route" flat stretch :options="options" style="height: 30px;"
                class="self-center quasar-toolbar-toggle" toggle-color="public-primary"
                :class="(toggle_headers ? 'show' : 'hide')" />
            <q-btn color="secondary" :icon="toggle_headers ? 'close' : 'menu'" class="navbar-btn-toggle"
                @click="toggle_headers = !toggle_headers"></q-btn>
            <q-btn v-if="logged_in_user" title="Sign Out" icon="logout" color="teal" @click="signOut" class="q-ml-sm" />
        </q-toolbar>
        <main class="public-page-main q-px-lg q-pb-xl">
            <div class="glow-effect"></div>
            <div class="glow-effect-2"></div>
            <router-view />
            <div class="footer q-px-md flex flex-row-md flex-col-lg justify-between items-center">
                <div class="footer-text-item text-white flex items-center"><q-icon name="fmd_good" /> Barangay
                    Camingawan, Kabankalan City, Philippines</div>
                <a href="https://www.facebook.com/gradschoolcpsu" class="footer-text-item text-white flex items-center"
                    target="_blank"><q-icon name="facebook" /> CPSU Graduate School</a>
                <div class="footer-text-item flex items-center text-white"><q-icon name="email" /><a
                        href="mailto:cpsu_gs@cpsu.edu.ph" class="text-white">cpsu_gs@cpsu.edu.ph</a></div>
                <div class="footer-text-item flex items-center text-white"><q-icon name="public" /><a
                        href="https://www.cpsu.edu.ph" target="_blank" class="text-white">cpsu.edu.ph</a></div>
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
                    label: "Job Posting",
                    value: "job-posting-page",
                    to: { name: "job-posting-page" }
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
        signOut() {
            localStorage.clear();
            window.location.reload();
        }
    },

    mounted() {
        this.selected_route = this.$route.name;
        if (!this.logged_in_user) {
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

        window.document.addEventListener("scroll", () => {
            const headerNav = document.getElementById("headerNav");
            headerNav.style.transition = ".3s ease-in-out all";
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                headerNav.style.backgroundColor = "white";
                headerNav.style.boxShadow = "0px 2px 4px darkgray";
            } else {
                headerNav.style.backgroundColor = "transparent";
                headerNav.style.boxShadow = "unset";
            }
        });
    },
    components: {
        appAlumniChatBox: AlumniChatBox,
    },
}
</script>