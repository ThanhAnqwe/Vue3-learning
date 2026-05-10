<!-- src/views/candidate/CandidateFrom.vue -->
<template>
  <MsModal
    v-model="isOpen"
    :title="isEditMode ? 'Sửa Ứng Viên' : 'Thêm Ứng Viên'"
    :loading="isSaving"
    @confirm="handleSubmit"
    @close="$emit('close')"
  >
    <!-- ── Import CV ── -->
    <template #top>
      <div class="form__content__import__cv">
        <div class="import__cv__infor">
          <p class="import-link">Kéo thả hoặc bấm vào đây để tải file lên</p>
          <p class="import-note">
            Chấp nhận file: .pdf, .doc, .docx, .txt, .rtf (Dung lượng tối đa
            15MB)
          </p>
        </div>
        <input
          type="file"
          class="import__cv__input"
          accept=".pdf,.doc,.docx,.txt,.rtf"
        />
      </div>
    </template>

    <!-- ── Avatar ── -->
    <template #avatar>
      <div class="candidate__infor__image">
        <span>Ảnh</span>
        <input type="file" class="candidate__infor__image__file" />
      </div>
    </template>

    <!-- ── Form body ── -->
    <div class="candidate__infor__main form-grid">
      <MsInput
        v-model="form.fullName"
        label="Họ và tên"
        placeholder="Nhập họ và tên..."
        :required="true"
        :error-message="errors.fullName"
        :full-width="true"
        @blur="validateField('fullName')"
        @update:modelValue="clearErrorOnInput('fullName', $event)"
      />

      <MsInput v-model="form.dateOfBirth" label="Ngày sinh" type="date" />

      <MsSelect
        v-model="form.gender"
        label="Giới tính"
        placeholder="Chọn giới tính"
        :options="genderOptions"
      />

      <MsSelect
        v-model="form.region"
        label="Khu vực"
        placeholder="Chọn khu vực"
        :options="regionOptions"
        :full-width="true"
      />

      <MsInput
        v-model="form.phone"
        label="Số điện thoại"
        placeholder="Nhập số điện thoại..."
        :required="true"
        :error-message="errors.phone"
        @blur="validateField('phone')"
        @update:modelValue="clearErrorOnInput('phone', $event)"
      />

      <MsInput
        v-model="form.email"
        label="Email"
        type="email"
        placeholder="Nhập email..."
        :required="true"
        :error-message="errors.email"
        @blur="validateField('email')"
        @update:modelValue="clearErrorOnInput('email', $event)"
      />

      <MsSelect
        v-model="form.nationality"
        label="Quốc gia"
        placeholder="Chọn quốc gia"
        :options="nationalityOptions"
        :full-width="true"
      />

      <MsSelect
        v-model="form.province"
        label="Tỉnh/Thành phố"
        placeholder="Chọn tỉnh/thành phố"
        :options="provinceOptions"
        :full-width="true"
      />

      <MsSelect
        v-model="form.ward"
        label="Phường/xã"
        placeholder="Chọn phường/xã"
        :options="wardOptions"
        :full-width="true"
      />

      <MsInput
        v-model="form.address"
        label="Địa chỉ"
        placeholder="Nhập địa chỉ..."
        :full-width="true"
      />

      <!-- Học vấn -->
      <div class="form-group full-width">
        <label class="label__section">HỌC VẤN</label>
        <div class="education-row">
          <span class="label__inline">Trình độ đào tạo</span>
          <MsInput
            v-model="form.educationLevel"
            placeholder="Nhập trình độ đào tạo..."
            class="education-input"
          />
        </div>
        <div class="education-row">
          <span class="label__inline">Nơi đào tạo</span>
          <MsInput
            v-model="form.institution"
            placeholder="Nhập nơi đào tạo..."
            class="education-input"
          />
        </div>
        <div class="education-row">
          <span class="label__inline">Chuyên ngành</span>
          <MsInput
            v-model="form.major"
            placeholder="Nhập chuyên ngành..."
            class="education-input"
          />
        </div>
        <div class="action-link mt-2">+ Thêm học vấn</div>
      </div>

      <div class="divider full-width"></div>

      <MsInput v-model="form.applyDate" label="Ngày ứng tuyển" type="date" />

      <MsInput
        v-model="form.source"
        label="Nguồn ứng tuyển"
        placeholder="Nhập nguồn ứng tuyển..."
      />

      <MsSelect
        v-model="form.recruiter"
        label="Nhân sự khai thác"
        placeholder="Chọn nhân sự khai thác"
        :options="recruiterOptions"
      />

      <MsSelect
        v-model="form.collaborator"
        label="Cộng tác viên"
        placeholder="Chọn cộng tác viên"
        :options="collaboratorOptions"
      />

      <div class="form-group full-width referrer-group">
        <p class="referrer-text">
          Thêm nhanh người tham chiếu vào kho ứng viên
        </p>
        <div class="action-link">+ Thêm người giới thiệu</div>
      </div>

      <MsInput
        v-model="form.lastCompany"
        label="Nơi làm việc gần đây"
        placeholder="Nhập nơi làm việc gần đây..."
        :full-width="true"
      />

      <div class="form-group full-width">
        <div class="action-link">+ Thêm kinh nghiệm làm việc</div>
      </div>

      <MsInput
        v-model="form.workplace"
        label="Nơi làm việc"
        placeholder="Nhập nơi làm việc..."
        :full-width="true"
      />

      <div class="form-group full-width">
        <label class="label__input">Thời gian</label>
        <div class="date-range">
          <MsInput v-model="form.workFrom" type="date" />
          <span class="date-range__sep">-</span>
          <MsInput v-model="form.workTo" type="date" />
        </div>
      </div>

      <MsInput
        v-model="form.position"
        label="Vị trí công việc"
        placeholder="Nhập vị trí công việc..."
        :full-width="true"
      />

      <MsInput
        v-model="form.description"
        label="Mô tả công việc"
        type="textarea"
        placeholder="Nhập mô tả công việc..."
        :full-width="true"
        :rows="4"
      />
    </div>
  </MsModal>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import MsInput from "../../components/ms-input/MsInput.vue";
