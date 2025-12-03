export const renderLogin = () => {
    return `
        <div class="auth-wrapper">
            <!-- Left Side: Marketing Info -->
            <div class="auth-info">
                <div class="auth-logo-large">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17 6H23V12" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h1>Manage Your Money</h1>
                <p class="subtitle">Track expenses, visualize spending patterns, and take control of your finances with our intuitive personal finance tracker.</p>
                
                <div class="features-list">
                    <div class="feature-item">
                        <div class="feature-dot"></div>
                        Real-time expense tracking
                    </div>
                    <div class="feature-item">
                        <div class="feature-dot"></div>
                        Smart analytics & insights
                    </div>
                    <div class="feature-item">
                        <div class="feature-dot"></div>
                        Export & backup your data
                    </div>
                </div>
            </div>

            <!-- Right Side: Auth Form -->
            <div class="auth-card-container">
                <div class="auth-tabs">
                    <button class="tab-btn active">Sign In</button>
                    <button class="tab-btn" id="switch-to-signup">Create Account</button>
                </div>

                <form id="login-form">
                    <div class="input-group">
                        <label class="input-label">Email</label>
                        <div class="input-with-icon">
                            <div class="input-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </div>
                            <input type="email" id="email" class="input-field has-icon" placeholder="you@example.com" required>
                        </div>
                    </div>
                    <div class="input-group">
                        <label class="input-label">Password</label>
                        <div class="input-with-icon">
                            <div class="input-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            </div>
                            <input type="password" id="password" class="input-field has-icon" placeholder="••••••••" required>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                </form>

                <div class="divider">Or continue with</div>

                <button class="btn-google">
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                </button>
            </div>
        </div>
    `;
};

export const renderSignup = () => {
    return `
        <div class="auth-wrapper">
            <!-- Left Side: Marketing Info (Same as Login) -->
            <div class="auth-info">
                <div class="auth-logo-large">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M17 6H23V12" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h1>Manage Your Money</h1>
                <p class="subtitle">Track expenses, visualize spending patterns, and take control of your finances with our intuitive personal finance tracker.</p>
                
                <div class="features-list">
                    <div class="feature-item">
                        <div class="feature-dot"></div>
                        Real-time expense tracking
                    </div>
                    <div class="feature-item">
                        <div class="feature-dot"></div>
                        Smart analytics & insights
                    </div>
                    <div class="feature-item">
                        <div class="feature-dot"></div>
                        Export & backup your data
                    </div>
                </div>
            </div>

            <!-- Right Side: Auth Form -->
            <div class="auth-card-container">
                <div class="auth-tabs">
                    <button class="tab-btn" id="switch-to-login">Sign In</button>
                    <button class="tab-btn active">Create Account</button>
                </div>

                <form id="signup-form">
                    <div class="input-group">
                        <label class="input-label">Full Name</label>
                        <div class="input-with-icon">
                            <div class="input-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            </div>
                            <input type="text" id="fullname" class="input-field has-icon" placeholder="John Doe" required>
                        </div>
                    </div>
                    <div class="input-group">
                        <label class="input-label">Email</label>
                        <div class="input-with-icon">
                            <div class="input-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </div>
                            <input type="email" id="email" class="input-field has-icon" placeholder="you@example.com" required>
                        </div>
                    </div>
                    <div class="input-group">
                        <label class="input-label">Password</label>
                        <div class="input-with-icon">
                            <div class="input-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                            </div>
                            <input type="password" id="password" class="input-field has-icon" placeholder="••••••••" minlength="8" required>
                        </div>
                        <p class="password-hint">Password must be at least 8 characters long</p>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Create Account</button>
                </form>

                <p class="legal-text">
                    By signing up, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    `;
};

export const renderDashboard = (user) => {
    return `
        <div class="dashboard-container">
            <aside class="sidebar">
                <div class="sidebar-header">
                    <div class="sidebar-brand">Finance</div>
                    <div class="sidebar-subtitle">Personal Tracker</div>
                </div>
                <nav class="nav-links">
                    <div class="nav-item active" data-page="analytics">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                        Analytics
                    </div>
                    <div class="nav-item" data-page="transactions">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                        Transactions
                    </div>
                    <div class="nav-item" data-page="dashboard">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                        Dashboard
                    </div>
                    <div class="nav-item" data-page="settings">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                        Settings
                    </div>
                </nav>
                <div class="user-profile" style="margin-top: auto;">
                    <button id="logout-btn" class="btn btn-outline btn-block" style="justify-content: flex-start; border: 1px solid var(--border-color);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.75rem;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                        Sign Out
                    </button>
                </div>
            </aside>
            <main class="main-content" id="main-view">
                <!-- Content injected here -->
            </main>
        </div>
    `;
};

