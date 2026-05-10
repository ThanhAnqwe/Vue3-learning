<template>
  <div class="ms-input__wrapper" :class="{ 'full-width': fullWidth }">
    <!-- Label -->
    <label v-if="label" class="ms-input__label">
      {{ label }}
      <span v-if="required" class="ms-input__required">*</span>
    </label>

    <!-- Input container — tooltip gắn vào đây -->
    <div
      class="ms-input__container"
      :class="{
        'ms-input__container--error':   hasError,
        'ms-input__container--focused': isFocused,
        'ms-input__container--disabled': disabled,
      }"
    >
      <!-- Slot icon trái -->
      <span v-if="$slots['prefix']" class="ms-input__prefix">
        <slot name="prefix" />
      </span>

      <!-- Input / Textarea -->
      <textarea
        v-if="type === 'textarea'"
        class="ms-input__field ms-input__field--textarea"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :rows="rows"
        v-bind="$attrs"
        @input="handleInput"
        @blur="handleBlur"
        @focus="isFocused = true"
      />
      <input
        v-else
        class="ms-input__field"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        v-bind="$attrs"
        @input="handleInput"
        @blur="handleBlur"
        @focus="isFocused = true"
      />

      <!-- Slot icon phải -->
      <span v-if="$slots['suffix']" class="ms-input__suffix">
        <slot name="suffix" />
      </span>

      <!-- Tooltip lỗi — hiện khi hover vào container -->
      <div v-if="hasError" class="ms-input__tooltip">
        {{ errorMessage }}
      </div>
    </div>

    <!-- 
      Không render error-text ra ngoài để tránh nhảy layout.
      Lỗi chỉ hiện qua border đỏ + tooltip khi hover.
      Nếu dự án cần hiện text lỗi bên dưới, bỏ comment dưới đây:
    -->
    <!-- <div v-if="hasError" class="ms-input__error-text">{{ errorMessage }}</div> -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// ─── inheritAttrs = false để $attrs không tự gắn vào root div ───
defineOptions({ inheritAttrs: false });


const props = defineProps({
  /** Giá trị v-model */
  modelValue: {
    type: [String, Number],
    default: ''
  },
  /** Label hiển thị trên input */
  label: {
    type: String,
    default: ''
  },
  /** Placeholder */
  placeholder: {
    type: String,
    default: ''
  },
  /** Loại input: text | email | password | number | date | textarea */
  type: {
    type: String,
    default: 'text'
  },
  /** Bắt buộc nhập — hiện dấu * đỏ */
  required: {
    type: Boolean,
    default: false
  },
  /** Thông báo lỗi validate */
  errorMessage: {
    type: String,
    default: ''
  },
  /** Chiếm full width trong grid (thêm class full-width) */
  fullWidth: {
    type: Boolean,
    default: false
  },
  /** Số dòng cho textarea */
  rows: {
    type: Number,
    default: 3
  }
});

// ─── Emits ───────────────────────────────────────────────
const emit = defineEmits(['update:modelValue', 'blur', 'change']);

// ─── State ───────────────────────────────────────────────
const isFocused = ref(false);

// ─── Computed ────────────────────────────────────────────
const hasError = computed(() => !!props.errorMessage);

// ─── Handlers ────────────────────────────────────────────

/**
 * Emit giá trị mới khi người dùng nhập.
 * Parent lắng nghe để clear lỗi ngay khi dữ liệu hợp lệ.
 */
const handleInput = (e) => {
  emit('update:modelValue', e.target.value);
};

/**
 * Emit blur để parent validate khi rời ô nhập.
 */
const handleBlur = (e) => {
  isFocused.value = false;
  emit('blur', e.target.value);
};
</script>

<style scoped>
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   WRAPPER
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ms-input__wrapper {
  display: flex;
  flex-direction: column;
}

.full-width {
  grid-column: span 2;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LABEL
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ms-input__label {
  display: block;
  font-weight: 700;
  color: #111827;
  font-size: 14px;
  margin-bottom: 8px;
  text-align: left;
}

.ms-input__required {
  color: #dc3545;
  margin-left: 2px;
}


.ms-input__container {
  position: relative;
  display: flex;
  align-items: center;
  height: 36px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background: #fff;
  transition: border-color 0.15s, box-shadow 0.15s;
}

/* textarea container */
.ms-input__container:has(.ms-input__field--textarea) {
  height: auto;
  align-items: flex-start;
}

.ms-input__container--focused {
  border-color: #2680eb;
  box-shadow: 0 0 0 3px rgba(38, 128, 235, 0.12);
}

.ms-input__container--error {
  border-color: #dc3545 !important;
}

.ms-input__container--error.ms-input__container--focused {
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.12);
}

.ms-input__container--disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}


.ms-input__field {
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 0 12px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
  color: #111827;
  border-radius: 4px;
}

.ms-input__field::placeholder {
  color: #9ca3af;
}

.ms-input__field:disabled {
  cursor: not-allowed;
  color: #6b7280;
}

.ms-input__field--textarea {
  height: auto;
  padding: 10px 12px;
  resize: vertical;
  min-height: 80px;
  line-height: 1.5;
}


.ms-input__prefix,
.ms-input__suffix {
  display: flex;
  align-items: center;
  padding: 0 8px;
  color: #6b7280;
  flex-shrink: 0;
}

.ms-input__prefix + .ms-input__field {
  padding-left: 4px;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TOOLTIP LỖI
   Hiện khi hover vào container đang có lỗi.
   Không chiếm không gian → tránh nhảy layout.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ms-input__tooltip {
  /* Ẩn mặc định */
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
  white-space: nowrap;
  max-width: 280px;
  white-space: normal;
  line-height: 1.4;

  /* Mũi tên nhỏ bên dưới tooltip */
  pointer-events: none;
}

.ms-input__tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 14px;
  border: 5px solid transparent;
  border-top-color: #1f2937;
}

/* Hiện tooltip khi hover vào container lỗi */
.ms-input__container--error:hover .ms-input__tooltip {
  display: block;
}
</style>