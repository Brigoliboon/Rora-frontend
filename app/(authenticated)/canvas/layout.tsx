import { CanvasProvider } from "@/provider/CanvasProvider";

export default function CanvasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CanvasProvider>
      {children}
    </CanvasProvider>
  );
}
