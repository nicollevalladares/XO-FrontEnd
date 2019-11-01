import { mapActions, mapState } from 'vuex';
import store from '@/store';

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
            if(this.$route.params.id){
                store.dispatch('signup', {
                    name: this.userData.name,
                    username: this.userData.username,
                    idGame: this.$route.params.id,
                    currentPlayer: '2'
                })
            }
            else{
                store.dispatch('signup', {
                    name: this.userData.name,
                    username: this.userData.username,
                    currentPlayer: '1'
                })
            }
            
        }
    },
    created(){
        
    },
    computed: {
        ...mapState(['feedback'])
    }
}