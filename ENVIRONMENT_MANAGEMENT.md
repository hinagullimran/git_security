# Environment Management Best Practices

This guide describes how to securely manage environment variables in this repository to prevent the exposure of sensitive data like API keys, database credentials, and secrets.

## 🛡️ Never Commit Secrets to Git

Secrets should never be version-controlled. If a secret is committed, it remains in the Git history even if the file is deleted later. 

### 1. The `.env` File
Store all environment-specific configuration and secrets in a `.env` file in the root of your project.

**Example `.env` (ignore me):**
```bash
API_KEY=your_secret_api_key_here
DATABASE_URL=postgres://user:password@localhost:5432/mydb
DEBUG=true
```

### 2. The `.env.example` File
Since `.env` is ignored by Git, you should provide a template file called `.env.example` to let other contributors know which environment variables are required.

-   **Include keys, not values.**
-   **Provide dummy data if necessary for context.**

**Example `.env.example` (Tracked by Git):**
```bash
# Get your API key from https://provider.com/dashboard
API_KEY=your_api_key_here
DATABASE_URL=postgres://localhost:5432/mydb
DEBUG=false
```

### 3. Ensure `.gitignore` is Configured
Your `.gitignore` file must include the following to prevent accidental staging:
```gitignore
.env
.env.*
```

---

## 🔐 How to Restore Security After an Accidental Commit

If you've accidentally staged or committed a secret:

### 1. Remove from Stage (If not yet committed)
If you've run `git add .env` but haven't committed:
```bash
git rm --cached .env
```
Then commit your `.gitignore` to ensure it doesn't happen again.

### 2. Remove from History (If committed)
Deleting the file and committing again is **not enough**. You must rewrite history to scrub the secret.
- **Use filter-repo (recommended):** `git filter-repo --path .env --invert-paths`
- **Use BFG Repo-Cleaner:** `bfg --delete-files .env`

**Important:** After scrubbing history, you must rotate any keys that were exposed, as they should be considered compromised.

---

## 🚀 Production Best Practices

-   **Never use `.env` files in production.** Most platforms (Heroku, AWS, Vercel, Railway, etc.) provide a dedicated way to set environment variables securely via their dashboard or CLI.
-   **CI/CD Secrets:** Use GitHub Secrets or GitLab CI/CD Variables for your deployment pipelines.
-   **Secret Managers:** For enterprise applications, use AWS Secrets Manager or HashiCorp Vault.
