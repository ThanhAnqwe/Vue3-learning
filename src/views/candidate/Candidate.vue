<template>
  <MainLayout>
    <div class="content__title__header">
      <div class="content__title_left">Ứng viên</div>
      <div class="content__title_right">
        <button class="button__outline">
          <div class="mi__icon__delete__candidate"></div>
          <span>Xóa dữ liệu ứng viên không trúng tuyển</span>
        </button>
        <div class="content__button__group">
          <button class="button__primary content__button--add" @click="isModalVisible = true">
            <div class="mi__icon__add"></div>
            <span>Thêm ứng viên</span>
          </button>
          <button class="button__primary content__button--down">
            <div class="mi__icon__down"></div>
          </button>
        </div>
      </div>
    </div>

    <div class="candidate__wrapper">
      <div class="toolbar__grid">
        <div class="toolbar__left">
          <div class="toolbar__search">
            <div class="mi__icon__toolbar__search"></div>
            <input type="text" class="toolbar__search-input" placeholder="Tìm kiếm hoặc nhờ AI trợ giúp...">
          </div>
        </div>
        <div class="toolbar__right">
          <button class="button__outline">
            <div class="mi__icon__filter"></div>
          </button>
          <button class="button__outline">
            <div class="mi__icon__export"></div>
          </button>
          <button class="button__outline">
            <div class="mi__icon__interactive__history"></div>
          </button>
          <div class="column__selection__setting">
            <button class="button__outline">
              <div class="mi__icon__setting__column"></div>
            </button>
          </div>
        </div>
      </div>

      <div class="table__wrap">
        <table>
          <thead>
            <tr>
              <th class="col__checkbox col__sticky"><input type="checkbox"></th>
              <th class="col__fullname">Họ và tên</th>
              <th class="col__phone">Số điện thoại</th>
              <th class="col__email">Email</th>
              <th class="col__chiendich">Chiến dịch tuyển dụng</th>
              <th class="col__vitri">Vị trí tuyển dụng</th>
              <th class="col__tintuyendung">Tin tuyển dụng</th>
              <th class="col__vongtuyendung">Vòng tuyển dụng</th>
              <th class="col__danhgia">Đánh giá</th>
              <th class="col__ngayungtuyen">Ngày ứng tuyển</th>
              <th class="col__nguonungvien">Nguồn ứng viên</th>
              <th class="col__trinhdodaotao">Trình độ đào tạo</th>
              <th class="col__noidaotao">Nơi đào tạo</th>
              <th class="col__chuyennganh">Chuyên ngành</th>
              <th class="col__noilamviecgannhat">Nơi làm việc gần nhất</th>
              <th class="col__nhansukhaithac">Nhân sự khai thác</th>
              <th class="col__donvisd">Đơn vị sử dụng</th>
              <th class="col__action col__sticky"></th>
            </tr>
          </thead>
          <tbody>

            <tr v-for="candidate in candidateList" :key="candidate.id">
              <td class="col__checkbox col__sticky"><input type="checkbox"></td>
              <td class="col__fullname">
                <div class="fullname__wrap">
                  <div class="mi__icon__avatar"></div>
                  <div class="fullname__text">
                    <div class="fullname__text__name">{{ candidate.fullName }}</div>
                    <div class="fullname__text__title"
                      :style="{ visibility: candidate.showTitle ? 'visible' : 'hidden' }">
                      <div class="mi__icon__check"></div>
                      Nhân viên
                    </div>
                  </div>
                </div>
              </td>
              <td class="col__phone">{{ candidate.phone }}</td>
              <td class="col__email">{{ candidate.email }}</td>
              <td class="col__chiendich">{{ candidate.campaign }}</td>
              <td class="col__vitri">{{ candidate.position }}</td>
              <td class="col__tintuyendung">{{ candidate.jobPosting }}</td>
              <td class="col__vongtuyendung">{{ candidate.round }}</td>
              <td class="col__saodanhgia">
                <div class="rating-wrap">
                  <div class="mi__icon__star" v-for="n in candidate.rating" :key="n"></div>
                </div>
              </td>
              <td class="col__ngayungtuyen">{{ candidate.applyDate }}</td>
              <td class="col__nguonungvien">{{ candidate.source }}</td>
              <td class="col__trinhdodaotao">{{ candidate.educationLevel }}</td>
              <td class="col__noidaotao">{{ candidate.institution }}</td>
              <td class="col__chuyennganh">{{ candidate.major }}</td>
              <td class="col__noilamviecgannhat">{{ candidate.lastCompany }}</td>
              <td class="col__nhansukhaithac">{{ candidate.recruiter }}</td>
              <td class="col__donvisd">{{ candidate.department }}</td>
              <td class="col__action col__sticky">
                <div class="action__group">
                  <div class="mi__icon__edit" title="Sửa"></div>
                  <div class="mi__icon__delete" title="Xóa"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="pagination__container">
      <div class="pagination__left">
        Tổng: <b>{{ candidateList.length }}</b> bản ghi
      </div>
      <div class="pagination__right">
        <div class="pagination__page-size">
          Số bản ghi/trang
          <select class="pagination__select">
            <option>15</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
        <div class="pagination__info">
          1 - {{ candidateList.length }} bản ghi
        </div>
        <div class="pagination__nav">
          <span class="nav__arrow">
            < </span>
              <span class="nav__arrow"> > </span>
        </div>
      </div>
    </div>


    <CandidateFrom v-if="isModalVisible" @close="isModalVisible = false" @save="handleAddCandidate" />

  </MainLayout>
