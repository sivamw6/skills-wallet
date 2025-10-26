/**
 * Type definitions for Digital Skills Wallet
 * Aligned with updated UML Class Diagram
 */

// ========================================
// BASE USER CLASS
// ========================================

/**
 * Base User class that all user types inherit from
 */
export class User {
  constructor(userId, name, password, role, publicKey) {
    this.userId = userId;
    this.name = name;
    this.password = password;
    this.role = role;
    this.publicKey = publicKey;
  }

  login() {
    // Login logic
    return { success: true, user: this };
  }

  logout() {
    // Logout logic
    return { success: true };
  }
}

// ========================================
// USER SUBCLASSES
// ========================================

/**
 * Education Provider class extending User
 */
export class EducationProvider extends User {
  constructor(
    userId,
    name,
    password,
    publicKey,
    educationProviderId,
    email,
    description
  ) {
    super(userId, name, password, "provider", publicKey);
    this.educationProviderId = educationProviderId;
    this.email = email;
    this.description = description;
  }

  createExam(title, questions) {
    // Create exam logic
    return { success: true, exam: { title, questions } };
  }

  issueCredential(studentId, result) {
    // Issue credential logic
    return { success: true, credential: { studentId, result } };
  }
}

/**
 * Verifier class extending User
 */
export class Verifier extends User {
  constructor(userId, name, password, publicKey) {
    super(userId, name, password, "verifier", publicKey);
  }

  verifyToken(walletId, knowledgeType, skill, score) {
    // Verify token logic
    return {
      valid: true,
      credential: { walletId, knowledgeType, skill, score },
    };
  }

  verifyCredential(credentialId) {
    // Verify credential logic
    return { valid: true, credential: { credentialId } };
  }
}

/**
 * Instructor class extending User
 */
export class Instructor extends User {
  constructor(userId, name, password, publicKey, providerId) {
    super(userId, name, password, "instructor", publicKey);
    this.providerId = providerId;
  }
}

// ========================================
// SUBJECT STRUCTURE CLASSES
// ========================================

/**
 * Subject class
 */
export class Subject {
  constructor(subjectId, code, title, description, publicKey) {
    this.subjectId = subjectId;
    this.code = code;
    this.title = title;
    this.description = description;
    this.publicKey = publicKey;
  }
}

/**
 * Subject class
 */
export class SubjectClass {
  constructor(subjectClassId, subjectId, code, title, description) {
    this.subjectClassId = subjectClassId;
    this.subjectId = subjectId;
    this.code = code;
    this.title = title;
    this.description = description;
  }
}

/**
 * Exam class
 */
export class Exam {
  constructor(
    examId,
    subjectClassId,
    code,
    title,
    description,
    publicKey,
    score,
    questions
  ) {
    this.examId = examId;
    this.subjectClassId = subjectClassId;
    this.code = code;
    this.title = title;
    this.description = description;
    this.publicKey = publicKey;
    this.score = score;
    this.questions = questions || [];
  }

  evaluate(answers) {
    // Evaluation logic
    let correctCount = 0;
    this.questions.forEach((q, index) => {
      if (answers[index] && answers[index] === q.correctAnswer) {
        correctCount++;
      }
    });
    return {
      score: Math.round((correctCount / this.questions.length) * 100),
      maxScore: 100,
      correctAnswers: correctCount,
      totalQuestions: this.questions.length,
    };
  }
}

/**
 * Question class
 */
export class Question {
  constructor(questionId, text, options, correctAnswer) {
    this.questionId = questionId;
    this.text = text;
    this.options = options;
    this.correctAnswer = correctAnswer;
  }
}

// ========================================
// CREDENTIAL AND BLOCKCHAIN CLASSES
// ========================================

/**
 * Credential class
 */
export class Credential {
  constructor(credentialId, studentId, examId, score, txId, timestamp) {
    this.credentialId = credentialId;
    this.studentId = studentId;
    this.examId = examId;
    this.score = score;
    this.txId = txId;
    this.timestamp = timestamp;
  }
}

/**
 * Blockchain class
 */
export class Blockchain {
  constructor() {
    this.transactions = [];
  }

  recordTransaction(credential) {
    this.transactions.push(credential);
    return { success: true, txId: credential.txId };
  }

  getTransaction(txId) {
    return this.transactions.find((tx) => tx.txId === txId);
  }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Create a new user based on role
 */
export function createUser(role, userData) {
  switch (role) {
    case "provider":
      return new EducationProvider(
        userData.userId,
        userData.name,
        userData.password,
        userData.publicKey,
        userData.educationProviderId,
        userData.email,
        userData.description
      );
    case "verifier":
      return new Verifier(
        userData.userId,
        userData.name,
        userData.password,
        userData.publicKey
      );
    case "instructor":
      return new Instructor(
        userData.userId,
        userData.name,
        userData.password,
        userData.publicKey,
        userData.providerId
      );
    default:
      return new User(
        userData.userId,
        userData.name,
        userData.password,
        userData.role,
        userData.publicKey
      );
  }
}

/**
 * Create a new subject structure
 */
export function createSubjectStructure(
  subjectData,
  subjectClassesData,
  examsData
) {
  const subject = new Subject(
    subjectData.subjectId,
    subjectData.code,
    subjectData.title,
    subjectData.description,
    subjectData.publicKey
  );

  const subjectClasses = subjectClassesData.map(
    (subjectClassData) =>
      new SubjectClass(
        subjectClassData.subjectClassId,
        subject.subjectId,
        subjectClassData.code,
        subjectClassData.title,
        subjectClassData.description
      )
  );

  const exams = examsData.map(
    (examData) =>
      new Exam(
        examData.examId,
        examData.subjectClassId,
        examData.code,
        examData.title,
        examData.description,
        examData.publicKey,
        examData.score,
        examData.questions
      )
  );

  return { subject, subjectClasses, exams };
}
