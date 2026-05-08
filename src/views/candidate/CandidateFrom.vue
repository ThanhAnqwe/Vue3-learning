<!-- src/components/candidate/CandidateModal.vue -->
<template>
  <MsModel v-model="isOpen" title="Thêm Ứng Viên" :loading="isSaving" @confirm="handleSubmit" @close="$emit('close')">

    <template #top>
      <div class="form__content__import__cv">
      <div class="import__cv__infor">
        <p class="import-link">Kéo thả hoặc bấm vào đây để tải fie lên</p>
        <p class="import-note">Chấp nhận file: .pdf, .doc, .docx, .txt, .rtf (Dung lượng tối đa 15MB)</p>
      </div>
      <input type="file" class="import__cv__input" accept=".pdf,.doc,.docx,.txt,.rtf" />
    </div>
    </template>

    <template #avatar>
      <div class="candidate__infor__image">
        <span>Ảnh</span>
        <input type="file" class="candidate__infor__image__file" />
      </div>
    </template>


    
    <div class="candidate__infor__main form-grid">

      <!-- Họ và tên -->
      <div class="form-group full-width">
        <label class="label__input">Họ và tên <span class="required-star">*</span></label>
        <input type="text" v-model="newCandidate.fullName" placeholder="Nhập họ và tên..."
          :class="['candidate__input', { 'input-error': errors.fullName }]">
        <div class="error-text" v-if="errors.fullName">{{ errors.fullName }}</div>
      </div>

      <!-- Ngày sinh & Giới tính -->
      <div class="form-group">
        <label class="label__input">Ngày sinh</label>
        <input type="date" v-model="newCandidate.dateOfBirth" class="candidate__input">
      </div>
      <div class="form-group">
        <label class="label__input">Giới tính</label>
        <select v-model="newCandidate.gender" class="candidate__select">
          <option value="" disabled hidden>Chọn giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      </div>

      <!-- Khu vực -->
      <div class="form-group full-width">
        <label class="label__input">Khu vực</label>
        <select v-model="newCandidate.region" class="candidate__select">
          <option value="" disabled hidden>Chọn khu vực</option>
          <option value="Hà Nội">Hà Nội</option>
          <option value="Hồ Chí Minh">Hồ Chí Minh</option>
        </select>
      </div>

      <!-- Số điện thoại & Email -->
      <div class="form-group">
        <label class="label__input">Số điện thoại <span class="required-star" v-if="errors.phone">*</span></label>
        <input type="text" v-model="newCandidate.phone" placeholder="Nhập số điện thoại..."
          :class="['candidate__input', { 'input-error': errors.phone }]">
        <div class="error-text" v-if="errors.phone">{{ errors.phone }}</div>
      </div>
      <div class="form-group">
        <label class="label__input">Email <span class="required-star" v-if="errors.email">*</span></label>
        <input type="email" v-model="newCandidate.email" placeholder="Nhập email..."
          :class="['candidate__input', { 'input-error': errors.email }]">
        <div class="error-text" v-if="errors.email">{{ errors.email }}</div>
      </div>

      <!-- Quốc gia -->
      <div class="form-group full-width">
        <label class="label__input">Quốc gia</label>
        <select v-model="newCandidate.nationality" class="candidate__select">
          <option value="" disabled hidden>Chọn quốc gia</option>
          <option value="Việt Nam">Việt Nam</option>
        </select>
      </div>

      <!-- Tỉnh/Thành phố -->
      <div class="form-group full-width">
        <label class="label__input">Tỉnh/Thành phố</label>
        <select v-model="newCandidate.province" class="candidate__select">
          <option value="" disabled hidden>Chọn tỉnh/thành phố</option>
          <option value="Hà Nội">Hà Nội</option>
        </select>
      </div>

      <!-- Phường/xã -->
      <div class="form-group full-width">
        <label class="label__input">Phường/xã</label>
        <select v-model="newCandidate.ward" class="candidate__select">
          <option value="" disabled hidden>Chọn phường/xã</option>
          <option value="Phường Mỹ Đình 1">Phường Mỹ Đình 1</option>
          <option value="Phường Dịch Vọng">Phường Dịch Vọng</option>
        </select>
      </div>

      <!-- Địa chỉ -->
      <div class="form-group full-width">
        <label class="label__input">Địa chỉ</label>
        <input type="text" v-model="newCandidate.address" placeholder="Nhập địa chỉ..." class="candidate__input">
      </div>

      <!-- KHU VỰC HỌC VẤN (Được design nhãn nằm ngang) -->
      <div class="form-group full-width mt-2">
        <label class="label__input" style="text-transform: uppercase;">Học vấn</label>

        <div class="education-row">
          <label class="label__inline">Trình độ đào tạo</label>
          <input type="text" v-model="newCandidate.educationLevel" placeholder="Nhập trình độ đào tạo..."
            class="candidate__input">
        </div>

        <div class="education-row">
          <label class="label__inline">Nơi đào tạo</label>
          <input type="text" v-model="newCandidate.institution" placeholder="Nhập nơi đào tạo..."
            class="candidate__input">
        </div>

        <div class="education-row">
          <label class="label__inline">Chuyên ngành</label>
          <input type="text" v-model="newCandidate.major" placeholder="Nhập chuyên ngành..." class="candidate__input">
        </div>

        <div class="action-link mt-2">+ Thêm học vấn</div>
      </div>

      <!-- Divider -->
      <div class="divider full-width"></div>

      <!-- Ngày ứng tuyển & Nguồn ứng tuyển -->
      <div class="form-group">
        <label class="label__input">Ngày ứng tuyển</label>
        <input type="date" v-model="newCandidate.applyDate" class="candidate__input">
      </div>
      <div class="form-group">
        <label class="label__input">Nguồn ứng tuyển</label>
        <input type="text" v-model="newCandidate.source" placeholder="Nhập nguồn ứng tuyển..." class="candidate__input">
      </div>

      <!-- Nhân sự khai thác & Cộng tác viên -->
      <div class="form-group">
        <label class="label__input">Nhân sự khai thác</label>
        <select v-model="newCandidate.recruiter" class="candidate__select">
          <option value="" disabled hidden>Chọn nhân sự khai thác</option>
          <option value="Đặng Thanh Nhàn">Đặng Thanh Nhàn</option>
        </select>
      </div>
      <div class="form-group">
        <label class="label__input">Cộng tác viên</label>
        <select v-model="newCandidate.collaborator" class="candidate__select">
          <option value="" disabled hidden>Chọn cộng tác viên</option>
          <option value="Đặng Thanh Nhàn">Đặng Thanh Nhàn</option>
        </select>
      </div>

      <!-- Thêm nhanh tham chiếu -->
      <div class="form-group full-width" style="align-items: flex-start;">


        <p>
          Thêm nhanh người tham chiếu vào kho ứng viên
        </p>
        <div class="action-link">+ Thêm người giới thiệu</div>

      </div>

      <!-- Nơi làm việc gần đây -->
      <div class="form-group full-width">
        <label class="label__input">Nhập nơi làm việc gần đây</label>
        <input type="text" v-model="newCandidate.lastCompany" placeholder="Nhập nơi làm việc gần đây..."
          class="candidate__input">
      </div>

      <!-- Kinh nghiệm làm việc -->
      <div class="form-group" style="align-items: flex-start;">
        <div class="action-link">+ Thêm kinh nghiệm làm việc</div>
      </div>

      <div class="form-group full-width">
        <label class="label__input">Nhập nơi làm việc</label>
        <input type="text" placeholder="Nhập nơi làm việc..." class="candidate__input">
      </div>

      <!-- Thời gian (Flex ngang) -->
      <div class="form-group full-width">
        <label class="label__input">Thời gian</label>
        <div class="date-range">
          <input type="date" class="candidate__input">
          <span>-</span>
          <input type="date" class="candidate__input">
        </div>
      </div>

      <!-- Vị trí & Mô tả -->
      <div class="form-group full-width">
        <label class="label__input">Vị trí công việc</label>
        <input type="text" v-model="newCandidate.position" placeholder="Nhập vị trí công việc..."
          class="candidate__input">
      </div>
      <div class="form-group full-width">
        <label class="label__input">Mô tả công việc</label>
        <textarea v-model="newCandidate.description" placeholder="Nhập mô tả công việc..."
          class="candidate__textarea"></textarea>
      </div>
    </div>


  </MsModel>

