<!-- src/components/base/Pagination.vue -->
<template>
  <div class="pagination__container">

    <!-- Bên trái: tổng bản ghi -->
    <div class="pagination__left">
      Tổng: <b>{{ total }}</b> bản ghi
    </div>

    <!-- Bên phải: page size + info + nav -->
    <div class="pagination__right">

      <!-- Số bản ghi / trang -->
      <div class="pagination__page-size">
        Số bản ghi/trang
        <select
          class="pagination__select"
          :value="pageSize"
          @change="handlePageSizeChange"
        >
          <option v-for="size in pageSizeOptions" :key="size" :value="size">
            {{ size }}
          </option>
        </select>
      </div>

      <!-- Thông tin từ - đến -->
      <div class="pagination__info">
        {{ fromRecord }} - {{ toRecord }} bản ghi
      </div>

      <!-- Nút điều hướng -->
      <div class="pagination__nav">
        <span
          class="nav__arrow"
          :class="{ 'nav__arrow--disabled': currentPage <= 1 }"
          @click="handlePrev"
        >&lt;</span>
        <span
          class="nav__arrow"
          :class="{ 'nav__arrow--disabled': currentPage >= totalPages }"
          @click="handleNext"
        >&gt;</span>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

// ─── Props ───────────────────────────────────────────────
const props = defineProps({
  /** Tổng số bản ghi từ API (X-Total-Count) */
  total: {
    type: Number,
    default: 0
  },
  /** Trang hiện tại */
  currentPage: {
    type: Number,
    default: 1
  },
  /** Số bản ghi mỗi trang */
  pageSize: {
    type: Number,
    default: 15
  },
  /** Các lựa chọn số bản ghi / trang */
  pageSizeOptions: {
    type: Array,
    default: () => [15, 25, 50]
  }
});

const emit = defineEmits(['update:currentPage', 'update:pageSize']);

const totalPages = computed(() =>
  Math.ceil(props.total / props.pageSize) || 1
);

const fromRecord = computed(() =>
  props.total === 0 ? 0 : (props.currentPage - 1) * props.pageSize + 1
);

const toRecord = computed(() =>
  Math.min(props.currentPage * props.pageSize, props.total)
);

const handlePrev = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1);
  }
};

const handleNext = () => {
  if (props.currentPage < totalPages.value) {
    emit('update:currentPage', props.currentPage + 1);
  }
};

const handlePageSizeChange = (e) => {
  emit('update:pageSize', Number(e.target.value));
  emit('update:currentPage', 1);
};
</script>

<style scoped>
.pagination__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f9fafb;
  border-top: 1px solid #dddde4;
  flex-shrink: 0;
}

.pagination__right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.pagination__page-size {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #374151;
}

.pagination__select {
  padding: 4px 8px;
  border: 1px solid #dddde4;
  border-radius: 4px;
  margin: 0 8px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
}

.pagination__select:focus {
  border-color: #1a73e8;
}

.pagination__info {
  font-size: 14px;
  color: #374151;
}

.pagination__nav {
  display: flex;
  gap: 4px;
}

.nav__arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  border: 1px solid #dddde4;
  background: #fff;
  transition: background 0.15s, border-color 0.15s;
  user-select: none;
}

.nav__arrow:hover:not(.nav__arrow--disabled) {
  background: #e5e7eb;
  border-color: #9ca3af;
}

.nav__arrow--disabled {
  color: #d1d5db;
  cursor: not-allowed;
  border-color: #e5e7eb;
}
</style>