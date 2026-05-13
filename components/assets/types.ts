export type Slot =
  | { kind: "image"; src: string; alt: string; width?: number; height?: number }
  | { kind: "video"; src: string; poster?: string; alt: string; width?: number; height?: number };

export type AssetManifest<K extends string> = Record<K, Slot | null>;

export type ProjectId = "nowstudio" | "float" | "amway-india" | "bluestacks" | "6labs-ai" | "ai-native-workflow" | "gamification";

export const PROJECTS: ProjectId[] = ["nowstudio", "float", "amway-india", "bluestacks", "6labs-ai", "ai-native-workflow", "gamification"];
