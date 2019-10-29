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
        submitted() {
            this.isSubmitted = true;
        }
    }
  }