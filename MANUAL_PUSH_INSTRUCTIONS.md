# Manual Push Instructions — Payment API Fix

## What Was Done
✅ Created: `netlify/functions/package.json` with Razorpay dependency
✅ Committed: `37c9bc2 - fix: add package.json with razorpay dependency to Netlify Functions`
⏳ Pending: Push to GitHub

## How to Complete the Fix

### Option 1: Push from your Mac (Recommended)

Open Terminal and run:

```bash
cd ~/Documents/Zen

# Remove stale git locks if they exist
rm -f .git/index.lock .git/HEAD.lock

# Pull latest (just in case)
git pull origin main

# Verify the file exists
cat netlify/functions/package.json

# You should see:
# {
#   "name": "clearhead-functions",
#   "version": "1.0.0",
#   "description": "Netlify Functions for clearhead.in",
#   "main": "create-order.js",
#   "dependencies": {
#     "razorpay": "^2.8.2"
#   }
# }

# Push to GitHub
git push origin main
```

### Option 2: If git push doesn't work

Sometimes git locks persist. Try this:

```bash
cd ~/Documents/Zen

# Force a fresh clone in a temp directory
mkdir -p /tmp/zen-push
cd /tmp/zen-push
git clone ~/Documents/Zen .

# Configure git
git config user.email "aithings@vinit.pm"
git config user.name "Vaibhav Jain"

# Push to GitHub
git push origin main
```

## What This Fix Does

When you push to GitHub, Netlify will automatically:
1. Detect the new `package.json` in `netlify/functions/`
2. Install the `razorpay` npm module during the build
3. Properly deploy the Netlify Functions with dependencies
4. Functions will now return proper HTTP status codes (400/500) instead of 301 redirect loops

## Verify the Fix Worked

After pushing and Netlify redeploys (check your Netlify deploy logs), test:

```bash
curl -X POST https://clearhead.in/api/create-order \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected responses:**
- HTTP 400 (if amount is missing) ✅ — Functions are working
- HTTP 500 with "credentials not configured" — Razorpay env vars not set
- NOT HTTP 301 ✅ — The redirect loop is fixed

## If Razorpay Credentials Are Missing

After the Functions are deployed, you'll also need to set environment variables in Netlify:

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Select **clearhead.in** site
3. Go to **Site settings** → **Environment variables**
4. Add these two variables:
   - **Name:** `RAZORPAY_KEY_ID` | **Value:** (your Razorpay publishable key)
   - **Name:** `RAZORPAY_KEY_SECRET` | **Value:** (your Razorpay secret key)
5. Click **Redeploy site** to apply the env vars

Then test again — the payment endpoint should now work.

---

**Timeline:** Once you push, Netlify redeploys in ~30 seconds. Site should be live within 2 minutes.
