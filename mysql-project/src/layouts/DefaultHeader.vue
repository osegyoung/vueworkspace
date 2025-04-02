<template>
<nav class="nav container text-center">
  <router-link to="/">Home</router-link> |
  <router-link :to="{ name : 'custList'}">전체조회</router-link>|
  <router-link :to="{ name : 'custAdd'}">등록</router-link>|
  <router-link :to="{ name : 'custInfo'}">문제 많음.</router-link>
</nav>
</template>