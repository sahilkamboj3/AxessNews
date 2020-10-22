interface API_RESPONSE_TYPE {
    author?: string,
    title?: string,
    description?: string,
    url?: string,
    urlToImage?: string,
    publishedAt?: string,
    content?: string,
    source?: string,
    paywalls?: string[],
    dateConfig?: (date: string) => Date;
}

export default API_RESPONSE_TYPE;