</template>

<script setup>
import { ref } from 'vue';
import MainLayout from '../../layouts/MainLayout.vue';
import MsButton from '../../components/ms-button/MsButton.vue';
import CandidateFrom from './CandidateFrom.vue';


const isModalVisible = ref(false);
console.log(isModalVisible);

const initialCandidateData = {
  fullName: '',
  dateOfBirth: '',
  gender: '',
  region: '',
  phone: '',
  email: '',
  nationality: '',
  province: '',
  recruiter: '',
  collaborator: '',
  lastCompany: '',
  position: '',
  description: ''
};


const newCandidate = ref({ ...initialCandidateData });


const candidateList = ref([
  {
    id: 1,
    fullName: 'Nguyen Minh Anh',
    showTitle: false,
    phone: '--',
    email: '--',
    campaign: '--',
    position: 'Lập trình viên',
    jobPosting: 'FE Fresher',
    round: 'Ứng tuyển',
    rating: 5,
    applyDate: '20/03/2026',
    source: 'TopCV',
    educationLevel: 'Dai hoc',
    institution: 'HCMUTE',
    major: 'CNTT',
    lastCompany: 'ABC Software',
    recruiter: 'Le Thu Ha',
    department: ''
  },
  {
    id: 2,
    fullName: 'Tran Quoc Bao',
    showTitle: true,
    phone: '0912 345 678',
    email: 'bao.tran02202874@gmail.com',
    campaign: '--',
    position: 'Lập trình viên',
    jobPosting: 'BE Junior',
    round: 'Đã tuyển',
    rating: 5,
    applyDate: '19/03/2026',
    source: 'VietnamWorks',
    educationLevel: 'Dai hoc',
    institution: 'Bach Khoa HN',
    major: 'Khoa hoc may tinh',
    lastCompany: 'MISA',
    recruiter: 'Pham Thi Lan',
    department: ''
  },
  {
    id: 3,
    fullName: 'Lê Hoàng Phong',
    showTitle: true,
    phone: '0987 654 321',
    email: 'hoangphong.le@gmail.com',
    campaign: 'Tuyển dụng T5/2026',
    position: 'Lập trình viên',
    jobPosting: 'Senior Golang',
    round: 'Phỏng vấn',
    rating: 4,
    applyDate: '01/05/2026',
    source: 'Referral (Nội bộ)',
    educationLevel: 'Đại học',
    institution: 'Đại học FPT',
    major: 'Kỹ thuật phần mềm',
    lastCompany: 'TechBase VN',
    recruiter: 'Đặng Thanh Nhàn',
    department: 'Khối Sản xuất'
  }
]);

// lấy dữ liệu từ component con
const handleAddCandidate = (candidateData) => {

  candidateList.value.unshift({
    id: Date.now(),
    fullName: candidateData.fullName,
    showTitle: false,
    phone: candidateData.phone || '--',
    email: candidateData.email || '--',
    campaign: '--',
    position: candidateData.position || 'Chưa cập nhật',
    jobPosting: '--',
    round: 'Mới ứng tuyển',
    rating: 0,
    applyDate: new Date().toLocaleDateString('vi-VN'),
    source: 'Thêm thủ công',
    educationLevel: '--',
    institution: '--',
    major: '--',
    lastCompany: candidateData.lastCompany || '--',
    recruiter: candidateData.recruiter || '--',
    department: '--'
  });

  isModalVisible.value = false;
};
</script>

<style scoped>
.candidate__wrapper {
  background-color: #fff;
  width: 100%;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(207, 206, 206, 0.1);
}

.content__title_right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.content__button__group>.content__button--add {
  border-radius: 4px 0 0 4px !important;
  border-right-color: #1661c2 !important;
}

.content__button__group>.content__button--down {
  border-radius: 0 4px 4px 0 !important;
}

.content__button__group {
  display: flex;
  align-items: center;
}

/* tool grid  */
.toolbar__grid {
  display: flex;
  flex-shrink: 0;
  margin-bottom: 16px;
  padding: 16px 18px;
  padding-bottom: 0px !important;
  justify-content: space-between;
}

.toolbar__search {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  width: 303px;
  border: 1px solid #dddde4;
  background-color: #fff;
  border-radius: 4px;
}

.toolbar__search:focus-within {
  border-color: #1a73e8;
  box-shadow: 0 0 0 3px rgba(207, 206, 206, 0.1);
}

