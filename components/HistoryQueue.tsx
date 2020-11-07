// This component displays the articles that have been selected by the user and are in queue

import API_RESPONSE_TYPE from "../structures/api";
import styles from "../styles/historyqueue.module.scss";
import classNames from "classnames";

interface HistoryQueueType {
  queue: API_RESPONSE_TYPE[];
  images?: string[];
  handleDisplayArticle: (article: API_RESPONSE_TYPE) => void; // call this function when an article in the queue has been selected so it can be displayed
}

const HistoryQueue: React.FC<HistoryQueueType> = ({
  queue,
  images,
  handleDisplayArticle,
}) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.recentlyViewedText}>Queue</h1>
      {queue !== null && (
        <div>
          {queue.map((article: API_RESPONSE_TYPE) => {
            const idx = queue.indexOf(article);
            const category = images[idx]; // get the category of the article through the defaultImages

            return (
              <div
                key={article["title"]}
                onClick={() => handleDisplayArticle(article)}
                className={classNames({
                  // sets the border color based on the category type
                  [styles.row]: true,
                  [styles.yellow_vl]: category === "Technology",
                  [styles.orange_vl]: category == "Entertainment",
                  [styles.blue_green_vl]: category == "Sports",
                })}
              >
                <div className={styles.type}>
                  <p className={styles.category}>{category}</p>
                </div>
                <p key={article["title"]} className={styles.article}>
                  {article["title"]}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistoryQueue;
