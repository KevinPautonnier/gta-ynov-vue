
<template>
  <div id="planning-team">
    <div id="employees-names">
      <p v-for="employeeName in employeesNames" v-bind:key="employeeName">
          {{employeeName}}
      </p>
    </div>
    <full-calendar id="team-fullcallendar" :defaultView="defaultView" :events="events" :header="header"></full-calendar>
  </div>
</template>

<script>
  import usersData from '../users/UsersData'

  var moment = require('moment');
  moment().format();

  export default {
    data () {
      return {
        defaultView: 'basicWeek',
        header: {
          left: 'today prev,next',
          center: 'title',
        },
        events: JSON.parse(sessionStorage.getItem("planningData")),
        employeesNames: []
      }
    },

    methods: {
    },
    created: function(){
      var data = []
      var _employeesNames = []
      var employees = sessionStorage.getItem('employees').split(',')
      usersData.forEach(function(user){
        if(employees.includes(String(user.id))){
          data = data.concat(require('./planningGenerated'+user.id+'.json'))
          _employeesNames.push(user.name)
        }
      })
      this.events = data
      this.employeesNames = _employeesNames
    }
  }
</script>



     