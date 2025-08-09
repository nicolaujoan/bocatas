## Technologies used + installation

Laravel + breeze + inertia (react) + sqlite

➜ cd bocatas
➜ npm install && npm run build
➜ composer run dev

### Run project
```bash
./util/run.sh
```

### Test project
```bash
./util/test.sh
```

### Create a model
```bash
./util/model.sh theModelName
```

## Resources

- https://medium.com/@1415sandalanka/how-to-handle-json-data-in-laravel-c4a4e07baa9e
- https://chatgpt.com/share/6752fcc0-7838-800e-bf15-60c4a7e07168
- https://tecnolitas.com/blog/tu-propio-servidor-de-correo/

- https://www.linuxbabe.com/mail-server/setting-up-dkim-and-spf

- https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-postfix-as-a-send-only-smtp-server-on-ubuntu-22-04

- https://medium.com/@akhmadshaleh/sending-email-with-laravel-10-and-gmail-49be01c2bc8f

- Generate whatsapp link: https://faq.whatsapp.com/5913398998672934

## CICD

Setting up CI/CD for a Laravel project on a remote server is a great way to automate deployments and streamline your development workflow. Here’s a step-by-step guide on how you can approach this.

Recommended CI/CD Approach for Laravel Project
Choose a CI/CD Service: Several CI/CD services are available, including GitHub Actions, GitLab CI, CircleCI, Jenkins, etc. Since you mentioned having a remote server, I’ll assume you're using a version control system like Git and prefer a Git-based CI/CD pipeline.

GitHub Actions is highly recommended for simplicity and direct integration with GitHub repositories. However, you can use any CI/CD tool of your choice.

Key Steps in CI/CD Workflow:

Code Push: Developer pushes code to the repository (e.g., GitHub).
CI: The CI tool (e.g., GitHub Actions) runs a series of steps to:
Install dependencies (e.g., Composer, NPM).
Run tests (if any).
Build assets (e.g., run npm run prod for Vite and Tailwind CSS).
CD: Once CI steps pass successfully, the CD tool deploys the app to the remote server.
Post-deployment steps: After deploying, you might want to run migrations, seed the database, and clear caches.
Step 1: Set Up the CI Pipeline with GitHub Actions
If you're using GitHub Actions, follow these steps to set up the CI/CD pipeline.

1.1 Create GitHub Actions Workflow
Create a .github/workflows/ directory in the root of your project if it doesn’t exist already.
Create a YAML file for the workflow, e.g., .github/workflows/deploy.yml.
Here’s an example GitHub Actions workflow:

```yaml

name: Laravel CI/CD

on:
  push:
    branches:
      - main # Trigger the workflow on push to the 'main' branch

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up PHP
        uses: shivammathur/setup-php@v2
        with:
          php-version: '8.1' # or whatever PHP version you're using
          extensions: mbstring, bcmath, gd, pdo, pdo_mysql, zip, opcache

      - name: Install Composer dependencies
        run: |
          curl -sS https://getcomposer.org/installer | php
          php composer.phar install --no-interaction --prefer-dist

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'  # or your preferred Node.js version

      - name: Install NPM dependencies
        run: npm install

      - name: Build assets
        run: npm run prod

      - name: Run Tests (Optional)
        run: |
          php artisan migrate --env=testing # (optional) you can run tests here
          php artisan test

  deploy:
    runs-on: ubuntu-latest
    needs: build  # Only deploy if the build job is successful

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Copy Files to Remote Server (using SSH)
        uses: appleboy/ssh-action@v0.1.0
        with:
          host: ${{ secrets.REMOTE_HOST }}
          username: ${{ secrets.REMOTE_USER }}
          password: ${{ secrets.REMOTE_PASSWORD }}
          port: 22
          script: |
            cd /path/to/your/laravel/project
            git pull origin main
            composer install --no-interaction --prefer-dist
            npm install
            npm run prod
            php artisan migrate --force
            php artisan config:cache
            php artisan route:cache
            php artisan storage:link
```

Explanation:
Trigger: This workflow triggers on every push to the main branch (you can change it to any branch you prefer).
Build Job:
It checks out the repository, sets up PHP and Node.js, installs dependencies, and runs the build.
The php artisan migrate --force and php artisan test are optional but recommended for ensuring the database is updated and tests pass before deployment.
Deploy Job:
This job uses the appleboy/ssh-action GitHub Action to SSH into your remote server and deploy the code.
The git pull origin main command pulls the latest changes from the repository.
It runs composer install, installs NPM dependencies, builds assets (npm run prod), and runs the migration (php artisan migrate --force).
Secrets: Store sensitive data like REMOTE_HOST, REMOTE_USER, and REMOTE_PASSWORD in GitHub Secrets to avoid exposing sensitive information.

1.2 Set Up SSH Key for GitHub Actions
To securely connect to your server, you'll need to set up SSH keys for authentication.

Generate an SSH key pair on your local machine (if you don’t have one):

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com" -f ~/.ssh/id_rsa
``` 

Add the public key (id_rsa.pub) to your remote server’s ~/.ssh/authorized_keys file.

Add the private key (id_rsa) as a GitHub secret under Settings > Secrets > New repository secret. Name it SSH_PRIVATE_KEY.

In the GitHub Actions YAML, reference this private key with:

```yaml
  - name: Copy Files to Remote Server (using SSH)
    uses: appleboy/ssh-action@v0.1.0
    with:
      host: ${{ secrets.REMOTE_HOST }}
      username: ${{ secrets.REMOTE_USER }}
      key: ${{ secrets.SSH_PRIVATE_KEY }}
      port: 22
      script: |
        # Deployment commands
```
Step 2: Set Up Continuous Deployment on Your Remote Server
2.1 Prepare Your Remote Server for Deployment
On your remote server, you’ll need:

A Web Server (e.g., Nginx, Apache) configured to serve your Laravel app.
SSH access enabled for deployment via GitHub Actions.
PHP installed and configured with all necessary extensions (like mbstring, bcmath, pdo, etc.).
Node.js and NPM installed for asset building.
Composer installed for Laravel dependency management.
2.2 Deployment Workflow
The CI pipeline handles deployment by SSH-ing into the server and executing commands like git pull, composer install, npm install, and php artisan migrate.

Database Migration: Ensure that php artisan migrate --force is included, as running migrations automatically is crucial during deployment.
Asset Building: Use npm run prod to compile production assets (Tailwind CSS, JavaScript, etc.).
Step 3: Additional Considerations
Rollback Strategy:

You might want to implement a rollback strategy by keeping backups of the previous version, in case something goes wrong during deployment.
You can create tags or branches and deploy specific versions if necessary.
Monitoring:

Set up logs for your server (e.g., Nginx, Laravel logs) and use tools like New Relic or Sentry to monitor the application health post-deployment.
Notifications:

Configure notifications for successful or failed deployments via email or Slack using GitHub Actions' built-in actions or third-party integrations.
Conclusion
By following this approach, you’ll have a fully automated CI/CD pipeline for your Laravel + Inertia.js + React project, integrating with GitHub Actions and deploying to a remote server. This will help ensure fast, reliable, and automated deployments, which is especially beneficial for larger teams and more complex projects.