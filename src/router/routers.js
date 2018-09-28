import Todo from '../todo/todo.vue'
import Login from '../login/login.vue'

export default [
    {
        path: '/',
        name: 'app',
        component: Todo
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]
