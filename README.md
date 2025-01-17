# Anime Search Bot for Telegram

A Telegram bot that helps users discover and get information about anime using the AniList API. The bot provides trending anime updates and detailed search functionality.

## Features

- **Trending Anime**: Shows currently trending anime when no search query is provided
- **Detailed Search**: Search for any anime with comprehensive information
- **Rich Information Display**:
  - Title in multiple languages (English, Romaji, Native)
  - Rating and popularity statistics
  - Episode count and duration
  - Airing status and dates
  - Genres and studios
  - Detailed synopsis
  - Cover images
- **Quick Access Links**:
  - Direct links to AniList pages
  - Trailer links (when available)
- **Search Suggestions**: Provides helpful suggestions when searches return limited results

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mithun-ctrl/cifer-bot.git
cd cifer-bot
```

2. Install dependencies:
```bash
npm install
```

3. Create a new bot and get the token from [BotFather](https://t.me/botfather)

4. Create a `.env` file in the root directory:
```env
BOT_TOKEN=your_telegram_bot_token
```

5. Start the bot:
```bash
node bot.js
```

## Dependencies

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [telegraf](https://www.npmjs.com/package/telegraf) - Modern Telegram Bot Framework
- [axios](https://www.npmjs.com/package/axios) - HTTP Client

## Project Structure

```
cifer-bot/
├── bot.js          # Main bot file
├── api.js          # API integration
├── formatters.js   # Formatting utilities
├── keyboards.js    # Keyboard layouts
├── queries.js      # GraphQL queries
└── package.json
```

## Usage

1. Start a chat with the bot on Telegram
2. Use inline mode by typing `@cifer4bot` in any chat
3. To see trending anime, just type `@cifer4bot` without any query
4. To search for specific anime, type `@cifer4bot` followed by your search term

Example:
```
@cifer4bot Attack on Titan
```

## API Reference

This bot uses the [AniList GraphQL API](https://anilist.gitbook.io/anilist-apiv2-docs/) to fetch anime data. 

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [AniList](https://anilist.co/) for providing the API
- [Telegraf](https://telegraf.js.org/) for the excellent bot framework
- The anime community for inspiration and support

## Support

For support, feedback, or suggestions, please [open an issue](https://github.com/mithun-ctrl/cifer-bot/issues) on GitHub.

## Disclaimer

This bot is not affiliated with AniList. It's an independent project that uses AniList's public API.