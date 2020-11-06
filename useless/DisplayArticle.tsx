import { useState, useEffect } from "react";
import API_RESPONSE_TYPE from "../structures/api";
import styles from "../styles/display_article.module.scss";

interface ArticleType {
  articleInfo?: API_RESPONSE_TYPE;
  paywalls?: string[];
  defaultImageName?: string;
  dateConfig?: (date: string) => string;
}

const DisplayArticle: React.FC<ArticleType> = ({
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
  dateConfig,
}) => {
  const sourceIdx: number = paywalls.indexOf(name);
  const maxTitleLength = 55;

  const date = dateConfig(publishedAt);
  const [error, setError] = useState<boolean>(false);

  const handleImageError = () => {
    setError(!error);
  };

  useEffect(() => {
    setError(false);
  }, [urlToImage]);

  return (
    <div className={styles.wrapper}>
      {urlToImage !== null &&
      urlToImage !== "" &&
      urlToImage !== undefined &&
      !error ? (
        <img
          src={urlToImage.trim()}
          className={styles.img}
          onError={handleImageError}
        />
      ) : (
        <img
          src={`${defaultImageName.toLowerCase()}_default.jpg`}
          className={styles.img}
        />
      )}
      <div className={styles.contentDiv}>
        {sourceIdx > -1 ? <h3>Paywall</h3> : ""}
        {title.length < maxTitleLength ? (
          <h1>{title}</h1>
        ) : (
          <h1 className={styles.title}>
            {title.substring(0, maxTitleLength)}...
          </h1>
        )}
        {author != "" && author !== null ? <h5>by {author}</h5> : ""}
        <h4>{date}</h4>
        {description != "" && <h3>{description}</h3>}
        <a href={url} target="_blank">
          Read article
        </a>
      </div>
    </div>
  );
};

export default DisplayArticle;
