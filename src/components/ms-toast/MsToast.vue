<template>
  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="ms-toast__container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="ms-toast"
        :class="`ms-toast--${toast.type}`"
      >
        <!-- Icon -->
        <div class="ms-toast__icon">
          <span v-if="toast.type === 'success'">✓</span>
          <span v-else-if="toast.type === 'error'">✕</span>
          <span v-else-if="toast.type === 'warning'">!</span>
          <span v-else>i</span>
        </div>

        <!-- Message -->
        <div class="ms-toast__message">{{ toast.message }}</div>

        <!-- Close button -->
        <button class="ms-toast__close" @click="remove(toast.id)">✕</button>

        <!-- Progress bar tự động đếm ngược -->
        <div class="ms-toast__progress">
          <div
            class="ms-toast__progress-bar"
            :style="{ animationDuration: `${toast.duration}ms` }"
          ></div>
        </div>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue';

// State
const toasts = ref([]);


/**
 * Thêm toast mới vào danh sách.
 * @param {string} message  - Nội dung thông báo
 * @param {'success'|'error'|'warning'|'info'} type
 * @param {number} duration - Thời gian hiển thị (ms), mặc định 3000
 */
const add = (message, type = 'success', duration = 3000) => {
  const id = Date.now() + Math.random();

  toasts.value.push({ id, message, type, duration });

  setTimeout(() => remove(id), duration);
};

/** Xóa 1 toast theo id */
const remove = (id) => {
  const index = toasts.value.findIndex(t => t.id === id);
  if (index !== -1) toasts.value.splice(index, 1);
};

// Dùng: toastRef.value.success('Thêm thành công')
defineExpose({
  success: (msg, duration)  => add(msg, 'success', duration),
  error:   (msg, duration)  => add(msg, 'error',   duration),
  warning: (msg, duration)  => add(msg, 'warning', duration),
  info:    (msg, duration)  => add(msg, 'info',    duration),
});
</script>

<style scoped>
.ms-toast__container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none; /* container không block click */
}

.ms-toast {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 280px;
  max-width: 400px;
  padding: 12px 14px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  border-left: 4px solid transparent;
  position: relative;
  overflow: hidden;
  font-size: 14px;
}

.ms-toast--success { border-left-color: #22c55e; }
.ms-toast--error   { border-left-color: #ef4444; }
.ms-toast--warning { border-left-color: #f59e0b; }
.ms-toast--info    { border-left-color: #3b82f6; }

.ms-toast__icon {
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
}

.ms-toast--success .ms-toast__icon { background: #22c55e; }
.ms-toast--error   .ms-toast__icon { background: #ef4444; }
.ms-toast--warning .ms-toast__icon { background: #f59e0b; }
.ms-toast--info    .ms-toast__icon { background: #3b82f6; }

.ms-toast__message {
  flex: 1;
  color: #111827;
  line-height: 1.4;
}

.ms-toast__close {
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  font-size: 12px;
  padding: 2px 4px;
  border-radius: 3px;
  transition: color 0.15s, background 0.15s;
}

.ms-toast__close:hover {
  color: #374151;
  background: #f3f4f6;
}

.ms-toast__progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #f3f4f6;
}

.ms-toast__progress-bar {
  height: 100%;
  animation: toast-progress linear forwards;
  transform-origin: left;
}

.ms-toast--success .ms-toast__progress-bar { background: #22c55e; }
.ms-toast--error   .ms-toast__progress-bar { background: #ef4444; }
.ms-toast--warning .ms-toast__progress-bar { background: #f59e0b; }
.ms-toast--info    .ms-toast__progress-bar { background: #3b82f6; }

@keyframes toast-progress {
  from { transform: scaleX(1); }
  to   { transform: scaleX(0); }
}

/* ── Transition animation ── */
.toast-enter-active {
  animation: toast-in 0.25s ease;
}
.toast-leave-active {
  animation: toast-out 0.2s ease forwards;
}

@keyframes toast-in {
  from { opacity: 0; transform: translateX(100%); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes toast-out {
  from { opacity: 1; transform: translateX(0); max-height: 80px; margin-bottom: 0; }
  to   { opacity: 0; transform: translateX(100%); max-height: 0; margin-bottom: -10px; }
}
</style>