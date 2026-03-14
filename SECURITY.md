# Security Guidelines: Sensitive Information

This document outlines the types of sensitive information that **MUST NEVER** be committed or pushed to this repository. Exposing this information can lead to severe security breaches, unauthorized access, and financial loss.

## 🚫 Never Push These Items

The following items should always be kept secure and never be included in version control:

### 1. API Keys & Tokens
- Third-party API keys (e.g., AWS, GCP, Stripe, OpenAI)
- OAuth tokens
- Authentication tokens (e.g., GitHub Personal Access Tokens)
- Webhook URIs containing authentication secrets

### 2. Credentials & Passwords
- Database passwords and connection strings
- Administrator passwords
- Service account passwords
- SMTP server login details

### 3. Asymmetric Private Keys
- SSH private keys (`id_rsa`, `id_ed25519`)
- GPG private keys
- SSL/TLS certificates and private keys (`.pem`, `.key`, `.p12`)

### 4. Configuration & Environment Variables
- `.env` files or any other environment configuration files containing secrets
- Files containing production endpoint details
- Encrypted credentials where the decryption key is also inadvertently present

### 5. Personal Identifiable Information (PII)
- Real customer data (names, email addresses, phone numbers, SSNs)
- Real user passwords
- Medical or financial records

## ✅ Best Practices for Handling Secrets

To ensure secrets do not get leaked into this repository, follow these guidelines:

1. **Use `.gitignore`:** Ensure that files like `.env`, `secrets.json`, and directories containing private keys are tracked in the `.gitignore` file from the beginning.
2. **Use Environment Variables Systematically:** Applications should read sensitive values directly from environment variables supplied by the operating system or deployment infrastructure.
3. **Use Secret Management Tools:** Utilize services like AWS Secrets Manager, HashiCorp Vault, or GitHub Secrets to inject sensitive values during runtime or CI/CD pipelines instead of hardcoding them.
4. **Scan Before Committing:** Consider installing pre-commit hooks (like `gitleaks` or `git-secrets`) to automatically detect secrets and stop accidental commits before they happen.

## ⚠️ What to do if a secret is accidentally committed?

If a secret is pushed:
1. **Consider it compromised immediately.**
2. Revoke or roll over the secret/key at its source immediately (e.g., generate a new AWS key, reset the database password).
3. Do **not** just push a new commit deleting the secret, as it remains in the Git history. Use tools like `git filter-repo` or BFG Repo-Cleaner to scrub the history completely if necessary, but revocation is the number one priority.
