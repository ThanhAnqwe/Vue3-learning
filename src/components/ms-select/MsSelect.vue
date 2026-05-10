<!-- src/components/base/MsSelect.vue -->
<template>
  <div class="ms-select__wrapper" :class="{ 'full-width': fullWidth }">
    <!-- Label -->
    <label v-if="label" class="ms-select__label">
      {{ label }}
      <span v-if="required" class="ms-select__required">*</span>
    </label>

    <!-- Select container -->
    <div
      class="ms-select__container"
      :class="{
        'ms-select__container--error':    hasError,
        'ms-select__container--focused':  isFocused,
        'ms-select__container--disabled': disabled,
      }"
    >
      <select
        class="ms-select__field"
        :value="modelValue"
        :disabled="disabled"
        v-bind="$attrs"
        @change="handleChange"
        @blur="handleBlur"
        @focus="isFocused = true"
      >
        <!-- Placeholder option -->
        <option
          v-if="placeholder"
          value=""
          disabled
          hidden
          :selected="modelValue === '' || modelValue == null"
        >
          {{ placeholder }}
        </option>

        <!-- Options từ prop options (dạng mảng object) -->
        <option
          v-for="opt in options"
          :key="opt[valueKey]"
          :value="opt[valueKey]"
        >
          {{ opt[labelKey] }}
        </option>

        <!-- Slot fallback: dùng khi muốn tự viết <option> tay -->
        <slot />
      </select>

      <!-- Icon mũi tên — CSS tự vẽ, không cần icon font -->
      <span class="ms-select__arrow" aria-hidden="true"></span>

      <!-- Tooltip lỗi -->
      <div v-if="hasError" class="ms-select__tooltip">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

defineOptions({ inheritAttrs: false });

// ─── Props ───────────────────────────────────────────────
const props = defineProps({
  /** Giá trị v-model */
  modelValue: {
    type: [String, Number, null],
    default: ''
  },
  /** Label */
  label: {
    type: String,
    default: ''
  },
  /** Placeholder */
  placeholder: {
    type: String,
    default: 'Chọn...'
  },
  /** Giá trị để chọn */
  options: {
    type: Array,
    default: () => []
  },
  /** Field dùng làm value trong mỗi option object */
  valueKey: {
    type: String,
    default: 'value'
  },
  /** Field dùng làm label hiển thị trong mỗi option object */
  labelKey: {
    type: String,
    default: 'label'
  },
  /** Bắt buộc chọn */
  required: {
    type: Boolean,
    default: false
  },
  /** Thông báo lỗi */
  errorMessage: {
    type: String,
    default: ''
  },
  /** Full width trong grid */
  fullWidth: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue', 'blur', 'change']);

const isFocused = ref(false);

const hasError = computed(() => !!props.errorMessage);

const handleChange = (e) => {
  emit('update:modelValue', e.target.value);
  emit('change', e.target.value);
};

const handleBlur = (e) => {
  isFocused.value = false;
  emit('blur', e.target.value);
};
</script>

<style scoped>
.ms-select__wrapper {
  display: flex;
  flex-direction: column;
}

.full-width {
  grid-column: span 2;
}

.ms-select__label {
  display: block;
  font-weight: 700;
  color: #111827;
  font-size: 14px;
  margin-bottom: 8px;
  text-align: left;
}

.ms-select__required {
  color: #dc3545;
  margin-left: 2px;
}

.ms-select__container {
  position: relative;
  height: 36px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: #fff;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.ms-select__container--focused {
  border-color: #2680eb;
  box-shadow: 0 0 0 3px rgba(38, 128, 235, 0.12);
}

.ms-select__container--error {
  border-color: #dc3545 !important;
}

.ms-select__container--error.ms-select__container--focused {
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.12);
}

.ms-select__container--disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SELECT FIELD
   Ẩn mũi tên mặc định của browser,
   dùng mũi tên CSS custom bên dưới.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ms-select__field {
  width: 100%;
  height: 100%;
  padding: 0 36px 0 12px; /* padding-right chừa chỗ cho mũi tên */
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #111827;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  border-radius: 4px;
}

.ms-select__field:disabled {
  cursor: not-allowed;
  color: #6b7280;
}

/* Màu placeholder option */
.ms-select__field option[value=""][disabled] {
  color: #9ca3af;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   MŨI TÊN CUSTOM (CSS chevron)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ms-select__arrow {
  pointer-events: none;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #6b7280;
  transition: transform 0.15s;
}

/* Khi focus, xoay mũi tên lên */
.ms-select__container--focused .ms-select__arrow {
  border-top-color: #2680eb;
  transform: translateY(-50%) rotate(180deg);
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TOOLTIP LỖI (giống MsInput)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ms-select__tooltip {
  display: none;

  position: absolute;
  bottom: calc(100% + 6px);
  left: 0;
  z-index: 100;

  background: #1f2937;
  color: #fff;
  font-size: 12px;
  padding: 6px 10px;
  border-radius: 4px;
  white-space: normal;
  max-width: 280px;
  line-height: 1.4;
  pointer-events: none;
}

.ms-select__tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 14px;
  border: 5px solid transparent;
  border-top-color: #1f2937;
}

.ms-select__container--error:hover .ms-select__tooltip {
  display: block;
}
</style>