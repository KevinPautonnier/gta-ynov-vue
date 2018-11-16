
<template>
  <full-calendar :events="events" :header="header" :defaultView="defaultView" :views="views"></full-calendar>
</template>

<script>  
  export default {
    data () {
      return {
        header: {
          left: 'today prev,next',
          center: 'title',
        },
        events: [
          {
              title  : 'jour1',
              start  : '2018-11-12T08:00:00',
              end    : '2018-11-12T17:00:00',
              allDay : false,
          },
          {
              title  : 'jour2',
              start  : '2018-11-13T08:00:00',
              end    : '2018-11-13T17:00:00',
              allDay : false,
          },
          {
              title  : 'jour3',
              start  : '2018-11-14T08:00:00',
              end    : '2018-11-14T17:00:00',
              allDay : false,
          },
          {
              title  : 'jour4',
              start  : '2018-11-15T08:00:00',
              end    : '2018-11-15T17:00:00',
              allDay : false,
          },
          {
              title  : 'jour5',
              start  : '2018-11-16T08:00:00',
              end    : '2018-11-16T17:00:00',
              allDay : false,
          },
        ],
        resourceLabelText: 'Rooms',
        resources: 'https://fullcalendar.io/demo-resources.json?with-nesting',
      }
    }
  }
</script>



     