import { useState, useEffect } from "react";
import Article from "./Article";
import styles from "../styles/article_div.module.scss";

interface ArticleDivType {
  category: string;
  api_key: string;
}

const ArticleDiv: React.FC<ArticleDivType> = ({ category, api_key }) => {
  const [articles, setArticles] = useState([]);
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
        setArticles(data["articles"]);
      });
  }, []);

  const handleDate = (date) => {
    // handle dates
  };

  return (
    <div className={styles.wrapper}>
      <h1>{category}</h1>
      {articles.map((article) => {
        return (
          <Article
            author={article["author"]}
            description={article["description"]}
            publishedAt={article["publishedAt"]}
            source={article["source"]["name"]}
            title={article["title"]}
            urlToImage={article["urlToImage"]}
            url={article["url"]}
            paywalls={paywalls}
          />
        );
      })}
    </div>
  );
};

export default ArticleDiv;
