// import styles from "../styles/side_nav.module.scss";
// const logo = require("../images/logo.png");

interface SideNavType {
  categories: string[];
}

const SideNav: React.FC<SideNavType> = ({ categories }) => {
  return (
    <div>
      <h1>Axess</h1>
      {/* <img src={logo} alt="Logo" /> */}
      <div>
        {categories.map((category) => {
          return <h5 key={category}>{category}</h5>;
        })}
      </div>
    </div>
  );
};

export default SideNav;
