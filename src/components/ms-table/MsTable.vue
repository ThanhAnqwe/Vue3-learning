<!-- src/components/base/MsTable.vue -->
<template>
  <div class="ms-table__wrapper">
    <div class="ms-table__scroll">
      <table class="ms-table">
        <!-- ===== THEAD ===== -->
        <thead>
          <tr>
            <!-- Checkbox column -->
            <th
              v-if="selectable"
              class="ms-table__th ms-table__col--checkbox ms-table__col--sticky-left"
            >
              <input
                type="checkbox"
                :checked="isAllSelected"
                :indeterminate="isIndeterminate"
                @change="toggleSelectAll"
              />
            </th>

            <!-- Data columns -->
            <th
              v-for="col in columns"
              :key="col.key"
              class="ms-table__th"
              :class="[
                col.thClass,
                col.sticky === 'left'  ? 'ms-table__col--sticky-left'  : '',
                col.sticky === 'right' ? 'ms-table__col--sticky-right' : '',
                col.align  ? `ms-table__align--${col.align}` : '',
                col.sortable ? 'ms-table__th--sortable' : ''
              ]"
              :style="col.width ? { minWidth: col.width, width: col.width } : {}"
              @click="col.sortable ? handleSort(col.key) : null"
            >
              <div class="ms-table__th-inner">
                <slot :name="`header-${col.key}`" :col="col">
                  {{ col.label }}
                </slot>
                <!-- Sort icon -->
                <span v-if="col.sortable" class="ms-table__sort-icon">
                  <span :class="getSortClass(col.key)"></span>
                </span>
              </div>
            </th>

            <!-- Action column -->
            <th
              v-if="hasAction"
              class="ms-table__th ms-table__col--action ms-table__col--sticky-right"
            ></th>
          </tr>
        </thead>

        <!-- ===== TBODY ===== -->
        <tbody>
          <!-- Empty state -->
          <tr v-if="!rows || rows.length === 0">
            <td
              :colspan="totalColspan"
              class="ms-table__empty"
            >
              <slot name="empty">
                <div class="ms-table__empty-content">
                  <span class="ms-table__empty-icon">📭</span>
                  <span>{{ emptyText }}</span>
                </div>
              </slot>
            </td>
          </tr>

          <!-- Data rows -->
          <tr
            v-else
            v-for="(row, rowIndex) in rows"
            :key="rowKey ? row[rowKey] : rowIndex"
            class="ms-table__tr"
            :class="{
              'ms-table__tr--selected': isRowSelected(row),
              'ms-table__tr--clickable': rowClickable
            }"
            @click="rowClickable ? $emit('row-click', row) : null"
          >
            <!-- Checkbox cell -->
            <td
              v-if="selectable"
              class="ms-table__td ms-table__col--checkbox ms-table__col--sticky-left"
              @click.stop
            >
              <input
                type="checkbox"
                :checked="isRowSelected(row)"
                @change="toggleSelectRow(row)"
              />
            </td>

            <!-- Data cells -->
            <td
              v-for="col in columns"
              :key="col.key"
              class="ms-table__td"
              :class="[
                col.tdClass,
                col.sticky === 'left'  ? 'ms-table__col--sticky-left'  : '',
                col.sticky === 'right' ? 'ms-table__col--sticky-right' : '',
                col.align  ? `ms-table__align--${col.align}` : ''
              ]"
            >
              <!-- Custom slot per column -->
              <slot
                v-if="col.type === 'custom' || $slots[`col-${col.key}`]"
                :name="`col-${col.key}`"
                :row="row"
                :col="col"
                :value="row[col.key]"
                :index="rowIndex"
              >
                {{ formatValue(row[col.key], col) }}
              </slot>

              <!-- Default render -->
              <template v-else>
                {{ formatValue(row[col.key], col) }}
              </template>
            </td>

            <!-- Action cell -->
            <td
              v-if="hasAction"
              class="ms-table__td ms-table__col--action ms-table__col--sticky-right"
              @click.stop
            >
              <div class="ms-table__action-group">
                <slot
                  name="action"
                  :row="row"
                  :index="rowIndex"
                >
                  <!-- Default action buttons -->
                  <button
                    v-if="showEdit"
                    class="ms-table__action-btn ms-table__action-btn--edit"
                    title="Sửa"
                    @click="$emit('edit', row)"
                  >
                    <span class="mi__icon__edit"></span>
                  </button>
                  <button
                    v-if="showDelete"
                    class="ms-table__action-btn ms-table__action-btn--delete"
                    title="Xóa"
                    @click="$emit('delete', row)"
                  >
                    <span class="mi__icon__delete"></span>
                  </button>
                </slot>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// ─────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────
