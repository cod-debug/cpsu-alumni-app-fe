<template>
    <div>
      <q-toolbar class="text-secondary q-py-md toolbar">
        <q-item stretch flat class="items-center">
          <img alt="Quasar logo" src="~assets/logo.png" style="width: 60px;">
          <div class="text-h5 text-bold">CPSU GRADUATE SCHOOL ALUMNI</div>
        </q-item>
        
      <q-space />

        <q-btn-toggle
            flat stretch
            :options="options"
            style="height: 30px;"
            class="self-center quasar-toolbar-toggle"
            :class="!toggle_headers ? 'show': 'hide'"
        />
        <q-btn :icon="toggle_headers ? 'menu' : 'close'" class="navbar-btn-toggle" @click="toggle_headers = !toggle_headers"></q-btn>
      </q-toolbar>
      <main>
        <router-view />
      </main>
    </div>
  </template>

<script>
    export default {
        data: () => {
            return {
                toggle_headers: false,
                options: [
                    {
                        label: "Home",
                        to: { name: "home-page" }
                    },
                    {
                        label: "Events",
                        to: { name: "events-page" }
                    },
                    {
                        label: "About Us",
                        to: { name: "about-page" }
                    },
                    {
                        label: "Contact Us",
                        to: { name: "contact-page" }
                    },
                    {
                        label: "Sign In",
                        to: { name: "sign-in-page" },
                        class: "bg-secondary text-white"
                    }
                ]
            }
        }
    }
</script>