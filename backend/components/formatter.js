const dotenv = require('dotenv');

dotenv.config();

const MAX_SYNOPSIS_LENGTH = process.env.MAX_SYNOPSIS_LENGTH;

const formatSynopsis = (synopsis) => {
    if (!synopsis) return 'No synopsis available';
    const cleanSynopsis = synopsis.replace(/<[^>]*>/g, '');
    return cleanSynopsis.length <= MAX_SYNOPSIS_LENGTH
        ? cleanSynopsis
        : `${cleanSynopsis.substring(0, MAX_SYNOPSIS_LENGTH).trim()}...`;
};

const formatNumber = (number) => {
    return number ? `${(number / 1000).toFixed(1)}K` : 'N/A';
};

const getAnimeStatus = (status) => {
    const statusMap = {
        FINISHED: 'Finished',
        RELEASING: 'Currently Airing',
        NOT_YET_RELEASED: 'Not Yet Released',
        CANCELLED: 'Cancelled',
        HIATUS: 'On Hiatus'
    };
    return statusMap[status] || status;
};

const formatDate = (date) => {
    if (!date?.year) return 'TBA';
    return `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
};

const getTrailerUrl = (trailer) => {
    if (!trailer?.id) return null;
    if (trailer.site === 'youtube') {
        return `https://www.youtube.com/watch?v=${trailer.id}`;
    }
    return null;
};

const formatAnimeDetails = (anime) => {
    const {
        title,
        format,
        episodes,
        duration,
        status,
        description,
        coverImage,
        averageScore,
        popularity,
        genres = [],
        studios,
        startDate,
        endDate
    } = anime;

    const studioNames = studios?.nodes?.map(s => s.name).join(', ') || 'N/A';
    const formattedGenres = genres.join(', ') || 'N/A';
    const airingPeriod = `${formatDate(startDate)} to ${formatDate(endDate)}`;

    return `
*${format}:* *${title.english || title.romaji}*
⭐ *Rating:* ${averageScore ? `${averageScore / 10}/10` : 'N/A'} 
*Popularity:* ${formatNumber(popularity)}
📺 *Episodes:* ${episodes || 'N/A'}
*Duration:* ${duration ? `${duration} minutes` : 'N/A'}
*Status:* ${getAnimeStatus(status)}
*Aired:* ${airingPeriod}

🎭 *Genres:* ${formattedGenres}
*Studios:* ${studioNames}
[⁣](${coverImage.large})
📝 *Synopsis*
_${formatSynopsis(description)}_`;

};

module.exports = {
    formatSynopsis,
    formatNumber,
    getAnimeStatus,
    formatDate,
    getTrailerUrl,
    formatAnimeDetails,
    MAX_SYNOPSIS_LENGTH
};