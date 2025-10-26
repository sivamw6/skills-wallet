import React, { useEffect, useState } from 'react';
import { Input, Select, FormGroup, Button, Typography, Card } from '../ui';
import EntityModal from '../common/EntityModal';

const difficultyOptions = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const skillSetOptions = [
  { value: 'pythonDeveloper', label: 'Python Developer' },
  { value: 'webDeveloper', label: 'Web Developer' },
  { value: 'dataScientist', label: 'Data Scientist' },
];

export default function ExamForm({
  open,
  initialData = {},
  onCancel,
  onSubmit,
}) {
  const [form, setForm] = useState({
    code: '',
    title: '',
    description: '',
    publicKey: '',
    score: 100,
    difficulty: 'intermediate',
    skillSet: 'pythonDeveloper',
  });

  const [questions, setQuestions] = useState([]);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [questionForm, setQuestionForm] = useState({
    text: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    explanation: '',
  });

  useEffect(() => {
    if (open) {
      setForm({
        code: initialData?.code || generateExamCode(),
        title: initialData?.title || '',
        description: initialData?.description || '',
        publicKey: initialData?.publicKey || generatePublicKey(),
        score: initialData?.score || 100,
        difficulty: initialData?.difficulty || 'intermediate',
        skillSet: initialData?.skillSet || 'pythonDeveloper',
      });
      setQuestions(initialData?.questions || []);
    }
  }, [open, initialData]);

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleQuestionChange = (field, value) => {
    setQuestionForm(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...questionForm.options];
    newOptions[index] = value;
    setQuestionForm(prev => ({ ...prev, options: newOptions }));
  };

  const handleAddQuestion = () => {
    if (questionForm.text && questionForm.correctAnswer) {
      const newQuestion = {
        questionId: `q_${Date.now()}`,
        text: questionForm.text,
        options: questionForm.options.filter(opt => opt.trim() !== ''),
        correctAnswer: questionForm.correctAnswer,
        explanation: questionForm.explanation,
      };
      
      if (editingQuestion) {
        setQuestions(prev => prev.map(q => 
          q.questionId === editingQuestion.questionId ? newQuestion : q
        ));
        setEditingQuestion(null);
      } else {
        setQuestions(prev => [...prev, newQuestion]);
      }
      
      setQuestionForm({
        text: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        explanation: '',
      });
      setShowQuestionForm(false);
    }
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setQuestionForm({
      text: question.text,
      options: [...question.options, '', '', ''].slice(0, 4),
      correctAnswer: question.correctAnswer,
      explanation: question.explanation || '',
    });
    setShowQuestionForm(true);
  };

  const handleDeleteQuestion = (questionId) => {
    setQuestions(prev => prev.filter(q => q.questionId !== questionId));
  };

  const handleConfirm = () => {
    onSubmit({
      ...form,
      questions,
    });
  };

  if (!open) return null;

  return (
    <EntityModal
      title={initialData?.examId ? 'Edit Exam' : 'Create Exam'}
      subtitle="Code is automatically generated to ensure uniqueness"
      onCancel={onCancel}
      onConfirm={handleConfirm}
      confirmText={initialData?.examId ? 'Update' : 'Create'}
      confirmDisabled={!form.title || !form.description}
      width={700}
    >
        <FormGroup label="Exam Code">
          <Input
            value={form.code}
            onChange={e => handleChange('code', e.target.value)}
            placeholder="Auto-generated exam code"
            disabled
            helperText="Code is automatically generated"
          />
        </FormGroup>

        <FormGroup label="Title">
          <Input
            value={form.title}
            onChange={e => handleChange('title', e.target.value)}
            placeholder="Enter exam title"
          />
        </FormGroup>

        <FormGroup label="Description">
          <Input
            value={form.description}
            onChange={e => handleChange('description', e.target.value)}
            placeholder="Enter exam description"
            multiline
            rows={3}
          />
        </FormGroup>

        <FormGroup label="Public Key (Auto-generated)">
          <Input
            value={form.publicKey}
            onChange={e => handleChange('publicKey', e.target.value)}
            disabled
            helperText="Public key is automatically generated for blockchain verification"
          />
        </FormGroup>

        <FormGroup label="Maximum Score">
          <Input
            type="number"
            value={form.score}
            onChange={e => handleChange('score', parseInt(e.target.value))}
            placeholder="100"
          />
        </FormGroup>

        <FormGroup label="Difficulty">
          <Select
            variant="dark"
            size="lg"
            value={form.difficulty}
            onChange={e => handleChange('difficulty', e.target.value)}
          >
            {difficultyOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup label="Skill Set">
          <Select
            variant="dark"
            size="lg"
            value={form.skillSet}
            onChange={e => handleChange('skillSet', e.target.value)}
          >
            {skillSetOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </FormGroup>

        {/* Questions Section */}
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <Typography variant="h4" color="primary">
              📝 Questions ({questions.length})
            </Typography>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setShowQuestionForm(true)}
            >
              + Add Question
            </Button>
          </div>

          {questions.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {questions.map((question, index) => (
                <Card key={question.questionId} variant="glass" spacing="sm">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <Typography variant="h5" color="white" style={{ marginBottom: '0.5rem' }}>
                        Q{index + 1}: {question.text}
                      </Typography>
                      <div style={{ marginBottom: '0.5rem' }}>
                        {question.options.map((option, optIndex) => (
                          <Typography 
                            key={optIndex} 
                            variant="body" 
                            color={option === question.correctAnswer ? "success" : "gray"}
                            style={{ marginLeft: '1rem', marginBottom: '0.25rem' }}
                          >
                            {String.fromCharCode(65 + optIndex)}. {option}
                            {option === question.correctAnswer && ' ✓'}
                          </Typography>
                        ))}
                      </div>
                      {question.explanation && (
                        <Typography variant="body" color="secondary" style={{ fontStyle: 'italic' }}>
                          Explanation: {question.explanation}
                        </Typography>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleEditQuestion(question)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteQuestion(question.questionId)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card variant="glass" spacing="sm">
              <Typography variant="body" color="gray" style={{ textAlign: 'center', padding: '2rem' }}>
                No questions added yet. Click "Add Question" to get started.
              </Typography>
            </Card>
          )}
        </div>

        {/* Question Form Modal */}
        {showQuestionForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
          }}>
            <Card variant="glass" spacing="lg" style={{ width: '90%', maxWidth: '800px', maxHeight: '90vh', overflow: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <Typography variant="h3" color="primary">
                  {editingQuestion ? 'Edit Question' : 'Add Question'}
                </Typography>
                <Button variant="secondary" size="sm" onClick={() => {
                  setShowQuestionForm(false);
                  setEditingQuestion(null);
                  setQuestionForm({
                    text: '',
                    options: ['', '', '', ''],
                    correctAnswer: '',
                    explanation: '',
                  });
                }}>
                  ✕ Close
                </Button>
              </div>

              <FormGroup label="Question Text">
                <Input
                  value={questionForm.text}
                  onChange={e => handleQuestionChange('text', e.target.value)}
                  placeholder="Enter the question text"
                  multiline
                  rows={3}
                />
              </FormGroup>

              <FormGroup label="Answer Options">
                {questionForm.options.map((option, index) => (
                  <div key={index} style={{ marginBottom: '0.5rem' }}>
                    <Input
                      label={`Option ${String.fromCharCode(65 + index)}`}
                      value={option}
                      onChange={e => handleOptionChange(index, e.target.value)}
                      placeholder={`Enter option ${String.fromCharCode(65 + index)}`}
                    />
                  </div>
                ))}
              </FormGroup>

              <FormGroup label="Correct Answer">
                <Select
                  variant="dark"
                  size="lg"
                  value={questionForm.correctAnswer}
                  onChange={e => handleQuestionChange('correctAnswer', e.target.value)}
                >
                  {questionForm.options
                    .filter(opt => opt.trim() !== '')
                    .map((opt, index) => (
                      <option key={index} value={opt}>{`${String.fromCharCode(65 + index)}. ${opt}`}</option>
                    ))}
                </Select>
              </FormGroup>

              <FormGroup label="Explanation (Optional)">
                <Input
                  value={questionForm.explanation}
                  onChange={e => handleQuestionChange('explanation', e.target.value)}
                  placeholder="Explain why this is the correct answer"
                  multiline
                  rows={2}
                />
              </FormGroup>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <Button variant="secondary" onClick={() => {
                  setShowQuestionForm(false);
                  setEditingQuestion(null);
                  setQuestionForm({
                    text: '',
                    options: ['', '', '', ''],
                    correctAnswer: '',
                    explanation: '',
                  });
                }}>
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleAddQuestion}
                  disabled={!questionForm.text || !questionForm.correctAnswer}
                >
                  {editingQuestion ? 'Update Question' : 'Add Question'}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </EntityModal>
  );
}

function generateExamCode() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 3);
  return `EXAM-${timestamp}-${random}`.toUpperCase();
}

function generatePublicKey() {
  return '0x' + Math.random().toString(16).slice(2) + Date.now().toString(16).slice(-8);
}


