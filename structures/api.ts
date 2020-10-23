interface API_RESPONSE_TYPE {
    author?: string,
    title?: string,
    description?: string,
    url?: string,
    urlToImage?: string,
    publishedAt?: string,
    content?: string,
    source?: {id: string, name: string},
}

export default API_RESPONSE_TYPE;