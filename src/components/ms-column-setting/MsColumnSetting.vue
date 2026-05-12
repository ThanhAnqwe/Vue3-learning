<template>
  <div class="col-setting__wrap" ref="wrapRef">

    <!-- Nút trigger -->
    <button class="button__outline" @click="togglePanel">
      <div class="mi__icon__setting__column"></div>
    </button>

    <!-- Panel dropdown -->
    <div v-if="isOpen" class="col-setting__panel">

      <!-- Search -->
      <div class="col-setting__search">
        <span class="col-setting__search-icon">🔍</span>
        <input
          v-model="searchText"
          class="col-setting__search-input"
          placeholder="Tìm Kiếm"
          type="text"
        />
      </div>

      <!-- Danh sách cột -->
      <div class="col-setting__list">
        <label
          v-for="col in filteredColumns"
          :key="col.key"
          class="col-setting__item"
        >
          <input
            type="checkbox"
            class="col-setting__checkbox"
            :checked="tempVisible.includes(col.key)"
            @change="toggleColumn(col.key)"
          />
          <span class="col-setting__label">{{ col.label }}</span>
        </label>

        <!-- Empty state khi search không ra -->
        <div v-if="filteredColumns.length === 0" class="col-setting__empty">
          Không tìm thấy cột
        </div>
      </div>

      <!-- Footer -->
      <div class="col-setting__footer">
        <button class="col-setting__btn col-setting__btn--cancel" @click="handleCancel">
          Hủy
        </button>
        <button class="col-setting__btn col-setting__btn--save" @click="handleSave">
          Lưu
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';

// ─── Props ───────────────────────────────────────────────
const props = defineProps({
  /**
   * Danh sách tất cả cột có thể hiển thị.
   * Mỗi item: { key: string, label: string }
   */
  columns: {
    type: Array,
    required: true
  },
  /**
   * Danh sách key các cột đang được hiển thị.
   * v-model:visibleColumns
   */
  visibleColumns: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:visibleColumns']);

// ─── State ───────────────────────────────────────────────
const isOpen     = ref(false);
const searchText = ref('');
const wrapRef    = ref(null);

/**
 * tempVisible: bản sao tạm thời để chỉnh sửa.
 * Chỉ emit ra ngoài khi ấn Lưu, không ảnh hưởng bảng ngay lập tức.
 */
const tempVisible = ref([...props.visibleColumns]);

// Sync lại khi visibleColumns từ ngoài thay đổi
watch(() => props.visibleColumns, (val) => {
  tempVisible.value = [...val];
});

// ─── Computed ────────────────────────────────────────────
const filteredColumns = computed(() => {
  const q = searchText.value.trim().toLowerCase();
  if (!q) return props.columns;
  return props.columns.filter(col =>
    col.label.toLowerCase().includes(q)
  );
});

// ─── Methods ─────────────────────────────────────────────
const togglePanel = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    // Reset temp về state hiện tại mỗi lần mở
    tempVisible.value = [...props.visibleColumns];
    searchText.value  = '';
  }
};

const toggleColumn = (key) => {
  const idx = tempVisible.value.indexOf(key);
  if (idx === -1) {
    tempVisible.value.push(key);
  } else {
    // Không cho bỏ tick hết — giữ ít nhất 1 cột
    if (tempVisible.value.length > 1) {
      tempVisible.value.splice(idx, 1);
    }
  }
};

const handleSave = () => {
  // Giữ đúng thứ tự cột gốc khi emit ra ngoài
  const ordered = props.columns
    .map(col => col.key)
    .filter(key => tempVisible.value.includes(key));

  emit('update:visibleColumns', ordered);
  isOpen.value = false;
};

const handleCancel = () => {
  tempVisible.value = [...props.visibleColumns]; // hoàn tác
  isOpen.value      = false;
};

// ─── Click outside để đóng panel ─────────────────────────
const handleClickOutside = (e) => {
  if (wrapRef.value && !wrapRef.value.contains(e.target)) {
    handleCancel();
  }
};

onMounted(() => document.addEventListener('mousedown', handleClickOutside));
onBeforeUnmount(() => document.removeEventListener('mousedown', handleClickOutside));
</script>

<style scoped>
/* ── Wrapper relative để panel định vị theo nút ── */
.col-setting__wrap {
  position: relative;
}

/* ── Panel ── */
.col-setting__panel {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 300;
  width: 260px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* ── Search ── */
.col-setting__search {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-bottom: 1px solid #f3f4f6;
}

.col-setting__search-icon {
  font-size: 13px;
  color: #9ca3af;
  flex-shrink: 0;
}

.col-setting__search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #111827;
  background: transparent;
}

.col-setting__search-input::placeholder {
  color: #9ca3af;
}

/* ── List ── */
.col-setting__list {
  flex: 1;
  overflow-y: auto;
  max-height: 320px;
  padding: 6px 0;
}

/* Custom scrollbar */
.col-setting__list::-webkit-scrollbar { width: 6px; }
.col-setting__list::-webkit-scrollbar-track { background: transparent; }
.col-setting__list::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }

/* ── Item ── */
.col-setting__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.1s;
}

.col-setting__item:hover {
  background: #f9fafb;
}

.col-setting__checkbox {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  cursor: pointer;
  accent-color: #2680eb;
}

.col-setting__label {
  font-size: 14px;
  color: #111827;
  user-select: none;
}

/* ── Empty ── */
.col-setting__empty {
  padding: 20px;
  text-align: center;
  color: #9ca3af;
  font-size: 14px;
}

/* ── Footer ── */
.col-setting__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 10px 12px;
  border-top: 1px solid #f3f4f6;
}

.col-setting__btn {
  height: 32px;
  padding: 0 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background 0.15s;
}

.col-setting__btn--cancel {
  background: transparent;
  color: #374151;
}
.col-setting__btn--cancel:hover {
  background: #f3f4f6;
}

.col-setting__btn--save {
  background: #2680eb;
  color: #fff;
}
.col-setting__btn--save:hover {
  background: #1d68c1;
}
</style>