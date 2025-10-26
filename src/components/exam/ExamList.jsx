import React, { useState } from 'react';
import {
  Card,
  Typography,
  Button,
  Badge,
  Grid,
  EmptyState
} from '../ui';
import styles from './ExamList.module.scss';

/**
 * Exam List Component
 * Displays a list of exams with management options
 */
export default function ExamList({ 
  exams = [], 
  onEditExam, 
  onDeleteExam, 
  onTakeExam,
  onViewDetails,
  showActions = true 
}) {
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterBy, setFilterBy] = useState('all');

  const sortExams = (exams) => {
    return [...exams].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  const filterExams = (exams) => {
    if (filterBy === 'all') return exams;
    
    return exams.filter(exam => {
      switch (filterBy) {
        case 'active':
          return exam.status === 'active';
        case 'draft':
          return exam.status === 'draft';
        case 'archived':
          return exam.status === 'archived';
        case 'recent':
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return new Date(exam.createdAt) > weekAgo;
        default:
          return true;
      }
    });
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'info';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success';
      case 'draft': return 'warning';
      case 'archived': return 'error';
      default: return 'info';
    }
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const sortedAndFilteredExams = filterExams(sortExams(exams));

  if (exams.length === 0) {
    return (
      <EmptyState
        icon="📝"
        title="No Exams Found"
        description="Create your first exam to get started."
        actionText="Create Exam"
        onAction={() => onEditExam && onEditExam()}
      />
    );
  }

  return (
    <div className={styles.examList}>
      {/* Filters and Sorting */}
      <div className={styles.controls}>
        <div className={styles.filters}>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Exams</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
            <option value="recent">Recent (7 days)</option>
          </select>
          
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
            }}
            className={styles.sortSelect}
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="difficulty-asc">Difficulty: Easy to Hard</option>
            <option value="difficulty-desc">Difficulty: Hard to Easy</option>
          </select>
        </div>
        
        <div className={styles.stats}>
          <Typography variant="body" color="white">
            Showing {sortedAndFilteredExams.length} of {exams.length} exams
          </Typography>
        </div>
      </div>

      {/* Exam Grid: single column inside side panel to prevent overlap */}
      <Grid columns={1} gap="lg" className={styles.examGrid}>
        {sortedAndFilteredExams.map((exam) => (
          <Card key={exam.examId} variant="glass" className={styles.examCard}>
            <div className={styles.examHeader}>
              <div className={styles.examTitle}>
                <Typography variant="h4" color="white">
                  {exam.title}
                </Typography>
                <Typography variant="body" color="gray">
                  {exam.code}
                </Typography>
              </div>
              
              <div className={styles.examBadges}>
                <Badge variant={getDifficultyColor(exam.difficulty)} size="sm">
                  {exam.difficulty}
                </Badge>
                <Badge variant={getStatusColor(exam.status)} size="sm">
                  {exam.status}
                </Badge>
              </div>
            </div>

            <div className={styles.examDescription}>
              <Typography variant="body" color="white">
                {exam.description}
              </Typography>
            </div>

            <div className={styles.examStats}>
              <div className={styles.statItem}>
                <Typography variant="h5" color="primary">
                  {exam.totalQuestions || exam.questions?.length || 0}
                </Typography>
                <Typography variant="body" color="gray">
                  Questions
                </Typography>
              </div>
              
              <div className={styles.statItem}>
                <Typography variant="h5" color="secondary">
                  {formatDuration(Math.max(0, Math.round((exam.timeLimit || 0) / 60)))}
                </Typography>
                <Typography variant="body" color="gray">
                  Duration
                </Typography>
              </div>
              
              <div className={styles.statItem}>
                <Typography variant="h5" color="warning">
                  {exam.passingScore || 70}%
                </Typography>
                <Typography variant="body" color="gray">
                  Pass Score
                </Typography>
              </div>
            </div>

            {exam.skills && exam.skills.length > 0 && (
              <div className={styles.examSkills}>
                <Typography variant="body" color="gray" className={styles.skillsLabel}>
                  Skills:
                </Typography>
                <div className={styles.skillTags}>
                  {exam.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="info" size="sm">
                      {skill}
                    </Badge>
                  ))}
                  {exam.skills.length > 3 && (
                    <Badge variant="secondary" size="sm">
                      +{exam.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {showActions && (
              <div className={styles.examActions}>
                {onTakeExam && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onTakeExam(exam.examId)}
                    className={styles.actionButton}
                  >
                    Take Exam
                  </Button>
                )}
                
                {onViewDetails && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onViewDetails(exam.examId)}
                    className={styles.actionButton}
                  >
                    View Details
                  </Button>
                )}
                
                {onEditExam && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => onEditExam(exam)}
                    className={styles.actionButton}
                  >
                    Edit
                  </Button>
                )}
                
                {onDeleteExam && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDeleteExam(exam.examId)}
                    className={styles.actionButton}
                  >
                    Delete
                  </Button>
                )}
              </div>
            )}

            <div className={styles.examFooter}>
              <Typography variant="body" color="gray" className={styles.examMeta}>
                Created: {exam.createdAt ? new Date(exam.createdAt).toLocaleDateString() : 'N/A'}
                {exam.updatedAt && exam.updatedAt !== exam.createdAt && (
                  <span> • Updated: {new Date(exam.updatedAt).toLocaleDateString()}</span>
                )}
              </Typography>
            </div>
          </Card>
        ))}
      </Grid>

      {sortedAndFilteredExams.length === 0 && exams.length > 0 && (
        <EmptyState
          icon="🔍"
          title="No Exams Match Your Filter"
          description="Try adjusting your filter criteria to see more exams."
        />
      )}
    </div>
  );
}