.toolbar__search-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 36px;
  width: 303px;
  border: 1px solid #dddde4;
  background-color: #fff;
  border-radius: 4px;
}

.toolbar__search-input {
  border: none !important;
  outline: none !important;
  font-size: 14px;
  width: 100%;
}

.toolbar__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toolbar__right>.button__outline {
  padding: 0 8px !important;
}

/* ================================ */
/* CUSTOM TABLE                     */
/* ================================ */

/* 1. Thiết lập chiều cao cứng cho TOÀN BỘ các dòng của table body */
tbody tr {
  height: 64px;
}

/* 2. Căn giữa theo chiều dọc cho toàn bộ các ô */
tbody td {
  vertical-align: middle;
}

.col__sticky {
  position: sticky;
  text-align: center !important;
}

.col__checkbox {
  padding: 0;
  width: 48px;
  min-width: 48px;
  max-width: 48px;
  height: 48px;
  text-align: center !important;
  vertical-align: middle;
  box-sizing: border-box;
}

/* Header sticky */
thead .col__checkbox.col__sticky {
  left: 0;
  background: #f9fafb;
  z-index: 6;
}

thead .col__action.col__sticky {
  right: 0;
  min-width: 72px;
  background: #f9fafb;
  z-index: 6;
}

/* Body sticky */
tbody .col__checkbox.col__sticky {
  left: 0;
  background: #fff;
  z-index: 5;
}

tbody .col__action.col__sticky {
  right: 0;
  min-width: 72px;
  background: #fff;
  z-index: 5;
}

.col__checkbox.col__sticky {
  left: 0;
}

/* ================================ */
/* FIX CỘT FULLNAME                 */
/* ================================ */
td.col__fullname {
  min-width: 250px;
  text-align: left;
  padding: 0 12px;
  vertical-align: middle; /* Đảm bảo thẻ td không bị flex phá vỡ */
}

/* Thẻ div bọc nội dung họ tên và avatar */
.fullname__wrap {
  display: flex;
  align-items: center;
}

.fullname__wrap > .mi__icon__avatar {
  width: 24px !important;
  height: 24px !important;
  min-width: 24px;
  min-height: 24px;
  background-size: cover !important;
  background-position: center !important;
  margin-left: 0px !important;
  margin-right: 12px !important;
}

.fullname__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40px;
}

.fullname__text__name {
  font-weight: 500;
  color: #1a73e8;
  line-height: 1;
}

.fullname__text__title {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #48bb56;
  font-size: 12px;
  margin-top: 4px;
  height: 16px;
}

.fullname__text__title>.mi__icon__check {
  background-color: #48bb56;
}
/* ================================ */

.col__phone {
  min-width: 150px;
  max-width: 150px;
}

.col__email {
  min-width: 200px;
  max-width: 200px;
}

.col__chiendich {
  min-width: 200px;
  max-width: 200px;
}

.col__vitri {
  min-width: 200px;
  max-width: 200px;
}

.col__tintuyendung {
  min-width: 150px;
  max-width: 150px;
}

.col__vongtuyendung {
  min-width: 180px;
  max-width: 180px;
}

/* ================================ */
/* FIX CỘT SAO ĐÁNH GIÁ             */
/* ================================ */
td.col__danhgia {
  min-width: 120px;
  max-width: 120px;
  text-align: center;
  vertical-align: middle;
}

td.col__saodanhgia {
  vertical-align: middle;
  padding-bottom: 0 !important;
}

/* Thẻ div bọc các ngôi sao */
.rating-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  min-height: 24px; /* Giữ bảng không xẹp khi rating = 0 */
}
/* ================================ */

.col__ngayungtuyen {
  min-width: 120px;
  max-width: 120px;
}

.col__nguonungvien {
  min-width: 150px;
  max-width: 150px;
}

.col__trinhdodaotao {
  min-width: 100px;
  max-width: 100px;
}

.col__noidaotao {
  min-width: 150px;
  max-width: 150px;
}

.col__chuyennganh {
  min-width: 150px;
  max-width: 150px;
}

.col__noilamviecgannhat {
  min-width: 150px;
  max-width: 150px;
}

.col__nhansukhaithac {
  min-width: 150px;
  max-width: 150px;
}

.col__donvisd {
  min-width: 150px;
  max-width: 150px;
}

.col__action {
  position: sticky;
  right: 0;
  min-width: 72px;
  background: #fff;
}

.action__group {
  display: flex;
  justify-content: center;
  gap: 8px;
  visibility: hidden;
}

tbody tr:hover .action__group {
  visibility: visible;
}

.pagination__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f9fafb;
  border-top: 1px solid #dddde4;
}

.pagination__right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.pagination__select {
  padding: 4px 8px;
  border: 1px solid #dddde4;
  border-radius: 4px;
  margin: 0 8px;
}

.pagination__nav {
  display: flex;
  gap: 8px;
}

.nav__arrow {
  cursor: pointer;
  padding: 4px;
  color: #666;
}
</style>