import MsSelect from "../../components/ms-select/MsSelect.vue";
import MsModal from "../../components/ms-modal/MsModal.vue";

const props = defineProps({
  editData: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close", "save"]);

//Change when edit
const isEditMode = computed(() => !!props.editData);

// State form
const isOpen = ref(true);
const isSaving = ref(false);

// Form data
const emptyForm = {
  fullName: "",
  dateOfBirth: "",
  gender: "",
  region: "",
  phone: "",
  email: "",
  nationality: "",
  province: "",
  ward: "",
  address: "",
  educationLevel: "",
  institution: "",
  major: "",
  applyDate: "",
  source: "",
  recruiter: "",
  collaborator: "",
  lastCompany: "",
  workplace: "",
  workFrom: "",
  workTo: "",
  position: "",
  description: "",
};
console.log(emptyForm);

/**
 * Khi editData được truyền vào → điền sẵn form bằng data đó.
 * Khi không có editData → form rỗng.
 * Dùng spread để tránh mutate props trực tiếp.
 */
const form = ref(props.editData ? { ...props.editData } : { ...emptyForm });

/**
 * Watch editData để xử lý trường hợp prop thay đổi
 * trong lúc form đang mở (ví dụ: bấm sửa dòng khác).
 */
watch(
  () => props.editData,
  (newVal) => {
    form.value = newVal ? { ...newVal } : { ...emptyForm };
    errors.value = {}; // reset lỗi khi đổi data
  },
);

// Select options
const genderOptions = [
  { value: "Nam", label: "Nam" },
  { value: "Nữ", label: "Nữ" },
];
const regionOptions = [
  { value: "Miền Bắc", label: "Miền Bắc" },
  { value: "Miền Nam", label: "Miền Nam" },
  { value: "Miền Trung", label: "Miền Trung" }
];
const nationalityOptions = [{ value: "Việt Nam", label: "Việt Nam" }];
const provinceOptions = [
  { value: "Hải Phòng", label: "Hải Phòng" },
  { value: "Hà Nội", label: "Hà Nội" },
  { value: "Vũng Tàu", label: "Vũng Tàu" },
  { value: "TP. Hồ Chí Minh", label: "TP. Hồ Chí Minh" },
  { value: "Đà Nẵng", label: "Đà Nẵng" },
  { value: "Bình Dương", label: "Bình Dương" },
  { value: "Nha Trang", label: "Nha Trang" },
  { value: "Huế", label: "Huế" },
  { value: "Đồng Nai", label: "Đồng Nai" },
  { value: "Cần Thơ", label: "Cần Thơ" }
];
const wardOptions = [
  { value: "Phường Dịch Vọng Hậu", label: "Phường Dịch Vọng Hậu" },
  { value: "Phường Bình Thạnh", label: "Phường Bình Thạnh" },
  { value: "Phường Bến Nghé", label: "Phường Bến Nghé" },
  { value: "Phường Phú Nhuận", label: "Phường Phú Nhuận" },
  { value: "Phường Tân Bình", label: "Phường Tân Bình" },
  { value: "Phường An Khánh", label: "Phường An Khánh" },
  { value: "Phường Ô Chợ Dừa", label: "Phường Ô Chợ Dừa" },
  { value: "Phường Hải Châu", label: "Phường Hải Châu" },
  { value: "Phường Cầu Giấy", label: "Phường Cầu Giấy" },
  { value: "Phường Thảo Điền", label: "Phường Thảo Điền" }
];
const recruiterOptions = [
  { value: "Trần Hồng Hạnh", label: "Trần Hồng Hạnh" },
  { value: "Phạm Thu Trang", label: "Phạm Thu Trang" },
  { value: "Đặng Thanh Nhàn", label: "Đặng Thanh Nhàn" },
  { value: "Nguyễn Lan Anh", label: "Nguyễn Lan Anh" },
  { value: "Lê Bảo Châu", label: "Lê Bảo Châu" }
];
const collaboratorOptions = [
  { value: "Lê Thị Hoa", label: "Lê Thị Hoa" },
  { value: "Vũ Quang Huy", label: "Vũ Quang Huy" },
  { value: "Trần Minh Đức", label: "Trần Minh Đức" },
  { value: "Nguyễn Thị Bưởi", label: "Nguyễn Thị Bưởi" },
  { value: "Hoàng Thanh Bình", label: "Hoàng Thanh Bình" }
];
const sourceOptions = [
  { value: "IT Viec", label: "IT Viec" },
  { value: "Website công ty", label: "Website công ty" },
  { value: "JobStreet", label: "JobStreet" },
  { value: "TopCV", label: "TopCV" },
  { value: "Referral", label: "Referral" },
  { value: "CareerBuilder", label: "CareerBuilder" },
  { value: "Facebook", label: "Facebook" },
  { value: "VietnamWorks", label: "VietnamWorks" },
  { value: "LinkedIn", label: "LinkedIn" }
];
const educationLevelOptions = [
  { value: "Cao đẳng", label: "Cao đẳng" },
  { value: "Đại học", label: "Đại học" },
  { value: "Thạc sĩ", label: "Thạc sĩ" }
];
// ─── Validate ────────────────────────────────────────────
const validateRules = {
  fullName: (v) => {
    if (!v?.trim()) return "Họ và tên không được để trống";
    if (v.trim().length < 2) return "Họ và tên phải có ít nhất 2 ký tự";
    return "";
  },
  phone: (v) => {
    if (!v?.trim()) return "Số điện thoại không được để trống";
    if (!/^[0-9]{9,11}$/.test(v.trim()))
      return "Số điện thoại không hợp lệ (9-11 chữ số)";
    return "";
  },
  email: (v) => {
    if (!v?.trim()) return "Email không được để trống";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()))
      return "Email không đúng định dạng";
    return "";
  },
};

