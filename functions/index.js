const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { sendTransactionAlertEmail, sendWeeklySummaryEmail, sendMonthlyReportEmail } = require('./utils/emailService');
const { calculateWeeklyStats, calculateMonthlyStats } = require('./utils/calculations');

admin.initializeApp();
const db = admin.firestore();

/**
 * Send email alert when a large transaction is created
 * Triggers on new transaction creation
 */
exports.sendTransactionAlert = functions.firestore
  .document('transactions/{transactionId}')
  .onCreate(async (snap, context) => {
    try {
      const transaction = snap.data();
      const transactionId = context.params.transactionId;

      // Get user data
      const userDoc = await db.collection('users').doc(transaction.userId).get();
      
      if (!userDoc.exists) {
        console.log('User not found:', transaction.userId);
        return null;
      }

      const userData = userDoc.data();
      
      // Check if user has email notifications enabled
      if (!userData.preferences?.emailNotifications) {
        console.log('Email notifications disabled for user:', transaction.userId);
        return null;
      }

      // Get threshold (default 500)
      const threshold = userData.preferences?.transactionAlertThreshold || 500;

      // Only send alert for large transactions
      if (transaction.amount >= threshold) {
        // Get user email from Firebase Auth
        const userRecord = await admin.auth().getUser(transaction.userId);
        
        await sendTransactionAlertEmail({
          to: userRecord.email,
          userName: userData.displayName || 'User',
          transaction: {
            ...transaction,
            id: transactionId
          },
          threshold
        });

        console.log('Transaction alert sent to:', userRecord.email);
      }

      return null;
    } catch (error) {
      console.error('Error sending transaction alert:', error);
      return null;
    }
  });

/**
 * Send weekly summary email every Monday at 9 AM (Africa/Kigali timezone)
 * Scheduled function
 */
exports.sendWeeklySummary = functions.pubsub
  .schedule('0 9 * * 1') // Every Monday at 9 AM
  .timeZone('Africa/Kigali')
  .onRun(async (context) => {
    try {
      // Get all users with weekly reports enabled
      const usersSnapshot = await db.collection('users')
        .where('preferences.emailNotifications', '==', true)
        .where('preferences.weeklyReports', '==', true)
        .get();

      const emailPromises = [];

      for (const userDoc of usersSnapshot.docs) {
        const userData = userDoc.data();
        const userId = userDoc.id;

        try {
          // Calculate weekly stats
          const stats = await calculateWeeklyStats(userId);

          // Get user email
          const userRecord = await admin.auth().getUser(userId);

          // Send email
          emailPromises.push(
            sendWeeklySummaryEmail({
              to: userRecord.email,
              userName: userData.displayName || 'User',
              stats
            })
          );
        } catch (error) {
          console.error(`Error processing user ${userId}:`, error);
        }
      }

      await Promise.all(emailPromises);
      console.log(`Sent ${emailPromises.length} weekly summary emails`);

      return null;
    } catch (error) {
      console.error('Error sending weekly summaries:', error);
      return null;
    }
  });

/**
 * Send monthly report on the 1st of each month at 9 AM
 * Scheduled function
 */
exports.sendMonthlyReport = functions.pubsub
  .schedule('0 9 1 * *') // 1st of each month at 9 AM
  .timeZone('Africa/Kigali')
  .onRun(async (context) => {
    try {
      // Get all users with monthly reports enabled
      const usersSnapshot = await db.collection('users')
        .where('preferences.emailNotifications', '==', true)
        .where('preferences.monthlyReports', '==', true)
        .get();

      const emailPromises = [];

      for (const userDoc of usersSnapshot.docs) {
        const userData = userDoc.data();
        const userId = userDoc.id;

        try {
          // Calculate monthly stats
          const stats = await calculateMonthlyStats(userId);

          // Get user email
          const userRecord = await admin.auth().getUser(userId);

          // Send email
          emailPromises.push(
            sendMonthlyReportEmail({
              to: userRecord.email,
              userName: userData.displayName || 'User',
              stats
            })
          );
        } catch (error) {
          console.error(`Error processing user ${userId}:`, error);
        }
      }

      await Promise.all(emailPromises);
      console.log(`Sent ${emailPromises.length} monthly report emails`);

      return null;
    } catch (error) {
      console.error('Error sending monthly reports:', error);
      return null;
    }
  });
