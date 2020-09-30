<template>
  <div class="q-pa-sm-sm splash-container">
    <div v-html="formattedPluginStyles"></div>
    <img src="../assets/mainload.gif">
    <p style="font-size: 16px;">{{ $t('loadingDotDotDot') }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Loading',
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
<style scoped>
  .splash-container {
    white-space: nowrap;
    margin: 10em 0;
    text-align: center;
  }

  .page {
    background: #fff;
  }

  img {
    max-width: 100%;
    height: auto;
    width: auto\9; /* ie8 */
  }
</style>
