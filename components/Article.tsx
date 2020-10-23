import API_RESPONSE_TYPE from "../structures/api";
import styles from "../styles/article.module.scss";

interface ArticleType {
  articleInfo: API_RESPONSE_TYPE;
  paywalls?: string[];
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
  dateConfig,
}) => {
  const sourceIdx: number = paywalls.indexOf(name);
  const maxTitleLength = 80;

  return (
    <div className={styles.wrapper}>
      <img src={urlToImage} className={styles.image} />
      <div className={styles.contentDiv}>
        {sourceIdx > -1 ? <h3>Paywall</h3> : ""}
        {title.length < maxTitleLength ? (
          <h3 className={styles.title}>{title}</h3>
        ) : (
          <h3 className={styles.title}>
            {title.substring(0, maxTitleLength)}...
          </h3>
        )}
        {author != null ? <p className={styles.author}>by {author}</p> : ""}
        {/* <p>{dateConfig(publishedAt)}</p> */}
        {/* <h6>{description}</h6> */}
        <a href={url} className={styles.url} target="_blank">
          See More
        </a>
      </div>
    </div>
  );
};

export default Article;
