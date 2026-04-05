# GitHub Security Guide: Sensitive Data Management

## 🚫 Information That Must NEVER Be Pushed to Version Control

When sharing your code, especially in public repositories, extreme care must be taken to ensure no sensitive data is leaked. The following types of information should **never** be committed or pushed to a repository:

1. **API Keys & Access Tokens**: Keys for services like AWS, Google Cloud, Stripe, OpenAI, etc.
2. **Database Credentials**: Usernames, passwords, connection strings, and database URLs.
3. **Private Cryptographic Keys**: SSH keys, TLS/SSL certificates, GPG keys, or signing certificates.
4. **Environment Configuration Files**: e.g., `.env`, `.env.local` which typically contain sensitive environment-specific configuration.
5. **Personal Identifiable Information (PII)**: Real user data, emails, internal employee data, etc.
6. **Configuration files with hardcoded secrets**: Any configuration file (like `config.json` or `settings.xml`) that includes passwords or secrets.

## 🔐 Repository Visibility: Public vs. Private

Understanding the difference between repository visibility types is crucial for security routing:

*   **Public Repository**: 
    *   **Visibility**: Open to the entire internet. Anyone can view the code, commit history, issues, and pull requests.
    *   **Risk**: High. If a secret is accidentally committed and pushed here, it can be scraped by automated bots within seconds and misused.
*   **Private Repository**:
    *   **Visibility**: Restricted. Only you and explicitly invited collaborators can view the repository.
    *   **Risk**: Moderate. While not exposed to the public internet, secrets are still exposed to all repository collaborators. It's still a bad practice to commit secrets here, as a private repo might be made public later, or a collaborator's account might be compromised.

## 🏮 Common Vulnerabilities and Risks

Committing secrets to a repository is one of the most common causes of security breaches. Understanding the risks is the first step in prevention:

*   **Rapid Exploitation**: Automated bots scan GitHub 24/7 for exposed credentials. A leaked AWS key can be exploited to spin up cryptomining instances within **minutes**, potentially costing thousands of dollars before you even notice.
*   **Persistent Exposure**: Git is designed to remember everything. Simply deleting a secret in a new commit does not remove it from history. Attackers can easily traverse your commit history to find old secrets.
*   **Lateral Movement**: A single leaked API key can often lead to a full system compromise. For example, a leaked CI/CD token could allow an attacker to inject malicious code into your production environment.
*   **Geographic Spread**: Public repositories can be forked or cloned instantly. Once a secret is pushed to a public repo, it is effectively distributed across the internet and cannot be truly "deleted."

### 💸 Impact Examples
1.  **Cryptojacking**: Leaked cloud keys (AWS, Azure, GCP) used to mine cryptocurrency.
2.  **Data Exfiltration**: Leaked database credentials used to steal sensitive customer data.
3.  **Supply Chain Attacks**: Leaked registry tokens used to publish malicious versions of software libraries.

---

## 🛡️ Best Practices for Environment Variables

Environment variables are the standard way to keep configuration and secrets out of your code.
1. **Store locally in `.env` files**: Keep your secrets in a local file (e.g., `.env`).
2. **Use `.gitignore`**: **ALWAYS** add `.env` and related environment files to your `.gitignore` file so they are never tracked by Git.
3. **Provide a `.env.example` file**: Create a sanitized version of your environment file with dummy values to show other developers what keys are required.
4. **Use Secret Managers**: In production, use dedicated secret managers (like AWS Secrets Manager, HashiCorp Vault, or GitHub Repository Secrets) instead of files.
