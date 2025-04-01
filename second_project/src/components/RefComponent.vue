<template>
  <div>
    <input type="text" v-model.number="content"> <!--타입을 number숫자로 처리 / type에 number를 추가하는게 좀더 안정적이다.  -->
    <p>{{ content }}</p>
    <button ref="btn" @click="plusCount">더하기</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: '',
    }
  },
  mounted() {
    //console.log(this.$refs.btn);
    // this.$refs.btn.click(); // ref : 태그에 있는 
  },
  methods: {
    plusCount() {
      alert('버튼을 클릭했습니다.');
      if ((typeof this.content) == 'number') {
        let sum = this.content + 100;
        this.content = sum;
      }
      else {
        alert('데이터 타입이 숫자가 아닙니다.')
      }
    }
  }
}
</script>