import { mapActions, mapState } from 'vuex';
import store from '@/store'

export default {
    name: 'signUp',
    data() {
        return {
            userData: {
                name: '',
                username: ''
            }
        }
    },
    methods: {
        ...mapActions([]),
        signup() {
            store.dispatch('signup', {
                name: this.userData.name,
                username: this.userData.username
            })
        }
    },
    created(){
        
    },
    computed: {
        ...mapState(['feedback'])
    }
}