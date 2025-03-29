<script setup lang="ts">
import { ROUTE } from '@/constants/route';
import PageCard from '@/components/molecules/PageCard.vue';

const router = useRouter();

const toProfile = () => {
  router.push(ROUTE.PROFILE);
};

const toCustomer = () => {
  router.push(ROUTE.CUSTOMER);
};
</script>

<template>
  <h1>Top</h1>

  <h2>Page Links</h2>

  <div class="pageContent">
    <div class="pageContent__card row q-mt-md">
      <div class="pageContent__card--profile col-6 q-pa-md">
        <PageCard
          title="Nyaomaru Profile"
          subtitle="You might see nyaomeru detail"
          img-src="/images/demo-logo.png"
          img-alt="nyaomaru_profile"
          @click="toProfile"
        />
      </div>

      <div class="pageContent__card--customer col-6 q-pa-md">
        <PageCard
          title="Customer"
          subtitle="Nyaomaru's customer"
          img-src="/images/client-img.png"
          @click="toCustomer"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/page.scss';

%_card {
  width: 24rem;
  cursor: pointer;
}

.pageContent {
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
