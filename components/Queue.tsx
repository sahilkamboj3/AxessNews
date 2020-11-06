// This component is the component the Nav that displays the article selected in more detail with a list of the articles in queue.

import React, { useState, useEffect } from "react";
import API_RESPONSE_TYPE from "../structures/api";
import HistoryQueue from "./HistoryQueue";
import styles from "../styles/queue.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt, faCircle } from "@fortawesome/free-solid-svg-icons"; // imported the external link icon from FontAwesome

interface QueueType {
  displayArticles: API_RESPONSE_TYPE[];
  defaultImages: string[];
  paywalls: string[];
  dateConfig: (date: string) => string;
}

const Queue: React.FC<QueueType> = ({
  displayArticles,
  defaultImages,
  paywalls,
  dateConfig,
}) => {
  const [
    displayArticle,
    setDisplayArticle,
  ] = useState<API_RESPONSE_TYPE | null>(null); // a list of the defaultImages passed down from index.tsx
  const [defaultImage, setDefaultImage] = useState<string | null>(null); // a list of the defaultImages passed down from index.tsx
  const [error, setError] = useState<boolean>(false); // stores whether the image had an error while loading
  // these are the properties of the article object
  const [author, setAuthor] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [urlToImage, setUrlToImage] = useState<string | null>(null);
  const [publishedAt, setPublishedAt] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  // stores the information of the article into the different properties to be shown on the screen
  const handleDisplayArticle = (article: API_RESPONSE_TYPE) => {
    setDisplayArticle(article);
    const idx = displayArticles.indexOf(article);
    setDefaultImage(defaultImages[idx]);

    // set the article information variables from the article object input
    setAuthor(article["author"]);
    setDescription(article["description"]);
    setTitle(article["title"]);
    setUrl(article["url"]);
    setUrlToImage(article["urlToImage"]);
    setPublishedAt(article["publishedAt"]);
    setName(article["source"]["name"]);
  };

  // if a first item has been added to displayArticles, I call the handleDisplayArticle function to set the properties to store the information from that first article
  useEffect(() => {
    if (displayArticles !== null && displayArticles.length == 1) {
      handleDisplayArticle(displayArticles[0]);
    }
  }, [displayArticles]);

  const handleImageError = () => {
    setError(!error);
  };

  let sourceIdx: number; // this stores the index of the source in the paywalls list, telling whether there is a paywalls or not
  let date: string; // this stores the date return from the dateConfig function

  if (displayArticle !== null) {
    sourceIdx = paywalls.indexOf(name);
    date = dateConfig(publishedAt);
  }

  return (
    <React.Fragment>
      {displayArticle !== null ? (
        <div className={styles.wrapper}>
          {urlToImage !== null &&
          urlToImage !== "" &&
          urlToImage !== undefined &&
          !error ? (
            <img
              src={urlToImage.trim()}
              onError={handleImageError}
              className={styles.img}
            />
          ) : (
            // I used the default images stored in the public folder in case the urls to the images given throw errors.
            <img
              src={`${defaultImage.toLowerCase()}_default.jpg`}
              className={styles.img}
            />
          )}
          <div className={styles.content}>
            {/* Display the paywall sign if the source is in the paywalls list */}
            <div className={styles.dateAuthor}>
              {author != "" && author !== null && <h5>{author}</h5>}
              {author != "" && author !== null && (
                <h5 className={styles.dot}>
                  <FontAwesomeIcon icon={faCircle} className={styles.dotIcon} />
                </h5>
              )}
              <h5>Posted {date}</h5>
              {sourceIdx > -1 && (
                <h5 className={styles.paywall}>
                  <FontAwesomeIcon icon={faCircle} className={styles.circle} />
                  Paywall
                </h5>
              )}
            </div>
            <h1 className={styles.title}>{title}</h1>
            {description != "" && (
              <h3 className={styles.description}>{description}</h3>
            )}
            <button className={styles.readMore}>
              <a href={url} target="_blank" className={styles.readArticleText}>
                Read article{" "}
                <FontAwesomeIcon
                  icon={faExternalLinkAlt}
                  className={styles.externalLinkIcon}
                />
              </a>
            </button>
          </div>
          <div className={styles.queue}>
            {/* This stores the queue of articles and displays them in a div on the right half of the screen */}
            <HistoryQueue
              queue={displayArticles}
              images={defaultImages}
              handleDisplayArticle={handleDisplayArticle}
            />
          </div>
        </div>
      ) : (
        // This is the initial image and text that's displayed in the component when the page first loads
        <div className={styles.wrapper}>
          <img src={"initImageLoad.jpg"} className={styles.img} />
          <div className={styles.content2}>
            <h1>Select articles for your Queue</h1>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Queue;
