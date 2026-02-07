// hooks/useCanvas.ts
'use client'
import { useContext } from "react";
import { CanvasContext } from "@/provider/CanvasProvider";

export function useCanvas() {
  const context = useContext(CanvasContext);

  if (!context) {
    throw new Error("useCanvas must be used inside CanvasProvider");
  }

  return context;
}
