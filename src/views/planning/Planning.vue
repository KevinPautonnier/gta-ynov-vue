
<template>
  <div>
    <div>Nombre d'heure éffectuées : {{hours}}</div>
    <button v-on:click="saveData" v-if="dataModified">Enregistrer les modifications</button>
    <full-calendar id="planning"  ref="calendar" :events="events" :header="header" @event-selected="eventSelected" @event-drop="eventDragStop" @event-resize="eventResizeStop"></full-calendar>
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
          right: 'agendaDay,basicDay,agendaWeek,basicWeek'
        },
        events: JSON.parse(sessionStorage.getItem("planningData")),
        dataModified : _dataModified,
        hours: 0
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
            newDate.setMinutes(0)
            this.events.forEach(function(event){
              if(event.title == calEvent.title){
                console.log('toto')
                event.start = moment(newDate.setHours(startHour))
                event.end = moment(newDate.setHours(endHour))
              }
            })
            this.dataModified = true
          }

       },
      eventDragStop: function(calEvent){
        console.log('drop')
        
        if(sessionStorage.getItem('role') == 'Salaried' || sessionStorage.getItem('role') == 'Human Resourses Director'){
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
        
        if(sessionStorage.getItem('role') == 'Salaried' || sessionStorage.getItem('role') == 'Human Resourses Director'){
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
        this.hourCount();
        this.dataModified = false
      },
      hourCount: function(){
        var data = JSON.parse(sessionStorage.getItem("planningData"))
        this.hours = 0
        var _this = this
        var now = new Date();
        data.forEach(function(day){
          if(moment(now).startOf('day') <= moment(day.start).startOf('day')){
            return
          }
          else{
            var start = moment(day.start)
            var end = moment(day.end)
            _this.hours += moment.duration(end.diff(start)).asHours()
          }
        })
      }
    },
    created: function(){
      this.hourCount();
    }
  }
</script>



     