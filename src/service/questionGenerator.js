/**
 * Intelligent Question Generator for Skills Wallet
 * Generates authentic, applied exams that measure practical skills
 * Implements model-based and topic-driven question generation
 */

// Question templates for different skill types
const questionTemplates = {
  programming: {
    codeAnalysis: {
      template:
        "Analyze the following code and identify the issue:\n\n```{language}\n{code}\n```\n\nWhat is the problem with this code?",
      options: ["{option1}", "{option2}", "{option3}", "{option4}"],
      correctAnswer: "{correctAnswer}",
      explanation: "{explanation}",
    },
    debugging: {
      template:
        "You are debugging a {context} application. The following error occurs:\n\n```\n{error}\n```\n\nWhat is the most likely cause?",
      options: ["{option1}", "{option2}", "{option3}", "{option4}"],
      correctAnswer: "{correctAnswer}",
      explanation: "{explanation}",
    },
    implementation: {
      template:
        "Implement a function that {requirement}. Choose the most efficient approach:",
      options: ["{option1}", "{option2}", "{option3}", "{option4}"],
      correctAnswer: "{correctAnswer}",
      explanation: "{explanation}",
    },
  },
  problemSolving: {
    algorithm: {
      template:
        "Given the following scenario: {scenario}\n\nWhat is the optimal algorithm to solve this problem?",
      options: ["{option1}", "{option2}", "{option3}", "{option4}"],
      correctAnswer: "{correctAnswer}",
      explanation: "{explanation}",
    },
    optimization: {
      template:
        "A {system} is experiencing performance issues. The current implementation has {currentIssue}. What would be the best optimization strategy?",
      options: ["{option1}", "{option2}", "{option3}", "{option4}"],
      correctAnswer: "{correctAnswer}",
      explanation: "{explanation}",
    },
  },
  practical: {
    realWorld: {
      template:
        "In a real-world scenario where {situation}, what would be the most appropriate solution?",
      options: ["{option1}", "{option2}", "{option3}", "{option4}"],
      correctAnswer: "{correctAnswer}",
      explanation: "{explanation}",
    },
    bestPractice: {
      template:
        "When {context}, which approach follows industry best practices?",
      options: ["{option1}", "{option2}", "{option3}", "{option4}"],
      correctAnswer: "{correctAnswer}",
      explanation: "{explanation}",
    },
  },
};

