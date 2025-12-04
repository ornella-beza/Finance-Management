const sgMail = require('@sendgrid/mail');

// Use modern environment variables instead of deprecated functions.config()
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@financeapp.com';

/**
 * Send transaction alert email
 */
async function sendTransactionAlertEmail({ to, userName, transaction, threshold }) {
  const subject = `🔔 Large Transaction Alert: ${transaction.type === 'income' ? '+' : '-'}$${transaction.amount}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .transaction-card { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${transaction.type === 'income' ? '#10B981' : '#EF4444'}; }
        .amount { font-size: 32px; font-weight: bold; color: ${transaction.type === 'income' ? '#10B981' : '#EF4444'}; }
        .button { display: inline-block; background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>💰 Transaction Alert</h1>
        </div>
        <div class="content">
          <p>Hi ${userName},</p>
          <p>A large transaction has been added to your account:</p>
          
          <div class="transaction-card">
            <div class="amount">${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}</div>
            <p><strong>Category:</strong> ${transaction.category}</p>
            <p><strong>Description:</strong> ${transaction.description}</p>
            <p><strong>Date:</strong> ${new Date(transaction.date).toLocaleDateString()}</p>
          </div>
          
          <p>This alert was triggered because the transaction amount exceeds your threshold of $${threshold}.</p>
          
          <a href="https://finance-management-nu-murex.vercel.app" class="button">View in App</a>
          
          <div class="footer">
            <p>You're receiving this email because you have transaction alerts enabled.</p>
            <p>To change your notification preferences, visit Settings in the app.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const msg = {
    to,
    from: FROM_EMAIL,
    subject,
    html,
  };

  return sgMail.send(msg);
}

/**
 * Send weekly summary email
 */
async function sendWeeklySummaryEmail({ to, userName, stats }) {
  const subject = `📊 Your Weekly Financial Summary`;
  
  const savingsRate = stats.totalIncome > 0 
    ? Math.round(((stats.totalIncome - stats.totalExpense) / stats.totalIncome) * 100) 
    : 0;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .stat-card { background: white; padding: 20px; border-radius: 8px; text-align: center; }
        .stat-value { font-size: 28px; font-weight: bold; color: #10B981; margin: 10px 0; }
        .stat-label { color: #666; font-size: 14px; }
        .button { display: inline-block; background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📊 Weekly Summary</h1>
          <p>${stats.weekStart} - ${stats.weekEnd}</p>
        </div>
        <div class="content">
          <p>Hi ${userName},</p>
          <p>Here's your financial summary for the past week:</p>
          
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-label">Total Income</div>
              <div class="stat-value" style="color: #10B981;">$${stats.totalIncome.toFixed(2)}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Total Expense</div>
              <div class="stat-value" style="color: #EF4444;">$${stats.totalExpense.toFixed(2)}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Net Savings</div>
              <div class="stat-value">$${(stats.totalIncome - stats.totalExpense).toFixed(2)}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Savings Rate</div>
              <div class="stat-value">${savingsRate}%</div>
            </div>
          </div>
          
          ${stats.topCategory ? `
            <p><strong>Top Spending Category:</strong> ${stats.topCategory.name} ($${stats.topCategory.amount.toFixed(2)})</p>
          ` : ''}
          
          <p><strong>Total Transactions:</strong> ${stats.transactionCount}</p>
          
          <a href="https://finance-management-nu-murex.vercel.app" class="button">View Full Report</a>
          
          <div class="footer">
            <p>You're receiving this weekly summary because you have email notifications enabled.</p>
            <p>To change your notification preferences, visit Settings in the app.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const msg = {
    to,
    from: FROM_EMAIL,
    subject,
    html,
  };

  return sgMail.send(msg);
}

/**
 * Send monthly report email
 */
async function sendMonthlyReportEmail({ to, userName, stats }) {
  const subject = `📈 Your Monthly Financial Report - ${stats.monthName}`;
  
  const savingsRate = stats.totalIncome > 0 
    ? Math.round(((stats.totalIncome - stats.totalExpense) / stats.totalIncome) * 100) 
    : 0;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .stat-card { background: white; padding: 20px; border-radius: 8px; text-align: center; }
        .stat-value { font-size: 28px; font-weight: bold; color: #10B981; margin: 10px 0; }
        .stat-label { color: #666; font-size: 14px; }
        .category-list { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .category-item { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .button { display: inline-block; background: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📈 Monthly Report</h1>
          <p>${stats.monthName} ${stats.year}</p>
        </div>
        <div class="content">
          <p>Hi ${userName},</p>
          <p>Here's your complete financial report for ${stats.monthName}:</p>
          
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-label">Total Income</div>
              <div class="stat-value" style="color: #10B981;">$${stats.totalIncome.toFixed(2)}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Total Expense</div>
              <div class="stat-value" style="color: #EF4444;">$${stats.totalExpense.toFixed(2)}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Net Savings</div>
              <div class="stat-value">$${(stats.totalIncome - stats.totalExpense).toFixed(2)}</div>
            </div>
            <div class="stat-card">
              <div class="stat-label">Savings Rate</div>
              <div class="stat-value">${savingsRate}%</div>
            </div>
          </div>
          
          ${stats.categoryBreakdown && stats.categoryBreakdown.length > 0 ? `
            <div class="category-list">
              <h3>Spending by Category</h3>
              ${stats.categoryBreakdown.map(cat => `
                <div class="category-item">
                  <span>${cat.name}</span>
                  <strong>$${cat.amount.toFixed(2)}</strong>
                </div>
              `).join('')}
            </div>
          ` : ''}
          
          <p><strong>Total Transactions:</strong> ${stats.transactionCount}</p>
          
          ${stats.comparison ? `
            <p><strong>Compared to last month:</strong></p>
            <ul>
              <li>Income: ${stats.comparison.incomeChange > 0 ? '+' : ''}${stats.comparison.incomeChange.toFixed(1)}%</li>
              <li>Expense: ${stats.comparison.expenseChange > 0 ? '+' : ''}${stats.comparison.expenseChange.toFixed(1)}%</li>
            </ul>
          ` : ''}
          
          <a href="https://finance-management-nu-murex.vercel.app" class="button">View Full Report</a>
          
          <div class="footer">
            <p>You're receiving this monthly report because you have email notifications enabled.</p>
            <p>To change your notification preferences, visit Settings in the app.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const msg = {
    to,
    from: FROM_EMAIL,
    subject,
    html,
  };

  return sgMail.send(msg);
}

module.exports = {
  sendTransactionAlertEmail,
  sendWeeklySummaryEmail,
  sendMonthlyReportEmail
};
