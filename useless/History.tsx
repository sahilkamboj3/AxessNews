import API_RESPONSE_TYPE from "../structures/api";
import DisplayArticle from "./DisplayArticle";
import HistoryQueue from "./HistoryQueue";
import React, { useState, useEffect } from "react";
import styles from "../styles/history.module.scss";

interface HistoryType {
  displayArticles: API_RESPONSE_TYPE[];
  paywalls?: string[];
  displayArticle: API_RESPONSE_TYPE;
  defaultImage: string;
  dateConfig?: (date: string) => string;
  handleDisplayArticle: (article: API_RESPONSE_TYPE) => void;
}

const History: React.FC<HistoryType> = ({
  displayArticles,
  paywalls,
  displayArticle,
  defaultImage,
  dateConfig,
  handleDisplayArticle,
}) => {
  const [articles, setArticles] = useState<API_RESPONSE_TYPE[] | null>([]);
  // let idx: number;

  // if (displayArticles !== null) {
  //   idx = displayArticles.indexOf(displayArticle);
  // }

  useEffect(() => {
    setArticles(displayArticles);
  }, [displayArticles]);

  return (
    <div className={styles.test}>
      {articles !== null ? (
        <div className={styles.wrapper}>
          <div className={styles.article}>
            {displayArticle !== null && (
              <DisplayArticle
                articleInfo={displayArticle}
                defaultImageName={defaultImage}
                paywalls={paywalls}
                dateConfig={dateConfig}
              />
            )}
          </div>
          <div className={styles.queue}>
            <HistoryQueue
              queue={displayArticles}
              handleDisplayArticle={handleDisplayArticle}
            />
          </div>
        </div>
      ) : (
        <h1 className={styles.default}>Select an article</h1>
      )}
      {/* </React.Fragment> */}
    </div>
  );
};

export default History;
