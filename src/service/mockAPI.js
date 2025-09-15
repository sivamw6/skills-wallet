/**
 * Mock API for Digital Skills Wallet PoC
 * Simulates backend + blockchain layer with in-memory storage
 * Implements the updated data model from UML diagram
 */

// Mock data stores
let assessments = []; // Assessment storage (legacy)
let exams = []; // Exam storage
let courses = []; // Course storage
let units = []; // Unit storage
let instructors = []; // Instructor storage
let credentials = []; // Issued credentials
let chainTx = []; // "Blockchain" transaction log

// Mock Assessment data
const mockQuestions = [
  {
    questionId: "q1",
    text: "What will be the output of the following Python code?\nprint(2 + 3 * 4)",
    options: ["14", "20", "11"],
    correctAnswer: "14",
  },
  {
    questionId: "q2",
    text: "Which Python data type is mutable?",
    options: ["string", "tuple", "list"],
    correctAnswer: "list",
  },
  {
    questionId: "q3",
    text: "What is the correct way to create a dictionary in Python?",
    options: [
      "dict = {key: value}",
      "dict = [key: value]",
      "dict = (key: value)",
    ],
    correctAnswer: "dict = {key: value}",
  },
];

// Initialize with default data
const defaultAssessment = {
  assessmentId: "assess_001",
  title: "Python Programming Assessment",
  questions: mockQuestions,
};
assessments.push(defaultAssessment);

// Initialize with default course structure
const defaultCourse = {
  courseId: "course_001",
  code: "CS101",
  title: "Introduction to Computer Science",
  description: "Basic computer science concepts and programming fundamentals",
  publicKey: "course_public_key_001",
};
courses.push(defaultCourse);

const defaultUnit = {
  unitId: "unit_001",
  courseId: "course_001",
  code: "CS101-01",
  title: "Python Programming Basics",
  description: "Introduction to Python programming language",
};
units.push(defaultUnit);

const defaultExam = {
  examId: "exam_001",
  unitId: "unit_001",
  code: "CS101-01-EXAM",
  title: "Python Programming Assessment",
  description: "Comprehensive Python programming skills assessment",
  publicKey: "exam_public_key_001",
  score: 100,
  questions: mockQuestions,
};
exams.push(defaultExam);

const defaultInstructor = {
  userId: "instructor_001",
  providerId: "provider_001",
  name: "Dr. Jane Smith",
  email: "jane.smith@university.edu",
  role: "instructor",
  publicKey: "instructor_public_key_001",
};
instructors.push(defaultInstructor);

// ========================================
// COURSE MANAGEMENT
// ========================================

export function createCourse(code, title, description, publicKey) {
  const courseId = "course_" + Date.now();
  const course = {
    courseId,
    code,
    title,
    description,
    publicKey,
  };
  courses.unshift(course);
  return course;
}

export function getCourse(courseId) {
  return courses.find((c) => c.courseId === courseId) || defaultCourse;
}

export function listCourses() {
  return courses;
}

// ========================================
// UNIT MANAGEMENT
// ========================================

export function createUnit(courseId, code, title, description) {
  const unitId = "unit_" + Date.now();
  const unit = {
    unitId,
    courseId,
    code,
    title,
    description,
  };
  units.unshift(unit);
  return unit;
}

export function getUnit(unitId) {
  return units.find((u) => u.unitId === unitId) || defaultUnit;
}

export function listUnits(courseId) {
  return courseId ? units.filter((u) => u.courseId === courseId) : units;
}

// ========================================
// EXAM MANAGEMENT
// ========================================

export function createExam(
  unitId,
  code,
  title,
  description,
  publicKey,
  score,
  questions
) {
  const examId = "exam_" + Date.now();
  const exam = {
    examId,
    unitId,
    code,
    title,
    description,
    publicKey,
    score,
    questions: questions || mockQuestions,
  };
  exams.unshift(exam);
  return exam;
}

export function getExam(examId) {
  return exams.find((e) => e.examId === examId) || defaultExam;
}

export function listExams(unitId) {
  return unitId ? exams.filter((e) => e.unitId === unitId) : exams;
}

// ========================================
// INSTRUCTOR MANAGEMENT
// ========================================

export function createInstructor(providerId, name, email, password, publicKey) {
  const userId = "instructor_" + Date.now();
  const instructor = {
    userId,
    providerId,
    name,
    email,
    password,
    role: "instructor",
    publicKey,
  };
  instructors.unshift(instructor);
  return instructor;
}

export function getInstructor(instructorId) {
  return (
    instructors.find((i) => i.userId === instructorId) || defaultInstructor
  );
}

export function listInstructors(providerId) {
  return providerId
    ? instructors.filter((i) => i.providerId === providerId)
    : instructors;
}

// ========================================
// ASSESSMENT MANAGEMENT (Legacy)
// ========================================

