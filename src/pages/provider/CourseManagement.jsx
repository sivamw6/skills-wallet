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
  listCourses,
  listUnits,
  listExams,
  createCourse,
  createUnit,
  createExam,
} from '../../service/mockAPI';
import styles from './CourseManagement.module.scss';

export default function CourseManagement() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [units, setUnits] = useState([]);
  const [exams, setExams] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formType, setFormType] = useState('course'); // 'course', 'unit', 'exam'
  const [formData, setFormData] = useState({});

  useEffect(() => {
    loadData();
  }, []);

  // Generate unique course code
  const generateCourseCode = () => {
    const existingCodes = courses.map(course => course.code);
    let code = 'CS';
    let counter = 1;
    
    while (existingCodes.includes(`${code}${counter.toString().padStart(3, '0')}`)) {
      counter++;
    }
    
    return `${code}${counter.toString().padStart(3, '0')}`;
  };

  // Generate unique unit code
  const generateUnitCode = (courseCode) => {
    const courseUnits = units.filter(unit => unit.courseId === selectedCourse?.courseId);
    const existingCodes = courseUnits.map(unit => unit.code);
    let code = `${courseCode}-`;
    let counter = 1;
    
    while (existingCodes.includes(`${code}${counter.toString().padStart(2, '0')}`)) {
      counter++;
    }
    
    return `${code}${counter.toString().padStart(2, '0')}`;
  };

  // Generate unique exam code
  const generateExamCode = (unitCode) => {
    const unitExams = exams.filter(exam => exam.unitId === selectedUnit?.unitId);
    const existingCodes = unitExams.map(exam => exam.code);
    let code = `${unitCode}-EXAM`;
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
    setCourses(listCourses());
    setUnits(listUnits());
    setExams(listExams());
  };

  const handleCreate = () => {
    switch (formType) {
      case 'course':
        createCourse(
          formData.code || generateCourseCode(),
          formData.title,
          formData.description,
          formData.publicKey || generatePublicKey()
        );
        break;
      case 'unit':
        createUnit(
          selectedCourse?.courseId,
          formData.code || generateUnitCode(selectedCourse?.code),
          formData.title,
          formData.description
        );
        break;
      case 'exam':
        createExam(
          selectedUnit?.unitId,
          formData.code || generateExamCode(selectedUnit?.code),
          formData.title,
          formData.description,
          formData.publicKey || generatePublicKey(),
          formData.score || 100,
          formData.questions
        );
        break;
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
      case 'course':
        initialData = {
          code: generateCourseCode(),
          publicKey: generatePublicKey(),
          score: 100
        };
        break;
      case 'unit':
        initialData = {
          code: generateUnitCode(selectedCourse?.code),
        };
        break;
      case 'exam':
        initialData = {
          code: generateExamCode(selectedUnit?.code),
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

  return (
    <Container variant="glass" className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Typography variant="h1" color="primary">
            📚 Course Management
          </Typography>
          <Typography variant="body" color="white">
            Manage courses, units, and exams
          </Typography>
        </div>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={handleBack}>
            ← Back to Dashboard
          </Button>
        </div>
      </div>

      <div className={styles.gridContainer}>
        {/* Course Selection */}
        <Card variant="glass" spacing="lg" className={styles.gridCard}>
          <Typography variant="h3" color="primary" className={styles.sectionTitle}>
            Courses
          </Typography>
          <div className={styles.list}>
            {courses.map((course) => (
              <div
                key={course.courseId}
                className={`${styles.listItem} ${
                  selectedCourse?.courseId === course.courseId ? styles.selected : ''
                }`}
                onClick={() => setSelectedCourse(course)}
              >
                <Typography variant="h4" color="white">
                  {course.code}
                </Typography>
                <Typography variant="body" color="white">
                  {course.title}
                </Typography>
                <Badge variant="success" size="sm">
                  {units.filter(u => u.courseId === course.courseId).length} units
                </Badge>
              </div>
            ))}
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleShowCreateForm('course')}
          >
            + Create Course
          </Button>
        </Card>

        {/* Unit Selection */}
        <Card variant="glass" spacing="lg" className={styles.gridCard}>
          <Typography variant="h3" color="primary" className={styles.sectionTitle}>
            Units
          </Typography>
          {selectedCourse ? (
            <>
              <div className={styles.list}>
                {units
                  .filter(unit => unit.courseId === selectedCourse.courseId)
                  .map((unit) => (
                    <div
                      key={unit.unitId}
                      className={`${styles.listItem} ${
                        selectedUnit?.unitId === unit.unitId ? styles.selected : ''
                      }`}
                      onClick={() => setSelectedUnit(unit)}
                    >
                      <Typography variant="h4" color="white">
                        {unit.code}
                      </Typography>
                      <Typography variant="body" color="white">
                        {unit.title}
                      </Typography>
                      <Badge variant="info" size="sm">
                        {exams.filter(e => e.unitId === unit.unitId).length} exams
                      </Badge>
                    </div>
                  ))}
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleShowCreateForm('unit')}
              >
                + Create Unit
              </Button>
            </>
          ) : (
            <div className={styles.emptyState}>
              <Typography variant="body" color="white">
                Select a course to view units
              </Typography>
            </div>
          )}
        </Card>

        {/* Exam Selection */}
        <Card variant="glass" spacing="lg" className={styles.gridCard}>
          <Typography variant="h3" color="primary" className={styles.sectionTitle}>
            Exams
          </Typography>
          {selectedUnit ? (
            <>
              <div className={styles.list}>
                {exams
                  .filter(exam => exam.unitId === selectedUnit.unitId)
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
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleShowCreateForm('exam')}
              >
                + Create Exam
              </Button>
            </>
          ) : (
            <div className={styles.emptyState}>
              <Typography variant="body" color="white">
                Select a unit to view exams
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
                label="Course Code"
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder={`Auto-generated ${formType} code`}
                disabled={formType === 'course' || formType === 'unit' || formType === 'exam'}
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

            {(formType === 'course' || formType === 'exam') && (
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
    </Container>
  );
}
