# create-shad

A CLI tool for quickly scaffolding projects with Shadcn/ui components pre-configured.

## What it does

`create-shad` automates the setup of a new project with:
- Vite + React + TypeScript configuration
- Tailwind CSS setup with the new CSS-first approach
- Shadcn/ui components library initialization
- Pre-configured path aliases and TypeScript settings
- Sample component to get you started

## Usage

```bash
npx create-shad
```

The CLI will prompt you to:
1. Choose your framework (currently supports Vite, with Next.js coming soon)
2. Enter your app name

## What gets created

For a Vite project, `create-shad` will:
- Create a new Vite + React + TypeScript project
- Install and configure Tailwind CSS with `@tailwindcss/vite`
- Set up Shadcn/ui with default configuration
- Configure path aliases (`@/*` → `./src/*`)
- Add a sample Button component to demonstrate usage
- Update the main App component with a working example

## Development

If you want to contribute to this project:

- Install dependencies:

```bash
pnpm install
```

- Run the CLI locally:

```bash
pnpm start
```

- Run in development mode with watch:

```bash
pnpm dev
```

- Run tests:

```bash
pnpm test
```

- Build the library:

```bash
pnpm build
```

## Requirements

- Node.js 18+
- pnpm (used internally for project creation)

## License

MIT