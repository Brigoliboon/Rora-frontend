"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// ⬇️ client-only import (NO SSR)
const Florence = dynamic(
  () => import("@freesewing/florence"),
  { ssr: false }
);

export default function PatternClient() {
  const [svg, setSvg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function renderPattern() {
      // minimal valid measurements (example)
      const measurements = {
        bust: 90,
        waist: 70,
        hip: 95,
      };

      const Pattern = Florence as any;
      const pattern = new Pattern({ measurements });

      const svg = pattern.render();

      setSvg(svg);
      setLoading(false);
    }

    renderPattern();
  }, []);

  if (loading) return <p>Rendering pattern…</p>;

  return (
    <div
      className="mt-4"
      dangerouslySetInnerHTML={{ __html: svg! }}
    />
  );
}