export function createAssessment(title, questions) {
  const assessmentId = "assess_" + Date.now();
  const assessment = {
    assessmentId,
    title,
    questions: questions || mockQuestions,
  };
  assessments.unshift(assessment);
  return assessment;
}

export function getAssessment(assessmentId) {
  return (
    assessments.find((a) => a.assessmentId === assessmentId) ||
    defaultAssessment
  );
}

export function listAssessments() {
  return assessments;
}

// ========================================
// EXAM EVALUATION
// ========================================

export function evaluateExam(examId, answers) {
  const exam = getExam(examId);
  let correctCount = 0;

  exam.questions.forEach((q, index) => {
    if (answers[index] && answers[index] === q.correctAnswer) {
      correctCount++;
    }
  });

  const score = Math.round((correctCount / exam.questions.length) * 100);
  return {
    score,
    maxScore: exam.score || 100,
    correctAnswers: correctCount,
    totalQuestions: exam.questions.length,
  };
}

// ========================================
// ASSESSMENT EVALUATION (Legacy)
// ========================================

export function evaluateAssessment(assessmentId, answers) {
  const assessment = getAssessment(assessmentId);
  let correctCount = 0;

  assessment.questions.forEach((q, index) => {
    if (answers[index] && answers[index] === q.correctAnswer) {
      correctCount++;
    }
  });

  const score = Math.round((correctCount / assessment.questions.length) * 100);
  return {
    score,
    maxScore: 100,
    correctAnswers: correctCount,
    totalQuestions: assessment.questions.length,
  };
}

// ========================================
// CREDENTIAL MANAGEMENT
// ========================================

export function issueCredential({
  studentId,
  studentName,
  assessmentId, // Legacy support
  examId, // New exam support
  score,
}) {
  const credentialId = "cred_" + Date.now();
  const txId =
    "0x" + Math.random().toString(16).slice(2) + Date.now().toString(16);

  const credential = {
    credentialId,
    studentId: studentId || "student_001",
    studentName: studentName || "Student A",
    assessmentId: assessmentId || examId || "assess_001", // Support both legacy and new
    examId: examId || null, // New field
    score,
    txId,
    timestamp: new Date().toISOString(),
  };

  credentials.unshift(credential);
  chainTx.unshift(credential);

  return { credentialId, txId, credential };
}

export function listCredentials() {
  return credentials;
}

export function getCredential(credentialId) {
  return credentials.find((c) => c.credentialId === credentialId);
}

/**
 * Blockchain Simulation
 */
export function listChainTx() {
  return chainTx;
}

export function getTransaction(txId) {
  return chainTx.find((tx) => tx.txId === txId);
}

// ========================================
// VERIFIER FUNCTIONS - Aligned with UML Model
// ========================================

export function verifyByTxId(txId) {
  const found = getTransaction(txId);
  if (!found) {
    return {
      valid: false,
      error: "Transaction not found or invalid",
    };
  }
  return {
    valid: true,
    credential: found,
  };
}

export function verifyByCredentialId(credentialId) {
  const found = getCredential(credentialId);
  if (!found) {
    return {
      valid: false,
      error: "Credential not found or invalid",
    };
  }
  return {
    valid: true,
    credential: found,
  };
}

/**
 * Get all credentials for a specific student
 * @param {string} studentId - The student's ID
 * @returns {Object} - Result with student's credentials
 */
export function getStudentCredentials(studentId) {
  const studentCredentials = credentials.filter(
    (cred) => cred.studentId === studentId
  );

  if (studentCredentials.length === 0) {
    return {
      success: false,
      error: "No credentials found for this student",
      studentId,
      credentials: [],
    };
  }

  // Get student name from first credential
  const studentName = studentCredentials[0]?.studentName || "Unknown Student";

  return {
    success: true,
    studentId,
    studentName,
    credentials: studentCredentials,
    totalCredentials: studentCredentials.length,
    passedCredentials: studentCredentials.filter((cred) => cred.score >= 70)
      .length,
    averageScore: Math.round(
      studentCredentials.reduce((sum, cred) => sum + cred.score, 0) /
        studentCredentials.length
    ),
  };
}

/**
 * Verify a specific credential by its token/transaction ID
 * @param {string} tokenId - The transaction ID or credential ID
 * @returns {Object} - Verification result
 */
export function verifyCredentialToken(tokenId) {
  // Try to find by transaction ID first
  let credential = getTransaction(tokenId);

  // If not found by transaction ID, try credential ID
  if (!credential) {
    credential = getCredential(tokenId);
  }

  if (!credential) {
    return {
      valid: false,
      error: "Credential token not found or invalid",
      tokenId,
    };
  }

  return {
    valid: true,
    credential,
    tokenId,
    verificationDate: new Date().toISOString(),
  };
}
