<template>
  <div class="navbar">
    <div class="navbar__left">
      <div class="navbar__left__logo">
        <div class="mi__icon__switch"></div>
        <div class="navbar__left__wrap">
          <div class="mi__icon__logo"></div>
          <div class="navbar__left__background"></div>
          <div class="navbar__left__text">Tuyển dụng</div>
        </div>
      </div>
      <div class="navbar__left__search">
        <div class="navbar__left__wrap__search">
          <div class="mi__icon__search"></div>
          <input 
            type="text" 
            class="navbar__left__input" 
            placeholder="Tìm kiếm tin tuyển dụng, ứng viên, nhân tài,.."
          >
        </div>
      </div>
    </div>
    
    <div class="navbar__right">
      <div class="navbar__right__web">
        <div class="mi__icon__web"></div>
        <div class="web_text">Website tuyển dụng</div>
      </div>
      

      <div class="mi__icon__agent">
        <svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_26093_18081)">
                <circle cx="25.5" cy="23.5" r="12" fill="#37E1FF" /> 
            </g>
        </svg>
      </div>

      <!-- Các Icon tiện ích -->
      <div class="mi__icon__notify"></div>
      <div class="navbar__right__store mi__icon__store">
        <div class="navbar__right__store--count">1</div>
      </div>
      <div class="mi__icon__user"></div>
      <div class="mi__icon__mess"></div>
      <div class="navbar__right__alert mi__icon__alert">
        <div class="navbar__right__alert--count">18</div>
      </div>
      <div class="mi__icon__help"></div>
      <div class="mi__icon__more"></div>
      <div class="mi__icon__knowledge"></div>
      <div class="mi__icon__avatar"></div>
      <div></div>
    </div>
  </div>
</template>

<script setup>
</script>