// Skill-specific data pools
const skillData = {
  python: {
    codeSnippets: [
      {
        code: "def calculate_average(numbers):\n    total = 0\n    for num in numbers:\n        total += num\n    return total / len(numbers)\n\nprint(calculate_average([1, 2, 3, 4, 5]))",
        issues: [
          "Division by zero error when list is empty",
          "Incorrect variable name",
          "Missing return statement",
          "Infinite loop",
        ],
        correctIssue: "Division by zero error when list is empty",
        explanation:
          "The function will raise a ZeroDivisionError when the input list is empty because len(numbers) would be 0.",
      },
      {
        code: "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nprint(fibonacci(10))",
        issues: [
          "Incorrect base case",
          "Inefficient recursive implementation",
          "Missing type checking",
          "Wrong mathematical formula",
        ],
        correctIssue: "Inefficient recursive implementation",
        explanation:
          "This recursive implementation has exponential time complexity O(2^n) and will be very slow for large values of n.",
      },
    ],
    errorMessages: [
      {
        error: "NameError: name 'x' is not defined",
        context: "Python script",
        causes: [
          "Variable used before declaration",
          "Typo in variable name",
          "Variable out of scope",
          "Missing import statement",
        ],
        correctCause: "Variable used before declaration",
        explanation:
          "The variable 'x' is being referenced before it has been assigned a value.",
      },
    ],
    requirements: [
      {
        requirement: "finds the largest number in a list",
        approaches: [
          "Use max() built-in function",
          "Sort the list and take the last element",
          "Use a loop to compare each element",
          "Use reduce() with a lambda function",
        ],
        correctApproach: "Use max() built-in function",
        explanation:
          "The max() function is the most efficient and readable way to find the largest number in a list.",
      },
    ],
  },
  javascript: {
    codeSnippets: [
      {
        code: "function getUserData(userId) {\n    fetch(`/api/users/${userId}`)\n        .then(response => response.json())\n        .then(data => console.log(data));\n}",
        issues: [
          "Missing error handling",
          "No return statement",
          "Incorrect API endpoint",
          "Missing authentication",
        ],
        correctIssue: "No return statement",
        explanation:
          "The function doesn't return the fetched data, making it impossible to use the result outside the function.",
      },
    ],
    errorMessages: [
      {
        error: "TypeError: Cannot read property 'length' of undefined",
        context: "JavaScript web application",
        causes: [
          "Trying to access property of undefined variable",
          "Missing null check",
          "Incorrect object structure",
          "Timing issue with async operations",
        ],
        correctCause: "Trying to access property of undefined variable",
        explanation:
          "The code is trying to access the 'length' property of a variable that is undefined.",
      },
    ],
  },
  dataStructures: {
    scenarios: [
      {
        scenario:
          "You need to store and retrieve student records where you frequently search by student ID",
        algorithms: [
          "Hash table (dictionary)",
          "Binary search tree",
          "Linked list",
          "Array with linear search",
        ],
        correctAlgorithm: "Hash table (dictionary)",
        explanation:
          "Hash tables provide O(1) average-case lookup time, making them ideal for frequent searches by key.",
      },
    ],
    optimizations: [
      {
        system: "web application",
        currentIssue: "O(n) search time in a large user database",
        strategies: [
          "Implement database indexing",
          "Use caching with Redis",
          "Add more server memory",
          "Reduce the number of users",
        ],
        correctStrategy: "Implement database indexing",
        explanation:
          "Database indexing creates a data structure that allows for faster data retrieval, reducing search time from O(n) to O(log n).",
      },
    ],
  },
};

// Real-world scenarios
const realWorldScenarios = {
  webDevelopment: [
    {
      situation:
        "a user reports that the website loads slowly on mobile devices",
      solutions: [
        "Implement responsive images and lazy loading",
        "Add more server resources",
        "Remove all images from the site",
        "Ask users to use desktop only",
      ],
      correctSolution: "Implement responsive images and lazy loading",
      explanation:
        "Responsive images and lazy loading are proven techniques to improve mobile performance without sacrificing functionality.",
    },
  ],
  softwareEngineering: [
    {
      situation:
        "working on a team project where multiple developers are modifying the same code files",
      solutions: [
        "Use version control with proper branching strategy",
        "Work on different files only",
        "Coordinate through email",
        "Work during different hours",
      ],
      correctSolution: "Use version control with proper branching strategy",
      explanation:
        "Version control systems like Git with branching strategies prevent conflicts and enable collaborative development.",
    },
  ],
};

/**
 * Generate intelligent questions based on skill type and difficulty
 */
export function generateQuestions(
  skillType,
  topic,
  _difficulty = "intermediate", // eslint-disable-line no-unused-vars
  count = 5
) {
  const questions = [];
  const templates =
    questionTemplates[skillType] || questionTemplates.programming;
  const data = skillData[topic] || skillData.python;

  for (let i = 0; i < count; i++) {
    const questionType = getRandomQuestionType(templates);
    const question = generateQuestion(questionType, data, topic);
    questions.push(question);
  }

  return questions;
}

/**
 * Generate a single question based on type and data
 */
