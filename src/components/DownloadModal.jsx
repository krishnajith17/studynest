import React, { useEffect, useState } from "react";
import { 
  CheckCircle2, 
  FileDown, 
  Sparkles, 
  X, 
  Clock, 
  Layers 
} from "lucide-react";

export default function DownloadModal({
  downloadState, // { course, partName }
  onClose,
  onComplete
}) {
  const [stage, setStage] = useState("verifying"); // verifying -> compiling -> ready
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    if (!downloadState) return;

    setStage("verifying");
    setProgress(25);

    const t1 = setTimeout(() => {
      setStage("compiling");
      setProgress(70);
    }, 450);

    const t2 = setTimeout(() => {
      setStage("ready");
      setProgress(100);
      onComplete(downloadState.course, downloadState.partName);
    }, 1200);

    const t3 = setTimeout(() => {
      onClose();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [downloadState]);

  if (!downloadState) return null;

  const { course, partName } = downloadState;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "460px", textAlign: "center" }}
      >
        <div className="download-stage-wrap">
          {stage === "verifying" && (
            <>
              <div className="stage-icon-spinner">
                <Clock size={28} color="var(--accent-primary)" />
              </div>
              <h3 className="stage-title">Verifying Module Data</h3>
              <p className="stage-desc">
                Locating syllabus specifications for <strong>{course.code}</strong>...
              </p>
            </>
          )}

          {stage === "compiling" && (
            <>
              <div className="stage-icon-spinner" style={{ animationDuration: "1.2s", borderColor: "var(--accent-secondary)" }}>
                <Layers size={28} color="var(--accent-secondary)" />
              </div>
              <h3 className="stage-title">Compiling Study Document</h3>
              <p className="stage-desc">
                Formatting academic notes & references for <strong>{partName || "Full Syllabus"}</strong>...
              </p>
            </>
          )}

          {stage === "ready" && (
            <>
              <div style={{ 
                width: "4rem", 
                height: "4rem", 
                margin: "0 auto 1.5rem", 
                borderRadius: "var(--radius-full)", 
                background: "rgba(16, 185, 129, 0.15)",
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center"
              }}>
                <CheckCircle2 size={36} color="#10b981" />
              </div>
              <h3 className="stage-title">Ready for Study!</h3>
              <p className="stage-desc" style={{ color: "var(--accent-success)", fontWeight: 500 }}>
                PDF generated successfully. Check your browser downloads!
              </p>
            </>
          )}

          {/* Progress bar */}
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
