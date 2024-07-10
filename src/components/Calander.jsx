import React from 'react'
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlug from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import *as bootsrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles.css"
function Calander() {
    const events=[
        {
            title:"The Title",
            start:"2024-07-10-05T08:00:00",
            end:"2024-07-10-05T08:00:00"
        },
    ];
    {
        events: [
          {
            title: 'Event1',
            start: '2011-04-04'
          },
          {
            title: 'Event2',
            start: '2011-05-05'
          }
          // etc...
        ]
      }
  return (
    <div>

     <Fullcalendar
     plugins={[dayGridPlugin,timeGridPlug,interactionPlugin,]}
     initialView={"dayGridMonth"}
     headerToolbar={{
        start:'today prev,next',
        center:'title',
        end:'dayGridMonth,timeGridWeek,timeGridDay'
     }}
     height={"90vh"}
     events={events}
     eventDidMount={(info)=>{
        return new bootstrap.Popover(info.el,{
            title:info.event.title,
            placement:"auto",
            trigger:"hover",
            customClass:"popoverStyle",
            content:
            "<p> Please subscribe <strong>Bootstrap popover</strong>.</p>",
            html:true
        })
     }}
     />
    </div>
  )
}

export default Calander
 