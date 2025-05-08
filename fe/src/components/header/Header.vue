<template>
    <div class="page-title">
        <div class="space-between">
            <div class="align-center">
                <div>
                    {{ title }}
                </div>
            </div>
            <div class="flex">
                <Button v-if="button"
                    variant="primary"
                >
                    + Add pixel
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import {Button, TextField} from '@ownego/polaris-vue'

export default {
    props:['title'],
    components:{Button}
}
</script>