<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 text-bg-dark" style="width: 280px;">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white
text-decoration-none">
      <svg class="bi pe-none me-2" width="40" height="32" aria-hidden="true">
        <use xlink:href="#bootstrap" />
      </svg>
      <span class="fs-4">My Page</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="/mypage/myReview" class="nav-link text-white" aria-current="page"> <svg class="bi pe-none me-2"
            width="16" height="16" aria-hidden="true">
            <use xlink:href="#home" />
          </svg>
          내가 작성한 리뷰
        </a>
      </li>
      <li>
        <a href="/mypage/myInfo" class="nav-link text-white">
          <svg class="bi pe-none me-2" width="16" height="16" aria-hidden="true">
            <use xlink:href="#speedometer2" />
          </svg>
          회원정보수정
        </a>
      </li>
    </ul>
  </div>
</template>