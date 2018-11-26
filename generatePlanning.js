var moment = require('moment');
moment().format();

var days = 0
var month = 0
var result = []

while(days != 365){
    var date = new Date(2018, month, 1);
    while(date.getMonth() == month ){
        if(date.getTimezoneOffset() == -120){
            var dateStart = moment(date).hour(10).toDate()
            var dateEnd = moment(date).hour(20).toDate()
        }else{
            var dateStart = moment(date).hour(9).toDate()
            var dateEnd = moment(date).hour(19).toDate()
        }
        if(date.getDay()!=0 && date.getDay()!=6){
            result.push(
                {
                    title  : 'jour'+days,
                    start  : dateStart,
                    end    : dateEnd,
                    allDay : false,
                }
            )
        }

        date.setDate(date.getDate() + 1);
        days++
    }
    month++
}

var dictstring = JSON.stringify(result);
        
var fs = require('fs');

fs.writeFile("planningGenerated.json", dictstring);