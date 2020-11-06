// This is the Navbar at the top of the page

import styles from "../styles/nav.module.scss";

interface NavType {}

const Nav: React.FC<NavType> = () => {
  const date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className={styles.wrapper}>
      <p className={styles.date}>
        {/* getting the current day, date, month, and year  */}
        <strong>{days[date.getDay()]}</strong>, {months[date.getMonth()]}{" "}
        {date.getDate()}, {date.getFullYear()}
      </p>
      {/* the name of the service */}
      <h1 className={styles.title}>The Daily Axess</h1>
    </div>
  );
};

export default Nav;
