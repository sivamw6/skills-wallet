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

  createAssessment(title, questions) {
    // Create assessment logic
    return { success: true, assessment: { title, questions } };
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
// COURSE STRUCTURE CLASSES
// ========================================

/**
 * Course class
 */
export class Course {
  constructor(courseId, code, title, description, publicKey) {
    this.courseId = courseId;
    this.code = code;
    this.title = title;
    this.description = description;
    this.publicKey = publicKey;
  }
}

/**
 * Unit class
 */
export class Unit {
  constructor(unitId, courseId, code, title, description) {
    this.unitId = unitId;
    this.courseId = courseId;
    this.code = code;
    this.title = title;
    this.description = description;
  }
}

/**
 * Exam class (replaces Assessment)
 */
export class Exam {
  constructor(
    examId,
    unitId,
    code,
    title,
    description,
    publicKey,
    score,
    questions
  ) {
    this.examId = examId;
    this.unitId = unitId;
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
  constructor(credentialId, studentId, assessmentId, score, txId, timestamp) {
    this.credentialId = credentialId;
    this.studentId = studentId;
    this.assessmentId = assessmentId; // Note: keeping as assessmentId for backward compatibility
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
 * Create a new course structure
 */
export function createCourseStructure(courseData, unitsData, examsData) {
  const course = new Course(
    courseData.courseId,
    courseData.code,
    courseData.title,
    courseData.description,
    courseData.publicKey
  );

  const units = unitsData.map(
    (unitData) =>
      new Unit(
        unitData.unitId,
        course.courseId,
        unitData.code,
        unitData.title,
        unitData.description
      )
  );

  const exams = examsData.map(
    (examData) =>
      new Exam(
        examData.examId,
        examData.unitId,
        examData.code,
        examData.title,
        examData.description,
        examData.publicKey,
        examData.score,
        examData.questions
      )
  );

  return { course, units, exams };
}
