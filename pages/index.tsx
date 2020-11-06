// This is the main index file that houses the components on the page application

import { useState } from "react";
import Nav from "../components/Nav";
import ArticleDiv from "../components/ArticleDiv";
import SpecialArticle from "../components/SpecialArticle";
import API_RESPONSE_TYPE from "../structures/api";
import styles from "../styles/index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface HomePageType {}

const HomePage: React.FC<HomePageType> = () => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // importing the API_KEY
  const categories = ["Sports", "Entertainment", "Technology"]; // declaring the categories for the articles
  const [search, setSearch] = useState(""); // initializing the search variable for the search bar
  const [query, setQuery] = useState(""); // holds the search input when the user hits enter(the magnifying glass)
  const [displayArticles, setDisplayArticles] = useState<
    API_RESPONSE_TYPE[] | null
  >(null); // this is a list of the articles to be stored and shown in the Queue at the top of the page
  const [defaultImages, setDefaultImages] = useState<string[]>([]); // this is a list of the categories/names of the default images that go along with the display articles in the queue
  const [historyKey, setHistoryKey] = useState<number>(0);

  // this is a list of news sources who have paywalls for the articles on their websites
  const paywalls: string[] = [
    "The Wall Street Journal",
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

  // this is a function to store the search the user has finished inputting inside the query variable
  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setQuery(search);
  };

  // this function is to extract the needed substring from the publishedAt property of the article responses
  const dateConfig = (date: string) => {
    return date.substring(0, date.indexOf("T"));
  };

  // this function is to add to the queue of articles
  const addHistory = (key: API_RESPONSE_TYPE, defaultImage: string) => {
    if (displayArticles !== null && displayArticles.includes(key)) {
      // if the article is already in the queue, I just returned
      return;
    }

    // otherwise, I made these two lists to store the current display articles and default images
    let curArticles: API_RESPONSE_TYPE[];
    let curDefaultImages: string[];

    if (displayArticles === null) {
      curArticles = [];
      curDefaultImages = [];
    } else {
      curArticles = displayArticles;
      curDefaultImages = defaultImages;
    }

    // add the new article and default image to the front of the listss
    curArticles.unshift(key);
    curDefaultImages.unshift(defaultImage);

    const queueLimit = 5; // limit on the number of articles in queue

    // if that limit is exceeded, I just popped off the last item
    if (curArticles.length > queueLimit) {
      curArticles.pop();
      curDefaultImages.pop();
    }

    // store those lists
    setDisplayArticles(curArticles);
    setDefaultImages(curDefaultImages);

    if (historyKey < 1) {
      setHistoryKey(historyKey + 1);
    } else {
      setHistoryKey(historyKey - 1);
    }
  };

  const changeDisplayArticles = (
    // this function calls the addHistory function by inputting the properties
    key: API_RESPONSE_TYPE,
    defaultImage: string
  ) => {
    addHistory(key, defaultImage);
  };

  return (
    <div className={styles.wrapper}>
      <Nav />
      <div>
        <SpecialArticle
          displayArticles={displayArticles}
          defaultImages={defaultImages}
          paywalls={paywalls}
          dateConfig={dateConfig}
        />
      </div>
      <form onSubmit={onSubmit} className={styles.searchForm}>
        <input
          className={styles.search}
          placeholder="Search here"
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button type="submit" className={styles.searchBtn}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <button
          // sets the search and query variables to empty strings
          onClick={() => {
            setSearch("");
            setQuery("");
          }}
          className={styles.clearBtn}
        >
          Clear
        </button>
      </form>
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
