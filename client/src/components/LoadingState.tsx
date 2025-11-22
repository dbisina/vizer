import { useEffect, useRef } from "react";

interface LoadingStateProps {
  type: "thinking" | "processing" | "saving";
  message?: string;
}

const loadingConfig = {
  thinking: {
    projectId: "yZB3TtpEVh8327Z4PCHA",
    defaultMessage: "AI is thinking..."
  },
  processing: {
    projectId: "Bzce9YyoTLV3KPU82Ruo",
    defaultMessage: "Processing your request..."
  },
  saving: {
    projectId: "NH3haqBnD24kY3mWo0mE",
    defaultMessage: "Saving your information..."
  }
};

export default function LoadingState({ type, message }: LoadingStateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = loadingConfig[type];

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      (function() {
        if (!window.UnicornStudio) {
          window.UnicornStudio = { isInitialized: false };
          var i = document.createElement("script");
          i.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.35/dist/unicornStudio.umd.js";
          i.onload = function() {
            if (!window.UnicornStudio.isInitialized) {
              UnicornStudio.init();
              window.UnicornStudio.isInitialized = true;
            }
          };
          (document.head || document.body).appendChild(i);
        }
      })();
    `;

    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (containerRef.current && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [type]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6">
      <div 
        ref={containerRef}
        className="relative overflow-hidden rounded-lg"
      >
        <div 
          data-us-project={config.projectId}
          style={{ 
            width: "min(100vw, 720px)", 
            height: "450px",
            maxWidth: "100%"
          }}
        />
      </div>
      <p className="text-lg font-medium text-muted-foreground animate-pulse">
        {message || config.defaultMessage}
      </p>
    </div>
  );
}
