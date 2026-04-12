import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  X,
  Download,
  Printer,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import type { AnalysisHistoryItem } from "@/types";
import { exportAnalysisPDF } from "@/utils/exportPDF";

interface AnalysisModalProps {
  analysis: AnalysisHistoryItem;
  onClose: () => void;
}

export default function AnalysisModal({
  analysis,
  onClose,
}: AnalysisModalProps) {
  const handleExport = () => {
    exportAnalysisPDF(
      `analysis-report-${analysis.id}`,
      `analysis-${analysis.id}.pdf`,
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 print:hidden">
      <div
        className="bg-background border border-border w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Analysis Details</h2>
              <p className="text-xs text-muted-foreground font-mono">
                ID: {analysis.id}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleExport}
              title="Export PDF"
            >
              <Download className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.print()}
              title="Print"
            >
              <Printer className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          className="flex-1 overflow-y-auto p-6 space-y-6"
          id={`analysis-report-${analysis.id}`}
        >
          {/* Print Only Header (Inside Modal for PDF Export) */}
          <div className="hidden print:flex items-center gap-3 border-b-2 border-primary pb-4 mb-4">
            <div className="p-1 rounded-lg bg-primary/10">
              <Stethoscope className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-primary">Dermascan AI</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image */}
            <div className="rounded-xl overflow-hidden border border-border aspect-square">
              <img
                src={analysis.imageUrl}
                alt="Skin lesion"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Core Stats */}
            <div className="space-y-4">
              <div>
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                  Condition
                </Label>
                <p className="text-2xl font-bold text-primary">
                  {analysis.condition}
                </p>
              </div>

              <div>
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                  Severity
                </Label>
                <div className="mt-1">
                  <Badge
                    variant={
                      analysis.severity === "severe"
                        ? "destructive"
                        : analysis.severity === "moderate"
                          ? "secondary"
                          : "default"
                    }
                    className="text-sm px-3 py-0.5"
                  >
                    {analysis.severity.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                  Confidence
                </Label>
                <div className="mt-2 space-y-1">
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${analysis.confidence * 100}%` }}
                    />
                  </div>
                  <p className="text-sm font-semibold">
                    {Math.round(analysis.confidence * 100)}% Match
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground text-xs uppercase tracking-wider">
                  Date
                </Label>
                <p className="text-sm font-medium">
                  {new Date(analysis.uploadedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Assessment Placeholder */}
          <Card className="border-primary/10 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-primary" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/80 leading-relaxed">
                The analysis indicates a {analysis.confidence * 100}%
                probability of {analysis.condition}. Please consult with a
                qualified dermatologist for a clinical diagnosis.
              </p>
            </CardContent>
          </Card>

          {/* Footer Disclaimer */}
          <div className="flex gap-3 p-4 rounded-xl bg-muted/50 border border-border">
            <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              This assessment is powered by deep learning and is intended for
              informational purposes. It does not constitute medical advice or a
              professional diagnosis.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border flex justify-end">
          <Button onClick={onClose} variant="secondary" className="px-8">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

// Sub-component for label consistency
function Label({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={className}>{children}</span>;
}
