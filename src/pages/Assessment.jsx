import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAssessment, evaluateAssessment } from "../service/mockAPI";

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
    <div style={{...container, backgroundColor: "#0f172a", color: "white", minHeight: "100vh"}}>
      <h2 style={{color: "#ff6b35", fontSize: "2rem", marginBottom: "20px"}}>{assessment.title}</h2>
      <p style={{color: "rgba(255, 255, 255, 0.8)", fontSize: "1.1rem", marginBottom: "30px"}}>Complete the assessment below. Select your answers and submit when ready.</p>
      
      <form onSubmit={handleSubmit} style={form}>
        {assessment.questions.map((question, index) => (
          <div key={question.questionId} style={{...questionContainer, backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white", borderRadius: "12px"}}>
            <h4 style={{color: "#4ecdc4", fontSize: "1.2rem", marginBottom: "15px"}}>Question {index + 1}</h4>
            <p style={{...questionText, color: "white", fontSize: "1.1rem"}}>{question.text}</p>
            <div style={optionsContainer}>
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} style={{...optionLabel, color: "white", padding: "8px", borderRadius: "8px", backgroundColor: "rgba(255, 255, 255, 0.05)"}}>
                  <input
                    type="radio"
                    name={`q${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                    style={radioInput}
                  />
                  <span style={{...optionText, color: "white"}}>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {!isSubmitted && (
          <button type="submit" style={{...submitBtn, backgroundColor: "#ff6b35", color: "white", border: "none", borderRadius: "8px", padding: "12px 24px", fontSize: "1.1rem"}} disabled={Object.keys(answers).length < assessment.questions.length}>
            Submit Assessment
          </button>
        )}
      </form>

      {result && (
        <div style={{...resultContainer, backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white", borderRadius: "12px", padding: "20px"}}>
          <h3 style={{color: "#4ecdc4", fontSize: "1.5rem", marginBottom: "20px"}}>Assessment Results</h3>
          <div style={{...scoreContainer, backgroundColor: "rgba(255, 255, 255, 0.05)", padding: "15px", borderRadius: "8px"}}>
            <p style={{color: "white", fontSize: "1.2rem"}}><strong>Score:</strong> {result.score}%</p>
            <p style={{color: "white", fontSize: "1.2rem"}}><strong>Correct Answers:</strong> {result.correctAnswers} / {result.totalQuestions}</p>
          </div>
          
          <div style={actionButtons}>
            <button onClick={goToIssueCredential} style={{...primaryBtn, backgroundColor: "#ff6b35", color: "white", border: "none", borderRadius: "8px", padding: "12px 24px", fontSize: "1.1rem"}}>
              Issue Credential
            </button>
            <button onClick={() => navigate("/provider/dashboard")} style={{...secondaryBtn, backgroundColor: "#2e86ab", color: "white", border: "none", borderRadius: "8px", padding: "12px 24px", fontSize: "1.1rem"}}>
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Basic styles only
const container = { padding: 20 };
const form = { margin: "20px 0" };
const questionContainer = { padding: 15, border: "1px solid #ccc", margin: "10px 0" };
const questionText = { fontWeight: "bold", marginBottom: 10 };
const optionsContainer = { margin: "10px 0" };
const optionLabel = { display: "flex", alignItems: "center", margin: "5px 0" };
const radioInput = { marginRight: 8 };
const optionText = { marginLeft: 5 };
const submitBtn = { padding: "10px 20px", margin: "10px 0" };
const resultContainer = { marginTop: 20, padding: 15, border: "2px solid green" };
const scoreContainer = { marginBottom: 15 };
const actionButtons = { display: "flex", gap: 10, flexWrap: "wrap" };
const primaryBtn = { padding: "10px 20px", margin: "5px" };
const secondaryBtn = { padding: "10px 20px", margin: "5px" };