const axios = require('axios');
const queries = require('../components/queries');

const anilistAPI = axios.create({
    baseURL: 'https://graphql.anilist.co',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

const fetchTrendingAnime = async () => {
    const { data } = await anilistAPI.post('', {
        query: queries.TRENDING_ANIME_QUERY
    });
    return data.data.Page.media;
};

const searchAnime = async (query, page = 1, perPage = 10) => {
    const { data } = await anilistAPI.post('', {
        query: queries.ANIME_SEARCH_QUERY,
        variables: {
            search: query,
            page,
            perPage
        }
    });
    return data.data.Page.media.filter(anime => !anime.isAdult);
};

module.exports = {
    anilistAPI,
    fetchTrendingAnime,
    searchAnime
};