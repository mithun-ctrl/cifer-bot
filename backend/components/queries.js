const TRENDING_ANIME_QUERY = `
query {
    Page(page: 1, perPage: 10) {
        media(type: ANIME, sort: TRENDING_DESC) {
            id
            title {
                english
                romaji
                native
            }
            type
            format
            status
            description
            episodes
            duration
            genres
            averageScore
            popularity
            studios(isMain: true) {
                nodes {
                    name
                }
            }
            startDate {
                year
                month
                day
            }
            endDate {
                year
                month
                day
            }
            coverImage {
                large
                medium
            }
            trailer {
                id
                site
                thumbnail
            }
            isAdult
        }
    }
}`;

const ANIME_SEARCH_QUERY = `
query ($search: String, $page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
        media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
            id
            title {
                english
                romaji
                native
            }
            type
            format
            status
            description
            episodes
            duration
            genres
            averageScore
            popularity
            studios(isMain: true) {
                nodes {
                    name
                }
            }
            startDate {
                year
                month
                day
            }
            endDate {
                year
                month
                day
            }
            coverImage {
                large
                medium
            }
            trailer {
                id
                site
                thumbnail
            }
            isAdult
        }
    }
}`;

module.exports = {
    TRENDING_ANIME_QUERY,
    ANIME_SEARCH_QUERY
};