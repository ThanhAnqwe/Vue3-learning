<!-- src/components/candidate/CandidateModal.vue -->
<template>
  <MsModel
    v-model="isOpen"
    title="Thêm Ứng Viên"
    :loading="isSaving"
    @confirm="handleSubmit"
    @close="$emit('close')"
  >
    <!-- ── Khu vực import CV ── -->
    <template #top>
      <div class="form__content__import__cv">
        <div class="import__cv__infor">
          <p class="import-link">Kéo thả hoặc bấm vào đây để tải file lên</p>
          <p class="import-note">Chấp nhận file: .pdf, .doc, .docx, .txt, .rtf (Dung lượng tối đa 15MB)</p>
        </div>
        <input type="file" class="import__cv__input" accept=".pdf,.doc,.docx,.txt,.rtf" />
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

      <!-- Họ và tên -->
      <MsInput
        v-model="newCandidate.fullName"
        label="Họ và tên"
        placeholder="Nhập họ và tên..."
        :required="true"
        :error-message="errors.fullName"
        :full-width="true"
        @blur="validateField('fullName')"
        @update:modelValue="clearErrorOnInput('fullName', $event)"
      />

      <!-- Ngày sinh -->
      <MsInput
        v-model="newCandidate.dateOfBirth"
        label="Ngày sinh"
        type="date"
      />

      <!-- Giới tính -->
      <MsSelect
        v-model="newCandidate.gender"
        label="Giới tính"
        placeholder="Chọn giới tính"
        :options="genderOptions"
      />

      <!-- Khu vực -->
      <MsSelect
        v-model="newCandidate.region"
        label="Khu vực"
        placeholder="Chọn khu vực"
        :options="regionOptions"
        :full-width="true"
      />

      <!-- Số điện thoại -->
      <MsInput
        v-model="newCandidate.phone"
        label="Số điện thoại"
        placeholder="Nhập số điện thoại..."
        :required="true"
        :error-message="errors.phone"
        @blur="validateField('phone')"
        @update:modelValue="clearErrorOnInput('phone', $event)"
      />

      <!-- Email -->
      <MsInput
        v-model="newCandidate.email"
        label="Email"
        type="email"
        placeholder="Nhập email..."
        :required="true"
        :error-message="errors.email"
        @blur="validateField('email')"
        @update:modelValue="clearErrorOnInput('email', $event)"
      />

      <!-- Quốc gia -->
      <MsSelect
        v-model="newCandidate.nationality"
        label="Quốc gia"
        placeholder="Chọn quốc gia"
        :options="nationalityOptions"
        :full-width="true"
      />

      <!-- Tỉnh/Thành phố -->
      <MsSelect
        v-model="newCandidate.province"
        label="Tỉnh/Thành phố"
        placeholder="Chọn tỉnh/thành phố"
        :options="provinceOptions"
        :full-width="true"
      />

      <!-- Phường/xã -->
      <MsSelect
        v-model="newCandidate.ward"
        label="Phường/xã"
        placeholder="Chọn phường/xã"
        :options="wardOptions"
        :full-width="true"
      />

      <!-- Địa chỉ -->
      <MsInput
        v-model="newCandidate.address"
        label="Địa chỉ"
        placeholder="Nhập địa chỉ..."
        :full-width="true"
      />

      <!-- ── Học vấn (layout nhãn nằm ngang — giữ nguyên thiết kế) ── -->
      <div class="form-group full-width">
        <label class="label__section">HỌC VẤN</label>

        <div class="education-row">
          <span class="label__inline">Trình độ đào tạo</span>
          <MsInput
            v-model="newCandidate.educationLevel"
            placeholder="Nhập trình độ đào tạo..."
            class="education-input"
          />
        </div>

        <div class="education-row">
          <span class="label__inline">Nơi đào tạo</span>
          <MsInput
            v-model="newCandidate.institution"
            placeholder="Nhập nơi đào tạo..."
            class="education-input"
          />
        </div>

        <div class="education-row">
          <span class="label__inline">Chuyên ngành</span>
          <MsInput
            v-model="newCandidate.major"
            placeholder="Nhập chuyên ngành..."
            class="education-input"
          />
        </div>

        <div class="action-link mt-2">+ Thêm học vấn</div>
      </div>

      <!-- Divider -->
      <div class="divider full-width"></div>

      <!-- Ngày ứng tuyển -->
      <MsInput
        v-model="newCandidate.applyDate"
        label="Ngày ứng tuyển"
        type="date"
      />

      <!-- Nguồn ứng tuyển -->
      <MsInput
        v-model="newCandidate.source"
        label="Nguồn ứng tuyển"
        placeholder="Nhập nguồn ứng tuyển..."
      />

      <!-- Nhân sự khai thác -->
      <MsSelect
        v-model="newCandidate.recruiter"
        label="Nhân sự khai thác"
        placeholder="Chọn nhân sự khai thác"
        :options="recruiterOptions"
      />

      <!-- Cộng tác viên -->
      <MsSelect
        v-model="newCandidate.collaborator"
        label="Cộng tác viên"
        placeholder="Chọn cộng tác viên"
        :options="collaboratorOptions"
      />

      <!-- Thêm người giới thiệu -->
      <div class="form-group full-width referrer-group">
        <p class="referrer-text">Thêm nhanh người tham chiếu vào kho ứng viên</p>
        <div class="action-link">+ Thêm người giới thiệu</div>
      </div>

      <!-- Nơi làm việc gần đây -->
      <MsInput
        v-model="newCandidate.lastCompany"
        label="Nơi làm việc gần đây"
        placeholder="Nhập nơi làm việc gần đây..."
        :full-width="true"
      />

      <!-- Kinh nghiệm làm việc -->
      <div class="form-group full-width">
        <div class="action-link">+ Thêm kinh nghiệm làm việc</div>
      </div>

      <!-- Nơi làm việc -->
      <MsInput
        v-model="newCandidate.workplace"
        label="Nơi làm việc"
        placeholder="Nhập nơi làm việc..."
        :full-width="true"
      />

      <!-- Thời gian (date range — giữ layout ngang) -->
      <div class="form-group full-width">
        <label class="label__input">Thời gian</label>
        <div class="date-range">
          <MsInput v-model="newCandidate.workFrom" type="date" />
          <span class="date-range__sep">-</span>
          <MsInput v-model="newCandidate.workTo" type="date" />
        </div>
      </div>

      <!-- Vị trí công việc -->
      <MsInput
        v-model="newCandidate.position"
        label="Vị trí công việc"
        placeholder="Nhập vị trí công việc..."
        :full-width="true"
      />

      <!-- Mô tả công việc -->
      <MsInput
        v-model="newCandidate.description"
        label="Mô tả công việc"
        type="textarea"
        placeholder="Nhập mô tả công việc..."
        :full-width="true"
        :rows="4"
      />

    </div>
  </MsModel>