const props = defineProps({
  /** Danh sách cột - xem JSDoc bên dưới */
  columns: {
    type: Array,
    required: true
    /**
     * Mỗi column object gồm:
     * {
     *   key: string,          // (bắt buộc) map với field trong row
     *   label: string,        // (bắt buộc) tiêu đề cột
     *   type?: 'text'|'number'|'date'|'custom', // default: 'text'
     *   width?: string,       // vd: '150px', '10%'
     *   align?: 'left'|'center'|'right',
     *   sticky?: 'left'|'right',
     *   sortable?: boolean,
     *   thClass?: string,     // class thêm cho <th>
     *   tdClass?: string,     // class thêm cho <td>
     *   format?: (value, row) => string  // custom formatter
     * }
     */
  },
  /** Dữ liệu hiển thị */
  rows: {
    type: Array,
    default: () => []
  },
  /** Field dùng làm key cho v-for */
  rowKey: {
    type: String,
    default: 'id'
  },
  /** Hiện cột checkbox chọn dòng */
  selectable: {
    type: Boolean,
    default: false
  },
  /** Hiện cột action (edit/delete) */
  hasAction: {
    type: Boolean,
    default: true
  },
  /** Hiện nút sửa mặc định */
  showEdit: {
    type: Boolean,
    default: true
  },
  /** Hiện nút xóa mặc định */
  showDelete: {
    type: Boolean,
    default: true
  },
  /** Cho phép click vào row */
  rowClickable: {
    type: Boolean,
    default: false
  },
  /** Text khi không có dữ liệu */
  emptyText: {
    type: String,
    default: 'Không có dữ liệu'
  },
  /** Danh sách row đang được chọn (dùng khi selectable = true) */
  selected: {
    type: Array,
    default: () => []
  },
  /** Key dùng để so sánh row khi select */
  selectedKey: {
    type: String,
    default: 'id'
  }
});

// ─────────────────────────────────────────────
// Emits
// ─────────────────────────────────────────────
const emit = defineEmits([
  'edit',
  'delete',
  'row-click',
  'update:selected',
  'sort'
]);

// ─────────────────────────────────────────────
// Sort
// ─────────────────────────────────────────────
const sortKey = ref('');
const sortDir = ref('asc'); // 'asc' | 'desc' | ''

const handleSort = (key) => {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : sortDir.value === 'desc' ? '' : 'asc';
    if (sortDir.value === '') sortKey.value = '';
  } else {
    sortKey.value = key;
    sortDir.value = 'asc';
  }
  emit('sort', { key: sortKey.value, dir: sortDir.value });
};

const getSortClass = (key) => {
  if (sortKey.value !== key) return 'sort--none';
  return sortDir.value === 'asc' ? 'sort--asc' : 'sort--desc';
};

// ─────────────────────────────────────────────
// Selection
// ─────────────────────────────────────────────
const isRowSelected = (row) => {
  return props.selected.some(s => s[props.selectedKey] === row[props.selectedKey]);
};

const isAllSelected = computed(() => {
  return props.rows.length > 0 && props.rows.every(r => isRowSelected(r));
});

const isIndeterminate = computed(() => {
  return props.selected.length > 0 && !isAllSelected.value;
});

const toggleSelectRow = (row) => {
  const exists = isRowSelected(row);
  const next = exists
    ? props.selected.filter(s => s[props.selectedKey] !== row[props.selectedKey])
    : [...props.selected, row];
  emit('update:selected', next);
};

const toggleSelectAll = () => {
  emit('update:selected', isAllSelected.value ? [] : [...props.rows]);
};

// ─────────────────────────────────────────────
// Format helpers
// ─────────────────────────────────────────────
const formatValue = (value, col) => {
  if (col.format && typeof col.format === 'function') {
    return col.format(value);
  }
  switch (col.type) {
    case 'number':
      return value != null ? Number(value).toLocaleString('vi-VN') : '';
    case 'date':
      if (!value) return '';
      try {
        return new Date(value).toLocaleDateString('vi-VN');
      } catch {
        return value;
      }
    default:
      return value ?? '';
  }
};

// ─────────────────────────────────────────────
// Colspan tính cho empty row
// ─────────────────────────────────────────────
const totalColspan = computed(() => {
  return props.columns.length
    + (props.selectable ? 1 : 0)
    + (props.hasAction ? 1 : 0);
});
</script>

