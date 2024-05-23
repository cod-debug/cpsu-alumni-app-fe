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
            :class="(!toggle_headers ? 'show': 'hide')"
        />
        <q-btn :icon="toggle_headers ? 'menu' : 'close'" class="navbar-btn-toggle" @click="toggle_headers = !toggle_headers"></q-btn>
      </q-toolbar>
      <main class="public-page-main q-px-lg">
        <div class="glow-effect"></div>
        <div class="glow-effect-2"></div>
        <router-view />
        <div class="footer q-px-md flex flex-row-md flex-col-lg justify-between items-center">
            <div class="footer-text-item text-white flex items-center"><q-icon name="fmd_good" /> Barangay Camingawan, Kabankalan City, Philippines</div>
            <div class="footer-text-item text-white flex items-center"><q-icon name="facebook" /> CPSU Graduate School</div>
            <div class="footer-text-item flex items-center text-secondary"><q-icon name="email" /><a href="mailto:cpsu_gs@cpsu.edu.ph" class="text-secondary">cpsu_gs@cpsu.edu.ph</a></div>
            <div class="footer-text-item flex items-center text-secondary"><q-icon name="public" /><a href="https://www.cpsu.edu.ph" target="_blank" class="text-secondary">cpsu.edu.ph</a></div>
        </div>
      </main>
    </div>
  </template>

<script>
    export default {
        data: () => {
            return {
                toggle_headers: false,
                selected_route: "home-page",
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
                    {
                        label: "Sign In",
                        value: "sign-in-page",
                        to: { name: "sign-in-page" },
                        class: "bg-public-primary text-white"
                    }
                ]
            }
        },

        mounted(){
            this.selected_route = this.$route.name
        },
    }
</script>