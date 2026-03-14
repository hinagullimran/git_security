# Environment Variables: Best Practices

Environment variables are a crucial part of securing configuration data and secrets in a software project. They allow you to separate sensitive information and environment-specific settings from your application's source code. 

**The Golden Rule:** Your code should be able to be made public at any time without compromising any credentials.

Here are the best practices for handling environment variables and `.env` files:

## 1. Never Commit `.env` Files
Files containing real environment variables (like `.env`, `.env.local`, `.env.production`) must **NEVER** be committed to the repository.
* Ensure they are listed in your `.gitignore` file immediately.
* If you run `git status` and see a `.env` file listed under "Untracked files", **do not run `git add .`**. Add `.env` to `.gitignore` first.

## 2. Create a `.env.example` File
To help other developers set up the project, you should provide a template file named `.env.example` or `.env.template`.
* This file **SHOULD** be committed to version control.
* This file should list all the necessary environment variables your application requires, but **leave the values blank or use dummy values**.

**Example `.env.example`:**
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=root
DB_PASSWORD=your_database_password_here

# Third-Party APIs
STRIPE_SECRET_KEY=sk_test_...
OPENAI_API_KEY=sk-...
```

Developers cloning the repository will copy this file to create their own local `.env`:
`cp .env.example .env`

## 3. Keep Secrets Out of the Codebase
Do not use fallback secrets in your actual code for production values. 
**Bad Example:**
```javascript
const DB_PASSWORD = process.env.DB_PASSWORD || "mySuperSecretProdPassword";
```
If the environment variable is missing, the application should gracefully fail and throw an error, alerting you to the misconfiguration, rather than falling back to a hardcoded secret.

## 4. Use Secret Managers for Production
When deploying to production (AWS, Heroku, Vercel, etc.), do not copy your `.env` file to the server. 
* Use the hosting provider's built-in environment variable settings or a dedicated "Secret Manager" (like AWS Secrets Manager, HashiCorp Vault, or GitHub Secrets).
* These tools inject the secrets directly into the application's runtime environment securely.

## 5. Rotate Secrets if Exposed
If an `.env` file is accidentally pushed to Git, you must assume every secret inside it is compromised.
* **Do not** just delete the file and push another commit. 
* You must instantly run to the service providers (AWS, Stripe, your database provider) and **revoke/rotate** those compromised keys.

## Summary Checklist
- [x] `.env` is in `.gitignore`
- [x] `.env.example` is created and committed
- [x] No sensitive default values are hardcoded in the source code
- [x] Production secrets are handled by a secure Secret Manager