function generateQuestion(questionType, data, topic) {
  const questionId = `q_${Date.now()}_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  // Determine question type based on template content
  const template = questionType.template || "";

  if (template.includes("Analyze the following")) {
    return generateCodeAnalysisQuestion(questionId, data, topic);
  } else if (template.includes("debugging")) {
    return generateDebuggingQuestion(questionId, data, topic);
  } else if (template.includes("Implement a function")) {
    return generateImplementationQuestion(questionId, data, topic);
  } else if (template.includes("Given the following scenario")) {
    return generateAlgorithmQuestion(questionId, data, topic);
  } else if (template.includes("experiencing performance issues")) {
    return generateOptimizationQuestion(questionId, data, topic);
  } else if (template.includes("real-world scenario")) {
    return generateRealWorldQuestion(questionId, data, topic);
  } else {
    // Default to code analysis
    return generateCodeAnalysisQuestion(questionId, data, topic);
  }
}

function generateCodeAnalysisQuestion(questionId, data, topic) {
  const snippet = getRandomItem(data.codeSnippets);
  const incorrectIssues = snippet.issues.filter(
    (issue) => issue !== snippet.correctIssue
  );
  const options = [snippet.correctIssue, ...getRandomItems(incorrectIssues, 3)];

  return {
    questionId,
    type: "codeAnalysis",
    skillType: "programming",
    topic,
    text: `Analyze the following ${topic} code and identify the issue:\n\n\`\`\`${topic}\n${snippet.code}\n\`\`\`\n\nWhat is the problem with this code?`,
    options: shuffleArray(options),
    correctAnswer: snippet.correctIssue,
    explanation: snippet.explanation,
    difficulty: "intermediate",
    timeLimit: 120, // seconds
  };
}

function generateDebuggingQuestion(questionId, data, topic) {
  const error = getRandomItem(data.errorMessages);
  const incorrectCauses = error.causes.filter(
    (cause) => cause !== error.correctCause
  );
  const options = [error.correctCause, ...getRandomItems(incorrectCauses, 3)];

  return {
    questionId,
    type: "debugging",
    skillType: "programming",
    topic,
    text: `You are debugging a ${error.context}. The following error occurs:\n\n\`\`\`\n${error.error}\n\`\`\`\n\nWhat is the most likely cause?`,
    options: shuffleArray(options),
    correctAnswer: error.correctCause,
    explanation: error.explanation,
    difficulty: "intermediate",
    timeLimit: 90,
  };
}

function generateImplementationQuestion(questionId, data, topic) {
  const requirement = getRandomItem(data.requirements);
  const incorrectApproaches = requirement.approaches.filter(
    (approach) => approach !== requirement.correctApproach
  );
  const options = [
    requirement.correctApproach,
    ...getRandomItems(incorrectApproaches, 3),
  ];

  return {
    questionId,
    type: "implementation",
    skillType: "programming",
    topic,
    text: `Implement a function that ${requirement.requirement}. Choose the most efficient approach:`,
    options: shuffleArray(options),
    correctAnswer: requirement.correctApproach,
    explanation: requirement.explanation,
    difficulty: "intermediate",
    timeLimit: 150,
  };
}

function generateAlgorithmQuestion(questionId, data, topic) {
  const scenario = getRandomItem(data.scenarios);
  const incorrectAlgorithms = scenario.algorithms.filter(
    (alg) => alg !== scenario.correctAlgorithm
  );
  const options = [
    scenario.correctAlgorithm,
    ...getRandomItems(incorrectAlgorithms, 3),
  ];

  return {
    questionId,
    type: "algorithm",
    skillType: "problemSolving",
    topic,
    text: `Given the following scenario: ${scenario.scenario}\n\nWhat is the optimal algorithm to solve this problem?`,
    options: shuffleArray(options),
    correctAnswer: scenario.correctAlgorithm,
    explanation: scenario.explanation,
    difficulty: "advanced",
    timeLimit: 180,
  };
}

