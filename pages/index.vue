<script setup lang="ts">
import { ROUTE } from '@/constants/route';

const router = useRouter();

const toProfile = () => {
  router.push(ROUTE.PROFILE);
};

const toCustomer = () => {
  router.push(ROUTE.CUSTOMER);
};

definePageMeta({
  middleware: ['auth'],
});
</script>

<template>
  <h1>Top Page</h1>

  <div class="pageContent">
    <h2>Page Link</h2>

    <div class="pageContent__card">
      <div class="pageContent__card--profile">
        <q-card class="my-card" @click="toProfile">
          <img src="/images/demo-logo.png" height="120px" />

          <q-card-section>
            <div class="text-h6">Nyaomaru Profile</div>
            <div class="text-subtitle2">You might see nyaomeru detail</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="pageContent__card--customer">
        <q-card class="my-card" @click="toCustomer">
          <img src="/images/client-img.png" height="120px" />

          <q-card-section>
            <div class="text-h6">Customer</div>
            <div class="text-subtitle2">Nyaomaru's customer</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pageContent {
  text-align: center;

  &__card {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    &--profile {
      margin: 20px;
      color: blue;
      cursor: pointer;
      width: 240px;
    }

    &--customer {
      margin: 20px;
      color: purple;
      cursor: pointer;
      width: 240px;
    }
  }

  &__button {
    margin-top: 20px;
  }
}
</style>
