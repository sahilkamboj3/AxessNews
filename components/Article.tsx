// This component displays the articles within the article div.

import { useState } from "react";
import API_RESPONSE_TYPE from "../structures/api";
import styles from "../styles/article.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faExternalLinkAlt,
  faCircle,
} from "@fortawesome/free-solid-svg-icons"; // imported the external link, plus sign, and cicle icons from FontAwesome

interface ArticleType {
  articleApi: API_RESPONSE_TYPE; // this is the object that is sent back up to index.tsx to add to the queue
  articleInfo: API_RESPONSE_TYPE;
  paywalls?: string[];
  defaultImageName?: string;
  changeDisplayArticles: (key: API_RESPONSE_TYPE, defaultImage: string) => void; // this is the function that sends the defaultImage and the articleApi object back up to index.tsx to add to the queue of articles
  dateConfig?: (date: string) => string;
}

const Article: React.FC<ArticleType> = ({
  articleInfo: {
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    content,
    source: { id, name },
  },
  paywalls,
  defaultImageName,
  articleApi,
  dateConfig,
  changeDisplayArticles,
}) => {
  // to check if the source is in the paywalls list
  const sourceIdx: number = paywalls.indexOf(name);
  // variable for whether the url to the image throws an error
  const [error, setError] = useState<boolean>(false);

  const printError = () => {
    setError(true);
  };

  const seeMoreClick = () => {
    changeDisplayArticles(articleApi, defaultImageName);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.imgDiv}>
        {urlToImage !== null &&
        urlToImage !== "" &&
        urlToImage !== undefined &&
        !error ? (
          <img
            src={urlToImage.trim()}
            className={styles.img}
            onError={printError}
          />
        ) : (
          // call the default image if the url to the image throws an error
          <img
            src={`${defaultImageName.toLowerCase()}_default.jpg`}
            className={styles.img}
          />
        )}
      </div>
      <div className={styles.contentDiv}>
        {/* paywall sign if the source is in the list of new sources with paywalls */}
        {sourceIdx > -1 && ( // shows only if the source is in the paywalls list
          <h3 className={styles.paywall}>
            <FontAwesomeIcon icon={faCircle} className={styles.circle} />
            Paywall
          </h3>
        )}

        <h3 className={styles.title}>{title}</h3>

        {author !== null && author !== "" && (
          <h4 className={styles.author}>by {author}</h4>
        )}
      </div>
      <div className={styles.buttons}>
        <button className={styles.readArticle}>
          <a href={url} target="_blank" className={styles.readText}>
            Read{" "}
            <FontAwesomeIcon
              icon={faExternalLinkAlt}
              className={styles.externalLink}
            />
          </a>
        </button>
        <button
          onClick={() => {
            seeMoreClick();
          }}
          className={styles.queueBtn}
        >
          <FontAwesomeIcon icon={faPlus} className={styles.plusBtn} />
          Queue
        </button>
      </div>
    </div>
  );
};

export default Article;
