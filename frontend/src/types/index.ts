// Authentication types
export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  profileImage?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Analysis types
export interface AnalysisResult {
  id: string;
  userId: string;
  imageUrl: string;
  uploadedAt: string;
  analysis: {
    condition: string;
    severity: "mild" | "moderate" | "severe";
    confidence: number;
    recommendations: string[];
    description: string;
  };
  status: "pending" | "completed" | "failed";
}

export interface AnalysisHistoryItem {
  id: string;
  uploadedAt: string;
  createdAt?: string;
  condition: string;
  severity: "mild" | "moderate" | "severe";
  confidence: number;
  imageUrl: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  username: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  token_type?: string;
}
