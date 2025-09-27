import { intro, select, spinner, text } from "@clack/prompts";
import { createViteProject, sample } from "./frameworks/vite";

intro("Welcome to Create Shad!");

const framework = await select({
  message: "Pick a project framework.",
  options: [
    { value: "vite", label: "Vite" },
    { value: "next", label: "Next.js" },
  ],
});

const appName = await text({
  message: "Enter your app name:",
  placeholder: "my-app",
  initialValue: "my-app",
});

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
  case "next":
    s.start("Creating Next.js project...");
    break;
}
