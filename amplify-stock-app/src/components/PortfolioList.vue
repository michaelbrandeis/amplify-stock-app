<template>
  <div>
    Portfolios:
    <div>
      <div v-for="item in items" v-bind:key="item.id">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PortfolioList',
  props: [
    'items'
  ]
}
</script>
