<template>
  <Teleport to="body">
    <Transition name="ms-modal">
      <div v-if="modelValue" class="ms-modal__overlay" @mousedown.self="onOverlayClick">
        <div
          class="ms-modal__wrap"
          :style="{ width: width + 'px' }"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
        >

          <div class="ms-modal__header">
            <slot name="header">
              <span :id="titleId" class="ms-modal__title">{{ title }}</span>
            </slot>
            <div class="mi__icon__header__close__icon" @click="close"></div>
          </div>

          <div class="ms-modal__body">

            <div v-if="hasTop" class="ms-modal__top">
              <slot name="top" />
            </div>

            <div class="ms-modal__main">
              <div v-if="hasAvatar" class="ms-modal__avatar-col">
                <slot name="avatar" />
              </div>

              <div class="ms-modal__content">
                <slot />
              </div>
            </div>

          </div>

          <div class="ms-modal__footer">
            <slot name="footer">
              <MsButton type="ghost" @click="close">{{ cancelText }}</MsButton>
              <MsButton type="primary" :loading="loading" @click="$emit('confirm')">
                {{ confirmText }}
              </MsButton>
            </slot>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, useId, useSlots } from 'vue';
import MsButton from '../ms-button/MsButton.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
    default: 700,
  },
  confirmText: {
    type: String,
    default: 'Lưu',
  },
  cancelText: {
    type: String,
    default: 'Hủy',
  },
  closeOnOverlay: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'confirm', 'close']);

const slots = useSlots();
const titleId = useId ? useId() : 'ms-modal-title';

const hasAvatar = computed(() => !!slots.avatar);
const hasTop = computed(() => !!slots.top);

function close() {
  emit('update:modelValue', false);
  emit('close');
}

function onOverlayClick() {
  if (props.closeOnOverlay) close();
}
</script>

<style scoped>

.ms-modal__overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}


.ms-modal__wrap {
  background: #fff;
  border-radius: 10px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  overflow: hidden;
}

.ms-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.ms-modal__title {
  font-size: 17px;
  font-weight: 700;
  color: #111827;
}

.ms-modal__close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 6px;
  color: #6b7280;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.ms-modal__close:hover {
  background: #f3f4f6;
  color: #111827;
}

.ms-modal__body {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column; 
  gap: 24px;
}

.ms-modal__top {
  width: 100%;
}

.ms-modal__main {
  display: flex;
  gap: 24px;
}

.ms-modal__avatar-col {
  flex-shrink: 0;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ms-modal__content {
  flex: 1;
  min-width: 0;
}

.ms-modal__footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  border-top: 1px solid #e5e7eb;
  background: #f8f9fc;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  flex-shrink: 0;
}

.ms-modal-enter-active,
.ms-modal-leave-active {
  transition: opacity 0.2s ease;
}
.ms-modal-enter-active .ms-modal__wrap,
.ms-modal-leave-active .ms-modal__wrap {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.ms-modal-enter-from,
.ms-modal-leave-to {
  opacity: 0;
}
.ms-modal-enter-from .ms-modal__wrap,
.ms-modal-leave-to .ms-modal__wrap {
  transform: translateY(-12px);
  opacity: 0;
}
</style>