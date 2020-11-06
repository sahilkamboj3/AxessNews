// this is a mapped out interface of the properties of each article in the response
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