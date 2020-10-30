import { useState } from "react";
// import SideNav from "../components/SideNav";
import ArticleDiv from "../components/ArticleDiv";
import styles from "../styles/index.module.scss";

interface HomePageType {}

const HomePage: React.FC<HomePageType> = () => {
  const API_KEY = process.env.API_KEY;
  const categories = ["Technology", "Entertainment", "Sports"];
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  // const onSubmit = (e: { preventDefault: () => void }) => {
  //   e.preventDefault();
  //   setQuery(search);
  //   setSearch("");
  // };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.axess}>Axess</h1>
      {/* <div>
        <SideNav categories={categories} />
      </div> */}
      <div>
        {/* <form onSubmit={onSubmit}>
          <input
            className={styles.search}
            placeholder="Search here"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form> */}
        {categories.map((category) => {
          return (
            <ArticleDiv
              key={category}
              category={category}
              api_key={API_KEY}
              queryString={query}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
