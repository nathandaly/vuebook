<template>
  <q-layout view="hHh lpR fFf" ref="layout">
    <div v-html="formattedPluginStyles"></div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Default'
  data () {
    return {
      formattedPluginStyles: '<style>' + this.getPluginStyles() + '</style>'
    }
  },
  methods: {
    ...mapGetters('global', [
      'getPluginStyles'
    ])
  }
}
</script>
