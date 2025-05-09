<template>
    <div class="footer-button mb-8">
        <Button
            :disabled="disabled"
            @click="$emit('save')"
            variant="primary"
        >
            Save
        </Button>
    </div>
</template>

<script>
import {Button} from "@ownego/polaris-vue";

export default {
    props:['disabled'],
    emits:['save'],
    components:{Button},
}
</script>

<style scoped>
.footer-button{
    display: flex;
    justify-content: right;
}
</style>