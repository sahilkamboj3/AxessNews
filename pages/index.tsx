import { useState } from "react";
// import SideNav from "../components/SideNav";
import ArticleDiv from "../components/ArticleDiv";
import History from "../components/History";
import API_RESPONSE_TYPE from "../structures/api";
import styles from "../styles/index.module.scss";

interface HomePageType {}

const HomePage: React.FC<HomePageType> = () => {
  const API_KEY = process.env.API_KEY;
  const categories = ["Technology", "Entertainment", "Sports"];
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [displayArticles, setDisplayArticles] = useState<
    API_RESPONSE_TYPE[] | null
  >(null);
  const [
    displayArticle,
    setDisplayArticle,
  ] = useState<API_RESPONSE_TYPE | null>(null);
  const [defaultImages, setDefaultImages] = useState<string[]>([]);
  const [defaultImage, setDefaultImage] = useState<string | null>(null);
  const [historyKey, setHistoryKey] = useState<number>(0);

  const paywalls: string[] = [
    "The Wall Street Journal", // look into this
    "New York Times",
    "The Washington Post",
    "Los Angeles Times",
    "The Atlanta Journal-Constitution archive from 1868",
    "The Christian Science Monitor",
    "The Boston Globe",
    "Hartford Courant",
    "Chicago Tribune",
    "National Centers for Environmental Information",
  ];

  const handleDisplayArticle = (article: API_RESPONSE_TYPE) => {
    setDisplayArticle(article);
    const idx = displayArticles.indexOf(article);
    setDefaultImage(defaultImages[idx]);
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setQuery(search);
  };

  const dateConfig = (date: string) => {
    return date.substring(0, date.indexOf("T"));
  };

  const addHistory = (key: API_RESPONSE_TYPE, defaultImage: string) => {
    if (displayArticles !== null && displayArticles.includes(key)) {
      return;
    }

    let curArticles: API_RESPONSE_TYPE[];
    let curDefaultImages: string[];

    if (displayArticles === null) {
      curArticles = [];
      curDefaultImages = [];
    } else {
      curArticles = displayArticles;
      curDefaultImages = defaultImages;
    }

    curArticles.unshift(key);
    curDefaultImages.unshift(defaultImage);

    if (curArticles.length > 5) {
      curArticles.pop();
      curDefaultImages.pop();
    }

    setDisplayArticles(curArticles);
    setDefaultImages(curDefaultImages);

    if (historyKey < 1) {
      setHistoryKey(historyKey + 1);
    } else {
      setHistoryKey(historyKey - 1);
    }
  };

  const changeDisplayArticles = (
    key: API_RESPONSE_TYPE,
    defaultImage: string
  ) => {
    addHistory(key, defaultImage);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.axess}>Axess</h1>
      <div>
        <History
          key={historyKey}
          displayArticles={displayArticles}
          displayArticle={displayArticle}
          // defaultImages={defaultImages}
          defaultImage={defaultImage}
          paywalls={paywalls}
          dateConfig={dateConfig}
          handleDisplayArticle={handleDisplayArticle}
        />
      </div>
      <form onSubmit={onSubmit}>
        <input
          className={styles.search}
          placeholder="Search here"
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
      <button
        onClick={() => {
          setSearch("");
          setQuery("");
        }}
      >
        Clear search
      </button>
      <div>
        {categories.map((category) => {
          return (
            <ArticleDiv
              key={category}
              category={category}
              api_key={API_KEY}
              queryString={query}
              changeDisplayArticles={changeDisplayArticles}
              paywalls={paywalls}
              dateConfig={dateConfig}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
