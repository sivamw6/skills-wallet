/**
 * Mock API for Digital Skills Wallet PoC
 * Simulates backend + blockchain layer with in-memory storage
 * Implements the updated data model from UML diagram
 */

// Mock data stores
let exams = []; // Exam storage
let subjects = []; // Subject storage
let subjectClasses = []; // Subject class storage
let instructors = []; // Instructor storage
let credentials = []; // Issued credentials
let chainTx = []; // "Blockchain" transaction log

// Mock Exam data
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
const defaultExam = {
  examId: "exam_001",
  title: "Python Programming Exam",
  description: "Test your Python programming skills with practical questions",
  questions: mockQuestions,
  totalQuestions: mockQuestions.length,
  timeLimit: 1800, // 30 minutes
  difficulty: "intermediate",
  skills: ["Python Basics", "Data Structures"],
  createdBy: "instructor_001",
  createdAt: new Date().toISOString(),
};
exams.push(defaultExam);

// Add more sample exams
const sampleExams = [
  {
    examId: "exam_002",
    title: "Web Development Fundamentals",
    description: "Comprehensive exam covering HTML, CSS, and JavaScript basics",
    questions: [
      {
        questionId: "web_q1",
        text: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High-level Text Machine Language",
          "Hyperlink and Text Markup Language",
        ],
        correctAnswer: "Hyper Text Markup Language",
      },
      {
        questionId: "web_q2",
        text: "Which CSS property is used to change the text color?",
        options: ["background-color", "font-color", "color"],
        correctAnswer: "color",
      },
    ],
    totalQuestions: 2,
    timeLimit: 1200, // 20 minutes
    difficulty: "beginner",
    skills: ["HTML Basics", "CSS Basics"],
    createdBy: "instructor_001",
    createdAt: new Date().toISOString(),
  },
  {
    examId: "exam_003",
    title: "Data Science Advanced",
    description: "Advanced exam for data science professionals",
    questions: [
      {
        questionId: "ds_q1",
        text: "Which Python library is best for data manipulation?",
        options: ["NumPy", "Pandas", "Matplotlib"],
        correctAnswer: "Pandas",
      },
    ],
    totalQuestions: 1,
    timeLimit: 2400, // 40 minutes
    difficulty: "advanced",
    skills: ["Data Analysis", "Machine Learning"],
    createdBy: "instructor_002",
    createdAt: new Date().toISOString(),
  },
];
exams.push(...sampleExams);

// Initialize with default subject structure
const defaultSubject = {
  subjectId: "subject_001",
  code: "SUB101",
  title: "Introduction to Computer Science",
  description: "Basic computer science concepts and programming fundamentals",
  publicKey: "subject_public_key_001",
};
subjects.push(defaultSubject);

const defaultSubjectClass = {
  subjectClassId: "subjectClass_001",
  subjectId: "subject_001",
  code: "SUB101-01",
  title: "Python Programming Basics",
  description: "Introduction to Python programming language",
};
subjectClasses.push(defaultSubjectClass);

const defaultExamRecord = {
  examId: "exam_004",
  subjectClassId: "subjectClass_001",
  code: "SUB101-01-EXAM",
  title: "Python Programming Exam",
  description: "Comprehensive Python programming skills exam",
  publicKey: "exam_public_key_001",
  score: 100,
  questions: mockQuestions,
};
exams.push(defaultExamRecord);

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
// SUBJECT MANAGEMENT
// ========================================

export function createSubject(code, title, description, publicKey) {
  const subjectId = "subject_" + Date.now();
  const subject = {
    subjectId,
    code,
    title,
    description,
    publicKey,
  };
  subjects.unshift(subject);
  return subject;
}

export function getSubject(subjectId) {
  return subjects.find((s) => s.subjectId === subjectId) || defaultSubject;
}

export function listSubjects() {
  return subjects;
}

// ========================================
// SUBJECT CLASS MANAGEMENT
// ========================================

export function createSubjectClass(subjectId, code, title, description) {
  const subjectClassId = "subjectClass_" + Date.now();
  const subjectClass = {
    subjectClassId,
    subjectId,
    code,
    title,
    description,
  };
  subjectClasses.unshift(subjectClass);
  return subjectClass;
}

export function getSubjectClass(subjectClassId) {
  return (
    subjectClasses.find((sc) => sc.subjectClassId === subjectClassId) ||
    defaultSubjectClass
  );
}

export function listSubjectClasses(subjectId) {
  return subjectId
    ? subjectClasses.filter((sc) => sc.subjectId === subjectId)
    : subjectClasses;
}

// ========================================
// EXAM MANAGEMENT
// ========================================

export function createExam(
  subjectClassId,
  code,
  title,
  description,
  publicKey,
  score,
  questions,
  metadata = {}
) {
  const examId = "exam_" + Date.now();
  const exam = {
    examId,
    subjectClassId,
    code,
    title,
    description,
    publicKey,
    score,
    questions: questions || mockQuestions,
    totalQuestions: (questions || mockQuestions).length,
    timeLimit: 1800, // 30 minutes default
    difficulty: metadata.difficulty || "intermediate",
    skills: metadata.skillSet ? [metadata.skillSet] : [],
    createdBy: "instructor_001",
    createdAt: new Date().toISOString(),
    status: "active",
  };
  exams.unshift(exam);
  return exam;
}

export function getExam(examId) {
  return exams.find((e) => e.examId === examId) || defaultExam;
}

export function listExamsBySubjectClass(subjectClassId) {
  return subjectClassId
    ? exams.filter((e) => e.subjectClassId === subjectClassId)
    : exams;
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
// EXAM MANAGEMENT (Legacy)
// ========================================

export function listExams() {
  return exams;
}

export function getAvailableExams() {
  return exams.filter((exam) => {
    // Filter exams that are available for students to take
    // In a real system, this might check enrollment, prerequisites, etc.
    return exam.createdBy && exam.questions && exam.questions.length > 0;
  });
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
// CREDENTIAL MANAGEMENT
// ========================================

export function issueCredential({ studentId, studentName, examId, score }) {
  const credentialId = "cred_" + Date.now();
  const txId =
    "0x" + Math.random().toString(16).slice(2) + Date.now().toString(16);

  const credential = {
    credentialId,
    studentId: studentId || "student_001",
    studentName: studentName || "Student A",
    examId: examId || "exam_001",
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
