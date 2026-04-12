import { useState, useEffect } from "react";
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
import { useAnalysisStore } from "@/store/analysisStore";
import { analysisService } from "@/services/analysisService";
import { Link } from "react-router-dom";
import {
  Upload,
  TrendingUp,
  FileText,
  Clock,
  ArrowRight,
  Zap,
} from "lucide-react";

export default function DashboardPage() {
  const { results, isLoading, fetchHistory } = useAnalysisStore();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Safe access to history array
  const history = results || [];
  console.log("Dashboard History Data:", history);

  // Compute stats from results with safe guards
  const totalAnalyses = history.length;
  const avgConfidence =
    totalAnalyses > 0
      ? (history.reduce((sum, item) => {
          const confidence =
            item?.confidence ?? item?.analysis?.confidence ?? 0;
          return sum + confidence;
        }, 0) /
          totalAnalyses) *
        100
      : 0;

  const lastAnalysisItem = history.length > 0 ? history[0] : null;
  const lastAnalysisDate = lastAnalysisItem
    ? new Date(
        lastAnalysisItem.uploadedAt || lastAnalysisItem.createdAt || Date.now(),
      ).toLocaleDateString()
    : null;
  const lastAnalysisCondition = lastAnalysisItem
    ? lastAnalysisItem.prediction ||
      lastAnalysisItem.condition ||
      lastAnalysisItem.analysis?.condition ||
      "Unknown"
    : "No analysis yet";

  return (
    <Layout>
      <div className="p-6 space-y-8 max-w-7xl">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-lg">
            Welcome to your medical-grade skin analysis center
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-border/50 hover:border-border transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Analyses
                </CardTitle>
                <Zap className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {isLoading ? "..." : totalAnalyses}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Comprehensive assessments
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:border-border transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg Confidence
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {isLoading
                  ? "..."
                  : totalAnalyses > 0
                    ? `${Math.round(avgConfidence)}%`
                    : "—"}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Analysis accuracy rate
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 hover:border-border transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Last Analysis
                </CardTitle>
                <Clock className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {isLoading ? "..." : lastAnalysisItem ? "✓" : "—"}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {isLoading
                  ? "Loading..."
                  : lastAnalysisDate
                    ? `${lastAnalysisCondition} (${lastAnalysisDate})`
                    : "No analyses yet"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Upload className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">New Analysis</CardTitle>
                    <CardDescription>
                      Upload image for AI analysis
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link to="/analysis">
                <Button className="w-full group">
                  Start Analysis
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/20">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-base">View History</CardTitle>
                    <CardDescription>Review all analyses</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link to="/history">
                <Button variant="outline" className="w-full group">
                  Open History
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Analyses */}
        {history.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Analyses</CardTitle>
                  <CardDescription>
                    Your latest medical assessments
                  </CardDescription>
                </div>
                <Link to="/history">
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {history.slice(0, 3).map((result) => (
                  <Link key={result.id} to={`/analysis/${result.id}`}>
                    <div className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-secondary/40 transition-colors cursor-pointer group">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {result?.prediction ||
                            result?.condition ||
                            result?.analysis?.condition ||
                            "Unknown Assessment"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(
                            result?.uploadedAt ||
                              result?.createdAt ||
                              Date.now(),
                          ).toLocaleDateString()}{" "}
                          at{" "}
                          {new Date(
                            result?.uploadedAt ||
                              result?.createdAt ||
                              Date.now(),
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <Badge
                          variant={
                            (result?.analysis?.severity || result?.severity) ===
                            "severe"
                              ? "destructive"
                              : (result?.analysis?.severity ||
                                    result?.severity) === "moderate"
                                ? "secondary"
                                : "default"
                          }
                          className="shrink-0"
                        >
                          {result?.analysis?.severity ||
                            result?.severity ||
                            "Normal"}
                        </Badge>
                        <span className="text-sm font-semibold text-primary whitespace-nowrap">
                          {Math.round(
                            (result?.confidence ??
                              result?.analysis?.confidence ??
                              0) * 100,
                          )}
                          %
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
