import SideNav from "../components/SideNav";
import ArticleDiv from "../components/ArticleDiv";
import styles from "../styles/home.module.scss";

interface HomePageType {}

const HomePage: React.FC<HomePageType> = () => {
  const API_KEY = "1234d7d816c7491d9d83679684c4d82f";
  const categories = ["Technology", "Entertainment", "Sports"];

  return (
    <div className={styles.wrapper}>
      <SideNav categories={categories} />
      {categories.map((category) => {
        return <ArticleDiv category={category} api_key={API_KEY} />;
      })}
    </div>
  );
};

export default HomePage;
