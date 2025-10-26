/**
 * Utility functions for date operations
 */

/**
 * Format date to locale date string
 * @param {string|Date} date - The date to format
 * @returns {string} - Formatted date string
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

/**
 * Format date to locale date and time string
 * @param {string|Date} date - The date to format
 * @returns {string} - Formatted date and time string
 */
export function formatDateTime(date) {
  return new Date(date).toLocaleString();
}

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {string|Date} date - The date to compare
 * @returns {string} - Relative time string
 */
export function getRelativeTime(date) {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now - targetDate) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;

  return formatDate(date);
}


