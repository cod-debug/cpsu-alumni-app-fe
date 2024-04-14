<template>
  <div class="q-px-md q-item-link q-mt-sm">
    <q-item clickable class="rounded-borders" :to="{ name: propsData.link }">
      <q-item-section>
        <div class="row items-center" style="gap: 10px; font-size: 12pt;">
          <q-icon :name="propsData.icon" style="font-size: 16pt;" />
          <q-item-label>{{ propsData.title }}</q-item-label>
        </div>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  props: {
    propsData: {
      type: Object
    }
  }
}
</script>
