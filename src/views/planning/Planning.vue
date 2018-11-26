
<template>
  <div>
    <full-calendar :events="events" :header="header" @event-selected="eventSelected" @event-drop="eventDragStop" @event-resize="eventResizeStop"></full-calendar>
    <button v-on:click="saveData" v-if="dataModified">Enregistrer les modifications</button>
  </div>
</template>

<script>
  var moment = require('moment');
  moment().format();

  var _dataModified = false

  export default {
    data () {
      return {
        header: {
          left: 'today prev,next',
          center: 'title',
        },
        events: JSON.parse(sessionStorage.getItem("planningData")),
        dataModified : _dataModified
      }
    },

    methods: {
      eventSelected: function(calEvent, jsEvent, view) {
          if(sessionStorage.getItem('role') == 'Salaried' || sessionStorage.getItem('role') == 'Human Resourses Director'){
            alert('Vous n\'avez pas le droit de modifier votre planning!');
            this.events = JSON.parse(sessionStorage.getItem("planningData"));
          }
          else{
            var startHour = prompt("Entrer l'heure de début", "8");
            var endHour = prompt("Entrer l'heure de fin", "18");
            var newDate = new Date(calEvent.start)
            this.events.forEach(function(event){
              if(event.title == calEvent.title){
                event.start = moment(newDate.setHours(startHour))
              }
            })
            this.dataModified = true
          }

       },
      eventDragStop: function(calEvent){
        console.log('drop')
        
        if(sessionStorage.getItem('role') == 'Salaried' || sessionStorage.getItem('role') == 'Team Manager'){
          alert('Vous n\'avez pas le droit de modifier votre planning!');
          this.events = JSON.parse(sessionStorage.getItem("planningData"));
        }
        else{
          var newDate = new Date(calEvent.start)
          this.events.forEach(function(event){
            if(event.title == calEvent.title){
              event.start = moment(newDate.setHours(calEvent.start.format("HH")))
              event.end = moment(newDate.setHours(calEvent.end.format("HH")))
            }
          })
          this.dataModified = true
        }
      },
      eventResizeStop: function(calEvent){
        console.log('resize')
        
        if(sessionStorage.getItem('role') == 'Salaried' || sessionStorage.getItem('role') == 'Team Manager'){
          alert('Vous n\'avez pas le droit de modifier votre planning!');
          this.events = JSON.parse(sessionStorage.getItem("planningData"));
        }
        else{
          var newDate = new Date(calEvent.start)
          this.events.forEach(function(event){
            if(event.title == calEvent.title){
              event.start = moment(newDate.setHours(calEvent.start.format("HH")))
              event.end = moment(newDate.setHours(calEvent.end.format("HH")))
            }
          })
          this.dataModified = true
        }
      },
      saveData: function(){
        console.log('dataSave')
        sessionStorage.setItem("planningData", JSON.stringify(this.events))
      }
    }
  }
</script>



     