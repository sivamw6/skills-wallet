/**
 * API Specification for Digital Skills Wallet
 * Aligned with UML Class Diagram
 */

// ========================================
// AUTHENTICATION ENDPOINTS
// ========================================

/**
 * POST /auth/login
 * User login for EducationProvider, Verifier, Instructor
 */
const loginPayload = {
  email: "admin@university.edu",
  password: "admin123",
  role: "provider", // "provider", "verifier", "instructor"
};

const loginResponse = {
  success: true,
  token: "jwt_token_here",
  user: {
    userId: "user_001",
    name: "Education Admin",
    role: "provider",
    publicKey: "public_key_here",
  },
};

// ========================================
// EDUCATION PROVIDER ENDPOINTS
// ========================================

/**
 * POST /providers/assessments
 * Create a new assessment
 */
const createAssessmentPayload = {
  title: "Advanced Programming Assessment",
  questions: [
    {
      questionId: "q1",
      text: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)"],
      correctAnswer: "O(log n)",
    },
  ],
};

const createAssessmentResponse = {
  success: true,
  assessment: {
    assessmentId: "assess_002",
    title: "Advanced Programming Assessment",
    questions: [
      {
        questionId: "q1",
        text: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)"],
        correctAnswer: "O(log n)",
      },
    ],
  },
};

/**
 * POST /providers/credentials
 * Issue a credential after assessment
 */
const issueCredentialPayload = {
  studentId: "student_001",
  studentName: "John Doe",
  assessmentId: "assess_002",
  score: 85,
};

const issueCredentialResponse = {
  success: true,
  credential: {
    credentialId: "cred_003",
    studentId: "student_001",
    studentName: "John Doe",
    assessmentId: "assess_002",
    score: 85,
    txId: "0x123abc456def",
    timestamp: "2024-01-15T10:30:00Z",
  },
};

// ========================================
// ASSESSMENT ENDPOINTS
// ========================================

/**
 * GET /assessments/{assessmentId}
 * Get assessment details
 */
const getAssessmentResponse = {
  success: true,
  assessment: {
    assessmentId: "assess_002",
    title: "Advanced Programming Assessment",
    questions: [
      {
        questionId: "q1",
        text: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)"],
        correctAnswer: "O(log n)",
      },
    ],
  },
};

/**
 * POST /assessments/{assessmentId}/evaluate
 * Evaluate student answers
 */
const evaluateAssessmentPayload = {
  studentId: "student_001",
  answers: [
    {
      questionId: "q1",
      selectedAnswer: "O(log n)",
    },
  ],
};

const evaluateAssessmentResponse = {
  success: true,
  result: {
    score: 100,
    maxScore: 100,
    correctAnswers: 1,
    totalQuestions: 1,
    passed: true,
  },
};

// ========================================
// VERIFIER ENDPOINTS
// ========================================

/**
 * POST /verifiers/verify/credential
 * Verify credential by credentialId
 */
const verifyCredentialPayload = {
  credentialId: "cred_003",
};

const verifyCredentialResponse = {
  success: true,
  valid: true,
  credential: {
    credentialId: "cred_003",
    studentId: "student_001",
    studentName: "John Doe",
    assessmentId: "assess_002",
    score: 85,
    txId: "0x123abc456def",
    timestamp: "2024-01-15T10:30:00Z",
  },
};

/**
 * POST /verifiers/verify/transaction
 * Verify credential by transaction ID
 */
const verifyTransactionPayload = {
  txId: "0x123abc456def",
};

const verifyTransactionResponse = {
  success: true,
  valid: true,
  credential: {
    credentialId: "cred_003",
    studentId: "student_001",
    studentName: "John Doe",
    assessmentId: "assess_002",
    score: 85,
    txId: "0x123abc456def",
    timestamp: "2024-01-15T10:30:00Z",
  },
};

// ========================================
// BLOCKCHAIN ENDPOINTS
// ========================================

/**
 * GET /blockchain/transactions/{txId}
 * Get transaction details from blockchain
 */
const getTransactionResponse = {
  success: true,
  transaction: {
    txId: "0x123abc456def",
    credentialId: "cred_003",
    blockNumber: 12345,
    timestamp: "2024-01-15T10:30:00Z",
    hash: "block_hash_here",
  },
};

/**
 * GET /blockchain/transactions
 * List all transactions (for provider dashboard)
 */
const listTransactionsResponse = {
  success: true,
  transactions: [
    {
      txId: "0x123abc456def",
      credentialId: "cred_003",
      studentName: "John Doe",
      score: 85,
      timestamp: "2024-01-15T10:30:00Z",
    },
  ],
};

// ========================================
// INSTRUCTOR ENDPOINTS (Future Extension)
// ========================================

/**
 * GET /instructors/{instructorId}/assessments
 * Get assessments assigned to instructor
 */
const instructorAssessmentsResponse = {
  success: true,
  assessments: [
    {
      assessmentId: "assess_002",
      title: "Advanced Programming Assessment",
      assignedBy: "provider_001",
      dueDate: "2024-01-20T23:59:59Z",
    },
  ],
};

export {
  // Authentication
  loginPayload,
  loginResponse,

  // Education Provider
  createAssessmentPayload,
  createAssessmentResponse,
  issueCredentialPayload,
  issueCredentialResponse,

  // Assessment
  getAssessmentResponse,
  evaluateAssessmentPayload,
  evaluateAssessmentResponse,

  // Verifier
  verifyCredentialPayload,
  verifyCredentialResponse,
  verifyTransactionPayload,
  verifyTransactionResponse,

  // Blockchain
  getTransactionResponse,
  listTransactionsResponse,

  // Instructor (Future)
  instructorAssessmentsResponse,
};
