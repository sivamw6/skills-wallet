/**
 * API Configuration
 * Switch between mock API and real backend API
 */

// Check if we should use mock API (fallback to mock if env var not set)
export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== "false";

// Backend API Base URL (set this in .env file)
// Should be: http://localhost:3000/api (with /api included)
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// API Endpoints Configuration
// Update these paths based on your backend routes
export const API_ENDPOINTS = {
  // Authentication
  providerLogin: "/auth/provider/login",
  verifierLogin: "/auth/verifier/login",
  logout: "/auth/logout",
  me: "/auth/me", // Get current user info

  // Admin (provider role with username "admin")
  createUser: "/admin/users",

  // Provider - Subjects
  listSubjects: "/provider/subjects",
  createSubject: "/provider/subjects",
  getSubject: "/provider/subjects",

  // Provider - Subject Classes
  listSubjectClasses: "/provider/subjects",
  createSubjectClass: "/provider/subjects",

  // Provider - Exams
  listExams: "/provider/exams",
  getExam: "/provider/exams",
  createExam: "/provider/subjects",
  availableExams: "/exams/available",
  evaluateExam: "/exams",

  // Provider - Credentials
  issueCredential: "/provider/credentials",
  listCredentials: "/provider/credentials",
  getCredential: "/provider/credentials",

  // Provider - Blockchain
  listTransactions: "/provider/blockchain/transactions",
  getTransaction: "/provider/blockchain/transactions",

  // Verifier - Verification
  verifyCredential: "/verify/credential",
  verifyTransaction: "/verify/transaction",
  verifyToken: "/verify/token",
  getStudentCredentials: "/verify/students",
};

// Session configuration
export const SESSION_CONFIG = {
  // Whether to use session cookies (true) or JWT tokens (false)
  useSessionCookies: true,

  // Cookie settings (if needed for CORS)
  credentials: "include",
};
