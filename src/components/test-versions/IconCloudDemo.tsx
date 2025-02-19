import { IconCloud } from "./IconCloud";

const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

export function IconCloudDemo() {
  return (
    // <div className="flex w-full items-center justify-center">
    //   <div className="relative flex size-full max-w-lg items-center justify-center overflow-hidden rounded-lg border bg-background px-20 pb-20 pt-8">
    //     <IconCloud iconSlugs={slugs} />
    //   </div>
    // </div>

    //Entire screen width for my landing page:
    <div className="flex items-center justify-center w-screen h-screen bg-background overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <IconCloud iconSlugs={slugs} />
      </div>
    </div>
  );
}
