import type { ReactFlowInstance } from "@xyflow/react";
import { atom } from "jotai";

export const EditorAtom = atom<ReactFlowInstance | null>(null);
