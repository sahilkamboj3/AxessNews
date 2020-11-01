import { useState } from "react";
import API_RESPONSE_TYPE from "../structures/api";
import styles from "../styles/article.module.scss";

interface ArticleType {
  articleApi: API_RESPONSE_TYPE;
  articleInfo: API_RESPONSE_TYPE;
  paywalls?: string[];
  defaultImageName?: string;
  changeDisplayArticles: (key: API_RESPONSE_TYPE, defaultImage: string) => void;
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
  const sourceIdx: number = paywalls.indexOf(name);
  const maxTitleLength = 100;
  const date = dateConfig(publishedAt);
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const printError = () => {
    setError(true);
  };

  const seeMoreClick = () => {
    changeDisplayArticles(articleApi, defaultImageName);
  };

  return (
    <div className={styles.wrapper}>
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
        <img
          src={`${defaultImageName.toLowerCase()}_default.jpg`}
          className={styles.img}
        />
      )}
      <div className={styles.contentDiv}>
        {sourceIdx > -1 ? <h3>Paywall</h3> : ""}
        <h3>{name}</h3>
        {title.length < maxTitleLength ? (
          <h3>{title}</h3>
        ) : (
          <h3 className={styles.title}>
            {title.substring(0, maxTitleLength)}...
          </h3>
        )}
        <h4>{date}</h4>
        {seeMore && author !== "" && author != null ? <h4>by {author}</h4> : ""}
        <button
          onClick={() => {
            if (!seeMore) {
              seeMoreClick();
            }
            setSeeMore(!seeMore);
          }}
        >
          {!seeMore ? "See more" : "See less"}
        </button>
        {seeMore && description !== "" && description != null ? (
          <p>{description}</p>
        ) : seeMore && (description == "" || description === null) ? (
          "No description"
        ) : (
          ""
        )}
        <a href={url} target="_blank">
          Read
        </a>
      </div>
    </div>
  );
};

export default Article;
