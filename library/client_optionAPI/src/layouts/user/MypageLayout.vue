<script>
import SideBar from './SideBarComponent.vue';
export default {
  components: {
    SideBar,
  }
}
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <SideBar />
      </div>
      <div class="col-8">
        <router-view />
      </div>
      </div>
    </div>
</template>