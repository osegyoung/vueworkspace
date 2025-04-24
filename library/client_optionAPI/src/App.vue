<template>
  <div>
    <!-- 공통적으로 사용할 Header -->
    <HeaderComponent />
    <!-- 사용자의 요청에 따라 Vue Router에 등록된 컴포넌트 출력할 위치 설정 -->
    <!-- key 속성은 컴포넌트의 고유키로 key를 기준으로 각 컴포넌트를 식별 -->
    <!-- 동일한 컴포넌트를 재사용하는 경우 호출정보에 따라 객체를 다시 생성하도록'
         key 속성에 this.$route.fullPath를 사용 -->
    <router-view :key="$route.fullPath"/>
     <!-- 공통적으로 사용할 footer -->
    <FooterComponent />
  </div>
</template>
<script>
  // Component = View(HTML) + Data + Code(Javascript), 화면을 구성하는 기본 단위로 Vue 객체를 의미하기도 함
  import HeaderComponent from './layouts/HeaderComponent.vue';
  import FooterComponent from './layouts/FooterComponent.vue';

  export default {
    // 자식 컴포넌트 등록 -> 등록하지 않은 컴포넌트는 <template>에서 사용할 수 없음
    components  : { 
      HeaderComponent, 
      FooterComponent 
    }
  }
</script>