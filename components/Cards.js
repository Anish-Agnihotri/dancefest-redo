import styles from "@styles/components/Cards.module.scss";
import { useRouter } from "next/router";
import dayjs from "dayjs";

function EventCard({ event, isAdmin, openEditModal }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/event/${event.id}`);
  };

  return (
    <div className={styles.card__event_wrapper}>
      <button
        className={`${styles.card__event} ${
          isAdmin ? styles.card__event_partial : styles.card__event_full
        }`}
        onClick={handleClick}
      >
        <h3>{event.name}</h3>

        <div className={styles.card__event_stats}>
          <span>
            {event.event_date
              ? dayjs(event.event_date).format("MM/DD/YYYY")
              : ""}
          </span>
          <span>{event.num_performances} Performances</span>
        </div>

        <div className={styles.card__event_judges}>
          <h4>JUDGES:</h4>
          <ul>
            {event.judges.map((judge, i) => {
              return <li key={i}>{judge}</li>;
            })}
          </ul>
        </div>
      </button>
      {isAdmin ? (
        <button
          className={styles.card__event_edit}
          onClick={() => openEditModal()}
        >
          Edit Event
        </button>
      ) : null}
    </div>
  );
}

export { EventCard };
