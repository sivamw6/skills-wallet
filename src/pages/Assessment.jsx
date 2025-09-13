import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAssessment, evaluateAssessment } from "../service/mockAPI";
import { 
  Button, 
  Card, 
  Typography, 
  Container, 
  Badge 
} from "../components/ui";

/**
 * Assessment Page - Displays 3 MCQ questions and evaluates answers
 * Part of the Education Provider flow
 */
export default function Assessment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get assessment data (mock)
  const assessment = getAssessment(id || "assess_001");

  function handleAnswerChange(questionIndex, answer) {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const answerArray = Object.values(answers);
    const evaluation = evaluateAssessment(assessment.assessmentId, answerArray);
    setResult(evaluation);
    setIsSubmitted(true);
  }

  function goToIssueCredential() {
    navigate("/provider/issue", { 
      state: { 
        assessmentId: assessment.assessmentId, 
        score: result.score,
        studentAnswers: answers
      } 
    });
  }

  return (
    <Container variant="default" size="lg" fullHeight>
      <Card variant="glass" size="lg">
        <div style={{ marginBottom: '2rem' }}>
          <Typography variant="h2" color="white" style={{ marginBottom: '0.5rem' }}>
            {assessment.title}
          </Typography>
          <Typography variant="body" color="white">
            Complete the assessment below. Select your answers and submit when ready.
          </Typography>
        </div>
        
        <form onSubmit={handleSubmit}>
          {assessment.questions.map((question, index) => (
            <Card key={question.questionId} variant="dark" style={{ marginBottom: '2rem' }}>
              <Typography variant="h4" color="white" style={{ marginBottom: '1rem' }}>
                Question {index + 1}
              </Typography>
              <Typography variant="body" color="white" style={{ marginBottom: '1.5rem' }}>
                {question.text}
              </Typography>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {question.options.map((option, optionIndex) => (
                  <label 
                    key={optionIndex} 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem',
                      background: answers[index] === option ? 'rgba(78, 205, 196, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      border: answers[index] === option ? '2px solid rgba(78, 205, 196, 0.3)' : '2px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      color: 'white'
                    }}
                  >
                    <input
                      type="radio"
                      name={`q${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => handleAnswerChange(index, option)}
                      style={{
                        width: '1.25rem',
                        height: '1.25rem',
                        accentColor: '#4ECDC4'
                      }}
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
              disabled={Object.keys(answers).length < assessment.questions.length}
              style={{ marginTop: '2rem' }}
            >
              Submit Assessment
            </Button>
          )}
        </form>

        {result && (
          <Card variant="glass" style={{ marginTop: '2rem' }}>
            <Typography variant="h3" color="white" centered style={{ marginBottom: '1.5rem' }}>
              Assessment Results
            </Typography>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '2rem', 
              marginBottom: '2rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ textAlign: 'center' }}>
                <Badge 
                  variant={result.score >= 70 ? 'success' : result.score >= 50 ? 'warning' : 'error'} 
                  size="lg"
                  style={{ marginBottom: '0.5rem', display: 'block' }}
                >
                  {result.score}%
                </Badge>
                <Typography variant="body" color="white">Score</Typography>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Typography variant="h4" color="white" style={{ marginBottom: '0.5rem' }}>
                  {result.correctAnswers} / {result.totalQuestions}
                </Typography>
                <Typography variant="body" color="white">Correct Answers</Typography>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
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