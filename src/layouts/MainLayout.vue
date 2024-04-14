<template>
  <q-layout>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="text-white" style="background-color: #00bf63;">
      <q-list style="overflow: auto; max-height: 90%;">
        <q-item-label header class="row justify-center">
          <img alt="Quasar logo" src="~assets/logo.png" style="width: 50%;">
        </q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" :propsData="link" />
        <br />
        <EssentialLink v-for="link in essentialLinks2" :key="link.title" :propsData="link" />

        <div class="q-px-md q-item-link q-mt-sm">
          <q-item clickable class="rounded-borders" @click="confirm_logout">
            <q-item-section>
              <div class="row items-center" style="gap: 10px; font-size: 12pt;">
                <q-icon name="logout" style="font-size: 16pt;" />
                <q-item-label>Logout</q-item-label>
              </div>
            </q-item-section>
          </q-item>
        </div>
        <div class="q-px-md q-item-link q-mt-sm">
          <q-item clickable class="rounded-borders absolute" style="bottom: 10px; width: 88%;">
            <q-item-section>
              <div class="row items-center" style="gap: 10px; font-size: 12pt;">
                <q-icon name="help" style="font-size: 16pt;" />
                <q-item-label>Help</q-item-label>
              </div>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container :style="`padding-left: ${leftDrawerOpen ? '250px' : '0px'}; max-height: 100vh; overflow: auto;`">
      <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" color="primary" class="absolute"
        style="z-index: 200;" />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import Swal from "sweetalert2";

export default {
  data: () => {
    return {
      leftDrawerOpen: true,
      essentialLinks: [
        {
          title: 'Dashboard',
          icon: 'dashboard',
          link: 'dashboard'
        },
        {
          title: 'Alumni',
          icon: 'account_circle',
          link: 'alumni'
        },
        {
          title: 'Reports',
          icon: 'pie_chart',
          link: 'reports'
        },
        {
          title: 'Settings',
          icon: 'settings',
          link: 'settings'
        }
      ],
      essentialLinks2: [
        {
          title: 'Notifications',
          icon: 'notifications_active',
          link: 'notifications'
        },
        {
          title: 'Message',
          icon: 'chat',
          link: 'message'
        },
      ]
    }
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    confirm_logout() {
      let vm = this;
      Swal.fire({
        title: 'Logging Out',
        text: 'Are you sure you want to Logout?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout',
      }).then((result) => {
        if (result.isConfirmed) {
          vm.logout();
        }
      });
    },
    logout() {
      localStorage.clear();
      // this.$router.push({ name: 'login' });
      window.location.href = "/#/auth/login";
    }
  },
  components: {
    EssentialLink,
  }
}
</script>
