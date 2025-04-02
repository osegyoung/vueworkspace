//index.js - 전체조회
const axios = require('axios');

//둘다 기본문법은 같음.
//fetch
fetch('http://localhost:3000/customers') //fetch를 사용할때는 then을 두번써야함. : 
  .then(res => res.json())
  .then(result => {
    console.log('fetch, GET');
    console.log(`\t`, result);
  })
  .catch(err => console.log(err));

//axios - 전제조건은 json이다.
axios('http://localhost:3000/customers')
  .then(result => {
    console.log('axios, GET');
    console.log(`\t`, result.data); // 순수하게 서버가 보낸 값을 가져올려고 하면 result가 아닌 result.data로 접근해야함.
  })
  .catch(err => console.log(err));

//단건조회
axios.get('http:localhost:3000/customers/2') // 경로 중요
  .then(result => {
    console.log('axios, 단건조회');
    console.log(`\t`, result.data);
  })
  .catch(err => console.log(err));

//등록
let insertInfo = {
  name: 'port',
  email: 'port@mail.com',
  phone: '010-1234-5555',
  address: null
};
//1) fetch
fetch('http: //localhost:3000/customers', {
    method: 'post',
    headers: {
      'Content-type': 'application / json',
    },
    body: JSON.stringify(insertInfo) // 보내는거
  })
  .then(res => res.json()) // 받는거
  .then(result => {
    console.log('fetch, post');
    console.log(`\t`, result);
  })
  .catch(err => console.log(err));

//2) axios
axios.post('http://localhost:3000/customers', insertInfo)
  .then(result => {
    console.log('axios, 등록');
    console.log(`\t`, result.data);
  })
  .catch(err => console.log(err));