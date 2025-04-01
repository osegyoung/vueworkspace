<template>
  <Layout>
    <template v-slot:header> <!-- header -->
      <h1>팝업 제목</h1>
    </template>
    <template v-slot:default> <!-- 이름이 없는 slot-->
      <p>팝업 컨텐츠 1</p>
      <p>팝업 컨텐츠 2</p>
    </template>
    <template v-slot:footer> <!-- footer -->
      <button type="button">닫기</button>
    </template>
  </Layout>
</template>
<script>// 모달을 불러오는 코드
import Layout from './ModalLayout.vue'

export default {
  components: {
    Layout
  }
}
</script>