var socket = io();
const { createApp } = Vue;
const app = createApp({
    data() {
        return {
            appName: 'Live CRUD',
            messages: [],
            message: ''
        }
    },
    methods: {
        send() {
            socket.emit('message:new', this.message);
            this.message = '';
        }
    },
    created() {
        socket.on('message:broad', message => {
            this.messages.push(message);
        })
    }
});

app.mount('#app');