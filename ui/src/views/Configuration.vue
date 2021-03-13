<template>
    <div justify="center" align="center" class="fill_height pt-16">
        <h2 class="pt-16 pb-5">Gesture Action Configuration</h2>
        <v-row >
            <v-col cols="3"><h3 class="primary--text">Gesture</h3></v-col>
            <v-col cols="4"><h3 class="primary--text">Signal Name</h3></v-col>
        </v-row>
        <div v-for="(gesture, i) in gestures" :key="i">
            <v-row>
                <v-col cols="3"><h3>{{ gesture.name }}</h3></v-col>
                <v-col cols="4"><h4 :class="[gesture['Signal.name'] ? 'success--text' : 'red--text']">{{ gesture['Signal.name'] || 'Not Configured' }} </h4></v-col>
                <v-col class="mb-2"><v-btn color="primary" @click="changeUpdateState(gesture['id'], gesture['name'])" dark>Change</v-btn></v-col>
            </v-row>
            <v-divider class="pa-2"></v-divider>
        </div>
        <v-overlay v-model="updateState">
            <div style="background-color: white">
                <v-toolbar color="primary">
                    <v-spacer></v-spacer>
                    <h3 class="white--text">{{ gesture_name }}</h3>
                    <v-spacer></v-spacer>
                    <v-btn @click="changeUpdateState()" rounded>X</v-btn>
                </v-toolbar>
                <br>
                <div class="pa-16">
                    <v-select
                        light
                        :items="signals"
                        label="Signal"
                        dense
                        outlined
                        item-text="name"
                        item-value="id"
                        v-model="signal_id"
                    >
                    </v-select>
                    <br>
                    <v-btn color="primary" @click="updateConfig">Update</v-btn>
                </div>
            </div>
        </v-overlay>
    </div>
</template>

<script>
import Api from '../services/Api'
export default {
    data () {
        return {
            gestures: [],
            updateState: false,
            gesture_id: null,
            gesture_name: null,
            signal_id: null,
            signals: []
        }
    },
    methods: {
        changeUpdateState (gesture_id = null, gesture_name = null) {
            this.updateState = !this.updateState
            this.gesture_id = gesture_id
            this.gesture_name = gesture_name
            console.log('fffffff')
            console.log(this.updateState + ' ' + this.gesture_id + ' ' + this.gesture_name);
        },
        async updateConfig () {
            await Api().get('config/change/' + this.gesture_id + '/' + this.signal_id)
                .then(() => {
                    this.updateState = false
                    this.getData()
                }).catch((err) => {
                    console.log(err)
                })
        },
        async getData () {
            this.gestures = await Api().get('config')
                .then((data) => {
                    return data.data
                }).catch((err) => {
                    console.log(err)
                })
            console.log(this.gestures)

            this.signals = await Api().get('config/signal')
                .then((data) => {
                    return data.data
                }).catch((err) => {
                    console.log(err)
                })
            console.log(this.signals)
        }
    },
    async mounted () {
        this.getData()
    }
}
</script>