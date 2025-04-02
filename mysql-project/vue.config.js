const {
  defineConfig
} = require('@vue/cli-service')
const serverOrigin = 'http://localhost:3000';

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: { // reload가 잘 안되기 때문에 서버를 껐다가 다시 키는게 좋다.
      '^/api': { // 문자열을 의미 , 임의로 넣은 값.
        target: serverOrigin, // 변경할 origin - 새로 적용할 origin
        changeOrigin: true, // 중요 : true로 해야 origin이 변경된다. target으로 변경
        ws: false, // 웹 솟켓 기능을 false로 죽이는거
        pathRewrite: { // 경로 재작성
          '^/api': '/' // 앞에꺼 빼고 /로 바꾼것이다.
        }
      }
    }
  }
})