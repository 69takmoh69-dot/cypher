export type MissionStep = {
  title: string;
  description: string;
};

export type Mission = {
  id: string;
  name: string;
  description: string;
  steps: MissionStep[];
};

export const missions: Mission[] = [
  {
    id: "first-content-package",
    name: "Ship your first content package",
    description: "Go from a blank page to a posted piece of content in four guided steps.",
    steps: [
      { title: "Pick a Studio", description: "Choose the Studio that matches the content you want to make." },
      { title: "Fill the brief", description: "Give it a clear, specific premise — specificity beats length." },
      { title: "Generate & review", description: "Read the output critically. Regenerate if the hook doesn't earn attention." },
      { title: "Export & post", description: "Copy the script and caption, then publish on your target platform." },
    ],
  },
  {
    id: "build-a-content-system",
    name: "Build a repeatable content system",
    description: "Turn one winning Studio into a weekly content pipeline.",
    steps: [
      { title: "Find your winner", description: "Identify which Studio and format has performed best so far." },
      { title: "Batch five briefs", description: "Write five short briefs varying only the premise, not the format." },
      { title: "Generate the batch", description: "Run all five through the same Studio in one sitting." },
      { title: "Schedule the week", description: "Spread the five outputs across your posting calendar." },
    ],
  },
  {
    id: "unlock-and-explore",
    name: "Unlock full membership",
    description: "Get access to every Premium Studio and the full Skills Library.",
    steps: [
      { title: "Get a code", description: "Obtain a CYPHER-XXXXXXXX unlock code." },
      { title: "Redeem it", description: "Open the Unlock modal from the header and enter the code." },
      { title: "Explore Premium Studios", description: "Try a Studio that was previously locked." },
    ],
  },
];
