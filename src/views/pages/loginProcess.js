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
                    var data = require('../planning/planningGenerated.json')
                    connected = true
                    sessionStorage.setItem("userID", user.id)
                    sessionStorage.setItem("name", user.name)
                    sessionStorage.setItem("role", user.role)
                    sessionStorage.setItem("email", user.email)
                    sessionStorage.setItem("planningData", JSON.stringify(data))
                    if(user.role == 'Team Manager'){
                        sessionStorage.setItem('employees', user.employees)
                    }
                    that.$router.replace({path: '/planning'})
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
  