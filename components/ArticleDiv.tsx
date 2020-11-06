import React, { useState, useEffect } from "react";
import Article from "./Article";
import styles from "../styles/article_div.module.scss";
import API_RESPONSE_TYPE from "../structures/api";
import classnames from "classnames";

interface ArticleDivType {
  category: string;
  api_key: string;
  queryString: string;
  paywalls: string[];
  changeDisplayArticles: (key: API_RESPONSE_TYPE, defaultImage: string) => void;
  dateConfig: (date: string) => string;
}

const ArticleDiv: React.FC<ArticleDivType> = ({
  category,
  api_key,
  queryString,
  paywalls,
  changeDisplayArticles,
  dateConfig,
}) => {
  const [articles, setArticles] = useState<API_RESPONSE_TYPE[] | null>([]); // this list holds all the articles that will be loaded from the api
  const [loaded, setLoaded] = useState<boolean>(false); // this variable holds whether or not the articles have loaded

  const minArticles: number = 3; // this is the number of articles shown in at 1 time for each category for pagination purposes
  const [curArticles, setCurArticles] = useState<API_RESPONSE_TYPE[] | null>(
    null
  ); // this list is going to be the current articles that are shown on the page application at any time

  // these two variables hold the start and end indexes, for pagination purposes
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(minArticles);

  // The handleQueryFetch() function fetches with the query from the user entering an string the search bar whereas the handleFetch() fetches the articles without that query
  function handleFetch() {
    fetch(
      `http://newsapi.org/v2/top-headlines?country=us&category=${category.toLowerCase()}&apiKey=${api_key}`
    )
      .then((res) => res.json())
      .then((data) => {
        const responseArticles: API_RESPONSE_TYPE[] = data["articles"].map(
          (article: API_RESPONSE_TYPE) => article as API_RESPONSE_TYPE
        );
        setArticles(responseArticles);
        setCurArticles(responseArticles.slice(startIdx, endIdx));
        setLoaded(true);
      });
  }

  function handleQueryFetch() {
    fetch(
      `http://newsapi.org/v2/top-headlines?q=${queryString}&country=us&category=${category.toLowerCase()}&apiKey=${api_key}`
    )
      .then((res) => res.json())
      .then((data) => {
        const responseArticles: API_RESPONSE_TYPE[] = data["articles"].map(
          (article: API_RESPONSE_TYPE) => article as API_RESPONSE_TYPE
        );
        setArticles(responseArticles);
        setCurArticles(responseArticles.slice(startIdx, endIdx));
        setLoaded(true);
      });
  }

  // call the handleFetch() upon loaad
  useEffect(() => {
    handleFetch();
  }, []);

  // if the queryString isn't empty, called the handleQueryFetch() function, else called the handleFetch() again
  useEffect(() => {
    if (queryString != "") {
      handleQueryFetch();
    } else if (queryString === "") {
      handleFetch();
    }
  }, [queryString]);

  const loadMoreReviews = () => {
    // if we're the end of the articles list
    if (endIdx == articles.length) {
      return;
    } else if (endIdx + minArticles < articles.length) {
      // if we're in the middle of the articles list
      setStartIdx(startIdx + minArticles);
      setEndIdx(endIdx + minArticles);
    } else {
      // if we're within the last 3 articles of the articles list
      setStartIdx(articles.length - minArticles);
      setEndIdx(articles.length);
    }
  };

  const loadLessReviews = () => {
    // if we're at the start of the articles list
    if (startIdx == 0) {
      return;
    } else if (startIdx - minArticles > 0) {
      // if we're iin the middle of the articles list
      setStartIdx(startIdx - minArticles);
      setEndIdx(endIdx - minArticles);
    } else {
      // if we're within the first 3 articles of the  articleslist
      setStartIdx(0);
      setEndIdx(minArticles);
    }
  };

  // re-set the curArticles(articles shown on the page application) when the startIdx changes
  useEffect(() => {
    setCurArticles(articles.slice(startIdx, endIdx));
  }, [startIdx]);

  return (
    <React.Fragment>
      {articles.length > 0 && (
        <div className={styles.wrapper}>
          <div className={styles.heading}>
            <h1 className={styles.category}>{category.toUpperCase()}</h1>
            <div className={styles.buttons}>
              <button
                onClick={loadLessReviews}
                className={classnames({
                  [styles.button]: true,
                  [styles.greyedOutBtn]: startIdx == 0,
                })}
              >
                <p
                  className={classnames({
                    [styles.arrow]: true,
                    [styles.reversed]: true,
                  })}
                >
                  ▶
                </p>
              </button>
              <button
                onClick={loadMoreReviews}
                className={classnames({
                  [styles.button]: true,
                  [styles.greyedOutBtn]: endIdx == articles.length,
                })}
              >
                <p className={styles.arrow}>▶</p>
              </button>
            </div>
          </div>
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
                          dateConfig={dateConfig}
                          defaultImageName={category}
                          changeDisplayArticles={changeDisplayArticles}
                          articleApi={article}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default ArticleDiv;
