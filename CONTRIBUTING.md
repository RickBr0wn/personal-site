# Contributing

Thanks for your interest. This is a personal portfolio site, so contributions are generally not expected — but if you spot a bug or have a suggestion, feel free to open an issue.

## Reporting issues

Open an issue on [GitHub](https://github.com/RickBr0wn/portfolio/issues) with a clear description of the problem.

## Running locally

```bash
git clone https://github.com/RickBr0wn/portfolio.git
cd portfolio
npm install
```

Create a `.env.local` file:

```
OPENWEATHER_API_KEY=your_key_here
```

Then:

```bash
npm run dev
```

## Pull requests

For anything beyond a typo fix, open an issue first so we can discuss it. If you do send a PR:

- Keep changes focused and minimal
- Follow the existing code style (TypeScript, Tailwind, no additional dependencies unless necessary)
- Test locally before submitting
