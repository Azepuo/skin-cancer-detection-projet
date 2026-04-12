import { useEffect, useState } from "react";
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
import { analysisService } from "@/services/analysisService";
import { useAnalysisStore } from "@/store/analysisStore";
import { Link } from "react-router-dom";
import { Eye, Download, Trash2, BarChart3, Calendar } from "lucide-react";
import AnalysisModal from "@/components/AnalysisModal";
import { exportAnalysisPDF } from "@/utils/exportPDF";
import type { AnalysisHistoryItem } from "@/types";

export default function HistoryPage() {
  const {
    results: history,
    isLoading,
    error,
    fetchHistory,
    deleteAnalysis,
  } = useAnalysisStore();

  const [selectedAnalysis, setSelectedAnalysis] =
    useState<AnalysisHistoryItem | null>(null);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this analysis?")) {
      try {
        await deleteAnalysis(id);
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const handleDownload = (item: AnalysisHistoryItem) => {
    setSelectedAnalysis(item);
    setTimeout(() => {
      exportAnalysisPDF("modal-analysis-content", `analysis-${item.id}.pdf`);
    }, 100);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6 max-w-7xl">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Analysis History
              </h1>
              <p className="text-muted-foreground text-lg">
                Review and manage your past analyses
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin mb-4">
                <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
              </div>
              <p className="text-muted-foreground">
                Loading analysis history...
              </p>
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="border-destructive/20">
            <CardContent className="p-6">
              <p className="text-destructive font-medium">{error}</p>
            </CardContent>
          </Card>
        ) : history.length === 0 ? (
          <Card className="border-border/50">
            <CardContent className="p-12 text-center">
              <div className="p-3 rounded-lg bg-secondary/50 w-fit mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground font-medium mb-4">
                No analyses yet
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                Create your first analysis to get started
              </p>
              <Link to="/analysis">
                <Button className="bg-gradient-to-r from-primary to-accent">
                  Create First Analysis
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle>Your Analyses ({history.length})</CardTitle>
              <CardDescription>
                All of your medical-grade skin analyses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left p-4 font-semibold text-muted-foreground text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Date
                        </div>
                      </th>
                      <th className="text-left p-4 font-semibold text-muted-foreground text-sm">
                        Condition
                      </th>
                      <th className="text-left p-4 font-semibold text-muted-foreground text-sm">
                        Severity
                      </th>
                      <th className="text-left p-4 font-semibold text-muted-foreground text-sm">
                        Confidence
                      </th>
                      <th className="text-right p-4 font-semibold text-muted-foreground text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item, idx) => (
                      <tr
                        key={item.id}
                        className={`border-b border-border/30 hover:bg-secondary/40 transition-colors ${
                          idx === history.length - 1 ? "border-b-0" : ""
                        }`}
                      >
                        <td className="p-4 text-sm text-foreground">
                          <div className="flex flex-col gap-1">
                            <span className="font-medium">
                              {new Date(
                                item.createdAt || item.uploadedAt,
                              ).toLocaleDateString()}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(
                                item.createdAt || item.uploadedAt,
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-sm font-medium text-foreground">
                          {item.condition}
                        </td>
                        <td className="p-4">
                          <Badge
                            variant={
                              item.severity === "severe"
                                ? "destructive"
                                : item.severity === "moderate"
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            {item.severity}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-secondary rounded-full h-1.5">
                              <div
                                className="bg-primary h-1.5 rounded-full transition-all"
                                style={{ width: `${item.confidence * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold text-foreground w-12 text-right">
                              {Math.round(item.confidence * 100)}%
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex gap-1 justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedAnalysis(item)}
                              className="hover:bg-primary/10 hover:text-primary"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDownload(item)}
                              className="hover:bg-accent/10 hover:text-accent"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(item.id)}
                              className="hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {selectedAnalysis && (
        <AnalysisModal
          analysis={selectedAnalysis}
          onClose={() => setSelectedAnalysis(null)}
        />
      )}
    </Layout>
  );
}
