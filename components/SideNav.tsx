import styles from "../styles/side_nav.module.scss";
// const logo = require("../images/logo.png");

interface SideNavType {
  categories: string[];
}

const SideNav: React.FC<SideNavType> = ({ categories }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Axess</h1>
      {/* <img src={logo} alt="Logo" /> */}
      <div className={styles.categories}>
        {categories.map((category) => {
          return (
            <h5 className={styles.category} key={category}>
              {category}
            </h5>
          );
        })}
      </div>
    </div>
  );
};

export default SideNav;
