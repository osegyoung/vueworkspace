<template>
  <div class="modal-container">
    <header>
      <slot name="header"></slot> <!-- slot을 여러개 사용할때는 기본적으로 이름이 필요 -->
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
<style scoped>
.modal-container {
  text-align: center;
  max-width: 40em;
  padding: 2em;
}
</style>