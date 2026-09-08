# Contributing to MyApp

Welcome! This guide will help you set up your development environment, understand our workflow, and contribute effectively to the project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running the App](#running-the-app)
- [Branching Strategy](#branching-strategy)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Linting & Formatting](#linting--formatting)
- [Environment Variables](#environment-variables)
- [Building & Deployment](#building--deployment)
- [Over-the-Air Updates](#over-the-air-updates)
- [Commit Guidelines](#commit-guidelines)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Ensure you have the following tools installed:

- Node.js (LTS, version 20.x or higher) – use nvm to manage versions
- npm (comes with Node) or yarn (we use npm)
- Git
- Expo account (free) – required for EAS services
- Watchman (recommended for macOS/Linux)
- Xcode (macOS only, for iOS simulator)
- Android Studio (for Android emulator)
- Expo Go app on your physical device (optional, for quick testing)

### Check Your Setup

```bash
node -v
npm -v
git --version
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file and fill in the required values:

```bash
cp .env.example .env.development
```

Ask a team lead for the actual values. **Never commit `.env` files to Git.**

### 4. Initialize EAS

If EAS has not already been initialized:

```bash
npx eas-cli login
npx eas-cli init
```

This links your local project to the Expo project.

## Running the App

### Local Development (Expo Go)

Start the development server:

```bash
npx expo start
```

Then:

- Scan the QR code with Expo Go (Android/iOS) to run on a physical device.
- Press `i` to open in the iOS simulator (macOS only).
- Press `a` to open in the Android emulator.

### Using a Development Build

If the project uses custom native code, you'll need a development build instead of Expo Go.

Build a development client (one-time per device/emulator):

```bash
eas build --profile development --platform ios
# or
eas build --profile development --platform android
```

Install the generated `.app` / `.apk` on your simulator/device.

Start the development server:

```bash
npx expo start --dev-client
```

The QR code will work with the development build.

### Viewing Different Branches Simultaneously

You can run multiple local development servers for different branches using Git worktree:

```bash
# Create a separate working directory for another branch
git worktree add ../myapp-feature feature/my-feature

cd ../myapp-feature
npm install
npx expo start --port 8082
```

Each terminal will show its own QR code pointing to that branch's code.

## Branching Strategy

We follow a lightweight Git Flow:

- `main` – production-ready code. Only merged from `develop` via pull requests.
- `develop` – integration branch for all features.
- Feature branches – `feature/<description>` (e.g., `feature/login-screen`), created from `develop`.

### Rules

- Never commit directly to `main` or `develop`.
- Keep feature branches short-lived (ideally less than 1 week).
- Rebase your feature branch onto `develop` before opening a PR to keep history clean.

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout develop
git pull origin develop
git checkout -b feature/my-awesome-feature
```

### 2. Make Changes and Test Locally

Make your changes and test them locally using the instructions in [Running the App](#running-the-app).

### 3. Commit Your Changes

Follow the [Commit Guidelines](#commit-guidelines).

### 4. Push Your Branch

```bash
git push -u origin feature/my-awesome-feature
```

### 5. Open a Pull Request

Open a Pull Request targeting `develop`.

When creating the PR:

- Fill in the PR template, if provided.
- Link any related issues.
- Request reviews from at least one teammate.

CI checks will automatically run linting, tests, and possibly a preview build.

After approval and merge, your changes are live on `develop` and will be included in the next preview build.

## Testing

We use **Jest** and **React Native Testing Library** for unit and component tests.

### Running Tests

#### Run All Tests Once

```bash
npm test
```

#### Run Tests in Watch Mode

```bash
npm run test:watch
```

#### Generate Coverage Report

```bash
npm run test:coverage
```

### Writing Tests

- Place test files next to the component or utility, e.g. `Button.test.tsx`.
- Follow the existing patterns in the codebase.
- Mock external dependencies (API calls, navigation, etc.) when necessary.

### End-to-End Tests (Optional)

E2E tests using **Detox** can be run locally with a development build. Ask the team lead for instructions if needed.

## Linting & Formatting

We enforce code style with **ESLint** and **Prettier**.

### Run Linting

```bash
npm run lint
```

### Auto-format Code

```bash
npm run format
```

### Pre-commit Hooks

Husky and lint-staged are set up to automatically lint and format your staged files on every commit.

If a hook fails, fix the issues and commit again.

## Environment Variables

Environment variables are stored in:

- `.env.development`
- `.env.staging`
- `.env.production`

They are read via `app.config.js` and exposed to the app through `expo-constants`.

> **Important:** Never commit real secrets. Use `.env.example` as a template.

### Example `.env.development`

```text
API_URL=https://dev-api.example.com
```

For CI/CD, secrets are stored in GitHub Secrets and passed to EAS.

## Building & Deployment

We use **EAS Build** and **EAS Submit** for all builds and store submissions.

### Build Profiles

Build profiles are defined in `eas.json`:

| Profile | Purpose |
|---|---|
| `development` | Development client for local testing |
| `preview` | Installable build for testers (internal distribution) |
| `production` | Release build for app stores |

### Creating a Preview Build

Preview builds are triggered automatically on every merge to `develop` via GitHub Actions.

You can also run one manually:

```bash
eas build --profile preview --platform all
```

### Creating a Production Build

Production builds are triggered automatically on every merge to `main`.

You can also run one manually:

```bash
eas build --profile production --platform all
```

The build will be submitted to the stores automatically if `--auto-submit` is used. CI handles this automatically.

## Over-the-Air Updates

We use **EAS Update** to push JavaScript changes without going through the app stores.

### Update Branches

| Branch | Purpose |
|---|---|
| `production` | Live app users |
| `staging` | Internal testers, linked to `develop` |
| `feature/<name>` | Feature-specific previews |

### Publishing an Update

Publish to staging:

```bash
eas update --branch staging --message "Describe the change"
```

Publish to a feature branch:

```bash
eas update --branch feature/my-feature --message "Testing new UI"
```

### Getting a QR Code for an Update Branch

List available branches:

```bash
eas branch:list
```

View a branch to get its update URL:

```bash
eas branch:view staging
```

Generate a QR code from that URL and share it with testers.

The QR code will always load the latest update for that branch.

## Commit Guidelines

We follow **Conventional Commits** to keep history readable and enable automatic changelogs.

### Format

```text
<type>(<scope>): <short description>
```

### Commit Types

- `feat` – New feature
- `fix` – Bug fix
- `docs` – Documentation
- `style` – Code style changes
- `refactor` – Code refactoring
- `test` – Tests
- `chore` – Maintenance tasks
- `perf` – Performance improvements
- `ci` – CI/CD changes

### Examples

```text
feat(auth): add biometric login
fix(profile): resolve avatar upload crash
docs(readme): update setup instructions
```

Keep the subject under **72 characters**. Use the body for more details if needed.

## Troubleshooting

### Metro Bundler Issues

Clear the Expo/Metro cache:

```bash
npx expo start -c
```

Reset Watchman:

```bash
watchman watch-del-all
```

### EAS Build Fails

- Check the build logs in the Expo dashboard.
- Ensure `eas.json` and `app.json` are configured correctly.
- Verify environment variables are set in EAS:

```bash
eas env:list
```

### iOS/Android Simulator Not Working

- Make sure Xcode/Android Studio is updated.
- Check that the simulator/emulator is running before starting Expo.

### Node Module Errors

Delete `node_modules` and `package-lock.json`, then reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```
