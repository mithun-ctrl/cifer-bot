const { Telegraf } = require('telegraf');
const { fetchTrendingAnime, searchAnime } = require('./utils/api');
const { formatAnimeDetails, getAnimeStatus } = require('./components/formatter');
const { createInlineKeyboard } = require('./components/keyboards');
const dotenv = require('dotenv')

dotenv.config()

const BOT_TOKEN = process.env.BOT_TOKEN

const bot = new Telegraf(BOT_TOKEN);

// Constants
const CACHE_TIME = process.env.CACHE_TIME;
const ERROR_CACHE_TIME = process.env.ERROR_CACHE_TIME;
const SEARCH_LIMIT = process.env.SEARCH_LIMIT;

const createSearchSuggestions = (query) => ([
    'movie',
    'TV series',
    'OVA',
    'season 1',
    'complete series'
].map(suffix => `${query} ${suffix}`));

const handleError = async (ctx, error) => {
    console.error('Error:', error);
    return ctx.answerInlineQuery([{
        type: 'article',
        id: 'error',
        title: '⚠️ Error occurred',
        description: 'Please try again with a different search term',
        input_message_content: {
            message_text: 'Sorry, there was an error with the search. Please try again.'
        }
    }], {
        cache_time: ERROR_CACHE_TIME,
        switch_pm_text: '⚠️ Click here for help',
        switch_pm_parameter: 'error'
    });
};

bot.on('inline_query', async (ctx) => {
    const query = ctx.inlineQuery.query.trim();

    if (!query) {
        try {
            const trendingAnime = await fetchTrendingAnime();
            return ctx.answerInlineQuery(
                trendingAnime.map((anime, index) => {
                    const title = anime.title.english || anime.title.romaji;
                    const score = anime.averageScore ? `${(anime.averageScore / 10).toFixed(1)}/10` : 'N/A';
                    return {
                        type: 'article',
                        id: `trending_${index}`,
                        title: `📈 ${title}`,
                        description: `${anime.format || 'N/A'} • ⭐ ${score} • ${getAnimeStatus(anime.status)}`,
                        thumb_url: anime.coverImage.medium,
                        input_message_content: {
                            message_text: formatAnimeDetails(anime),
                            parse_mode: 'Markdown',
                            disable_web_page_preview: false
                        },
                        reply_markup: {
                            inline_keyboard: createInlineKeyboard(anime)
                        }
                    };
                }),
                {
                    switch_pm_text: '✨ Type an anime name to search',
                    switch_pm_parameter: 'start',
                    cache_time: CACHE_TIME
                }
            );
        } catch (error) {
            await handleError(ctx, error);
        }
    }

    try {
        const animeList = await searchAnime(query, 1, SEARCH_LIMIT);

        let results = animeList.map((anime, index) => {
            const title = anime.title.english || anime.title.romaji;
            const score = anime.averageScore ? `${(anime.averageScore / 10).toFixed(1)}/10` : 'N/A';
            return {
                type: 'article',
                id: `${anime.id}_${index}`,
                title: title,
                description: `${anime.format || 'N/A'} • ⭐ ${score} • ${getAnimeStatus(anime.status)}`,
                thumb_url: anime.coverImage.medium,
                input_message_content: {
                    message_text: formatAnimeDetails(anime),
                    parse_mode: 'Markdown',
                    disable_web_page_preview: false
                },
                reply_markup: {
                    inline_keyboard: createInlineKeyboard(anime)
                }
            };
        });

        if (results.length < 5) {
            const suggestions = createSearchSuggestions(query);
            const suggestionResults = suggestions.map((suggestion, index) => ({
                type: 'article',
                id: `suggestion_${index}`,
                title: `Try: ${suggestion}`,
                description: 'Click to search with this suggestion',
                input_message_content: {
                    message_text: `Try searching for: @PirecyKingsForwardBot ${suggestion}`
                }
            }));
            results = [...results, ...suggestionResults];
        }

        await ctx.answerInlineQuery(results, { cache_time: CACHE_TIME });
    } catch (error) {
        await handleError(ctx, error);
    }
});

bot.command('start', async (ctx) => {
    try {
        const trendingAnime = await fetchTrendingAnime();
        const trendingList = trendingAnime
            .slice(0, 5)
            .map(anime => `• ${anime.title.english || anime.title.romaji}`)
            .join('\n');

        const welcomeMsg = `
✨ *Welcome to AnimeBot!*

Type @cifer4bot followed by an anime name to search!

*Currently Trending:*
${trendingList}`;

        await ctx.reply(welcomeMsg, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('Error fetching trending anime:', error);
        await ctx.reply('Welcome to AnimeBot! Type @cifer4bot followed by an anime name to search!',
            { parse_mode: 'Markdown' });
    }
});

// Error handling
bot.catch((error) => console.error('Bot error:', error));

// Graceful shutdown
const setupGracefulShutdown = () => {
    const shutdown = signal => {
        console.log(`\n${signal} received. Shutting down gracefully...`);
        bot.stop(signal);
        process.exit(0);
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
};

// Start bot
const startBot = async () => {
    try {
        await bot.launch();
        console.log('✨ Bot started successfully!');
        setupGracefulShutdown();
    } catch (error) {
        console.error('Failed to start bot:', error);
        process.exit(1);
    }
};

startBot();