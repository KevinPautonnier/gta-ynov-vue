import usersData from '../users/UsersData'

export default {
    name: 'User',
    props: {
    },
    data: () => {
        return {
            email: "",
            password: "",
            logError: false
        }
    },
    methods: {
        connexion(){
            var that = this;
            var connected = false;
            usersData.forEach(function (user){
                if(user.email == that.email && user.password == that.password){
                    connected = true
                    sessionStorage.setItem("userID", user.id)
                    sessionStorage.setItem("name", user.name)
                    sessionStorage.setItem("role", user.role)
                    that.$router.replace({path: '/dashboard'})
                }
            })
            if (!connected){
                this.logError = true
            }
            else{
                this.logError = false
            }
        }
    }
}
  