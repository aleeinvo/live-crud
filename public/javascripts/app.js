var socket = io();
const { createApp } = Vue;
const app = createApp({
    data() {
        return {
            appName: 'Live CRUD',
            posts: [],
            post: {
                title: '',
                body: '',
                action: 'Create'
            }
        }
    },
    methods: {
        doIt() {
            if(this.post.action === 'Create') {
                this.send();
            } else {
                this.update();
            }
        },
        send() {
            if(this.post.title && this.post.body) {
                socket.emit('posts:create', this.post);
            }
        },
        edit(postId) {
            const post = this.posts.find(post => {
                return post.id === postId;
            });

            this.post = JSON.parse(JSON.stringify(post));

            this.post.action = 'Update';
        },
        update() {
            console.log('edit post', this.post);
            if(this.post.title && this.post.body && this.post.action == 'Update') {
                socket.emit('posts:update', this.post);

                this.post.title = '';
                this.post.body = '';
                this.post.action = 'Create';
            }
        },
        destory(postId) {
            socket.emit('posts:destroy', postId);
        }
    },
    created() {
        socket.on('posts:index', posts => {
            console.log('posts', posts);
            this.posts = posts;
        })
    }
});

app.mount('#app');