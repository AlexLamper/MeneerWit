"use client";

import { useState, useEffect } from "react";
import { Maximize } from "lucide-react";

interface DocumentWithFullscreen extends Document {
  webkitFullscreenEnabled?: boolean;
  webkitFullscreenElement?: Element;
}

interface HTMLElementWithFullscreen extends HTMLElement {
  webkitRequestFullscreen?: () => Promise<void>;
}

export function FullscreenPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if user has already visited or dismissed
    const hasVisited = localStorage.getItem("meneerwit_visited");
    const doc = document as DocumentWithFullscreen;
    const isFullscreen = !!doc.fullscreenElement || !!doc.webkitFullscreenElement;
    const isSupported = doc.fullscreenEnabled || doc.webkitFullscreenEnabled;
    
    if (!hasVisited && !isFullscreen && isSupported) {
      const rafId = requestAnimationFrame(() => {
        setShowPrompt(true);
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, []);

  const handleEnableFullscreen = async () => {
    try {
      const docEl = document.documentElement as HTMLElementWithFullscreen;
      if (docEl.requestFullscreen) {
        await docEl.requestFullscreen();
      } else if (docEl.webkitRequestFullscreen) {
        await docEl.webkitRequestFullscreen();
      }
      setShowPrompt(false);
      localStorage.setItem("meneerwit_visited", "true");
    } catch (err) {
      console.error("Error enabling fullscreen:", err);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("meneerwit_visited", "true");
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-100 flex items-center justify-center p-6 animate-fade-in">
      <div className="bg-card text-card-foreground rounded-4xl p-8 max-w-sm w-full text-center shadow-2xl border border-border">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 text-primary-foreground">
          <Maximize className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Volledig Scherm?</h3>
        <p className="text-muted-foreground mb-8">
          Voor de beste ervaring raden we aan om in volledig scherm te spelen.
        </p>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={handleEnableFullscreen}
            className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg active:scale-95 transition-all shadow-lg"
          >
            Ja, volledig scherm
          </button>
          <button 
            onClick={handleDismiss}
            className="w-full py-4 bg-secondary text-secondary-foreground rounded-2xl font-bold text-lg active:scale-95 transition-all"
          >
            Nee, bedankt
          </button>
        </div>
      </div>
    </div>
  );
}
