
<template>
  <div class="layout-wrapper">
    <!-- Component Navbar -->
    <Navbar />
    
    <!-- Component Sidebar -->
    <Sidebar />
    
    <!-- Content -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import Navbar from '../components/layout/NavBar.vue';
import Sidebar from '../components/layout/Sidebar.vue';
</script>

<style scoped>
.layout-wrapper {
  position: relative;
  min-height: 100vh;
}
</style>