</template>

<script setup>
import { ref } from 'vue';
import MsInput  from '../../components/ms-input/MsInput.vue';
import MsSelect from '../../components/ms-select/MsSelect.vue';
import MsModel  from '../../components/ms-model/MsModel.vue';

const isOpen  = ref(true);
const isSaving = ref(false);

const props = defineProps({
  errors: { type: Object, default: () => ({}) }
});
const emit = defineEmits(['close', 'save']);

//Options data
const genderOptions = [
  { value: 'Nam', label: 'Nam' },
  { value: 'Nữ',  label: 'Nữ'  },
];
const regionOptions = [
  { value: 'Hà Nội',      label: 'Hà Nội'      },
  { value: 'Hồ Chí Minh', label: 'Hồ Chí Minh' },
];
const nationalityOptions = [
  { value: 'Việt Nam', label: 'Việt Nam' },
];
const provinceOptions = [
  { value: 'Hà Nội', label: 'Hà Nội' },
];
const wardOptions = [
  { value: 'Phường Mỹ Đình 1', label: 'Phường Mỹ Đình 1' },
  { value: 'Phường Dịch Vọng', label: 'Phường Dịch Vọng' },
];
const recruiterOptions = [
  { value: 'Đặng Thanh Nhàn', label: 'Đặng Thanh Nhàn' },
];
const collaboratorOptions = [
  { value: 'Đặng Thanh Nhàn', label: 'Đặng Thanh Nhàn' },
];

//New candidate data
const initialData = {
  fullName: '', dateOfBirth: '', gender: '', region: '',
  phone: '', email: '', nationality: '', province: '', ward: '',
  address: '', educationLevel: '', institution: '', major: '',
  applyDate: '', source: '', recruiter: '', collaborator: '',
  lastCompany: '', workplace: '', workFrom: '', workTo: '',
  position: '', description: '',
};
const newCandidate = ref({ ...initialData });


//validate
const validateRules = {
  fullName: (v) => {
    if (!v?.trim()) return 'Họ và tên không được để trống';
    if (v.trim().length < 2) return 'Họ và tên phải có ít nhất 2 ký tự';
    return '';
  },
  phone: (v) => {
    if (!v?.trim()) return 'Số điện thoại không được để trống';
    if (!/^[0-9]{9,11}$/.test(v.trim())) return 'Số điện thoại không hợp lệ (9-11 chữ số)';
    return '';
  },
  email: (v) => {
    if (!v?.trim()) return 'Email không được để trống';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) return 'Email không đúng định dạng';
    return '';
  },
};

// errors object — dùng reactive để binding 2 chiều với MsInput
const errors = ref({ ...props.errors });

/**
 * Validate 1 field khi blur.
 * @param {string} field
 */
const validateField = (field) => {
  const rule = validateRules[field];
  if (!rule) return;
  errors.value[field] = rule(newCandidate.value[field]);
};

/**
 * Clear lỗi ngay khi người dùng nhập lại và dữ liệu đã hợp lệ.
 * @param {string} field
 * @param {string} value
 */
const clearErrorOnInput = (field, value) => {
  if (!errors.value[field]) return; // chưa có lỗi thì bỏ qua
  const rule = validateRules[field];
  if (rule && rule(value) === '') {
    errors.value[field] = '';
  }
};

/**
 * Validate toàn bộ form khi ấn Lưu.
 * Trả về true nếu hợp lệ.
 */
const validateAll = () => {
  let isValid = true;
  Object.keys(validateRules).forEach((field) => {
    const msg = validateRules[field](newCandidate.value[field]);
    errors.value[field] = msg;
    if (msg) isValid = false;
  });
  return isValid;
};

const handleSubmit = () => {
  if (!validateAll()) return;
  emit('save', { ...newCandidate.value });
};
</script>

<style scoped>
/*region grid layout*/
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

/*region label content*/
.label__section {
  display: block;
  font-weight: 700;
  font-size: 13px;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

/* Dùng cho label nằm ngang trong education-row */
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
  min-width: 0
}

.date-range {
  display: flex;
  align-items: center;
  gap: 12px;
}

.date-range > * {
  flex: 1;
  min-width: 0;
}

.date-range__sep {
  flex-shrink: 0;
  color: #6b7280;
  font-size: 14px;
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

.mt-2 { margin-top: 8px; }

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

/* avatar */
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
  transition: border-color 0.15s, background 0.15s;
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