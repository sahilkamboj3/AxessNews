import { useState, useEffect } from "react";
import Article from "./Article";
import styles from "../styles/article_div.module.scss";
import API_RESPONSE_TYPE from "../structures/api";

interface ArticleDivType {
  category: string;
  api_key: string;
  queryString: string;
}

const ArticleDiv: React.FC<ArticleDivType> = ({
  category,
  api_key,
  queryString,
}) => {
  const [articles, setArticles] = useState<API_RESPONSE_TYPE[] | null>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  const minArticles: number = 3;
  const [curArticles, setCurArticles] = useState<API_RESPONSE_TYPE[] | null>(
    null
  );

  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(minArticles);

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
        setCurArticles(responseArticles.slice(startIdx, endIdx));
        setLoaded(true);
        console.log(category);
        console.log(data["articles"]);
      });
  }, []);

  // useEffect(() => {
  //   if (queryString != "") {
  //     fetch(
  //       `http://newsapi.org/v2/top-headlines?q=${queryString}country=us&category=${category}&apiKey=${api_key}`
  //       // pageSize=${pageSize}
  //       // pageSize=100 for max
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         const responseArticles: API_RESPONSE_TYPE[] = data["articles"].map(
  //           (article: API_RESPONSE_TYPE) => article as API_RESPONSE_TYPE
  //         );
  //         setArticles(responseArticles);
  //         setCurArticles(responseArticles.slice(startIdx, endIdx));
  //         setLoaded(true);
  //       });
  //   }
  // }, [queryString]);

  const handleDate = (date: string) => {
    return date.substring(0, date.indexOf("T"));
  };

  const loadMoreReviews = () => {
    if (endIdx == articles.length) {
      return;
    } else if (endIdx + minArticles < articles.length) {
      setStartIdx(startIdx + minArticles);
      setEndIdx(endIdx + minArticles);
    } else {
      setStartIdx(articles.length - minArticles);
      setEndIdx(articles.length);
    }
  };

  const loadLessReviews = () => {
    if (startIdx == 0) {
      return;
    } else if (startIdx - minArticles > 0) {
      setStartIdx(startIdx - minArticles);
      setEndIdx(endIdx - minArticles);
    } else {
      setStartIdx(0);
      setEndIdx(minArticles);
    }
  };

  useEffect(() => {
    setCurArticles(articles.slice(startIdx, endIdx));
  }, [startIdx]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.category}>{category}</h1>
      {!loaded ? (
        <h3>Loading...</h3>
      ) : (
        <div>
          {curArticles.length != 0 ? (
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
              <div>
                {endIdx < articles.length ? (
                  <button onClick={loadMoreReviews}>Load More</button>
                ) : (
                  ""
                )}
                {startIdx > 0 ? (
                  <button onClick={loadLessReviews}>Load Less</button>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleDiv;
