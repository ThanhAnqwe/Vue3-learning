<!-- src/views/candidate/CandidateList.vue -->
<template>
  <MainLayout>
    <!-- ── Header ── -->
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
      <!-- ── Toolbar ── -->
      <div class="toolbar__grid">
        <div class="toolbar__left">
          <div class="toolbar__search">
            <div class="mi__icon__toolbar__search"></div>
            <input
              type="text"
              class="toolbar__search-input"
              placeholder="Tìm kiếm hoặc nhờ AI trợ giúp..."
              v-model="searchText"
            />
          </div>
        </div>
        <div class="toolbar__right">
          <button class="button__outline"><div class="mi__icon__filter"></div></button>
          <button class="button__outline"><div class="mi__icon__export"></div></button>
          <button class="button__outline"><div class="mi__icon__interactive__history"></div></button>
          <div class="column__selection__setting">
            <button class="button__outline"><div class="mi__icon__setting__column"></div></button>
          </div>
        </div>
      </div>

      <!-- ── Table ── -->
      <div class="table__wrap">
        <!-- Loading overlay -->
        <div v-if="isLoading" class="table__loading">
          <span>Đang tải...</span>
        </div>

        <table v-else>
          <thead>
            <tr>
              <th class="col__checkbox col__sticky"><input type="checkbox" /></th>
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
            <!-- Empty state -->
            <tr v-if="candidateList.length === 0">
              <td colspan="18" class="table__empty">Không có dữ liệu</td>
            </tr>

            <tr v-else v-for="candidate in candidateList" :key="candidate.id">
              <td class="col__checkbox col__sticky"><input type="checkbox" /></td>
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
                  <div class="mi__icon__edit" title="Sửa" @click="handleEdit(candidate)"></div>
                  <div class="mi__icon__delete" title="Xóa" @click="handleDelete(candidate)"></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ── Pagination ── -->
    <Pagination
      :total="total"
      v-model:currentPage="currentPage"
      v-model:pageSize="pageSize"
    />

    <!-- ── Modal thêm/sửa ── -->
    <CandidateFrom
      v-if="isModalVisible"
      @close="isModalVisible = false"
      @save="handleSave"
    />
  </MainLayout>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import MainLayout    from '../../layouts/MainLayout.vue';
import CandidateFrom from './CandidateFrom.vue';
import Pagination    from '../../components/ms-pagination/MsPagination.vue';
import { getCandidates, createCandidate, updateCandidate, deleteCandidate } from '../../services/CandidateService';

// ─── State ───────────────────────────────────────────────
const candidateList  = ref([]);
const total          = ref(0);
const currentPage    = ref(1);
const pageSize       = ref(15);
const searchText     = ref('');
const isLoading      = ref(false);
const isModalVisible = ref(false);

// ─── Fetch data ───────────────────────────────────────────
const fetchCandidates = async () => {
  isLoading.value = true;
  try {
    const result = await getCandidates({
      page:   currentPage.value,
      limit:  pageSize.value,
      search: searchText.value,
    });
    candidateList.value = result.data;
    total.value         = result.total;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

// Chạy lần đầu khi vào trang
onMounted(fetchCandidates);

// ─── Watch search — debounce 300ms ────────────────────────
let debounceTimer = null;
watch(searchText, () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    currentPage.value = 1; // reset trang khi search
    fetchCandidates();
  }, 300);
});

// ─── Watch phân trang ─────────────────────────────────────
watch([currentPage, pageSize], fetchCandidates);

// ─── CRUD handlers ────────────────────────────────────────

/**
 * Thêm hoặc sửa — dùng chung 1 form
 * Sau khi lưu xong, fetch lại danh sách để đồng bộ với server
 */
const handleSave = async (candidateData) => {
  try {
    await createCandidate(candidateData);
    isModalVisible.value = false;
    currentPage.value = 1; // về trang 1 để thấy bản ghi vừa thêm
    await fetchCandidates();
  } catch (error) {
    console.error(error);
  }
};

