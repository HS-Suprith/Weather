# Quick Deployment Guide

## Fastest Way: Netlify Drop (No Account Needed)

1. **Make sure your API key is set** in `app.js`:
   ```js
   const WEATHER_API_KEY = "your_real_key_here";
   ```

2. **Zip your project folder** (or just select all files)

3. **Go to**: https://app.netlify.com/drop

4. **Drag and drop** your `SupX` folder (or the zip file)

5. **Done!** Your app is live at a URL like `https://random-name-123.netlify.app`

6. **Optional**: Sign up for a free Netlify account to customize the URL

---

## Other Quick Options

### Vercel (2 minutes)
- Visit: https://vercel.com
- Sign up with GitHub/Google
- Click "Add New Project" → Drag & drop folder → Deploy

### Surge.sh (Command Line)
```bash
npm install -g surge
cd SupX
surge
# Follow prompts - your app goes live instantly!
```

---

## Before Deploying Checklist

- [ ] API key is set in `app.js`
- [ ] Test locally first (`npm run start` or open `index.html`)
- [ ] All cities load weather data correctly
- [ ] App looks good on mobile (responsive design)

---

## After Deployment

1. **Test your live URL** - add a city and verify weather loads
2. **Share your URL** with friends!
3. **Optional**: Set up a custom domain in your hosting platform's settings

---

## Troubleshooting

**Weather not loading?**
- Check browser console (F12) for errors
- Verify API key is correct
- Make sure OpenWeatherMap API key is activated (may take a few minutes)

**CORS errors?**
- OpenWeatherMap API supports CORS, so this shouldn't happen
- If it does, try deploying to Netlify/Vercel (they handle CORS well)

**App looks broken?**
- Make sure all files (`index.html`, `styles.css`, `app.js`) are uploaded
- Check that file paths are correct (case-sensitive on some servers)
