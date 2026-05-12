import { ref } from 'vue';
 
// 1 instance dùng chung toàn app
const toastRef = ref(null);
 
export const useToast = () => {

  const setRef = (ref) => {
    toastRef.value = ref;
  };
 
  const success = (message, duration) => toastRef.value?.success(message, duration);
  const error   = (message, duration) => toastRef.value?.error(message, duration);
  const warning = (message, duration) => toastRef.value?.warning(message, duration);
  const info    = (message, duration) => toastRef.value?.info(message, duration);
 
  return { setRef, success, error, warning, info };
};