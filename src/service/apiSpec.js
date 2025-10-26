/**
 * API Specification for Digital Skills Wallet
 * Aligned with updated UML Class Diagram
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
    // Additional fields based on role
    educationProviderId: "provider_001",
    email: "admin@university.edu",
    description: "University Education Provider",
  },
};

// ========================================
// EDUCATION PROVIDER ENDPOINTS
// ========================================

/**
 * POST /providers/subjects
 * Create a new subject
 */
const createSubjectPayload = {
  code: "CS101",
  title: "Introduction to Computer Science",
  description: "Basic computer science concepts and programming fundamentals",
  publicKey: "subject_public_key_here",
};

const createSubjectResponse = {
  success: true,
  subject: {
    subjectId: "subject_001",
    code: "CS101",
    title: "Introduction to Computer Science",
    description: "Basic computer science concepts and programming fundamentals",
    publicKey: "subject_public_key_here",
  },
};

/**
 * POST /providers/subjects/{subjectId}/classes
 * Create a new class within a subject
 */
const createSubjectClassPayload = {
  code: "CS101-01",
  title: "Python Programming Basics",
  description: "Introduction to Python programming language",
};

const createSubjectClassResponse = {
  success: true,
  subjectClass: {
    subjectClassId: "subjectClass_001",
    subjectId: "subject_001",
    code: "CS101-01",
    title: "Python Programming Basics",
    description: "Introduction to Python programming language",
  },
};

/**
 * POST /providers/classes/{classId}/exams
 * Create a new exam within a class
 */
const createExamPayloadV2 = {
  code: "CS101-01-EXAM",
  title: "Python Programming Exam",
  description: "Comprehensive Python programming skills exam",
  publicKey: "exam_public_key_here",
  score: 100,
  questions: [
    {
      questionId: "q1",
      text: "What will be the output of the following Python code?\nprint(2 + 3 * 4)",
      options: ["14", "20", "11"],
      correctAnswer: "14",
    },
  ],
};

const createExamResponseV2 = {
  success: true,
  exam: {
    examId: "exam_001",
    subjectClassId: "subjectClass_001",
    code: "CS101-01-EXAM",
    title: "Python Programming Exam",
    description: "Comprehensive Python programming skills exam",
    publicKey: "exam_public_key_here",
    score: 100,
    questions: [
      {
        questionId: "q1",
        text: "What will be the output of the following Python code?\nprint(2 + 3 * 4)",
        options: ["14", "20", "11"],
        correctAnswer: "14",
      },
    ],
  },
};

/**
 * POST /providers/credentials
 * Issue a credential after exam
 */
const issueCredentialPayload = {
  studentId: "student_001",
  studentName: "John Doe",
  examId: "exam_002",
  score: 85,
};

const issueCredentialResponse = {
  success: true,
  credential: {
    credentialId: "cred_003",
    studentId: "student_001",
    studentName: "John Doe",
    examId: "exam_002",
    score: 85,
    txId: "0x123abc456def",
    timestamp: "2024-01-15T10:30:00Z",
  },
};

// ========================================
// EXAM ENDPOINTS
// ========================================

/**
 * GET /exams/{examId}
 * Get exam details
 */
const getExamResponse = {
  success: true,
  exam: {
    examId: "exam_002",
    title: "Advanced Programming Exam",
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
 * POST /exams/{examId}/evaluate
 * Evaluate student answers
 */
const evaluateExamPayload = {
  studentId: "student_001",
  answers: [
    {
      questionId: "q1",
      selectedAnswer: "O(log n)",
    },
  ],
};

const evaluateExamResponse = {
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
    examId: "exam_002",
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
    examId: "exam_002",
    score: 85,
    txId: "0x123abc456def",
    timestamp: "2024-01-15T10:30:00Z",
  },
};

/**
 * GET /verifiers/students/{studentId}/credentials
 * Get all credentials for a specific student
 */
const getStudentCredentialsResponse = {
  success: true,
  studentId: "student_001",
  studentName: "John Doe",
  totalCredentials: 3,
  passedCredentials: 2,
  averageScore: 78,
  credentials: [
    {
      credentialId: "cred_001",
      studentId: "student_001",
      studentName: "John Doe",
      examId: "exam_001",
      score: 85,
      txId: "0x123abc456def",
      timestamp: "2024-01-15T10:30:00Z",
    },
    {
      credentialId: "cred_002",
      studentId: "student_001",
      studentName: "John Doe",
      examId: "exam_002",
      score: 72,
      txId: "0x456def789ghi",
      timestamp: "2024-01-16T14:20:00Z",
    },
    {
      credentialId: "cred_003",
      studentId: "student_001",
      studentName: "John Doe",
      examId: "exam_003",
      score: 65,
      txId: "0x789ghi012jkl",
      timestamp: "2024-01-17T09:15:00Z",
    },
  ],
};

/**
 * POST /verifiers/verify/token
 * Verify a specific credential token (Transaction ID or Credential ID)
 */
const verifyTokenPayload = {
  tokenId: "0x123abc456def", // Can be Transaction ID or Credential ID
};

const verifyTokenResponse = {
  success: true,
  valid: true,
  credential: {
    credentialId: "cred_003",
    studentId: "student_001",
    studentName: "John Doe",
    examId: "exam_002",
    score: 85,
    txId: "0x123abc456def",
    timestamp: "2024-01-15T10:30:00Z",
  },
  tokenId: "0x123abc456def",
  verificationDate: "2024-01-18T16:45:00Z",
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
// INSTRUCTOR ENDPOINTS
// ========================================

/**
 * POST /providers/{providerId}/instructors
 * Create a new instructor
 */
const createInstructorPayload = {
  name: "Dr. Jane Smith",
  email: "jane.smith@university.edu",
  password: "instructor123",
  publicKey: "instructor_public_key_here",
};

const createInstructorResponse = {
  success: true,
  instructor: {
    userId: "instructor_001",
    providerId: "provider_001",
    name: "Dr. Jane Smith",
    email: "jane.smith@university.edu",
    role: "instructor",
    publicKey: "instructor_public_key_here",
  },
};

/**
 * GET /instructors/{instructorId}/exams
 * Get exams assigned to instructor
 */
const instructorExamsResponse = {
  success: true,
  exams: [
    {
      examId: "exam_001",
      title: "Python Programming Exam",
      subjectClassId: "subjectClass_001",
      assignedBy: "provider_001",
      dueDate: "2024-01-20T23:59:59Z",
    },
  ],
};

export {
  // Authentication
  loginPayload,
  loginResponse,

  // Education Provider - Subjects
  createSubjectPayload,
  createSubjectResponse,
  createSubjectClassPayload,
  createSubjectClassResponse,
  createExamPayloadV2 as createExamPayload,
  createExamResponseV2 as createExamResponse,

  // Education Provider - Credentials
  issueCredentialPayload,
  issueCredentialResponse,

  // Exam
  getExamResponse,
  evaluateExamPayload,
  evaluateExamResponse,

  // Verifier
  verifyCredentialPayload,
  verifyCredentialResponse,
  verifyTransactionPayload,
  verifyTransactionResponse,
  getStudentCredentialsResponse,
  verifyTokenPayload,
  verifyTokenResponse,

  // Blockchain
  getTransactionResponse,
  listTransactionsResponse,

  // Instructor
  createInstructorPayload,
  createInstructorResponse,
  instructorExamsResponse,
};
