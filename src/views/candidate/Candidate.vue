<!-- src/views/candidate/CandidateList.vue -->
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
          <button class="button__primary content__button--add" @click="openAddForm">
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
            <input type="text" class="toolbar__search-input" placeholder="Tìm kiếm hoặc nhờ AI trợ giúp..."
              v-model="searchText" />
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
          <MsColumnSetting :columns="allColumns" v-model:visibleColumns="visibleColumns" />
        </div>
      </div>

      <div class="table__wrap">
        <div v-if="isLoading" class="table__loading"><span>Đang tải...</span></div>

        <table v-else>
          <thead>
            <tr>
              <th class="col__checkbox col__sticky"><input type="checkbox" /></th>
              <th v-show="visibleColumns.includes('fullName')" class="col__fullname">Họ và tên</th>
              <th v-show="visibleColumns.includes('phone')" class="col__phone">
                Số điện thoại
              </th>
              <th v-show="visibleColumns.includes('email')" class="col__email">Email</th>
              <th v-show="visibleColumns.includes('campaign')" class="col__chiendich">Chiến dịch tuyển dụng</th>
              <th v-show="visibleColumns.includes('position')" class="col__vitri">Vị trí tuyển dụng</th>
              <th v-show="visibleColumns.includes('jobPosting')" class="col__tintuyendung">Tin tuyển dụng</th>
              <th v-show="visibleColumns.includes('round')" class="col__vongtuyendung">Vòng tuyển dụng</th>
              <th v-show="visibleColumns.includes('rating')" class="col__danhgia">Đánh giá</th>
              <th v-show="visibleColumns.includes('applyDate')" class="col__ngayungtuyen">Ngày ứng tuyển</th>
              <th v-show="visibleColumns.includes('source')" class="col__nguonungvien">Nguồn ứng viên</th>
              <th v-show="visibleColumns.includes('educationLevel')" class="col__trinhdodaotao">Trình độ đào tạo</th>
              <th v-show="visibleColumns.includes('institution')" class="col__noidaotao">Nơi đào tạo</th>
              <th v-show="visibleColumns.includes('major')" class="col__chuyennganh">Chuyên ngành</th>
              <th v-show="visibleColumns.includes('lastCompany')" class="col__noilamviecgannhat">Nơi làm việc gần nhất
              </th>
              <th v-show="visibleColumns.includes('recruiter')" class="col__nhansukhaithac">Nhân sự khai thác</th>
              <th v-show="visibleColumns.includes('department')" class="col__donvisd">Đơn vị sử dụng</th>
              <th class="col__action col__sticky"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="candidateList.length === 0">
              <td colspan="18" class="table__empty">Không có dữ liệu</td>
            </tr>
            <tr v-else v-for="candidate in candidateList" :key="candidate.id">
              <td class="col__checkbox col__sticky"><input type="checkbox" /></td>
              <td v-show="visibleColumns.includes('fullName')" class="col__fullname">
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
              <td v-show="visibleColumns.includes('phone')" class="col__phone">
                {{ candidate.phone }}
              </td>
              <td v-show="visibleColumns.includes('email')" class="col__email">{{ candidate.email }}</td>
              <td v-show="visibleColumns.includes('campaign')" class="col__chiendich">{{ candidate.campaign }}</td>
              <td v-show="visibleColumns.includes('position')" class="col__vitri">{{ candidate.position }}</td>
              <td v-show="visibleColumns.includes('jobPosting')" class="col__tintuyendung">{{ candidate.jobPosting }}
              </td>
              <td v-show="visibleColumns.includes('round')" class="col__vongtuyendung">{{ candidate.round }}</td>
              <td v-show="visibleColumns.includes('rating')" class="col__saodanhgia">
                <div class="rating-wrap">
                  <div class="mi__icon__star" v-for="n in candidate.rating" :key="n"></div>
                </div>
              </td>
              <td v-show="visibleColumns.includes('applyDate')" class="col__ngayungtuyen">{{ candidate.applyDate }}</td>
              <td v-show="visibleColumns.includes('source')" class="col__nguonungvien">{{ candidate.source }}</td>
              <td v-show="visibleColumns.includes('educationLevel')" class="col__trinhdodaotao">{{
                candidate.educationLevel }}</td>
              <td v-show="visibleColumns.includes('institution')" class="col__noidaotao">{{ candidate.institution }}
              </td>
              <td v-show="visibleColumns.includes('major')" class="col__chuyennganh">{{ candidate.major }}</td>
              <td v-show="visibleColumns.includes('lastCompany')" class="col__noilamviecgannhat">{{
                candidate.lastCompany }}</td>
              <td v-show="visibleColumns.includes('recruiter')" class="col__nhansukhaithac">{{ candidate.recruiter }}
              </td>
              <td v-show="visibleColumns.includes('department')" class="col__donvisd">{{ candidate.department }}</td>
              <td class="col__action col__sticky">
                <div class="action__group">
                  <div class="mi__icon__edit" title="Sửa" @click="openEditForm(candidate)"></div>
                  <div class="mi__icon__delete" title="Xóa" @click="handleDelete(candidate)"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Pagination :total="total" v-model:currentPage="currentPage" v-model:pageSize="pageSize" />

    <!-- Form dùng chung thêm/sửa — truyền editData=null thì là mode Thêm -->
    <CandidateFrom v-if="isModalVisible" :edit-data="selectedCandidate" @close="closeForm" @save="handleSave" />

    <!-- Modal xác nhận xóa -->
    <MsModal v-model="isDeleteModalVisible" title="Xóa ứng viên" :width="420" confirmText="Xóa" confirmType="danger"
      cancelText="Hủy" @confirm="confirmDelete" @close="cancelDelete">
      <p>
        Xác nhận xóa ứng viên
        <strong>{{ candidateToDelete?.fullName }}</strong>
      </p>
    </MsModal>
  </MainLayout>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import MainLayout from '../../layouts/MainLayout.vue';
