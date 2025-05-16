<template>
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
</template>

<script>
export default {
    data() {
        return {
            countdownTimerSetting: {
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
    },
    mounted() {
        this.updateCountdown()
        this.intervalId = setInterval(this.updateCountdown, 1000)
        this.countdownTimerSetting = ct_countdown_setting
    },
}

</script>

<style>
.countdown-timer-block {
    font-family: "Be Vietnam Pro", sans-serif !important;
    display: flex;
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
</style>
