<template>
  <button :class="[
    'ms-button',
    `ms-button--${type}`
  ]">
    <i v-if="icon && positionIcon === 'left'" class="ms-button__icon ms-button__icon--left fa" :class="icon">
    </i>

    <span class="ms-button__content">
      <slot></slot>
    </span>

    <i v-if="icon && positionIcon === 'right'" class="ms-button__icon ms-button__icon--right fa" :class="icon">
    </i>
  </button>
</template>

<script setup>
//#region Props
const props = defineProps({
  icon: {
    type: Object,
    default: null,
  },
  positionIcon: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  },
  type: {
    type: String,
    default: 'primary'
  }
})
//#endregion
</script>

<style scoped>
.ms-button {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.ms-button--primary {
  background-color: #1976d2;
  color: white;
}

.ms-button--link {
  background: none;
  color: #1976d2;
  padding: 0;
}

.ms-button--warning {
  background-color: #ff9800;
  color: white;
}

.ms-button--danger {
  background-color: #dc3545;
  color: white;
}

.ms-button__content {
  white-space: nowrap;
}

.ms-button__icon {
  display: inline-flex;
  align-items: center;
}

.ms-button__icon--left {
  margin-right: 8px;
}

.ms-button__icon--right {
  margin-left: 8px;
}
</style>



<!-- <style lang="scss" scoped>
.ms-button {
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  // Type modifiers
  &--primary {
    background-color: #1976d2;
    color: white;
  }

  &--link {
    background: none;
    color: #1976d2;
    padding: 0;
  }

  &--warning {
    background-color: #ff9800;
    color: white;
  }

  &--danger {
    background-color: #dc3545;
    color: white;
  }

  // Elements
  &__content {
    white-space: nowrap;
  }

  &__icon {
    display: inline-flex;
    align-items: center;

    // Icon modifiers
    &--left {
      margin-right: 8px;
    }

    &--right {
      margin-left: 8px;
    }
  }
}
</style> -->
