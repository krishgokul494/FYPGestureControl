<template>
    <div justify="center" align="center" class="fill_height pt-16">
        <!-- <h1 class="fill_height center-div">Hi</h1> -->
        <div v-if="input_mode">
            <h2 class="pa-6">New Signal</h2>
            <v-text-field
                label="Signal Name / Button Name"
                outlined
                style="width: 30%"
                v-model="signal_name"
            ></v-text-field>
            <v-btn color="primary" dark @click="record_signal">Record Signal</v-btn>
        </div>
        <div v-else class="pa-16">
            <div v-if="recording">
                <h2>Your System is in Record Mode. Point remote towards system and press the new Remote button</h2>
            </div>
            <div v-else>
                <h2>Signal Added successfully</h2>
                <br>
                <v-btn @click="finished" color="primary" dark>OK</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import Api from '../services/Api'
export default {
    data () {
        return {
            input_mode: true,
            recording: false,
            signal_name: ''
        }
    },
    methods: {
        async record_signal() {
            this.input_mode = false
            this.recording = true
            await Api().get('recv/' + this.signal_name)
                .then((response) => {
                    console.log(response);
                    this.recording = false;
                })
        },
        finished () {
            this.signal_name = ''
            this.input_mode = true
        }
    }
}
</script>

<style>
.fill_height {
    height: 100%;
}
</style>