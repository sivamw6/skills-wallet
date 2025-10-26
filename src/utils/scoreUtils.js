/**
 * Utility functions for score-related operations
 */

/**
 * Get score variant based on score value
 * @param {number} score - The score value
 * @returns {string} - The variant name
 */
export function getScoreVariant(score) {
  if (score >= 90) return "success";
  if (score >= 80) return "success";
  if (score >= 70) return "warning";
  if (score >= 50) return "warning";
  return "error";
}

/**
 * Get score color based on score value
 * @param {number} score - The score value
 * @returns {string} - The color name
 */
export function getScoreColor(score) {
  if (score >= 90) return "success";
  if (score >= 80) return "success";
  if (score >= 70) return "warning";
  if (score >= 50) return "warning";
  return "error";
}

/**
 * Check if score is passing
 * @param {number} score - The score value
 * @param {number} passingScore - The passing score threshold (default: 70)
 * @returns {boolean} - Whether the score is passing
 */
export function isPassingScore(score, passingScore = 70) {
  return score >= passingScore;
}

/**
 * Format score for display
 * @param {number} score - The score value
 * @returns {string} - Formatted score string
 */
export function formatScore(score) {
  return `${score}%`;
}


