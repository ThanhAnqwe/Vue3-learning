<template>
  <div class="sidebar" :class="{ 'collapsed': isCollapsed }">
    <div class="sidebar__list">
      <div class="sidebar__menu">
        <div class="sidebar__menu__item">
          <div class="sidebar__menu_item__icon mi__icon__recruitment"></div>
          <div class="menu__item__text">Tin Tuyển dụng</div>
        </div>
        <div class="sidebar__menu__item sidebar__menu__item--active">
          <div class="sidebar__menu_item__icon mi__icon__candidate"></div>
          <div class="menu__item__text">Ứng Viên</div>
        </div>
        <div class="sidebar__menu__item">
          <div class="sidebar__menu_item__icon mi__icon__calendar"></div>
          <div class="menu__item__text">Lịch</div>
        </div>
        <div class="sidebar__menu__item">
          <div class="sidebar__menu_item__icon mi__icon__talent"></div>
          <div class="menu__item__text">Kho Tiềm Năng</div>
        </div>
        <div class="sidebar__menu__item">
          <div class="sidebar__menu_item__icon mi__icon__campaign"></div>
          <div class="menu__item__text">Chiến dịch tuyển dụng</div>
        </div>
        <div class="sidebar__menu__item">
          <div class="sidebar__menu_item__icon mi__icon__task"></div>
          <div class="menu__item__text">Công việc</div>
        </div>
        <div class="sidebar__menu__item">
          <div class="sidebar__menu_item__icon mi__icon__marketing"></div>
          <div class="menu__item__text">aiMarketing</div>
        </div>
        <div class="sidebar__menu__item">
          <div class="sidebar__menu_item__icon mi__icon__report"></div>
          <div class="menu__item__text">Báo cáo</div>
        </div>
        <div class="sidebar__menu__item">
          <div class="sidebar__menu_item__icon mi__icon__setting"></div>
          <div class="menu__item__text">Thiết Lập</div>
        </div>
        <div class="sidebar__menu__item">
          <div class="sidebar__menu_item__icon mi__icon__knowledge"></div>
          <div class="menu__item__text">Kiến thức hữu ích</div>
        </div>
      </div>
      
      <!-- Nút toggle xử lý sự kiện click để thu gọn/mở rộng menu -->
      <div class="sidebar__toggle" @click="toggleSidebar">
        <div class="sidebar__toggle__icon mi__icon__left"></div>
        <div class="sidebar__toggle__text">Thu Gọn</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isCollapsed = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>