const { getTrailerUrl } = require('../components/formatter');
const createInlineKeyboard = (anime) => {
    const buttons = [];
    const trailerUrl = getTrailerUrl(anime.trailer);

    if (trailerUrl) {
        buttons.push([{
            text: '📺 Watch Trailer',
            url: trailerUrl
        }]);
    }

    buttons.push([
        { text: '📖 Read More', url: `https://anilist.co/anime/${anime.id}` },
        { text: '⭐ AniList Page', url: `https://anilist.co/anime/${anime.id}` }
    ]);

    return buttons;
};

module.exports = {
    createInlineKeyboard
};