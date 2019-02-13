<template>
  <li>
    <slot></slot>
  </li>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'my-li',
  data () {
    return {}
  }
}
</script>

<style scoped>
li {
  /*list-style: none;*/
  float: left;
  width: 33.33%;
  height: 125px;
}
</style>
