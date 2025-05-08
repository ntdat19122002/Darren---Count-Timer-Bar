<template>
  <Header title="Countdown timer"></Header>
  <div class="flex countdown">
    <Card class="left">
      <TextField class="mb-16" label="Countdown title" v-model="countdown_timer_setting.title" />
      <TextField class="mb-16" label="Subtitle" v-model="countdown_timer_setting.subtitle" />
      
      <div class="input-title mb-4">End time</div>
      <DatePicker show-time v-model:value="countdown_timer_setting.endTime"></DatePicker>
    </Card>
    <Card class="right">
      <img src="../assets/img/productReview.png" alt="">
      <div class="countdown-timer-block">
        <div class="ct-title">
          {{ countdown_timer_setting.title }}
        </div>
        <div class="ct-title">
          {{ countdown_timer_setting.subtitle }}
        </div>
        <div class="ct-title">
          {{ countdown_timer_setting.title }}
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { DatePicker } from 'ant-design-vue';
import Header from '../components/header/Header.vue'
import { Card } from '@ownego/polaris-vue';
export default {
  components: { Card, Header, DatePicker },
  data() {
    return {
      countdown_timer_setting: {
        name: 'Countdown 1',
        title: 'Hurry up!',
        subtitle: 'Sale ends in',
        endTime: ''
      }
    }
  }
}
</script>

<style scoped>
.countdown {
  gap: 16px;
}

.left {
  width: 70%;
}

.right {
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: center;
}

.countdown-timer-block {
  display: flex;
  background-color: white;
  flex-direction: column;
  align-items: center;
}

@media screen and (max-width: 768px) {
  .countdown {
    display: grid;
  }
}
</style>