function generateOptimizationQuestion(questionId, data, topic) {
  const optimization = getRandomItem(data.optimizations);
  const incorrectStrategies = optimization.strategies.filter(
    (strategy) => strategy !== optimization.correctStrategy
  );
  const options = [
    optimization.correctStrategy,
    ...getRandomItems(incorrectStrategies, 3),
  ];

  return {
    questionId,
    type: "optimization",
    skillType: "problemSolving",
    topic,
    text: `A ${optimization.system} is experiencing performance issues. The current implementation has ${optimization.currentIssue}. What would be the best optimization strategy?`,
    options: shuffleArray(options),
    correctAnswer: optimization.correctStrategy,
    explanation: optimization.explanation,
    difficulty: "advanced",
    timeLimit: 200,
  };
}

function generateRealWorldQuestion(questionId, data, topic) {
  const scenario = getRandomItem(realWorldScenarios.webDevelopment);
  const incorrectSolutions = scenario.solutions.filter(
    (sol) => sol !== scenario.correctSolution
  );
  const options = [
    scenario.correctSolution,
    ...getRandomItems(incorrectSolutions, 3),
  ];

  return {
    questionId,
    type: "realWorld",
    skillType: "practical",
    topic,
    text: `In a real-world scenario where ${scenario.situation}, what would be the most appropriate solution?`,
    options: shuffleArray(options),
    correctAnswer: scenario.correctSolution,
    explanation: scenario.explanation,
    difficulty: "intermediate",
    timeLimit: 120,
  };
}

function _generateBestPracticeQuestion(questionId, data, topic) {
  // eslint-disable-line no-unused-vars
  const scenario = getRandomItem(realWorldScenarios.softwareEngineering);
  const incorrectSolutions = scenario.solutions.filter(
    (sol) => sol !== scenario.correctSolution
  );
  const options = [
    scenario.correctSolution,
    ...getRandomItems(incorrectSolutions, 3),
  ];

  return {
    questionId,
    type: "bestPractice",
    skillType: "practical",
    topic,
    text: `When ${scenario.situation}, which approach follows industry best practices?`,
    options: shuffleArray(options),
    correctAnswer: scenario.correctSolution,
    explanation: scenario.explanation,
    difficulty: "intermediate",
    timeLimit: 90,
  };
}

// Utility functions
function getRandomQuestionType(templates) {
  const types = Object.values(templates).flat();
  return getRandomItem(types);
}

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomItems(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generate exam based on skill requirements
 */
export function generateSkillBasedExam(skills, difficulty = "intermediate") {
  const questions = [];

  skills.forEach((skill) => {
    const skillQuestions = generateQuestions(
      skill.type,
      skill.topic,
      difficulty,
      skill.questionCount || 3
    );
    questions.push(...skillQuestions);
  });

  return {
    examId: `exam_${Date.now()}`,
    title: `Practical Skills Exam - ${skills.map((s) => s.topic).join(", ")}`,
    description: `Comprehensive exam covering practical skills in ${skills
      .map((s) => s.topic)
      .join(", ")}`,
    questions: shuffleArray(questions),
    totalQuestions: questions.length,
    timeLimit: questions.reduce((total, q) => total + q.timeLimit, 0),
    difficulty,
    skills: skills.map((s) => s.topic),
  };
}

/**
 * Predefined skill sets for common roles
 */
export const skillSets = {
  pythonDeveloper: [
    { type: "programming", topic: "python", questionCount: 4 },
    { type: "problemSolving", topic: "dataStructures", questionCount: 3 },
    { type: "practical", topic: "webDevelopment", questionCount: 2 },
  ],
  webDeveloper: [
    { type: "programming", topic: "javascript", questionCount: 4 },
    { type: "practical", topic: "webDevelopment", questionCount: 3 },
    { type: "problemSolving", topic: "dataStructures", questionCount: 2 },
  ],
  dataScientist: [
    { type: "programming", topic: "python", questionCount: 3 },
    { type: "problemSolving", topic: "dataStructures", questionCount: 4 },
    { type: "practical", topic: "webDevelopment", questionCount: 2 },
  ],
};