import CandidateFrom from './CandidateFrom.vue';
import Pagination from '../../components/ms-pagination/MsPagination.vue';
import MsModal from '../../components/ms-modal/MsModal.vue';
import MsColumnSetting from '../../components/ms-column-setting/MsColumnSetting.vue';
import { getCandidates, createCandidate, updateCandidate, deleteCandidate } from '../../services/CandidateService';
import { useToast } from '../../ult/useToast'
import { CANDIDATE_COLUMNS } from '../../constant/candidate'
// State toast
const toast = useToast();

//State paging and searching
const candidateList = ref([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(15);
const searchText = ref('');
const isLoading = ref(false);

//CRUD state
const selectedCandidate = ref(null);
const isDeleteModalVisible = ref(false);
const candidateToDelete = ref(null);
const isModalVisible = ref(false);

//Fetch data
const fetchCandidates = async () => {
  isLoading.value = true;
  try {
    const result = await getCandidates({
      page: currentPage.value, limit: pageSize.value, search: searchText.value,
    });
    candidateList.value = result.data;
    total.value = result.total;
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchCandidates);

let debounceTimer = null;
watch(searchText, () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => { currentPage.value = 1; fetchCandidates(); }, 300);
});
watch([currentPage, pageSize], fetchCandidates);

//Form

/** Thêm mới — không truyền data, form rỗng */
const openAddForm = () => {
  selectedCandidate.value = null;
  isModalVisible.value = true;
};

/** Sửa — truyền data của dòng vào form để điền sẵn */
const openEditForm = (candidate) => {
  selectedCandidate.value = { ...candidate }; // spread để tránh mutate trực tiếp
  isModalVisible.value = true;
};

const closeForm = () => {
  isModalVisible.value = false;
  selectedCandidate.value = null;
};

// CRUD
const handleSave = async (candidateData) => {
  try {
    if (candidateData.id) {
      await updateCandidate(candidateData.id, candidateData);
      toast.success('Cập nhật ứng viên thành công');
    } else {
      await createCandidate(candidateData);
      toast.success('Thêm ứng viên thành công');
      currentPage.value = 1;
    }
    closeForm();
    await fetchCandidates();
  } catch (err) {
    console.error(err);
    toast.error('Có lỗi xảy ra, vui lòng thử lại');
  }
};

const handleDelete = async (candidate) => {
  candidateToDelete.value = candidate;
  isDeleteModalVisible.value = true;
};

const confirmDelete = async () => {
  try {
    await deleteCandidate(candidateToDelete.value.id);
    toast.success(`Đã xóa ứng viên "${candidateToDelete.value.fullName}"`); // ← thêm
    isDeleteModalVisible.value = false;
    candidateToDelete.value = null;
    await fetchCandidates();
  } catch (err) {
    console.error(err);
    toast.error('Xóa thất bại, vui lòng thử lại'); // ← thêm
  }
};

const cancelDelete = () => {
  isDeleteModalVisible.value = false;
  candidateToDelete.value = null;
};

//Column setting
const allColumns = CANDIDATE_COLUMNS;
const visibleColumns = ref(allColumns.map(c => c.key))

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

tbody tr {
  height: 64px;
}

tbody td {
  text-align: left;
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

td.col__fullname {
  min-width: 250px;
  text-align: left;
  padding: 0 12px;
  vertical-align: middle;
}

.fullname__wrap {
  display: flex;
  align-items: center;
}

.fullname__wrap>.mi__icon__avatar {
  width: 24px !important;
  height: 24px !important;
  min-width: 24px;
  min-height: 24px;
  background-size: cover !important;
  background-position: center !important;
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

.col__ngayungtuyen {
  min-width: 120px;
  max-width: 200px;
}

.col__nguonungvien {
  min-width: 150px;
  max-width: 150px;
}

.col__trinhdodaotao {
  min-width: 100px;
  max-width: 200px;
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
  max-width: 200px;
}

.col__nhansukhaithac {
  min-width: 150px;
  max-width: 150px;
}

.col__donvisd {
  min-width: 150px;
  max-width: 150px;
}

td.col__saodanhgia {
  vertical-align: middle;
  padding-bottom: 0 !important;
}

.rating-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  min-height: 24px;
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
  cursor: pointer;
}

tbody tr:hover .action__group {
  visibility: visible;
}

.table__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  color: #6b7280;
  font-size: 14px;
}

.table__empty {
  text-align: center;
  padding: 60px;
  color: #9ca3af;
  font-size: 14px;
}
</style>