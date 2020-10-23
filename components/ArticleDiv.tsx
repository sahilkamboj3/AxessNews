import { useState, useEffect } from "react";
import Article from "./Article";
import styles from "../styles/article_div.module.scss";
import API_RESPONSE_TYPE from "../structures/api";

interface ArticleDivType {
  category: string;
  api_key: string;
}

const ArticleDiv: React.FC<ArticleDivType> = ({ category, api_key }) => {
  const [articles, setArticles] = useState<API_RESPONSE_TYPE[] | null>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  const minArticles: number = 6;
  const [numArticlesDisplayed, setNumArticlesDisplayed] = useState(minArticles);
  const [curArticles, setCurArticles] = useState<API_RESPONSE_TYPE[] | null>(
    null
  );

  const paywalls: string[] = [
    "The Wall Street Journal",
    "New York Times",
    "The Washington Post",
  ];

  useEffect(() => {
    fetch(
      `http://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${api_key}`
    )
      .then((res) => res.json())
      .then((data) => {
        const responseArticles: API_RESPONSE_TYPE[] = data["articles"].map(
          (article: API_RESPONSE_TYPE) => article as API_RESPONSE_TYPE
        );
        setArticles(responseArticles);
        setCurArticles(responseArticles.slice(0, numArticlesDisplayed));
        setLoaded(true);
      });
  }, []);

  const handleDate = (date: string) => {
    return date.substring(0, date.indexOf("T"));
  };

  const loadMoreReviews = () => {
    if (numArticlesDisplayed == articles.length) {
      return;
    } else if (numArticlesDisplayed + minArticles < articles.length) {
      setNumArticlesDisplayed(numArticlesDisplayed + minArticles);
    } else {
      setNumArticlesDisplayed(articles.length);
    }
  };

  const loadLessReviews = () => {
    if (numArticlesDisplayed == minArticles) {
      return;
    } else if (numArticlesDisplayed - minArticles > minArticles) {
      setNumArticlesDisplayed(numArticlesDisplayed - minArticles);
    } else {
      setNumArticlesDisplayed(minArticles);
    }
  };

  useEffect(() => {
    setCurArticles(articles.slice(0, numArticlesDisplayed));
  }, [numArticlesDisplayed]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.category}>{category}</h1>
      {!loaded ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          <div className={styles.articles}>
            {curArticles.map((article) => {
              return (
                <Article
                  key={article["title"]}
                  articleInfo={article}
                  paywalls={paywalls}
                  dateConfig={handleDate}
                />
              );
            })}
          </div>
          <div className={styles.buttons}>
            {numArticlesDisplayed < articles.length ? (
              <button onClick={loadMoreReviews} className={styles.button}>
                Load More
              </button>
            ) : (
              ""
            )}
            {numArticlesDisplayed > minArticles ? (
              <button onClick={loadLessReviews} className={styles.button}>
                Load Less
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleDiv;
