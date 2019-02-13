<template>
  <ul>
    <slot></slot>
  </ul>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'my-ul',
  data () {
    return {}
  }
}
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
