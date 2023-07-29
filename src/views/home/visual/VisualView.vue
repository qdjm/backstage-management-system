<template>
  <div class="container">
    <div class="leftCon">
      <ItemPage>
        <template #item>
          <OnePage />
        </template>
      </ItemPage>
      <ItemPage>
        <template #item>
          <TwoPage />
        </template>
      </ItemPage>
    </div>
    <div class="rightCon">
      <ItemPage>
        <template #item>
          <ThreePage />
        </template>
      </ItemPage>
      <ItemPage>
        <template #item>
          <FourPage />
        </template>
      </ItemPage>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ItemPage from '../../../components/ChartOutline.vue'
import OnePage from '../../../components/OnePage.vue'
import TwoPage from '../../../components/TwoPage.vue'
import ThreePage from '../../../components/ThreePage.vue'
import FourPage from '../../../components/FourPage.vue'
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  margin: 0 auto;
  display: flex;
  .leftCon, .rightCon {
    flex: 1;
  }
}
</style>