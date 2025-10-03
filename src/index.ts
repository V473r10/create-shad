#!/usr/bin/env node

import { intro, select, spinner, text } from "@clack/prompts";
import { createViteProject, sample } from "./frameworks/vite";

async function main() {
  intro("Welcome to Create Shad!");

  const framework = await select({
    message: "Pick a project framework. Only Vite is supported at the moment.",
    options: [{ value: "vite", label: "Vite" }],
  });

  let appName = await text({
    message: "Enter your app name:",
    placeholder: "my-app",
  });

  if (!appName) {
    appName = "my-app";
  }

  const s = spinner();

  switch (framework) {
    case "vite":
      s.start("Creating Vite project...");
      await createViteProject(appName.toString());
      s.stop("Vite project created!");
      s.start("Creating a sample component...");
      await sample(appName.toString());
      s.stop("Sample component created!");
      break;
  }
}

main().catch(console.error);
