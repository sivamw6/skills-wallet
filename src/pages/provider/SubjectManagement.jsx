import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  Typography,
  Button,
  Badge,
  Divider,
  FormGroup,
  Input,
  Select,
} from '../../components/ui';
import {
  listSubjects,
  listSubjectClasses,
  listExams,
  createSubject,
  createSubjectClass,
  createExam,
} from '../../service/mockAPI';
import { generateSkillBasedExam, skillSets } from '../../service/questionGenerator';
import { ExamForm, ExamList } from '../../components/exam';
import styles from './SubjectManagement.module.scss';

export default function SubjectManagement() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [subjectClasses, setSubjectClasses] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSubjectClass, setSelectedSubjectClass] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formType, setFormType] = useState('subject'); // 'subject', 'subjectClass', 'exam'
  const [formData, setFormData] = useState({});
  const [selectedSkillSet, setSelectedSkillSet] = useState('pythonDeveloper');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [showExamBuilder, setShowExamBuilder] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [showExamManagement, setShowExamManagement] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  // Generate unique subject code
  const generateSubjectCode = () => {
    const existingCodes = subjects.map(subject => subject.code);
    let code = 'SUB';
    let counter = 1;
    
    while (existingCodes.includes(`${code}${counter.toString().padStart(3, '0')}`)) {
      counter++;
    }
    
    return `${code}${counter.toString().padStart(3, '0')}`;
  };

  // Generate unique subject class code
  const generateSubjectClassCode = (subjectCode) => {
    const subjectClassList = subjectClasses.filter(subjectClass => subjectClass.subjectId === selectedSubject?.subjectId);
    const existingCodes = subjectClassList.map(subjectClass => subjectClass.code);
    let code = `${subjectCode}-`;
    let counter = 1;
    
    while (existingCodes.includes(`${code}${counter.toString().padStart(2, '0')}`)) {
      counter++;
    }
    
    return `${code}${counter.toString().padStart(2, '0')}`;
  };

  // Generate unique exam code
  const generateExamCode = (subjectClassCode) => {
    const subjectClassExams = exams.filter(exam => exam.subjectClassId === selectedSubjectClass?.subjectClassId);
    const existingCodes = subjectClassExams.map(exam => exam.code);
    let code = `${subjectClassCode}-EXAM`;
    let counter = 1;
    
    while (existingCodes.includes(`${code}${counter.toString().padStart(2, '0')}`)) {
      counter++;
    }
    
    return `${code}${counter.toString().padStart(2, '0')}`;
  };

  // Generate a mock public key (for demo purposes)
  const generatePublicKey = () => {
    return '0x' + Math.random().toString(16).slice(2) + Date.now().toString(16).slice(-8);
  };

  const loadData = () => {
    setSubjects(listSubjects());
    setSubjectClasses(listSubjectClasses());
    setExams(listExams());
  };

  const handleCreate = () => {
    switch (formType) {
      case 'subject':
        createSubject(
          formData.code || generateSubjectCode(),
          formData.title,
          formData.description,
          formData.publicKey || generatePublicKey()
        );
        break;
      case 'subjectClass':
        createSubjectClass(
          selectedSubject?.subjectId,
          formData.code || generateSubjectClassCode(selectedSubject?.code),
          formData.title,
          formData.description
        );
        break;
      case 'exam': {
        // Create exam using intelligent question generation
        const skills = skillSets[selectedSkillSet];
         const generatedExam = generateSkillBasedExam(skills, difficulty);
        createExam(
          selectedSubjectClass?.subjectClassId,
          formData.code || generateExamCode(selectedSubjectClass?.code),
          formData.title || generatedExam.title,
          formData.description || generatedExam.description,
          formData.publicKey || generatePublicKey(),
          formData.score || 100,
          generatedExam.questions,
          {
            difficulty: difficulty,
            skillSet: selectedSkillSet,
          }
        );
        break;
      }
      default:
        return;
    }
    
    loadData();
    setShowCreateForm(false);
    setFormData({});
  };

  const handleShowCreateForm = (type) => {
    setFormType(type);
    
    // Pre-fill form data based on type
    let initialData = {};
    switch (type) {
      case 'subject':
        initialData = {
          code: generateSubjectCode(),
          publicKey: generatePublicKey(),
          score: 100
        };
        break;
      case 'class':
        initialData = {
           code: generateSubjectClassCode(selectedSubject?.code),
        };
        break;
      case 'exam':
        initialData = {
          code: generateExamCode(selectedSubjectClass?.code),
          publicKey: generatePublicKey(),
          score: 100
        };
        break;
    }
    
    setFormData(initialData);
    setShowCreateForm(true);
  };

  const handleBack = () => {
    navigate('/provider/dashboard');
  };

  const handleCreateExam = (examData) => {
    createExam(
      selectedSubjectClass?.subjectClassId,
      examData.code,
      examData.title,
      examData.description,
      examData.publicKey,
      examData.score,
      examData.questions,
      {
        difficulty: examData.difficulty,
        skillSet: examData.skillSet,
      }
    );
    
    loadData();
    setShowExamBuilder(false);
    setEditingExam(null);
  };

  const handleEditExam = (exam) => {
    setEditingExam(exam);
    setShowExamBuilder(true);
  };

  const handleDeleteExam = () => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      // TODO: Implement delete exam function
      loadData();
    }
  };

  const handleTakeExam = (examId) => {
    navigate(`/exam/${examId}`);
  };

  const handleViewExamDetails = () => {
    // TODO: Implement view exam details
  };

  const handleShowExamBuilder = () => {
    setEditingExam(null);
    setShowExamBuilder(true);
  };

  const handleCancelExamBuilder = () => {
    setShowExamBuilder(false);
    setEditingExam(null);
  };

  const handleShowExamManagement = () => {
    setShowExamManagement(true);
  };

  const handleCloseExamManagement = () => {
    setShowExamManagement(false);
  };

  return (
    <Container variant="glass" className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Typography variant="h1" color="primary">
            📚 Subject Management
          </Typography>
          <Typography variant="body" color="white">
             Manage subjects, classes, and exams
          </Typography>
        </div>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={handleBack}>
            ← Back to Dashboard
          </Button>
        </div>
      </div>

      <div className={styles.gridContainer}>
        {/* Subject Selection */}
        <Card variant="glass" spacing="lg" className={styles.gridCard}>
          <Typography variant="h3" color="primary" className={styles.sectionTitle}>
            Subjects
          </Typography>
          <div className={styles.list}>
            {subjects.map((subject) => (
              <div
                key={subject.subjectId}
                className={`${styles.listItem} ${
                   selectedSubject?.subjectId === subject.subjectId ? styles.selected : ''
                }`}
                onClick={() => setSelectedSubject(subject)}
              >
                <Typography variant="h4" color="white">
                  {subject.code}
                </Typography>
                <Typography variant="body" color="white">
                  {subject.title}
                </Typography>
                <Badge variant="success" size="sm">
                  {subjectClasses.filter(u => u.subjectId === subject.subjectId).length} classes
                </Badge>
              </div>
            ))}
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleShowCreateForm('subject')}
          >
            + Create Subject
          </Button>
        </Card>

        {/* Class Selection */}
        <Card variant="glass" spacing="lg" className={styles.gridCard}>
          <Typography variant="h3" color="primary" className={styles.sectionTitle}>
            Classes
          </Typography>
           {selectedSubject ? (
            <>
              <div className={styles.list}>
                {subjectClasses
                  .filter(subjectClass => subjectClass.subjectId === selectedSubject.subjectId)
                  .map((subjectClass) => (
                    <div
                      key={subjectClass.subjectClassId}
                      className={`${styles.listItem} ${
                        selectedSubjectClass?.subjectClassId === subjectClass.subjectClassId ? styles.selected : ''
                      }`}
                      onClick={() => setSelectedSubjectClass(subjectClass)}
                    >
                      <Typography variant="h4" color="white">
                        {subjectClass.code}
                      </Typography>
                      <Typography variant="body" color="white">
                        {subjectClass.title}
                      </Typography>
                      <Badge variant="info" size="sm">
                         {exams.filter(e => e.subjectClassId === subjectClass.subjectClassId).length} exams
                      </Badge>
                    </div>
                  ))}
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleShowCreateForm('class')}
              >
                + Create Class
              </Button>
            </>
          ) : (
            <div className={styles.emptyState}>
              <Typography variant="body" color="white">
                Select a subject to view classes
              </Typography>
            </div>
          )}
        </Card>

        {/* Exam Selection */}
        <Card variant="glass" spacing="lg" className={styles.gridCard}>
          <Typography variant="h3" color="primary" className={styles.sectionTitle}>
            Exams
          </Typography>
          {selectedSubjectClass ? (
            <>
              <div className={styles.list}>
                {exams
                  .filter(exam => exam.subjectClassId === selectedSubjectClass.subjectClassId)
                  .slice(0, 3) // Show only the first 3
                  .map((exam) => (
                    <div key={exam.examId} className={styles.listItem}>
                      <Typography variant="h4" color="white">
                        {exam.code}
                      </Typography>
                      <Typography variant="body" color="white">
                        {exam.title}
                      </Typography>
                      <Badge variant="warning" size="sm">
                        {exam.score} points
                      </Badge>
                    </div>
                  ))}
                {exams.filter(exam => exam.subjectClassId === selectedSubjectClass.subjectClassId).length > 3 && (
                  <div className={styles.moreIndicator}>
                    <Typography variant="body" color="gray">
                      +{exams.filter(exam => exam.subjectClassId === selectedSubjectClass.subjectClassId).length - 3} more exams
                    </Typography>
                  </div>
                )}
              </div>
              <div className={styles.examActions}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleShowExamBuilder}
                  className={styles.examActionButton}
                >
                  + Create Exam
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleShowExamManagement}
                  className={styles.examActionButton}
                >
                  Manage Exams
                </Button>
              </div>
            </>
          ) : (
            <div className={styles.emptyState}>
              <Typography variant="body" color="white">
                Select a class to view exams
              </Typography>
            </div>
          )}
        </Card>
      </div>

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className={styles.modal}>
          <Card variant="glass" spacing="lg" className={styles.modalContent}>
            <Typography variant="h3" color="primary">
              Create {formType.charAt(0).toUpperCase() + formType.slice(1)}
            </Typography>
            
            <FormGroup>
              <Input
                label="Subject Code"
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder={`Auto-generated ${formType} code`}
                disabled={formType === 'subject' || formType === 'class' || formType === 'exam'}
                helperText="Code is automatically generated to ensure uniqueness"
              />
            </FormGroup>

            <FormGroup>
              <Input
                label="Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={`Enter ${formType} title`}
              />
            </FormGroup>

            <FormGroup>
              <Input
                label="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={`Enter ${formType} description`}
                multiline
                rows={3}
              />
            </FormGroup>

            {(formType === 'subject' || formType === 'exam') && (
              <FormGroup>
                <Input
                  label="Public Key (Auto-generated)"
                  value={formData.publicKey || ''}
                  onChange={(e) => setFormData({ ...formData, publicKey: e.target.value })}
                  placeholder="Auto-generated public key"
                  disabled={true}
                  helperText="Public key is automatically generated for blockchain verification"
                />
              </FormGroup>
            )}

            {formType === 'exam' && (
              <>
                <FormGroup>
                  <Input
                    label="Public Key"
                    value={formData.publicKey || ''}
                    onChange={(e) => setFormData({ ...formData, publicKey: e.target.value })}
                    placeholder="Enter public key"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    label="Score"
                    type="number"
                    value={formData.score || ''}
                    onChange={(e) => setFormData({ ...formData, score: parseInt(e.target.value) })}
                    placeholder="Enter maximum score"
                  />
                </FormGroup>
              </>
            )}

            {formType === 'exam' && (
              <>
                <FormGroup>
                  <Select
                    label="Skill Set Focus"
                    value={selectedSkillSet}
                    onChange={(e) => setSelectedSkillSet(e.target.value)}
                    options={[
                      { value: 'pythonDeveloper', label: 'Python Developer' },
                      { value: 'webDeveloper', label: 'Web Developer' },
                      { value: 'dataScientist', label: 'Data Scientist' }
                    ]}
                  />
                </FormGroup>
                <FormGroup>
                  <Select
                    label="Difficulty Level"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    options={[
                      { value: 'beginner', label: 'Beginner' },
                      { value: 'intermediate', label: 'Intermediate' },
                      { value: 'advanced', label: 'Advanced' }
                    ]}
                  />
                </FormGroup>
                <div className={styles.examInfo}>
                  <Typography variant="body" color="white" className={styles.examInfoTitle}>
                    <strong>🎯 Exam Features:</strong>
                  </Typography>
                  <Typography variant="body" color="white" className={styles.examInfoDescription}>
                    • Intelligent question generation based on skill sets<br/>
                    • Practical, real-world scenarios<br/>
                    • Multiple question types (code analysis, debugging, implementation)<br/>
                    • Automatic time limits and difficulty scaling
                  </Typography>
                </div>
              </>
            )}

            <div className={styles.modalActions}>
              <Button variant="secondary" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleCreate}>
                Create
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Exam Form Modal (consistent style) */}
      {showExamBuilder && (
        <ExamForm
          open={showExamBuilder}
          initialData={editingExam}
          onCancel={handleCancelExamBuilder}
          onSubmit={(data) => {
            handleCreateExam(data);
          }}
        />
      )}

      {/* Exam Management Modal */}
      {showExamManagement && (
        <div className={styles.modal}>
          <Card variant="glass" size="lg" spacing="lg" className={styles.examManagementModal}>
            <div className={styles.modalHeader}>
              <Typography variant="h2" color="primary">
                📝 Exam Management
              </Typography>
              <Typography variant="body" color="white">
                Manage exams for: {selectedSubjectClass?.title || 'Selected Class'}
              </Typography>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCloseExamManagement}
                className={styles.closeButton}
              >
                ✕ Close
              </Button>
            </div>
            
            <div className={styles.modalContent}>
              <ExamList
                exams={exams.filter(exam => exam.subjectClassId === selectedSubjectClass?.subjectClassId)}
                onEditExam={handleEditExam}
                onDeleteExam={handleDeleteExam}
                onTakeExam={handleTakeExam}
                onViewDetails={handleViewExamDetails}
                showActions={true}
              />
            </div>
            
            <div className={styles.modalActions}>
              <Button
                variant="primary"
                onClick={handleShowExamBuilder}
              >
                + Create New Exam
              </Button>
            </div>
          </Card>
        </div>
      )}
    </Container>
  );
}
