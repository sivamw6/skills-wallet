import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExam, evaluateExam, getAvailableExams } from "../../service/mockAPI";
import { 
  Button, 
  Card, 
  Typography, 
  Container, 
  Badge,
  Grid,
  PageHeader,
  EmptyState
} from "../../components/ui";
import styles from "./Exam.module.scss";

/**
 * Take Exam Page - Students take exams created by educators
 * Students can select from available exams and complete them
 */
export default function Exam() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [exam, setExam] = useState(null);
  const [availableExams, setAvailableExams] = useState([]);
  const [showExamSelection, setShowExamSelection] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(null);

  // Initialize exam
  useEffect(() => {
    if (id) {
      // Load existing exam
      const existingExam = getExam(id);
      setExam(existingExam);
      setShowExamSelection(false);
      if (existingExam.timeLimit) {
        setTimeRemaining(existingExam.timeLimit);
      }
    } else {
      // Load available exams for selection
      const exams = getAvailableExams();
      setAvailableExams(exams);
    }
  }, [id]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!exam) return;
    
    const answerArray = Object.values(answers);
    const evaluation = evaluateExam(exam.examId, answerArray);
    
    // Enhanced evaluation with skill breakdown
    const skillBreakdown = calculateSkillBreakdown(exam, answers);
    const enhancedResult = {
      ...evaluation,
      skillBreakdown,
      timeSpent: exam.timeLimit - timeRemaining,
      difficulty: exam.difficulty,
      skills: exam.skills
    };
    
    setResult(enhancedResult);
    setIsSubmitted(true);
  }, [exam, answers, timeRemaining]);

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isSubmitted) {
      handleSubmit(new Event('submit'));
    }
  }, [timeRemaining, isSubmitted, handleSubmit]);

  function selectExam(examId) {
    const selectedExam = getExam(examId);
    setExam(selectedExam);
    setShowExamSelection(false);
    if (selectedExam.timeLimit) {
      setTimeRemaining(selectedExam.timeLimit);
    }
    setAnswers({});
    setResult(null);
    setIsSubmitted(false);
  }

  function handleAnswerChange(questionIndex, answer) {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  }

  function calculateSkillBreakdown(exam, answers) {
    const breakdown = {};
    exam.questions.forEach((question, index) => {
      const skill = question.topic || 'general';
      if (!breakdown[skill]) {
        breakdown[skill] = { correct: 0, total: 0, questions: [] };
      }
      breakdown[skill].total++;
      breakdown[skill].questions.push({
        questionId: question.questionId,
        correct: answers[index] === question.correctAnswer,
        type: question.type
      });
      if (answers[index] === question.correctAnswer) {
        breakdown[skill].correct++;
      }
    });
    
    // Calculate percentages
    Object.keys(breakdown).forEach(skill => {
      breakdown[skill].percentage = Math.round((breakdown[skill].correct / breakdown[skill].total) * 100);
    });
    
    return breakdown;
  }

  function goToIssueCredential() {
    navigate("/provider/issue", { 
      state: { 
        examId: exam.examId, 
        score: result.score,
        studentAnswers: answers
      } 
    });
  }

  // Exam selection screen
  if (showExamSelection) {
    return (
      <Container variant="default" size="lg" fullHeight>
        <Card variant="glass" size="lg">
          <div className={styles.headerSection}>
            <Typography variant="h2" color="white" className={styles.headerTitle}>
              📝 Take Exam (Simulation)
            </Typography>
            <Typography variant="body" color="white">
              Simulate the student experience by taking exams. Select an exam to complete and experience the exam process from a student's perspective.
            </Typography>
          </div>

          {availableExams.length === 0 ? (
            <EmptyState
              icon="📝"
              title="No Exams Available"
              description="There are currently no exams available for student simulation. Please check back later or create some exams first."
              actionText="Back to Dashboard"
              onAction={() => navigate("/provider/dashboard")}
            />
          ) : (
            <Grid columns={2} gap="lg" className={styles.examGrid}>
              {availableExams.map((exam) => (
                <Card key={exam.examId} variant="dark" className={styles.examCard} onClick={() => selectExam(exam.examId)}>
                  <div className={styles.examCardContent}>
                    <Typography variant="h4" color="white" className={styles.examCardTitle}>
                      {exam.title}
                    </Typography>
                    <Typography variant="body" color="white" className={styles.examCardDescription}>
                      {exam.description}
                    </Typography>
                    <div className={styles.examCardBadges}>
                      <Badge variant="info" size="sm">Questions: {exam.totalQuestions}</Badge>
                      <Badge variant="secondary" size="sm">Difficulty: {exam.difficulty}</Badge>
                      <Badge variant="success" size="sm">Time: {Math.floor(exam.timeLimit / 60)} min</Badge>
                    </div>
                  </div>
                  <Button variant="primary" size="md" fullWidth className={styles.examCardButton}>
                    Start Exam
                  </Button>
                </Card>
              ))}
            </Grid>
          )}

          <div className={styles.centerActions}>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate("/provider/dashboard")}
            >
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  if (!exam) {
    return (
      <Container variant="default" size="lg" fullHeight>
        <Card variant="glass" size="lg">
          <Typography variant="h2" color="white" className={styles.loadingTitle}>
            Loading Exam...
          </Typography>
        </Card>
      </Container>
    );
  }

  return (
    <Container variant="default" size="lg" fullHeight>
      <Card variant="glass" size="lg">
        <div className={styles.examHeader}>
          <div className={styles.examHeaderTop}>
            <div>
              <Typography variant="h2" color="white" className={styles.examTitle}>
                {exam.title}
              </Typography>
              <Typography variant="body" color="white">
                {exam.description}
              </Typography>
            </div>
            {timeRemaining !== null && (
              <Badge 
                variant={timeRemaining < 60 ? 'error' : timeRemaining < 300 ? 'warning' : 'success'}
                size="lg"
              >
                {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
              </Badge>
            )}
          </div>
          
          <div className={styles.examBadges}>
            <Badge variant="info">Questions: {exam.totalQuestions}</Badge>
            <Badge variant="secondary">Difficulty: {exam.difficulty}</Badge>
            <Badge variant="success">Skills: {exam.skills?.join(', ')}</Badge>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {exam.questions.map((question, index) => (
            <Card key={question.questionId} variant="dark" className={styles.questionCard}>
              <div className={styles.questionHeader}>
                <Typography variant="h4" color="white">
                  Question {index + 1}
                </Typography>
                <div className={styles.questionBadges}>
                  <Badge variant="info" size="sm">{question.type}</Badge>
                  <Badge variant="secondary" size="sm">{question.topic}</Badge>
                  <Badge variant="warning" size="sm">{question.timeLimit}s</Badge>
                </div>
              </div>
              <Typography variant="body" color="white" className={styles.questionText}>
                {question.text}
              </Typography>
              
              <div className={styles.optionsContainer}>
                {question.options.map((option, optionIndex) => (
                  <label 
                    key={optionIndex} 
                    className={`${styles.optionLabel} ${answers[index] === option ? styles.selected : ''}`}
                  >
                    <input
                      type="radio"
                      name={`q${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => handleAnswerChange(index, option)}
                      className={styles.optionInput}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </Card>
          ))}

          {!isSubmitted && (
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={Object.keys(answers).length < exam.questions.length}
              className={styles.submitButton}
            >
              Submit Exam
            </Button>
          )}
        </form>

        {result && (
          <Card variant="glass" className={styles.resultsCard}>
            <Typography variant="h3" color="white" centered className={styles.resultsTitle}>
              Exam Results
            </Typography>
            
            <div className={styles.resultsMetrics}>
              <div className={styles.metricItem}>
                <Badge 
                  variant={result.score >= 70 ? 'success' : result.score >= 50 ? 'warning' : 'error'} 
                  size="lg"
                  className={styles.metricBadge}
                >
                  {result.score}%
                </Badge>
                <Typography variant="body" color="white">Overall Score</Typography>
              </div>
              <div className={styles.metricItem}>
                <Typography variant="h4" color="white" className={styles.metricValue}>
                  {result.correctAnswers} / {result.totalQuestions}
                </Typography>
                <Typography variant="body" color="white">Correct Answers</Typography>
              </div>
              <div className={styles.metricItem}>
                <Typography variant="h4" color="white" className={styles.metricValue}>
                  {Math.floor(result.timeSpent / 60)}:{(result.timeSpent % 60).toString().padStart(2, '0')}
                </Typography>
                <Typography variant="body" color="white">Time Spent</Typography>
              </div>
            </div>

            {/* Skill Breakdown */}
            {result.skillBreakdown && (
              <div className={styles.skillBreakdown}>
                <Typography variant="h4" color="white" className={styles.skillBreakdownTitle}>
                  Skill Breakdown
                </Typography>
                <Grid columns={2} gap="md">
                  {Object.entries(result.skillBreakdown).map(([skill, data]) => (
                    <Card key={skill} variant="dark" className={styles.skillCard}>
                      <Typography variant="h5" color="white" className={styles.skillTitle}>
                        {skill.charAt(0).toUpperCase() + skill.slice(1)}
                      </Typography>
                      <div className={styles.skillStats}>
                        <Typography variant="body" color="white">
                          {data.correct} / {data.total} correct
                        </Typography>
                        <Badge 
                          variant={data.percentage >= 70 ? 'success' : data.percentage >= 50 ? 'warning' : 'error'}
                          size="sm"
                        >
                          {data.percentage}%
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </Grid>
              </div>
            )}
            
            <div className={styles.resultsActions}>
              <Button
                variant="primary"
                size="lg"
                onClick={goToIssueCredential}
              >
                Issue Credential
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setShowExamSelection(true)}
              >
                Take Another Exam
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/provider/dashboard")}
              >
                Back to Dashboard
              </Button>
            </div>
          </Card>
        )}
      </Card>
    </Container>
  );
}