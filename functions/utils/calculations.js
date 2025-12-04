const admin = require('firebase-admin');
const { startOfWeek, endOfWeek, startOfMonth, endOfMonth, subMonths, format } = require('date-fns');

const db = admin.firestore();

/**
 * Calculate weekly statistics for a user
 */
async function calculateWeeklyStats(userId) {
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

  const transactionsSnapshot = await db.collection('transactions')
    .where('userId', '==', userId)
    .where('date', '>=', weekStart.toISOString().split('T')[0])
    .where('date', '<=', weekEnd.toISOString().split('T')[0])
    .get();

  let totalIncome = 0;
  let totalExpense = 0;
  const categoryTotals = {};

  transactionsSnapshot.forEach(doc => {
    const transaction = doc.data();
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
      categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
    }
  });

  // Find top category
  let topCategory = null;
  let maxAmount = 0;
  Object.entries(categoryTotals).forEach(([name, amount]) => {
    if (amount > maxAmount) {
      maxAmount = amount;
      topCategory = { name, amount };
    }
  });

  return {
    weekStart: format(weekStart, 'MMM d'),
    weekEnd: format(weekEnd, 'MMM d, yyyy'),
    totalIncome,
    totalExpense,
    topCategory,
    transactionCount: transactionsSnapshot.size
  };
}

/**
 * Calculate monthly statistics for a user
 */
async function calculateMonthlyStats(userId) {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);
  const prevMonthStart = startOfMonth(subMonths(now, 1));
  const prevMonthEnd = endOfMonth(subMonths(now, 1));

  // Current month transactions
  const currentMonthSnapshot = await db.collection('transactions')
    .where('userId', '==', userId)
    .where('date', '>=', monthStart.toISOString().split('T')[0])
    .where('date', '<=', monthEnd.toISOString().split('T')[0])
    .get();

  let totalIncome = 0;
  let totalExpense = 0;
  const categoryTotals = {};

  currentMonthSnapshot.forEach(doc => {
    const transaction = doc.data();
    if (transaction.type === 'income') {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
      categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount;
    }
  });

  // Previous month for comparison
  const prevMonthSnapshot = await db.collection('transactions')
    .where('userId', '==', userId)
    .where('date', '>=', prevMonthStart.toISOString().split('T')[0])
    .where('date', '<=', prevMonthEnd.toISOString().split('T')[0])
    .get();

  let prevIncome = 0;
  let prevExpense = 0;

  prevMonthSnapshot.forEach(doc => {
    const transaction = doc.data();
    if (transaction.type === 'income') {
      prevIncome += transaction.amount;
    } else {
      prevExpense += transaction.amount;
    }
  });

  // Calculate changes
  const incomeChange = prevIncome > 0 ? ((totalIncome - prevIncome) / prevIncome) * 100 : 0;
  const expenseChange = prevExpense > 0 ? ((totalExpense - prevExpense) / prevExpense) * 100 : 0;

  // Category breakdown
  const categoryBreakdown = Object.entries(categoryTotals)
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5); // Top 5 categories

  return {
    monthName: format(now, 'MMMM'),
    year: format(now, 'yyyy'),
    totalIncome,
    totalExpense,
    categoryBreakdown,
    transactionCount: currentMonthSnapshot.size,
    comparison: {
      incomeChange,
      expenseChange
    }
  };
}

module.exports = {
  calculateWeeklyStats,
  calculateMonthlyStats
};