<style scoped>
/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   WRAPPER & SCROLL
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ms-table__wrapper {
  width: 100%;
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.ms-table__scroll {
  width: 100%;
  flex: 1;
  min-height: 0;
  overflow: auto;           /* scroll cả ngang lẫn dọc */
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TABLE BASE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ms-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  /* KHÔNG dùng table-layout: fixed — để width/min-width
     từng cột tự hoạt động như CSS gốc */
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HEADER
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ms-table__th {
  padding: 10px 12px;
  text-align: left;
  font-weight: 600;
  font-size: 13px;
  color: var(--text-secondary, #6b7280);
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
  user-select: none;
}

.ms-table__th--sortable {
  cursor: pointer;
}
.ms-table__th--sortable:hover {
  background: #f3f4f6;
}

.ms-table__th-inner {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SORT ICONS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ms-table__sort-icon {
  display: inline-flex;
  opacity: 0.4;
}
.ms-table__th--sortable:hover .ms-table__sort-icon { opacity: 1; }
.sort--none::before  { content: '⇅'; font-size: 11px; }
.sort--asc::before   { content: '↑'; font-size: 11px; color: var(--primary, #2563eb); opacity: 1; }
.sort--desc::before  { content: '↓'; font-size: 11px; color: var(--primary, #2563eb); opacity: 1; }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BODY CELLS — giữ đúng chiều cao 64px như CSS gốc
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ms-table__td {
  padding: 0 12px;
  height: 64px;
  border-bottom: 1px solid #e5e7eb;
  color: #111827;
  background: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  box-sizing: border-box;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ROW STATES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ms-table__tr:hover .ms-table__td {
  background: #f9fafb;
}
.ms-table__tr--selected .ms-table__td {
  background: #eff6ff;
}
.ms-table__tr--clickable {
  cursor: pointer;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ALIGNMENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ms-table__align--center { text-align: center; }
.ms-table__align--right  { text-align: right; }
.ms-table__align--left   { text-align: left; }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CHECKBOX COLUMN
   — khớp với .col__checkbox trong CSS gốc
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ms-table__col--checkbox {
  padding: 0;
  width: 48px;
  min-width: 48px;
  max-width: 48px;
  height: 48px;
  text-align: center !important;
  vertical-align: middle;
  box-sizing: border-box;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   STICKY — HEADER
   z-index cao hơn tbody để header phủ lên khi scroll dọc
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
thead .ms-table__col--sticky-left {
  position: sticky;
  left: 0;
  background: #f9fafb;
  z-index: 6;
}
thead .ms-table__col--sticky-right {
  position: sticky;
  right: 0;
  background: #f9fafb;
  z-index: 6;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   STICKY — BODY
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
tbody .ms-table__col--sticky-left {
  position: sticky;
  left: 0;
  background: #ffffff;
  z-index: 5;
}
tbody .ms-table__col--sticky-right {
  position: sticky;
  right: 0;
  background: #ffffff;
  z-index: 5;
}

/* Sticky cell đổi màu khi row hover / selected */
.ms-table__tr:hover .ms-table__td.ms-table__col--sticky-left,
.ms-table__tr:hover .ms-table__td.ms-table__col--sticky-right {
  background: #f9fafb;
}
.ms-table__tr--selected .ms-table__td.ms-table__col--sticky-left,
.ms-table__tr--selected .ms-table__td.ms-table__col--sticky-right {
  background: #eff6ff;
}

/* Shadow gợi ý có thể scroll ngang */
tbody .ms-table__col--sticky-left  { box-shadow:  2px 0 4px -1px rgba(0,0,0,0.06); }
tbody .ms-table__col--sticky-right { box-shadow: -2px 0 4px -1px rgba(0,0,0,0.06); }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ACTION COLUMN
   — khớp với .col__action + .action__group trong CSS gốc
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ms-table__col--action {
  min-width: 72px;
  width: 72px;
  text-align: center !important;
  padding: 0 8px;
}

.ms-table__action-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  visibility: hidden;       /* dùng visibility để giữ layout, không dùng opacity */
}

/* Hiện action khi hover vào row — dùng :deep để xuyên qua scoped */
.ms-table__tr:hover .ms-table__action-group {
  visibility: visible;
}

.ms-table__action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: transparent;
  transition: background 0.15s;
}
.ms-table__action-btn--edit:hover   { background: #dbeafe; }
.ms-table__action-btn--delete:hover { background: #fee2e2; }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   FULLNAME CELL
   — dùng khi người dùng truyền slot #col-fullName
     nhưng cũng export class để slot tự dùng
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
/* td có class ms-table__td--fullname (truyền qua tdClass) */
.ms-table__td--fullname {
  min-width: 250px;
  display: flex !important;
  align-items: center;
  padding: 0 12px;
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   EMPTY STATE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
.ms-table__empty {
  padding: 40px;
  text-align: center;
  color: #9ca3af;
  background: #fff;
}
.ms-table__empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}
.ms-table__empty-icon { font-size: 32px; }

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CHECKBOX INPUT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: var(--primary, #2563eb);
}
</style>