import SideNav from "../components/SideNav";
import ArticleDiv from "../components/ArticleDiv";
import styles from "../styles/index.module.scss";

interface HomePageType {}

const HomePage: React.FC<HomePageType> = () => {
  const API_KEY = process.env.API_KEY;
  const categories = ["Technology", "Entertainment", "Sports"];

  return (
    <div className={styles.wrapper}>
      <div className={styles.nav_bar}>
        <SideNav categories={categories} />
      </div>
      <div className={styles.articles}>
        {categories.map((category) => {
          return (
            <ArticleDiv key={category} category={category} api_key={API_KEY} />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
