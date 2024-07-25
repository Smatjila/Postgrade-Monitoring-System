import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2';
import { useAuth } from "../../Backend/AuthContext";
import { getDocs, query, collection,where} from 'firebase/firestore'; // Import Firestore functions
import { db,auth} from '../../Backend/Config';

function Calendar() {
  const { CurrentUser } = useAuth();
  const SupervisorID = 720000007; // Replace this with the actual SupervisorID dynamically if needed
  const [events, setEvents] = useState([
    { title: 'Software Testing', start: '2024-07-01', end: '2024-07-15', backgroundColor: '#378006', borderColor: '#378006' },
    { title: 'Research Paper Calendar', start: '2024-07-02', end: '2024-07-05', backgroundColor: '#ff9f89', borderColor: '#ff9f89' }
  ]);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '', color: '' });
  const [moduleTitles, setModuleTitles] = useState([]);

  useEffect(() => {
    const fetchModules = async () => {
      try{
        const q = query(collection(db, 'Module'), where('SupervisorID', '==', SupervisorID));
        const querySnapshot = await getDocs(q);
        const modulesArray = [];
        querySnapshot.forEach((doc) => {
          modulesArray.push(doc.data().ModuleTitle);
        });
        setModuleTitles(modulesArray);
      }
      catch(error){
        console.error("error fetch moudles:", error);
      };
      }
 
    fetchModules();
  }, [SupervisorID]);

  const handleDateClick = (arg) => {
    setNewEvent({ ...newEvent, start: arg.dateStr, end: arg.dateStr });
  };

    const showEventPopup = async () => {
      const moduleOptions = moduleTitles.map((title, index) => `<option value="${title}">${title}</option>`).join('');
      const { value: formValues } = await Swal.fire({
        title: 'Add Event',
        html: `
          <input id="swal-input1" class="swal2-input" placeholder="Event Title">
          <input id="swal-input2" class="swal2-input" type="date" value="${newEvent.start}">
          <input id="swal-input3" class="swal2-input" type="date" value="${newEvent.end}">
          <select id="swal-input5" class="swal2-input">
          <option value="" disabled selected>Select a color</option>
          <option value="#378006" style="background-color: #378006; color: #378006;">● Green</option>
          <option value="#ff9f89" style="background-color: #ff9f89; color: #ff9f89;">● Pink</option>
          <option value="#1e90ff" style="background-color: #1e90ff; color: #1e90ff;">● Blue</option>
          <option value="#ff6347" style="background-color: #806CA5; color: #806CA5;">● Purple</option>
          <option value="#ffa500" style="background-color: #ffa500; color: #ffa500;">● Orange</option>
          </select>
          <select id="swal-input5" class="swal-input">
          <option value="" disabled selected>Select a module</option>
          ${moduleOptions}
          </select>
      `,
      focusConfirm: false,
      preConfirm: () => { 
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
          document.getElementById('swal-input3').value,
          document.getElementById('swal-input4').value,
          document.getElementById('swal-input5').value
        ];
      }
    });

    if (formValues) {
      const [title, start, end, module, color] = formValues;
      setEvents([...events, { title, start, end, module, backgroundColor: color, borderColor: color }]);
      Swal.fire('Event Added', JSON.stringify(formValues));
    }
  };

  const userType = CurrentUser?.email.startsWith('7') ? 'Supervisor' : '';

  return (
    <div>
      {userType === 'Supervisor' && (
        <button className="btn btn-primary" onClick={showEventPopup}>Add Event</button>
      )}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        weekends={false}
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        height={"90vh"}
        events={events}
        dateClick={handleDateClick}
      />
    </div>
  );
}

export default Calendar;
