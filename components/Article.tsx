import API_RESPONSE_TYPE from "../structures/api";

const Article: React.FC<API_RESPONSE_TYPE> = ({
  author,
  title,
  description,
  url,
  urlToImage,
  publishedAt,
  content,
  source,
  paywalls,
  // handle for dates with another input here
}) => {
  const sourceIdx: number = paywalls.indexOf(source);

  return (
    <div>
      {sourceIdx > -1 ? <h3>Paywall</h3> : ""}
      <h3>{title}</h3>
      <p>
        {publishedAt} {source} by {author}
      </p>
      <h6>{description}</h6>
    </div>
  );
};

export default Article;
