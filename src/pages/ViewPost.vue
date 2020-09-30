<template>
  <q-page>
    <Post class="q-pt-sm" :post="activePost"></Post>
  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import Post from '../components/Post'

export default {
  name: 'ViewPost',

  components: {
    Post
  },

  methods: {
    beforeDestroy () {
      this.$q.loading.hide()
    }
  },

  computed: {
    ...mapState('post', [
      'activePost'
    ])
  },

  watch: {
    activePost (newValue) {
      newValue === null ? this.$q.loading.show() : this.$q.loading.hide()
    }
  }
}
</script>

<style scoped>

</style>
