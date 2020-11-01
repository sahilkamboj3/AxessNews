import API_RESPONSE_TYPE from "../structures/api";

interface HistoryListType {
  queue: API_RESPONSE_TYPE[];
  handleDisplayArticle: (article: API_RESPONSE_TYPE) => void;
}

const HistoryList: React.FC<HistoryListType> = ({
  queue,
  handleDisplayArticle,
}) => {
  return (
    <div>
      {queue !== null && (
        <div>
          {queue.map((article: API_RESPONSE_TYPE) => {
            return (
              <p
                key={article["title"]}
                onClick={() => handleDisplayArticle(article)}
              >
                {article["title"]}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HistoryList;
