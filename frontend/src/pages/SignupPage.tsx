import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { AlertCircle, Loader2, Stethoscope, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!username || !email || !password || !confirmPassword) {
        throw new Error("Please fill in all fields");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      const response = await authService.signup({ username, email, password })
      // Backend returns TokenData which has access_token and user
      // We need to map it to what our login store expects (token, user)
      if (response) {
        // Based on backend schemas: { access_token, user }
        login(response.access_token, response.user)
        navigate('/dashboard')
      }
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary via-primary/50 to-background p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <Card className="w-full max-w-md relative shadow-2xl glass">
        <CardHeader className="space-y-4 pb-6 border-b border-white/10">
          <div className="flex justify-center">
            <div className="p-3 rounded-xl bg-accent/20 backdrop-blur">
              <Stethoscope className="h-8 w-8 text-accent" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-3xl font-serif font-bold italic text-foreground">
              Dermascan
            </CardTitle>
            <CardDescription className="text-base text-foreground/70">
              Medical-grade analysis
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert
                variant="destructive"
                className="bg-destructive/10 border-destructive/30"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Username
              </label>
              <Input
                type="text"
                placeholder="janesmith"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="glass border-white/20 bg-white/5 text-foreground placeholder:text-foreground/40"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Email
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="glass border-white/20 bg-white/5 text-foreground placeholder:text-foreground/40"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="glass border-white/20 bg-white/5 text-foreground placeholder:text-foreground/40"
              />
              <p className="text-xs text-foreground/60">
                At least 8 characters
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">
                Confirm password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
                className="glass border-white/20 bg-white/5 text-foreground placeholder:text-foreground/40"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-10 bg-accent hover:bg-accent/90 text-primary font-semibold transition-all shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Create account
                </>
              )}
            </Button>

            <div className="text-center text-sm pt-2">
              <span className="text-foreground/70">
                Already have an account?{" "}
              </span>
              <Link
                to="/login"
                className="text-accent hover:underline font-semibold"
              >
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
