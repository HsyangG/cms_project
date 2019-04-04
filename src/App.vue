<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import btMenu from './components/BtMenu/BtMenu'
export default {
  data () {
    return {
      selected: ''
    }
  },
  watch: {
    selected (newV, oldV) {
      this.$router.push({
        name: newV
      })
    }
  }
  /* components: {
    btMenu
  } */
}
</script>

<style>
body,div,ol,ul,li,dl,dt,dd,h1,h2,h3,h4,h5,h6,p,form,fieldset,legend,input{ margin:0; padding:0;}

h1,h2,h3,h4,h5,h6{ font-size:100%; font-weight:normal;}

ol,ul{ list-style:none;}
a{text-decoration: none;}
img,fieldset{ border:0 none; display:block;}
body{position:fixed;width:100%;height:100%} /*清除不完全overflow的情况*/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.back{
  position: absolute;
  top: 6px;
  left: 5px;
  color: white;
  z-index: 1000;
  width: 30px;
  height: 25px;
  font-size: 26px;
  text-align: center;
}
.back a{
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  color: white;
}
</style>
