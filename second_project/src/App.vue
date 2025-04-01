<template>
  <div>
    <input type="text" v-model.lazy="selected">
    <component v-bind:is="selected"></component>
  </div>
</template>
<script>
import PropsCom from './components/PropsComponent.vue';
import TextModal from './views/TextModal.vue';
export default {
  data() {
    return {
      selected: 'PropsCom'
    }
  },
  components: {
    PropsCom, // PropsCom :PropsCom
    TextModal,
  },
  created() {
    console.log('App.vue Created');
  },
  mounted() {
    console.log('App.vue Mounted');
  }
}
</script>