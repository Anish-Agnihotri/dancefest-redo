import Layout from "@components/Layout"; // Layout wrapper
import ModalView from "@components/Modal"; // Modal component
import { useState, useEffect } from "react"; // State management
import { getSession } from "next-auth/client"; // Session handling
import { FilledButton, UnfilledButton } from "@components/Buttons"; // FilledButton component
import styles from "@styles/pages/Events.module.scss"; // Page styling
import { TextInput } from "@components/Inputs";
import DatePicker from "react-datepicker";
import axios from "axios";
import Loader from "react-loader-spinner";
import { EventCard } from "@components/Cards";

// Modal content states enum
const modalStates = Object.freeze({
  newEvent: 0,
  editEvent: 1,
});

// Page: Events
export default function Events({ session }) {
  const [events, setEvents] = useState([]); // Available events
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  const renderModalContent = () => {
    switch (modalContent) {
      case modalStates.newEvent:
        return (
          <NewEvent setModalOpen={setModalOpen} reloadEvents={getAllEvents} />
        );
      case modalStates.editEvent:
        return (
          <EditEvent
            event={events[eventToEdit]}
            setModalOpen={setModalOpen}
            reloadEvents={getAllEvents}
          />
        );
    }
  };

  const modalNewEvent = () => {
    setModalOpen(true);
    setModalContent(modalStates.newEvent);
  };

  const modalEditEvent = (i) => {
    setModalOpen(true);
    setModalContent(modalStates.editEvent);
    setEventToEdit(i);
  };

  const getAllEvents = async () => {
    setLoading(true);
    const response = await axios.get("/api/events/collect");
    const events = response.data;
    setEvents(events);
    setLoading(false);
  };

  useEffect(getAllEvents, []);

  return (
    <Layout>
      <div className={styles.page__events}>
        {/* Events page header */}
        <div className={styles.page__events_header}>
          <h1>Events</h1>

          {/* If user is admin, enable event creation */}
          {session.isAdmin ? (
            <FilledButton onClick={modalNewEvent}>Add Event</FilledButton>
          ) : null}
        </div>

        {/* Events page events list */}
        <div className={styles.page__events_list}>
          {!loading ? (
            events.length > 0 ? (
              <div className={styles.page__events_list_grid}>
                {events.map((event, i) => {
                  return (
                    <EventCard
                      event={event}
                      key={i}
                      isAdmin={session.isAdmin}
                      openEditModal={() => modalEditEvent(i)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className={styles.page__events_list_empty}>
                <h2>No Events Listed</h2>

                {session.isAdmin ? (
                  <>
                    <h3>Create your first event</h3>
                    <FilledButton onClick={modalNewEvent}>
                      Add Event
                    </FilledButton>
                  </>
                ) : null}
              </div>
            )
          ) : (
            <div className={styles.page__events_list_loading}>
              <Loader type="Oval" color="#c90c0f" height={80} width={80} />
            </div>
          )}
        </div>
      </div>

      {/* Events modal */}
      <ModalView isOpen={modalOpen} setIsOpen={setModalOpen}>
        {renderModalContent()}
      </ModalView>
    </Layout>
  );
}

function NewEvent({ setModalOpen, reloadEvents }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [judges, setJudges] = useState(["", "", ""]);

  const submitEvent = async () => {
    await axios.post("/api/events/create", {
      title,
      date,
      judges,
    });
    reloadEvents();
    setModalOpen(false);
  };

  const updateJudge = (index, email) => {
    const tempJudges = judges;
    tempJudges[index] = email;
    setJudges([...tempJudges]);
  };

  const addJudge = () => {
    setJudges([...judges, ""]);
  };

  return (
    <div>
      <h1>Create Event</h1>
      <TextInput
        type="text"
        placeholder="Event title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
      {judges.map((judge, i) => {
        return (
          <TextInput
            type="text"
            placeholder="email placeholder"
            value={judge}
            onChange={(e) => updateJudge(i, e.target.value)}
            fullWidth
            key={i}
          />
        );
      })}
      <FilledButton onClick={addJudge} fullWidth>
        Add Judge
      </FilledButton>
      <FilledButton onClick={submitEvent} fullWidth>
        Create event
      </FilledButton>
    </div>
  );
}

function EditEvent({ event, setModalOpen, reloadEvents }) {
  const [title, setTitle] = useState(event.name);
  const [date, setDate] = useState(new Date(event.event_date));
  const [judges, setJudges] = useState(event.judges);

  const editEvent = async () => {
    await axios.post("/api/events/edit", {
      id: event.id,
      title,
      date,
      judges,
    });
    reloadEvents();
    setModalOpen(false);
  };

  const removeEvent = async () => {
    await axios.post("/api/events/delete", {
      id: event.id,
    });
    reloadEvents();
    setModalOpen(false);
  };

  const updateJudge = (index, email) => {
    const tempJudges = judges;
    tempJudges[index] = email;
    setJudges([...tempJudges]);
  };

  const addJudge = () => {
    setJudges([...judges, ""]);
  };

  return (
    <div>
      <h1>Edit Event</h1>
      <UnfilledButton onClick={removeEvent} fullWidth>
        Remove Event
      </UnfilledButton>
      <TextInput
        type="text"
        placeholder="Event title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
      {judges.map((judge, i) => {
        return (
          <TextInput
            type="text"
            placeholder="email placeholder"
            value={judge}
            onChange={(e) => updateJudge(i, e.target.value)}
            fullWidth
            key={i}
          />
        );
      })}
      <FilledButton onClick={addJudge} fullWidth>
        Add Judge
      </FilledButton>
      <FilledButton onClick={editEvent} fullWidth>
        Save Edits
      </FilledButton>
    </div>
  );
}

// Run: server side
export async function getServerSideProps(context) {
  // Collect session
  const session = await getSession(context);

  // If session does not exist
  if (!session) {
    return {
      redirect: {
        // Redirect user to login page
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Else, return
  return {
    props: {
      session,
    },
  };
}
