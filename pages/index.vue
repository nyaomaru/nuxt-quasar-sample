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
  <h1>Top</h1>

  <h2>Page Link</h2>

  <div class="pageContent">
    <div class="pageContent__card row q-mt-md">
      <div class="pageContent__card--profile col-6 q-pa-md">
        <q-card @click="toProfile">
          <img src="/images/demo-logo.png" height="240px" width="480px" alt="nyaomaru_profile" />

          <q-card-section>
            <div class="text-h6">Nyaomaru Profile</div>
            <div class="text-subtitle2">You might see nyaomeru detail</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="pageContent__card--customer col-6 q-pa-md">
        <q-card @click="toCustomer">
          <img src="/images/client-img.png" height="240px" width="480px" alt="customer" />

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
%_card {
  width: 24rem;
  cursor: pointer;
}

.pageContent {
  text-align: center;

  &__card {
    display: flex;
    justify-content: space-around;
    align-items: center;

    &--profile {
      color: blue;
      @extend %_card;
    }

    &--customer {
      color: purple;
      @extend %_card;
    }
  }
}
</style>
