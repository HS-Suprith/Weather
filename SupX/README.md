# SupX Weather Dashboard

A sleek, minimal, **multi-city weather dashboard** built with vanilla HTML, CSS, and JavaScript.

It lets you:

- **Select popular cities quickly** from a dropdown.
- **Add any custom city** by name.
- See **current temperature, feels-like, humidity, wind speed, and conditions** for each selected city.
- **Refresh all cities at once** or refresh them individually.

Behind the scenes it uses a weather API (e.g. OpenWeatherMap) via a single `app.js` file.

## 1. Setup your weather API key

This project is wired to work with the **OpenWeatherMap Current Weather Data API**.

1. Go to [OpenWeatherMap](https://openweathermap.org/api) and create a free account.
2. Create an API key and copy it.
3. Open `app.js` and update this line:

```js
const WEATHER_API_KEY = "YOUR_WEATHER_API_KEY_HERE";
```

Replace the placeholder string with your real API key, **keeping the quotes**:

```js
const WEATHER_API_KEY = "your_real_key_here";
```

That’s it – the UI will start fetching real data.

> **Note**: For security, do not commit your real key to a public repo. Consider environment-based configuration if you publish this app.

## 2. Running the app locally

This is a static app – you can open `index.html` directly in a browser, or run a tiny static server.

### Option A – Open directly

1. Navigate to this folder (`SupX`) in your file explorer.
2. Double-click `index.html` to open it in your browser.

### Option B – Run a static server (recommended)

From this folder in a terminal:

```bash
npm install -g serve
serve .
```

Then open the shown local URL (typically `http://localhost:3000`) in your browser.

Alternatively you can use the included script:

```bash
npm run start
```

*(This uses `npx serve .`, which will prompt to install `serve` the first time.)*

## 3. Customizing the UI

- The **layout and styling** are in `styles.css`:
  - Background gradient, glassmorphism effect, and card styling.
  - Responsive grid for city cards.
- The **logic and API integration** are in `app.js`:
  - City add/remove behavior.
  - Calls to the weather API.
  - Error handling and small toast notifications.

You can easily:

- Change the default pre-loaded cities (`["London", "New York", "Tokyo"]` at the bottom of `app.js`).
- Tweak colors, fonts, and spacing in `styles.css`.

## 4. Deploying Your App Live

Here are several free options to deploy your weather app so it's accessible online:

### Option A: Netlify (Easiest - Drag & Drop) ⭐ Recommended

**No account needed for basic deployment:**

1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop your entire `SupX` folder onto the page
3. Your app will be live in seconds at a URL like `https://random-name-123.netlify.app`
4. You can customize the site name in Netlify's dashboard

**With a Netlify account (for custom domain & more features):**

1. Sign up at [netlify.com](https://www.netlify.com) (free)
2. Go to your dashboard → "Add new site" → "Deploy manually"
3. Drag and drop your `SupX` folder
4. Your app is live! You can change the site name in Site settings

### Option B: Vercel (Also Very Easy)

1. Sign up at [vercel.com](https://vercel.com) (free, GitHub/Google login)
2. Click "Add New Project"
3. Drag and drop your `SupX` folder, or connect a Git repository
4. Click "Deploy" - your app will be live at `your-project.vercel.app`

### Option C: GitHub Pages (If Using Git)

1. Create a GitHub account and repository
2. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```
3. Go to your repo → Settings → Pages
4. Select "main" branch and "/ (root)" folder
5. Your app will be live at `https://yourusername.github.io/your-repo-name`

### Option D: Surge.sh (Command Line)

1. Install Surge: `npm install -g surge`
2. In your `SupX` folder, run: `surge`
3. Follow the prompts (create account if needed)
4. Your app will be live at `your-project-name.surge.sh`

### Option E: Cloudflare Pages

1. Sign up at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your Git repository or upload manually
3. Deploy - your app will be live instantly

---

### ⚠️ Important: API Key Security

**Your API key will be visible in the browser** since it's in client-side JavaScript. This is normal for public weather apps, but:

- ✅ **OpenWeatherMap free tier** allows this (client-side usage is fine)
- ✅ Consider setting up **API key restrictions** in OpenWeatherMap dashboard:
  - Limit to specific domains (your deployed URL)
  - Set usage quotas to prevent abuse
- ⚠️ **Don't commit your real API key** to public GitHub repos if you're concerned
- 💡 For production apps, consider using a backend proxy to hide the key

### Quick Test After Deployment

1. Make sure your API key is set in `app.js` before deploying
2. Visit your deployed URL
3. Try adding a city - it should fetch real weather data!

Enjoy your SupX Weather Dashboard! 🌤️

