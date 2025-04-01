<template>
  <div>
    <PageTitle title="First!" /> <!-- 어떻게 넘길까(중요!!) -태그가 가지고 있는 하나의 속성이다. -->
    <!--<PageTitle title="Today is .. "/>-->
    <hr>
    <PageContent v-bind:title="header" v-bind:count="(10 + 15)" :writer="['Adward']" :regdate="20241205"
      :content="{ First: 'Node.js', second: 'Vue.js' }" />
    <hr>
    <PageContent v-bind="info" @update-info="handler"></PageContent> <!-- bind directive는 변수-->
    <!-- update-info : 자식이 보내주는 데이터를 처리 -->
    <hr>
    <RefComponent ref="child" /> <!-- 컴포넌트 자체에 접근이 가능하다.-->
    <hr>
    <label> 부모데이터 : <input type="number" v-model="num"></label>
    <button @click="childHandler">자식 제어</button>
  </div>
</template>
<script>
import PageTitle from './PageTitle.vue';
import PageContent from './PageContent.vue';
import RefComponent from './RefComponent.vue';
export default {
  components: { // 자식 컴포넌트 등록
    PageTitle,
    PageContent,
    RefComponent,
  },
  data() { // props에 해당이 되어야 한다.
    return {
      header: '게시글 조회',
      info: {
        title: 'Today is',
        count: 5,
        writer: 'Adward',
        regdate: '2024-11-19',
        content: 'No Content',
      },
      num: 0
    }
  },

  created() {
    console.log('PageComponent.vue Created');
  },
  mounted() {
    console.log('PageComponent.vue Mounted');
  },
  methods: {
    handler(readInfo) {
      // 자식 컴포넌트의 emit을 기반으로
      // 넘긴 데이터가 매개변수로 넘어옴
      alert('자식 컴포넌트 요청');
      this.info.count = readInfo;
    },
    childHandler() { // 궁극적으로는 같은 걸 실행한다.
      //1. 자식 컴포넌트의 함수 직접 호출
      this.$refs.child.plusCount();

      //2. 자식 컴포넌트의 태그에 직접 접근
      let RefCom = this.$refs.child;
      RefCom.$refs.btn.click(); // 강제 발생 시키는 것도 가능 , 독립성이 깨짐, 
    }
  },
  watch: {
    num() {
      this.$refs.child.content = this.num;
    }
  }
}

</script>