const errors = ref({});

const validateField = (field) => {
  const rule = validateRules[field];
  if (!rule) return;
  errors.value[field] = rule(form.value[field]);
};

const clearErrorOnInput = (field, value) => {
  if (!errors.value[field]) return;
  const rule = validateRules[field];
  if (rule && rule(value) === "") errors.value[field] = "";
};

const validateAll = () => {
  let isValid = true;
  Object.keys(validateRules).forEach((field) => {
    const msg = validateRules[field](form.value[field]);
    errors.value[field] = msg;
    if (msg) isValid = false;
  });
  return isValid;
};

// ─── Submit ───────────────────────────────────────────────
const handleSubmit = () => {
  if (!validateAll()) return;
  // Emit toàn bộ form — nếu có id thì List biết là mode sửa
  emit("save", { ...form.value });
};
</script>

<style scoped>
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.full-width {
  grid-column: span 2;
}

.label__section {
  display: block;
  font-weight: 700;
  font-size: 13px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.label__input {
  display: block;
  font-weight: 700;
  color: #111827;
  font-size: 14px;
  margin-bottom: 8px;
}

.education-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}

.label__inline {
  flex-shrink: 0;
  width: 150px;
  font-weight: 700;
  font-size: 14px;
  color: #111827;
}

.education-input {
  flex: 1;
  min-width: 0;
}

/* ─── CSS được cập nhật cho Date Range ─── */
.date-range {
  display: flex;
  align-items: center;
  gap: 0; 
  width: 100%; 
}

.date-range > * {
  flex: 1;
  min-width: 0;
}

/* Tùy chỉnh ô input đầu tiên (Từ ngày) */
.date-range :deep(.ms-input:first-child input) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: none; /* Ẩn viền phải để nối với dấu - */
}

.date-range__sep {
  /* Giữ nguyên kích thước theo nội dung dấu gạch */
  flex: 0 0 auto; 
  padding: 0 8px;
  text-align: center;
  color: #6b7280;
}

/* Tùy chỉnh ô input thứ hai (Đến ngày) */
.date-range :deep(.ms-input:last-child input) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: none; /* Ẩn viền trái để nối với dấu - */
}


.divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 4px 0;
}

.referrer-group {
  align-items: flex-start;
  gap: 6px;
}

.referrer-text {
  font-size: 14px;
  color: #374151;
  margin: 0;
}

.action-link {
  color: #2680eb;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
}

.mt-2 {
  margin-top: 8px;
}

.form__content__import__cv {
  border: 1px dashed #c5ccd5;
  border-radius: 4px;
  padding: 20px;
  text-align: center;
  margin-bottom: 24px;
  position: relative;
  background-color: #fcfcfc;
  cursor: pointer;
}

.import-link {
  color: #2680eb;
  font-weight: 500;
  margin-bottom: 4px;
}

.import-note {
  color: #6b7280;
  font-size: 13px;
}

.import__cv__input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.candidate__infor__image {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  margin-top: 22px;
  border-radius: 50%;
  border: 1.5px dashed #9ca3af;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  transition:
    border-color 0.15s,
    background 0.15s;
}

.candidate__infor__image:hover {
  border-color: #2680eb;
  background-color: #f0f6ff;
}

.candidate__infor__image span {
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  pointer-events: none;
  user-select: none;
}

.candidate__infor__image__file {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  border-radius: 50%;
}
</style>