const handleEdit = (candidate) => {
  // TODO: mở form với data điền sẵn
  console.log('Edit:', candidate);
};

const handleDelete = async (candidate) => {
  // TODO: thay bằng MsConfirmDialog
  const confirmed = confirm(`Bạn có chắc muốn xóa "${candidate.fullName}"?`);
  if (!confirmed) return;

  try {
    await deleteCandidate(candidate.id);
    await fetchCandidates(); // fetch lại sau khi xóa
  } catch (error) {
    console.error(error);
  }
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

.content__button__group > .content__button--add {
  border-radius: 4px 0 0 4px !important;
  border-right-color: #1661c2 !important;
}

.content__button__group > .content__button--down {
  border-radius: 0 4px 4px 0 !important;
}

.content__button__group {
  display: flex;
  align-items: center;
}

/* ── Toolbar ── */
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

.toolbar__right > .button__outline {
  padding: 0 8px !important;
}

/* ── Table ── */
tbody tr { height: 64px; }
tbody td { text-align: left; }

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

thead .col__checkbox.col__sticky { left: 0; background: #f9fafb; z-index: 6; }
thead .col__action.col__sticky   { right: 0; min-width: 72px; background: #f9fafb; z-index: 6; }
tbody .col__checkbox.col__sticky { left: 0; background: #fff; z-index: 5; }
tbody .col__action.col__sticky   { right: 0; min-width: 72px; background: #fff; z-index: 5; }

td.col__fullname {
  min-width: 250px;
  text-align: left;
  padding: 0 12px;
  vertical-align: middle;
}

.fullname__wrap { display: flex; align-items: center; }

.fullname__wrap > .mi__icon__avatar {
  width: 24px !important; height: 24px !important;
  min-width: 24px; min-height: 24px;
  background-size: cover !important;
  background-position: center !important;
  margin-right: 12px !important;
}

.fullname__text { display: flex; flex-direction: column; justify-content: center; height: 40px; }
.fullname__text__name { font-weight: 500; color: #1a73e8; line-height: 1; }
.fullname__text__title {
  display: flex; align-items: center; gap: 4px;
  color: #48bb56; font-size: 12px; margin-top: 4px; height: 16px;
}
.fullname__text__title > .mi__icon__check { background-color: #48bb56; }

.col__phone         { min-width: 150px; max-width: 150px; }
.col__email         { min-width: 200px; max-width: 200px; }
.col__chiendich     { min-width: 200px; max-width: 200px; }
.col__vitri         { min-width: 200px; max-width: 200px; }
.col__tintuyendung  { min-width: 150px; max-width: 150px; }
.col__vongtuyendung { min-width: 180px; max-width: 180px; }
.col__ngayungtuyen  { min-width: 120px; max-width: 200px; }
.col__nguonungvien  { min-width: 150px; max-width: 150px; }
.col__trinhdodaotao { min-width: 100px; max-width: 200px; }
.col__noidaotao     { min-width: 150px; max-width: 150px; }
.col__chuyennganh   { min-width: 150px; max-width: 150px; }
.col__noilamviecgannhat { min-width: 150px; max-width: 200px; }
.col__nhansukhaithac { min-width: 150px; max-width: 150px; }
.col__donvisd       { min-width: 150px; max-width: 150px; }

td.col__saodanhgia  { vertical-align: middle; padding-bottom: 0 !important; }
.rating-wrap { display: flex; justify-content: center; align-items: center; gap: 4px; min-height: 24px; }

.col__action { position: sticky; right: 0; min-width: 72px; background: #fff; }
.action__group { display: flex; justify-content: center; gap: 8px; visibility: hidden; cursor: pointer; }
tbody tr:hover .action__group { visibility: visible; }

/* ── Loading ── */
.table__loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  color: #6b7280;
  font-size: 14px;
}

/* ── Empty ── */
.table__empty {
  text-align: center;
  padding: 60px;
  color: #9ca3af;
  font-size: 14px;
}
</style>