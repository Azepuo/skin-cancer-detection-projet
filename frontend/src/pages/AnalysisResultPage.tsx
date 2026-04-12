import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { useAnalysisStore } from "@/store/analysisStore";
import { analysisService } from "@/services/analysisService";
import type { AnalysisResult } from "@/types";
import { exportAnalysisPDF } from "@/utils/exportPDF";
import {
  Download,
  Printer,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Lightbulb,
  Stethoscope,
} from "lucide-react";

export default function AnalysisResultPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { results, setCurrentResult } = useAnalysisStore();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      // First try to find in the local store
      const localResult = results.find((r) => r.id === id);
      if (localResult) {
        setResult(localResult);
        setCurrentResult(localResult);
        setIsLoading(false);
      } else {
        loadAnalysis(id);
      }
    }
  }, [id, results, setCurrentResult]);

  const loadAnalysis = async (analysisId: string) => {
    try {
      setIsLoading(true);
      const data = await analysisService.getAnalysis(analysisId);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to load analysis");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportPdf = async () => {
    if (!id) return;
    // Hide buttons for export, show print header
    const reportElement = document.getElementById("analysis-report");
    if (reportElement) {
      exportAnalysisPDF("analysis-report", `analysis-${id}.pdf`);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <div className="animate-spin">
            <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
          </div>
          <p className="text-muted-foreground">Loading analysis results...</p>
        </div>
      </Layout>
    );
  }

  if (error || !result) {
    return (
      <Layout>
        <div className="p-6 max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/history")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <Alert
            variant="destructive"
            className="bg-destructive/10 border-destructive/20"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error || "Analysis not found"}</AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Navigation & Actions */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-border/50 print:hidden">
          <Button
            variant="ghost"
            onClick={() => navigate("/history")}
            className="hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to History
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleExportPdf}
              className="hover:bg-primary/10"
            >
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button
              variant="outline"
              onClick={handlePrint}
              className="hover:bg-secondary"
            >
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>

        <div
          id="analysis-report"
          className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-border"
        >
          {/* Logo at the top for PDF/Print */}
          <div className="flex items-center gap-3 border-b-2 border-primary pb-6 mb-8">
            <div className="p-2 rounded-lg bg-primary/10">
              <Stethoscope className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary">Dermascan AI</h2>
              <p className="text-sm text-muted-foreground">
                Clinical Grade Analysis Report
              </p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-sm font-medium">Report ID: {result.id}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(result.uploadedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Page Title */}
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight">
              Analysis Results
            </h1>
            <p className="text-muted-foreground">
              Medical-grade skin condition assessment
            </p>
          </div>

          {/* Main Image */}
          <Card className="border-border/50 overflow-hidden">
            <CardContent className="p-0">
              <img
                src={result.imageUrl}
                alt="Analysis"
                className="w-full h-auto max-h-96 object-cover"
              />
            </CardContent>
          </Card>

          {/* Analysis Details Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">Diagnosis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Identified Condition
                  </p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {result.analysis.condition}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Severity Level
                  </p>
                  <Badge
                    variant={
                      result.analysis.severity === "severe"
                        ? "destructive"
                        : result.analysis.severity === "moderate"
                          ? "secondary"
                          : "default"
                    }
                    className="text-base px-3 py-1"
                  >
                    {result.analysis.severity.toUpperCase()}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Analysis Confidence
                  </p>
                  <div className="space-y-2">
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all"
                        style={{
                          width: `${result.analysis.confidence * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-sm font-semibold">
                      {Math.round(result.analysis.confidence * 100)}% Confidence
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">
                  Analysis Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Analysis Date & Time
                  </p>
                  <p className="font-medium text-foreground">
                    {new Date(result.uploadedAt).toLocaleDateString()} at{" "}
                    {new Date(result.uploadedAt).toLocaleTimeString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Analysis ID
                  </p>
                  <p className="text-xs font-mono bg-secondary/50 p-2 rounded border border-border/50">
                    {result.id}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Status</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <Badge className="bg-primary/20 text-primary border-0">
                      Completed
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Clinical Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">
                {result.analysis.description}
              </p>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-accent" />
                Clinical Recommendations
              </CardTitle>
              <CardDescription>
                Evidence-based suggestions for further evaluation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.analysis.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex gap-3">
                    <div className="p-1 rounded-full bg-primary/10 flex-shrink-0 mt-1">
                      <CheckCircle2 className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-foreground leading-relaxed">
                      {rec}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        {/* End of #analysis-report */}

        {/* Medical Disclaimer */}
        <Alert className="bg-accent/5 border-accent/20 print:hidden">
          <AlertCircle className="h-4 w-4 text-accent" />
          <AlertDescription className="text-foreground">
            <strong className="text-accent">Medical Disclaimer:</strong> This
            analysis is generated by AI and is for informational and educational
            purposes only. It should not be used as a substitute for
            professional medical advice, diagnosis, or treatment. Always consult
            with a licensed dermatologist or healthcare professional for proper
            diagnosis, treatment, and medical management of skin conditions.
          </AlertDescription>
        </Alert>
      </div>
    </Layout>
  );
}
