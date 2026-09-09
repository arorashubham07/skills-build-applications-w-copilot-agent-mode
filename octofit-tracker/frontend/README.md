# Octofit Tracker frontend

The React 19 presentation tier uses `react-router-dom` to display users, activities, teams, the leaderboard, and workout suggestions.

## API configuration

Define `VITE_CODESPACE_NAME` when running the frontend in Codespaces. Vite exposes it through `import.meta.env.VITE_CODESPACE_NAME`, which builds API URLs such as:

```text
https://YOUR_CODESPACE_NAME-8000.app.github.dev/api/users/
```

For example, create `octofit-tracker/frontend/.env.local` with:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is unset, the application safely uses `http://localhost:8000/api` instead.
