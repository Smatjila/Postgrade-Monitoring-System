import React, { useState } from 'react';
import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function Calendar() {
  const [events, setEvents] = useState([
    { title: 'Software Testing', start: '2024-07-01', end: '2024-07-15' },
    { title: 'Research Paper', start: '2024-07-02', end: '2024-07-05' }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });

  const handleDateClick = (arg) => {
    setNewEvent({ ...newEvent, start: arg.dateStr, end: arg.dateStr });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, newEvent]);
    setShowModal(false);
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>Add Event</button>

      <Fullcalendar
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

      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Event</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Event Title</label>
                    <input type="text" className="form-control" name="title" value={newEvent.title} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Start Date</label>
                    <input type="date" className="form-control" name="start" value={newEvent.start} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">End Date</label>
                    <input type="date" className="form-control" name="end" value={newEvent.end} onChange={handleInputChange} required />
                  </div>
                  <button type="submit" className="btn btn-primary">Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
