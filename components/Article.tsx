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
  const maxTitleLength = 75;

  const date = dateConfig(publishedAt);

  return (
    <div className={styles.wrapper}>
      <img src={urlToImage} className={styles.img} />
      {/* <div>
        {sourceIdx > -1 ? <h3>Paywall</h3> : ""}
        {title.length < maxTitleLength ? (
          <h3 className={styles.title}>{title}</h3>
        ) : (
          <h3 className={styles.title}>
            {title.substring(0, maxTitleLength)}...
          </h3>
        )}
        <h3 className={styles.date}>{date}</h3>
        <a href={url} target="_blank">
          See More
        </a>
      </div> */}
    </div>
  );
};

export default Article;