</template>

<script setup>
import { ref } from 'vue';
import MsButton from '../../components/ms-button/MsButton.vue';
import MsModel from '../../components/ms-model/MsModel.vue';
const isOpen = ref(true);
const isSaving = ref(false)
const props = defineProps({
  errors: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['close', 'save']);

const initialCandidateData = {
  fullName: '', dateOfBirth: '', gender: '', region: '', phone: '', email: '',
  nationality: '', province: '', ward: '', address: '',
  educationLevel: '', institution: '', major: '', applyDate: '', source: '',
  recruiter: '', collaborator: '', lastCompany: '', position: '', description: ''
};

const newCandidate = ref({ ...initialCandidateData });

const handleSubmit = () => {
  emit('save', { ...newCandidate.value });
};
</script>

<style scoped>
/* 1. LAYOUT POPUP CƠ BẢN VÀ STICKY FOOTER */
.form__popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.form__popup__wrap {
  background-color: #fff;
  border-radius: 8px;
  width: 700px;
  max-height: 90vh;
  /* Giới hạn chiều cao popup */
  display: flex;
  flex-direction: column;
  /* Quan trọng để tách Body và Footer */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.form__popup__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
}

.form__header__title {
  font-size: 24px;
  font-weight: 700;
  color: #111827;
}

.form__popup__content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}


