import { exec } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { promisify } from "node:util";

const execAsync = promisify(exec);

export const createViteProject = async (projectName: string) => {
  // Create Vite project
  await execAsync(
    `pnpm create vite@latest ${projectName} --template react-ts --no-rolldown --no-interactive`,
  );

  // Install dependencies
  await execAsync(`cd ${projectName} && pnpm install`);

  // Add Shadcn required dependencies
  await execAsync(
    `cd ${projectName} && pnpm add tailwindcss @tailwindcss/vite @types/node`,
  );

  await tailwindConfig(projectName);
  await tsConfig(projectName);
  await viteConfig(projectName);

  // Run Shadcn CLI initialization
  const { stdout } = await execAsync(
    `cd ${projectName} && pnpm dlx shadcn@latest init -d`,
  );
  console.log(stdout);
};

const tailwindConfig = async (projectName: string) => {
  // Update index.css with Tailwind import only
  const indexCssPath = join(projectName, "src", "index.css");
  writeFileSync(indexCssPath, '@import "tailwindcss";');
};

const tsConfig = async (projectName: string) => {
  // Update tsconfig.json with baseUrl and paths
  const tsconfigPath = join(projectName, "tsconfig.json");
  const tsconfig = JSON.parse(readFileSync(tsconfigPath, "utf-8"));
  tsconfig.compilerOptions = {
    ...tsconfig.compilerOptions,
    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"],
    },
  };
  writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
};

const viteConfig = async (projectName: string) => {
  // Update vite.config.ts
  const viteConfigContent = `import path from "path";
  import tailwindcss from "@tailwindcss/vite";
  import react from "@vitejs/plugin-react";
  import { defineConfig } from "vite";

  export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });`;

  const viteConfigPath = join(projectName, "vite.config.ts");
  writeFileSync(viteConfigPath, viteConfigContent);
};

export const sample = async (projectName: string) => {
  await execAsync(`cd ${projectName} && pnpm dlx shadcn@latest add button`);
  const appComponentPath = join(projectName, "src", "App.tsx");

  const appComponentContent = `import { Button } from "@/components/ui/button";

  export default function App() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Button variant="outline">Hello World</Button>
      </div>
    );
  }`;

  writeFileSync(appComponentPath, appComponentContent);
};
