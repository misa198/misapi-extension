<template>
  <div class="lds-dual-ring"></div>
</template>

<script>
export default {};
</script>

<style>
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.lds-dual-ring {
  display: inline-block;
  width: 40px;
  height: 40px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 32px;
  height: 32px;
  margin: 4px;
  border-radius: 50%;
  border: 3px solid #ee4d2d;
  border-color: #ee4d2d transparent #ee4d2d transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
</style>