.form__popup__footer {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.form__footer__wrap {
  padding-top: 12px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.label__input {
  display: block;
  font-weight: 700;
  color: #111827;
  font-size: 14px;
  margin-bottom: 8px;
  text-align: left;
}

.required-star {
  color: #dc3545;
}

.error-text {
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
}

.input-error {
  border-color: #dc3545 !important;
}

/* 3. GRID LAYOUT (Bảng) */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* Chia 2 cột đều nhau */
  gap: 16px 24px;
  /* Khoảng cách hàng 16px, cột 24px */
}

.form-group {
  display: flex;
  flex-direction: column;
}

.full-width {
  grid-column: span 2;
  /* Ép thẻ div chiếm trọn cả 2 cột */
}

/* --- FORMAT KHU VỰC HỌC VẤN --- */
.education-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
}

.label__inline {
  width: 150px;
  /* Cố định độ rộng nhãn bên trái */
  font-weight: 700;
  font-size: 14px;
  color: #111827;
}

.education-row .candidate__input {
  flex: 1;
  /* Input tự động co giãn phần trống còn lại */
}

/* 4. CÁC THÀNH PHẦN KHÁC[cite: 14, 15] */
.candidate__input,
.candidate__select {
  width: 100%;
  height: 36px;
  padding: 0 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
}

.candidate__input:focus,
.candidate__select:focus {
  border-color: #2680eb;
}

.candidate__textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  resize: vertical;
  min-height: 80px;
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

.checkbox-inline {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  cursor: pointer;
}

.divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 8px 0;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 12px;
}

.date-range input {
  flex: 1;
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.form__content__candidate__infor {
  display: flex;
  gap: 24px;
}

/* Cột avatar — chính là hình tròn */
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

/* NÚT BẤM[cite: 14] */
.btn-cancel {
  padding: 0 16px;
  height: 36px;
  border: none;
  background-color: transparent;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
}

.btn-save {
  padding: 0 24px;
  height: 36px;
  border: none;
  background-color: #2680eb;
  color: #fff;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
}

.btn-save:hover {
  background-color: #1d68c1;
}
</style>