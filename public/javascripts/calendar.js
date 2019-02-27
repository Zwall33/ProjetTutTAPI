 $(document).ready(function() {

    $('#calendar').fullCalendar({
      locale: 'fr',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listWeek'
      },
      navLinks: true, // can click day/week names to navigate views
      weekNumberCalculation: 'ISO',
      selectable: true,
      selectHelper: true,
      select: function(start, end) {
        var title = prompt('Entrez le nom la pompe à activer : ');
        var date = start.format();
        var tamp = new Array(5);

        tamp = prompt('HH:MM');
        
        var timestart = new Array(5);

        if(tamp[4] == undefined && tamp[0]>2){
        	timestart[4] = parseInt(tamp[3], 10);
        	timestart[3] = parseInt(tamp[2], 10);
        	timestart[2] = parseInt(tamp[1], 10);
        	timestart[1] = parseInt(tamp[0], 10);
        	timestart[0] = 0;
        }
        /*for(i=0;i<5;i++){
        	timestart[i] = tamp[i];
        }*/
        alert(timestart);



        //var timeend = prompt('HH:MM:SS');
        var startevent = date + 'T' + timestart;
        //var endevent = date + 'T' + timeend;
        var eventData;
        if (title) {
          eventData = {
            title: title,
            start: startevent,
            end: endevent
          };
          $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
        }
        $('#calendar').fullCalendar('unselect');
      },
      editable: false,
      eventLimit: true, // allow "more" link when too many events
      timeFormat: 'H(:mm)' // uppercase H for 24-hour clock
    });

  });