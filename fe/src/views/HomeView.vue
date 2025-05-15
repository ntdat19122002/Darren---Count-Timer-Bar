<template>
  <Header title="Countdown timer"></Header>
  <div class="flex countdown">
    <div class="left">
      <Card class="mb-16">
        <TextField class="mb-16" label="Countdown title" v-model="countdownTimerSetting.title" />
        <TextField class="mb-16" label="Subtitle" v-model="countdownTimerSetting.subtitle" />
        <div class="input-title mb-4">End time</div>
        <DatePicker show-time v-model:value="countdownTimerSetting.endTime"></DatePicker>
      </Card>
      <FooterButton
        :disabled="!isChange"
        @save="saveCountdownSetting"
      />
    </div>

    <Card class="right">
      <img src="../assets/img/productReview.png" alt="">
      <div class="countdown-timer-block">
        <div class="ct-title">
          {{ countdownTimerSetting.title }}
        </div>
        <div class="ct-subtitle">
          {{ countdownTimerSetting.subtitle }}
        </div>
        <div class="ct-countdown">
          {{ formattedTime }}
        </div>
      </div>

    </Card>
  </div>
  <ui-save-bar id="edit-countdown">
    <button variant="primary" id="save-button" @click="saveCountdownSetting"></button>
    <button @click="discardCountdownSetting" id="discard-button"></button>
  </ui-save-bar>
</template>

<script>
import { DatePicker } from 'ant-design-vue';
import Header from '../components/Header/Header.vue'
import { Card } from '@ownego/polaris-vue';
import FooterButton from '@/components/Button/FooterButton.vue';
import axiosInApp from '@/axios';
import dayjs from 'dayjs';

export default {
  components: { Card, Header, DatePicker, FooterButton},
  data() {
    return {
      countdownTimerName: 'Countdown 1',
      countdownTimerSetting: {
        title: '🔥Hurry up🔥',
        subtitle: 'Out of stock in:',
        endTime: ''
      },
      countdownTimerSettingOrigin: {
        title: '🔥Hurry up🔥',
        subtitle: 'Out of stock in:',
        endTime: ''
      },
      timeLeft: 0,
      intervalId: null
    }
  },
  computed: {
    formattedTime() {
      const total = Math.max(this.timeLeft, 0)
      const days = Math.floor(total / (3600 * 24))
      const hours = String(Math.floor((total % (3600 * 24)) / 3600)).padStart(2, '0')
      const minutes = String(Math.floor((total % 3600) / 60)).padStart(2, '0')
      const seconds = String(total % 60).padStart(2, '0')
      return `${days}d:${hours}:${minutes}:${seconds}`
    },
    isChange() {
      if (JSON.stringify(this.countdownTimerSetting) != JSON.stringify(this.countdownTimerSettingOrigin)) {
        document.getElementById('edit-countdown').show()
        return true
      } else {
        if (document.getElementById('edit-countdown')) {
          document.getElementById('edit-countdown').hide()
        }
        return false
      }
    }
  },
  methods: {
    updateCountdown() {
      const now = new Date()
      const target = new Date(this.countdownTimerSetting.endTime)
      const diff = Math.floor((target - now) / 1000)
      this.timeLeft = diff > 0 ? diff : 0
      if (diff <= 0 && this.intervalId) {
        clearInterval(this.intervalId)
        this.intervalId = null
        this.$emit('finished')
      }
    },
    saveCountdownSetting() {
      axiosInApp.put('/countdowns',{
        countdownTimerName: this.countdownTimerName,
        countdownTimerSetting:this.countdownTimerSetting
      }).then(()=>{
        this.countdownTimerSettingOrigin = {...this.countdownTimerSetting}
      })
    },
    discardCountdownSetting() {
      this.countdownTimerSetting = {...this.countdownTimerSettingOrigin}
    }
  },
  mounted() {
    this.updateCountdown()
    this.intervalId = setInterval(this.updateCountdown, 1000)
    axiosInApp.get('/countdowns')
      .then(res => {
        this.countdownTimerSetting = JSON.parse(res.data.setting)
        this.countdownTimerSetting.endTime = dayjs(this.countdownTimerSetting.endTime)
        this.countdownTimerSettingOrigin = {...this.countdownTimerSetting}
      })
  },
  unmounted() {
    if (this.intervalId) clearInterval(this.intervalId)
  },
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

.ct-title {
  margin-top: 10px;
  font-weight: 500;
  font-size: 36px;
  margin-bottom: 24px;
}

.ct-subtitle {
  margin-bottom: 8px;
}

.ct-countdown {
  font-size: 24px;
}

@media screen and (max-width: 768px) {
  .countdown {
    display: grid;
  }
}
</style>