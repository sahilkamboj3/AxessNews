import API_RESPONSE_TYPE from "../structures/api";
import DisplayArticle from "./DisplayArticle";
import HistoryList from "./HistoryList";
import { useState, useEffect } from "react";

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
  let idx: number;

  if (displayArticles !== null) {
    idx = displayArticles.indexOf(displayArticle);
  }

  useEffect(() => {
    setArticles(displayArticles);
  }, [displayArticles]);

  return (
    <div>
      <h1>History</h1>
      {articles !== null && (
        <div>
          <div>
            {displayArticle !== null && (
              <DisplayArticle
                articleInfo={displayArticle}
                defaultImageName={defaultImage}
                paywalls={paywalls}
                dateConfig={dateConfig}
              />
            )}
          </div>
          <div>
            <HistoryList
              queue={displayArticles}
              handleDisplayArticle={handleDisplayArticle}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
