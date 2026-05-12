<script setup>
import { ref, onMounted } from 'vue'
import MsToast from './components/ms-toast/MsToast.vue'
import { useToast } from './ult/useToast'

const toastRef = ref(null)
const { setRef } = useToast()

onMounted(() => setRef(toastRef.value))
</script>

<template>
  <router-view></router-view>
  <MsToast ref="toastRef" />
</template>