export const renderDashboardContent = (transactions, user) => {
    // Calculate stats
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = totalIncome - totalExpense;
    const userName = user.displayName ? user.displayName.split(' ')[0] : 'User';

    return `
        <div class="welcome-section">
            <h1 class="welcome-title">Welcome back, ${userName}!</h1>
            <p class="welcome-subtitle">Here's your financial overview for this month</p>
        </div>

        <div class="stats-grid" style="margin-bottom: 2rem;">
            <div class="card stats-card-large">
                <div class="stats-card-header">
                    <span class="stats-card-label">Total Balance</span>
                    <div class="stats-icon-large balance">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    </div>
                </div>
                <div class="stats-value-large">$${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
            <div class="card stats-card-large">
                <div class="stats-card-header">
                    <span class="stats-card-label">This Month Income</span>
                    <div class="stats-icon-large income">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                    </div>
                </div>
                <div class="stats-value-large">$${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
            <div class="card stats-card-large">
                <div class="stats-card-header">
                    <span class="stats-card-label">This Month Expense</span>
                    <div class="stats-icon-large expense">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                    </div>
                </div>
                <div class="stats-value-large">$${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
        </div>

        <div class="chart-container-large">
            <h3 class="section-title">Balance Trend</h3>
            <div style="height: 320px; width: 100%;">
                <canvas id="balanceTrendChart"></canvas>
            </div>
        </div>

        <div class="section-header">
            <h3 class="section-title">Recent Transactions</h3>
            <button id="add-transaction-btn" class="btn btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add Transaction
            </button>
        </div>

        <div class="transactions-list">
            ${transactions.slice(0, 5).map(t => `
                <div class="transaction-card">
                    <div class="t-card-left">
                        <div class="t-card-icon ${t.type}">
                            ${t.category === 'Salary' || t.category === 'Freelance' ? 
                                '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>' : 
                                t.category === 'Food' ? 
                                '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3"></path></svg>' :
                                t.category === 'Transportation' ?
                                '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>' :
                                '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>'
                            }
                        </div>
                        <div class="t-card-info">
                            <h4>${t.description}</h4>
                            <p>${t.category}</p>
                        </div>
                    </div>
                    <div class="t-card-right">
                        <div class="t-card-amount ${t.type}">
                            ${t.type === 'income' ? '+' : '-'}$${t.amount.toFixed(2)}
                        </div>
                        <div class="t-card-date">${new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                    </div>
                </div>
            `).join('')}
            ${transactions.length === 0 ? '<div style="text-align: center; padding: 2rem; color: var(--text-medium);">No recent transactions</div>' : ''}
        </div>
    `;
};

export const renderAnalytics = (transactions) => {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    
    // Mock data for "Top Category"
    const topCategory = "Food"; // This would be calculated in a real app
    const topCategoryAmount = 450.00;

    return `
        <div class="analytics-header">
            <h2 class="analytics-title">Analytics</h2>
            <p class="analytics-subtitle">Visualize your spending patterns and financial insights</p>
        </div>

        <div class="stats-grid">
            <div class="card stat-card">
                <div class="flex justify-between items-center">
                    <span class="stat-label">Top Category</span>
                    <div style="width: 32px; height: 32px; background: #E6FFFA; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--primary-color);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                    </div>
                </div>
                <span class="stat-value">$${topCategoryAmount.toFixed(2)}</span>
            </div>
            <div class="card stat-card">
                <div class="flex justify-between items-center">
                    <span class="stat-label">Total Income (YTD)</span>
                    <div style="width: 32px; height: 32px; background: #E6FFFA; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--primary-color);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                    </div>
                </div>
                <span class="stat-value">$${totalIncome.toFixed(2)}</span>
            </div>
            <div class="card stat-card">
                <div class="flex justify-between items-center">
                    <span class="stat-label">Total Expense (YTD)</span>
                    <div style="width: 32px; height: 32px; background: #FEF2F2; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--danger-color);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                    </div>
                </div>
                <span class="stat-value">$${totalExpense.toFixed(2)}</span>
            </div>
        </div>

        <div class="charts-grid">
            <div class="card">
                <h3 style="margin-bottom: 1.5rem; font-weight: 600;">Income vs Expense</h3>
                <canvas id="incomeExpenseChart"></canvas>
            </div>
            <div class="card">
                <h3 style="margin-bottom: 1.5rem; font-weight: 600;">Spending by Category</h3>
                <canvas id="categoryChart"></canvas>
            </div>
        </div>

        <div class="summary-section">
            <h3 style="font-weight: 700; font-size: 1.25rem; margin-bottom: 1rem;">Summary</h3>
            <div class="summary-grid">
                <div class="summary-item">
                    <h4>Savings Rate</h4>
                    <div class="value green">52%</div>
                </div>
                <div class="summary-item">
                    <h4>Average Monthly Expense</h4>
                    <div class="value">$1,767.67</div>
                </div>
                <div class="summary-item">
                    <h4>Average Monthly Income</h4>
                    <div class="value">$3,490.00</div>
                </div>
            </div>
        </div>
    `;
};

export const renderTransactions = (transactions) => {
    return `
        <div class="page-header">
            <h2 class="page-title">Transactions</h2>
            <p style="color: var(--text-medium);">View and manage all your financial transactions</p>
        </div>

        <div class="filters-bar">
            <div class="filter-group" style="flex: 2;">
                <label>Search</label>
                <div class="input-with-icon">
                    <div class="input-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                    <input type="text" class="input-field has-icon" placeholder="Search transactions...">
                </div>
            </div>
            <div class="filter-group">
                <label>Category</label>
                <select class="input-field">
                    <option value="All">All Categories</option>
                    <option value="Salary">Salary</option>
                    <option value="Food">Food</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <button id="add-transaction-btn" class="btn btn-primary" style="height: 42px; margin-bottom: 1px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add Transaction
            </button>
        </div>

        <div class="transactions-list">
            ${transactions.map(t => `
                <div class="transaction-card">
                    <div class="t-card-left">
                        <div class="t-card-icon ${t.type}">
                            ${t.category === 'Salary' || t.category === 'Freelance' ? 
                                '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>' : 
                                t.category === 'Food' ? 
                                '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3"></path></svg>' :
                                t.category === 'Transportation' ?
                                '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>' :
                                '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>'
                            }
                        </div>
                        <div class="t-card-info">
                            <h4>${t.description}</h4>
                            <p>${t.category}</p>
                        </div>
                    </div>
                    <div class="t-card-right">
                        <div class="t-card-amount ${t.type}">
                            ${t.type === 'income' ? '+' : '-'}$${t.amount.toFixed(2)}
                        </div>
                        <div class="t-card-date">${new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                    </div>
                    <div class="t-card-actions">
                        <button class="action-btn view-btn" data-id="${t.id}" title="View Details">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        </button>
                        <button class="action-btn edit-btn" data-id="${t.id}" title="Edit">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button class="action-btn delete-btn" data-id="${t.id}" title="Delete">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </div>
                </div>
            `).join('')}
            ${transactions.length === 0 ? '<div style="text-align: center; padding: 3rem; color: var(--text-medium);">No transactions found</div>' : ''}
        </div>
    `;
};

export const renderModal = (transaction = null) => {
    const isEdit = !!transaction;
    const type = transaction ? transaction.type : 'expense';
    const date = transaction ? transaction.date : new Date().toISOString().split('T')[0];
    
    return `
        <div class="modal-overlay" id="transaction-modal">
            <div class="modal">
                <div class="modal-header">
                    <div>
                        <h3 class="modal-title">${isEdit ? 'Edit Transaction' : 'Add Transaction'}</h3>
                        <p style="color: var(--text-medium); font-size: 0.875rem; margin-top: 0.25rem;">${isEdit ? 'Update transaction details' : 'Record a new income or expense transaction'}</p>
                    </div>
                    <button class="close-btn" id="close-modal">&times;</button>
                </div>
                <form id="transaction-form" data-mode="${isEdit ? 'edit' : 'add'}" ${isEdit ? `data-id="${transaction.id}"` : ''}>
                    <div class="modal-body">
                        <div class="segmented-control">
                            <button type="button" class="segment-btn ${type === 'expense' ? 'active' : ''}" data-value="expense">Expense</button>
                            <button type="button" class="segment-btn ${type === 'income' ? 'active' : ''}" data-value="income">Income</button>
                        </div>
                        <input type="hidden" name="type" id="transaction-type" value="${type}">

                        <div class="input-group">
                            <label class="input-label">Amount *</label>
                            <div class="input-with-icon">
                                <div class="input-icon" style="color: var(--text-dark); font-weight: 600;">$</div>
                                <input type="number" name="amount" class="input-field has-icon" placeholder="0.00" step="0.01" required value="${transaction ? transaction.amount : ''}">
                            </div>
                        </div>

                        <div class="input-group">
                            <label class="input-label">Category *</label>
                            <select name="category" class="input-field" required>
                                <option value="Salary" ${transaction && transaction.category === 'Salary' ? 'selected' : ''}>Salary</option>
                                <option value="Food" ${transaction && transaction.category === 'Food' ? 'selected' : ''}>Food</option>
                                <option value="Transportation" ${transaction && transaction.category === 'Transportation' ? 'selected' : ''}>Transportation</option>
                                <option value="Entertainment" ${transaction && transaction.category === 'Entertainment' ? 'selected' : ''}>Entertainment</option>
                                <option value="Utilities" ${transaction && transaction.category === 'Utilities' ? 'selected' : ''}>Utilities</option>
                                <option value="Freelance" ${transaction && transaction.category === 'Freelance' ? 'selected' : ''}>Freelance</option>
                                <option value="Other" ${transaction && transaction.category === 'Other' ? 'selected' : ''}>Other</option>
                            </select>
                        </div>

                        <div class="input-group">
                            <label class="input-label">Date *</label>
                            <div class="input-with-icon">
                                <div class="input-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                </div>
                                <input type="date" name="date" class="input-field has-icon" required value="${date}">
                            </div>
                        </div>

                        <div class="input-group">
                            <label class="input-label">Description *</label>
                            <input type="text" name="description" class="input-field" placeholder="e.g., Grocery shopping, Monthly rent..." required value="${transaction ? transaction.description : ''}">
                        </div>

                        <div class="input-group">
                            <label class="input-label">Receipt (Optional)</label>
                            <div class="upload-area">
                                <div class="upload-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                </div>
                                <div class="upload-text">Click to upload receipt image</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline" id="cancel-modal" style="border: 1px solid var(--border-color);">Cancel</button>
                        <button type="submit" class="btn btn-primary">${isEdit ? 'Save Changes' : 'Add Transaction'}</button>
                    </div>
                </form>
            </div>
        </div>
    `;
};

export const renderSettings = (user) => {
    return `
        <div class="page-header">
            <h2 class="page-title">Settings</h2>
            <p style="color: var(--text-medium);">Manage your account preferences and settings</p>
        </div>

        <div class="card settings-section">
            <h3 class="settings-section-title">Profile Settings</h3>
            
            <div class="input-group">
                <label class="input-label">Full Name</label>
                <input type="text" class="input-field readonly" value="${user.displayName || 'User'}" readonly>
            </div>

            <div class="input-group">
                <label class="input-label">Email Address</label>
                <input type="email" class="input-field readonly" value="${user.email}" readonly>
            </div>

            <button class="btn btn-outline btn-icon-text" style="border: 1px solid var(--border-color);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                Change Password
            </button>
        </div>

        <div class="card settings-section">
            <h3 class="settings-section-title">Preferences</h3>
            
            <div class="input-group">
                <label class="input-label">Currency</label>
                <select class="input-field">
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">British Pound (GBP)</option>
                </select>
                <p style="font-size: 0.75rem; color: var(--text-light); margin-top: 0.5rem;">This will be used to format all currency values</p>
            </div>

            <div class="checkbox-wrapper">
                <div>
                    <div class="checkbox-label">Email Notifications</div>
                    <div class="checkbox-desc">Receive updates about your finances</div>
                </div>
                <input type="checkbox" class="custom-checkbox" checked>
            </div>
        </div>

        <div class="card settings-section">
            <h3 class="settings-section-title">Data Management</h3>
            
            <button class="btn btn-primary btn-block btn-icon-text" style="justify-content: center;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Export Transactions as CSV
            </button>
            <p style="font-size: 0.875rem; color: var(--text-medium); margin-top: 1rem;">Download all your transaction data in CSV format for backup or analysis.</p>
        </div>

        <div class="card settings-section">
            <h3 class="settings-section-title">Security</h3>
            
            <button class="btn btn-outline btn-block btn-icon-text" style="justify-content: center; border: 1px solid var(--border-color);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                Enable Two-Factor Authentication
            </button>
            <p style="font-size: 0.875rem; color: var(--text-medium); margin-top: 1rem;">Add an extra layer of security to your account</p>
        </div>

        <div class="card settings-section danger-zone">
            <h3 class="settings-section-title">Danger Zone</h3>
            <p>These actions cannot be undone. Please proceed with caution.</p>
            
            <button class="btn-danger-block">
                Delete Account
            </button>
        </div>
    `;
};
