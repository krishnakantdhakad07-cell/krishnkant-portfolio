"use client";

import dynamic from "next/dynamic";
import React, { useCallback, useEffect, useState } from "react";
import CursorGlow from "./CursorGlow";
import Preloader from "./Preloader";
import CyberActionDock from "./CyberActionDock";
import LiveTerminalModal from "./LiveTerminalModal";

const CyberBackground = dynamic(() => import("./CyberBackground"), { ssr: false });

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [, setBooted] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const handleDone = useCallback(() => setBooted(true), []);

  const openTerminal = useCallback(() => setTerminalOpen(true), []);
  const closeTerminal = useCallback(() => setTerminalOpen(false), []);

  // Global hotkey: Ctrl + ` or Ctrl + K opens the developer terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "`" || e.key === "k")) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setTerminalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#02040c]">
      <Preloader onDone={handleDone} />
      <CyberBackground />
      <CursorGlow />

      {/* Floating Action Sci-Fi Dock at bottom right */}
      <CyberActionDock onOpenTerminal={openTerminal} />

      {/* Interactive Developer CMD Modal */}
      <LiveTerminalModal isOpen={terminalOpen} onClose={closeTerminal} />

      <div className="relative z-10 w-full">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && typeof child.type !== "string") {
            return React.cloneElement(child as React.ReactElement<{ onOpenTerminal?: () => void }>, {
              onOpenTerminal: openTerminal,
            });
          }
          return child;
        })}
      </div>
    </div>
  );
}
