<template>
  <div class="about">
    <FrontNavbar></FrontNavbar>
    <div class="banner"></div>
    <router-view></router-view>
  </div>
</template>

<style style="scss">
.banner{
  width: 100%;
  height: 200px;
  background-image: url('https://images.unsplash.com/photo-1552750603-ce766628fb20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2948&q=80');
  background-size: cover;
  background-position: center bottom;
  background-attachment: fixed;
  margin-bottom: 40px;
}
</style>

<script>
import FrontNavbar from '@/components/FrontNavbar.vue'

export default {
  components: {
    FrontNavbar
  }
}
</script>
