import { formatCurrency, getCurrencyPreference } from './settings.js';

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
                            <button type="button" class="password-toggle" id="toggle-password-login" aria-label="Toggle password visibility">
                                <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
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
                            <button type="button" class="password-toggle" id="toggle-password-signup" aria-label="Toggle password visibility">
                                <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
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
    const userName = user?.displayName?.split(' ')[0] || 'User';
    const userEmail = user?.email || 'user@example.com';
    const userInitial = userName.charAt(0).toUpperCase();

    return `
        <div class="dashboard-container">
            <!-- Mobile Overlay -->
            <div class="mobile-overlay" id="mobile-overlay"></div>
            
            <!-- Sidebar -->
            <aside class="sidebar">
                <div class="sidebar-header">
                    <div class="sidebar-logo">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23 6L13.5 15.5L8.5 10.5L1 18" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M17 6H23V12" stroke="#10B981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="sidebar-brand">
                        <div class="sidebar-brand-name">Finance</div>
                        <div class="sidebar-subtitle">Personal Tracker</div>
                    </div>
                </div>
                
                <nav class="nav-links">
                    <a href="#" class="nav-item active" data-page="dashboard">
                        <div class="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="3" width="7" height="7"></rect>
                                <rect x="14" y="3" width="7" height="7"></rect>
                                <rect x="14" y="14" width="7" height="7"></rect>
                                <rect x="3" y="14" width="7" height="7"></rect>
                            </svg>
                        </div>
                        <span>Dashboard</span>
                    </a>
                    <a href="#" class="nav-item" data-page="transactions">
                        <div class="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        </div>
                        <span>Transactions</span>
                    </a>
                    <a href="#" class="nav-item" data-page="categories">
                        <div class="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                                <line x1="7" y1="7" x2="7.01" y2="7"></line>
                            </svg>
                        </div>
                        <span>Categories</span>
                    </a>
                    <a href="#" class="nav-item" data-page="analytics">
                        <div class="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="20" x2="18" y2="10"></line>
                                <line x1="12" y1="20" x2="12" y2="4"></line>
                                <line x1="6" y1="20" x2="6" y2="14"></line>
                            </svg>
                        </div>
                        <span>Analytics</span>
                    </a>
                    <a href="#" class="nav-item" data-page="settings">
                        <div class="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                            </svg>
                        </div>
                        <span>Settings</span>
                    </a>
                </nav>
                
                <div class="sidebar-footer">
                    <a href="#" class="nav-item" id="logout-btn">
                        <div class="nav-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                <polyline points="16 17 21 12 16 7"></polyline>
                                <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                        </div>
                        <span>Sign Out</span>
                    </a>
                </div>
            </aside>
            <!-- Main Content Area -->
            <div class="main-wrapper">
                <!-- Top Header -->
                <header class="top-header">
                    <div class="header-left">
                        <button class="mobile-menu-btn" id="mobile-menu-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                        <h1 class="header-title">Dashboard</h1>
                    </div>
                    
                    <!-- User Menu -->
                    <div class="user-menu">
                        <div class="user-info">
                            <span class="user-name">${userName}</span>
                            <span class="user-email">${userEmail}</span>
                        </div>
                        <div class="user-avatar" id="user-menu-btn">
                            ${userInitial}
                        </div>
                        <div class="user-dropdown" id="user-dropdown">
                            <a href="#" class="dropdown-item" id="profile-settings">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                Profile Settings
                            </a>
                            <a href="#" class="dropdown-item" id="account-settings">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                </svg>
                                Account Settings
                            </a>
                            <div class="dropdown-divider"></div>
                            <a href="#" class="dropdown-item text-danger" id="logout-btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                    <polyline points="16 17 21 12 16 7"></polyline>
                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                </svg>
                                Sign Out
                            </a>
                        </div>
                    </div>
                </header>

                <!-- Main Content -->
                <main class="main-content" id="main-view">
                    <!-- Content will be injected here by JavaScript -->
                </main>
            </div>
        </div>
    `;
};

export const renderDashboardContent = (transactions = [], user) => {
    const currency = getCurrencyPreference();
    
    // Filter transactions for the current month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const monthlyTransactions = transactions.filter(t => {
        const transactionDate = t.date.toDate ? t.date.toDate() : new Date(t.date);
        return (
            transactionDate.getMonth() === currentMonth && 
            transactionDate.getFullYear() === currentYear
        );
    });
    
    // Calculate stats
    const totalIncome = monthlyTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
    
    const totalExpense = monthlyTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
    
    const balance = totalIncome - totalExpense;
    
    // Sort transactions by date (newest first)
    const sortedTransactions = [...transactions].sort((a, b) => {
        const dateA = a.date.toDate ? a.date.toDate() : new Date(a.date);
        const dateB = b.date.toDate ? b.date.toDate() : new Date(b.date);
        return dateB - dateA;
    });

    return `
        <!-- Dashboard Stats Cards -->
        <div class="dashboard-stats">
            <div class="stat-card balance-card">
                <div class="stat-header">
                    <span class="stat-label">Total Balance</span>
                    <div class="stat-icon balance-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                    </div>
                </div>
                <div class="stat-amount">${formatCurrency(balance, currency)}</div>
            </div>
            
            <div class="stat-card income-card">
                <div class="stat-header">
                    <span class="stat-label">This Month Income</span>
                    <div class="stat-icon income-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                            <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                    </div>
                </div>
                <div class="stat-amount">${formatCurrency(totalIncome, currency)}</div>
            </div>
            
            <div class="stat-card expense-card">
                <div class="stat-header">
                    <span class="stat-label">This Month Expense</span>
                    <div class="stat-icon expense-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="1 18 8.5 10.5 13.5 15.5 23 6"></polyline>
                            <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                    </div>
                </div>
                <div class="stat-amount">${formatCurrency(totalExpense, currency)}</div>
            </div>
        </div>

        <!-- Balance Trend Chart -->
        <div class="chart-section">
            <h3 class="section-title">Balance Trend</h3>
            <div class="chart-container">
                <canvas id="balanceTrendChart"></canvas>
            </div>
        </div>

        <!-- Recent Transactions -->
        <div class="transactions-section">
            <div class="section-header">
                <h3 class="section-title">Recent Transactions</h3>
                <button id="add-transaction-btn" class="btn-add">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add Transaction
                </button>
            </div>
            
            <div class="transactions-list">
                ${sortedTransactions.length > 0 ? sortedTransactions.slice(0, 5).map(transaction => {
                    const isIncome = transaction.type === 'income';
                    const amount = Number.parseFloat(transaction.amount || 0);
                    const formattedAmount = formatCurrency(amount, currency);
                    const transactionDate = transaction.date.toDate ? transaction.date.toDate() : new Date(transaction.date);
                    const formattedDate = transactionDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    
                    const getCategoryIcon = (category) => {
                        const icons = {
                            'Salary': '📈',
                            'Food': '☕',
                            'Shopping': '🛍️',
                            'Transportation': '🚗',
                            'Housing': '🏠',
                            'Entertainment': '🎬',
                            'Utilities': '⚡',
                            'Healthcare': '❤️',
                            'Education': '📚',
                            'Other': '💰'
                        };
                        return icons[category] || icons['Other'];
                    };
                    
                    const amountText = isIncome 
                        ? `+${formattedAmount.replace(/[^0-9.,]/g, '')}` 
                        : `-${formattedAmount.replace(/[^0-9.,]/g, '')}`;
                    
                    return `
                        <div class="transaction-row">
                            <div class="transaction-left">
                                <div class="transaction-icon">${getCategoryIcon(transaction.category)}</div>
                                <div class="transaction-info">
                                    <div class="transaction-name">${transaction.description || 'No description'}</div>
                                    <div class="transaction-category">${transaction.category || 'Other'}</div>
                                </div>
                            </div>
                            <div class="transaction-right">
                                <div class="transaction-amount ${isIncome ? 'income' : 'expense'}">${amountText}</div>
                                <div class="transaction-date">${formattedDate}</div>
                            </div>
                        </div>
                    `;
                }).join('') : `
                    <div class="empty-state">
                        <p>No transactions yet</p>
                        <button id="add-first-transaction" class="btn-add">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Add Transaction
                        </button>
                    </div>
                `}
            </div>
        </div>
    `;
};


export const renderAnalytics = (transactions = []) => {
    const currency = getCurrencyPreference();
    
    // Calculate YTD stats
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    // Filter transactions for current year (YTD)
    const ytdTransactions = transactions.filter(t => {
        const transactionDate = t.date.toDate ? t.date.toDate() : new Date(t.date);
        return transactionDate.getFullYear() === currentYear;
    });
    
    // Calculate totals
    const totalIncome = ytdTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number.parseFloat(t.amount || 0), 0);
    
    const totalExpense = ytdTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number.parseFloat(t.amount || 0), 0);
    
    // Calculate category totals
    const categoryTotals = {};
    ytdTransactions
        .filter(t => t.type === 'expense')
        .forEach(t => {
            const category = t.category || 'Other';
            categoryTotals[category] = (categoryTotals[category] || 0) + Number.parseFloat(t.amount || 0);
        });
    
    // Get top category
    const topCategory = Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])[0];
    
    // Calculate averages
    const monthsInYear = currentDate.getMonth() + 1;
    const avgMonthlyIncome = totalIncome / monthsInYear;
    const avgMonthlyExpense = totalExpense / monthsInYear;
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;
    
    return `
        <div class="analytics-page">
            <div class="analytics-header">
                <h1 class="analytics-title">Analytics</h1>
                <p class="analytics-subtitle">Visualize your spending patterns and financial insights</p>
            </div>
            
            <!-- Analytics Stats Cards -->
            <div class="analytics-stats">
                <div class="analytics-card">
                    <div class="analytics-card-header">
                        <span class="analytics-label">Top Category</span>
                        <div class="analytics-icon expense-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="1 18 8.5 10.5 13.5 15.5 23 6"></polyline>
                                <polyline points="17 6 23 6 23 12"></polyline>
                            </svg>
                        </div>
                    </div>
                    <div class="analytics-amount">${topCategory ? formatCurrency(topCategory[1], currency) : '$0.00'}</div>
                </div>
                
                <div class="analytics-card">
                    <div class="analytics-card-header">
                        <span class="analytics-label">Total Income (YTD)</span>
                        <div class="analytics-icon income-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                <polyline points="17 6 23 6 23 12"></polyline>
                            </svg>
                        </div>
                    </div>
                    <div class="analytics-amount">${formatCurrency(totalIncome, currency)}</div>
                </div>
                
                <div class="analytics-card">
                    <div class="analytics-card-header">
                        <span class="analytics-label">Total Expense (YTD)</span>
                        <div class="analytics-icon expense-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="1 18 8.5 10.5 13.5 15.5 23 6"></polyline>
                                <polyline points="17 6 23 6 23 12"></polyline>
                            </svg>
                        </div>
                    </div>
                    <div class="analytics-amount">${formatCurrency(totalExpense, currency)}</div>
                </div>
            </div>
            
            <!-- Charts Section -->
            <div class="analytics-charts">
                <div class="chart-section">
                    <h3 class="chart-title">Income vs Expense</h3>
                    <div class="chart-container">
                        <canvas id="incomeExpenseChart"></canvas>
                    </div>
                </div>
                
                <div class="chart-section">
                    <h3 class="chart-title">Spending by Category</h3>
                    <div class="chart-container">
                        <canvas id="categoryChart"></canvas>
                    </div>
                </div>
            </div>
            
            <!-- Summary Section -->
            <div class="analytics-summary">
                <h3 class="summary-title">Summary</h3>
                <div class="summary-stats">
                    <div class="summary-item">
                        <span class="summary-label">Savings Rate</span>
                        <span class="summary-value savings-rate">${savingsRate.toFixed(0)}%</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Average Monthly Expense</span>
                        <span class="summary-value">${formatCurrency(avgMonthlyExpense, currency)}</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Average Monthly Income</span>
                        <span class="summary-value">${formatCurrency(avgMonthlyIncome, currency)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};


export const renderTransactions = (transactions = []) => {
    const currency = getCurrencyPreference();
    
    // Sort transactions by date (newest first)
    const sortedTransactions = [...transactions].sort((a, b) => {
        const dateA = a.date.toDate ? a.date.toDate() : new Date(a.date);
        const dateB = b.date.toDate ? b.date.toDate() : new Date(b.date);
        return dateB - dateA;
    });
    
    // Calculate totals
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + Number.parseFloat(t.amount || 0), 0);
    
    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + Number.parseFloat(t.amount || 0), 0);
    
    const netBalance = totalIncome - totalExpense;
    const incomeCount = transactions.filter(t => t.type === 'income').length;
    const expenseCount = transactions.filter(t => t.type === 'expense').length;
    
    return `
        <div class="transactions-page">
            <div class="transactions-header">
                <div>
                    <h1 class="transactions-title">Transactions</h1>
                    <p class="transactions-subtitle">View and manage all your financial transactions</p>
                </div>
                <div class="header-actions">
                    <button id="export-csv-btn" class="btn-export">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Export CSV
                    </button>
                    <button id="add-transaction-btn" class="btn-add-transaction">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add Transaction
                    </button>
                </div>
            </div>
            
            <!-- Summary Stats -->
            <div class="transactions-stats">
                <div class="stat-card income-stat">
                    <div class="stat-label">Total Income</div>
                    <div class="stat-amount income">${formatCurrency(totalIncome, currency)}</div>
                    <div class="stat-count">+${incomeCount}</div>
                </div>
                <div class="stat-card expense-stat">
                    <div class="stat-label">Total Expense</div>
                    <div class="stat-amount expense">${formatCurrency(totalExpense, currency)}</div>
                    <div class="stat-count">${expenseCount}</div>
                </div>
                <div class="stat-card balance-stat">
                    <div class="stat-label">Net Balance</div>
                    <div class="stat-amount balance">${formatCurrency(netBalance, currency)}</div>
                    <div class="stat-count">${transactions.length} total</div>
                </div>
            </div>
            
            <!-- Filters -->
            <div class="transactions-filters">
                <div class="filters-header">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                    <span>Filters</span>
                </div>
                <div class="filters-row">
                    <div class="filter-group">
                        <label>Search</label>
                        <div class="search-input-container">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input type="text" id="search-transactions" placeholder="Search transactions...">
                        </div>
                    </div>
                    <div class="filter-group">
                        <label>Type</label>
                        <select id="type-filter">
                            <option value="all">All Types</option>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Category</label>
                        <select id="category-filter">
                            <option value="all">All Categories</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <button id="clear-filters" class="btn-clear">Clear Filters</button>
                    </div>
                </div>
            </div>
            
            <!-- Transactions List -->
            <div class="transactions-list">
                ${sortedTransactions.length > 0 ? 
                    sortedTransactions.map(transaction => {
                        const isIncome = transaction.type === 'income';
                        const amount = Number.parseFloat(transaction.amount || 0);
                        const formattedAmount = formatCurrency(amount, currency);
                        const transactionDate = transaction.date.toDate ? transaction.date.toDate() : new Date(transaction.date);
                        const formattedDate = transactionDate.toLocaleDateString('en-US', { 
                            month: '2-digit',
                            day: '2-digit',
                            year: 'numeric'
                        });
                        
                        const amountText = isIncome 
                            ? `+${formattedAmount.replace(/[^0-9.,]/g, '')}` 
                            : `-${formattedAmount.replace(/[^0-9.,]/g, '')}`;
                        
                        return `
                            <div class="transaction-item">
                                <div class="transaction-left">
                                    <div class="transaction-dot ${isIncome ? 'income' : 'expense'}"></div>
                                    <div class="transaction-info">
                                        <div class="transaction-name">${transaction.description || 'No description'}</div>
                                        <div class="transaction-meta">
                                            <span class="transaction-category">${transaction.category || 'Other'}</span>
                                            <span class="transaction-date">${formattedDate}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="transaction-right">
                                    <div class="transaction-amount ${isIncome ? 'income' : 'expense'}">${amountText}</div>
                                    <div class="transaction-type ${isIncome ? 'income' : 'expense'}">${isIncome ? 'income' : 'expense'}</div>
                                    <div class="transaction-actions">
                                        <button class="action-btn edit-transaction-btn" data-id="${transaction.id}" title="Edit">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg>
                                        </button>
                                        <button class="action-btn delete-transaction-btn" data-id="${transaction.id}" title="Delete">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        `;
                    }).join('')
                    : `
                    <div class="empty-state">
                        <div class="empty-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                        </div>
                        <h4>No transactions found</h4>
                        <p>Add your first transaction to get started</p>
                        <button id="add-first-transaction" class="btn-add-transaction">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Add Transaction
                        </button>
                    </div>
                    `
                }
            </div>
        </div>
    `;
};

export const renderModal = (transaction = null, categories = []) => {
    const isEdit = !!transaction;
    const type = transaction ? transaction.type : 'expense';
    const date = transaction ? 
        (transaction.date.toDate ? transaction.date.toDate().toISOString().split('T')[0] : 
         new Date(transaction.date).toISOString().split('T')[0]) : 
        new Date().toISOString().split('T')[0];
    
    // Filter categories based on type
    const incomeCategories = categories.filter(c => c.type === 'income');
    const expenseCategories = categories.filter(c => c.type === 'expense');
    
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
                            <input type="number" name="amount" class="input-field" placeholder="0.00" step="0.01" required value="${transaction ? transaction.amount : ''}">
                        </div>

                        <div class="input-group">
                            <label class="input-label">Category *</label>
                            <select name="category" class="input-field" id="category-select" required>
                                <option value="">Select a category</option>
                                <optgroup label="Expense Categories" id="expense-categories">
                                    ${expenseCategories.map(c => `<option value="${c.name}" ${transaction && transaction.category === c.name ? 'selected' : ''}>${c.name}</option>`).join('')}
                                </optgroup>
                                <optgroup label="Income Categories" id="income-categories">
                                    ${incomeCategories.map(c => `<option value="${c.name}" ${transaction && transaction.category === c.name ? 'selected' : ''}>${c.name}</option>`).join('')}
                                </optgroup>
                            </select>
                        </div>

                        <div class="input-group">
                            <label class="input-label">Date *</label>
                            <input type="date" name="date" class="input-field" required value="${date}">
                        </div>

                        <div class="input-group">
                            <label class="input-label">Description *</label>
                            <input type="text" name="description" class="input-field" placeholder="e.g., Grocery shopping, Salary payment..." required value="${transaction ? transaction.description || '' : ''}">
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
                        <button type="button" class="btn btn-outline" id="cancel-modal">Cancel</button>
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

            <button id="change-password-btn" class="btn btn-outline btn-icon-text" style="border: 1px solid var(--border-color);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                Change Password
            </button>
        </div>

        <div class="card settings-section">
            <h3 class="settings-section-title">Preferences</h3>
            
            <div class="input-group">
                <label class="input-label">Currency</label>
                <select id="currency-select" class="input-field">
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">British Pound (GBP)</option>
                    <option value="RWF">Rwandan Franc (RWF)</option>
                </select>
                <p style="font-size: 0.75rem; color: var(--text-light); margin-top: 0.5rem;">This will be used to format all currency values</p>
            </div>

            <div class="checkbox-wrapper">
                <div>
                    <div class="checkbox-label">Email Notifications</div>
                    <div class="checkbox-desc">Receive updates about your finances</div>
                </div>
                <input type="checkbox" id="email-notifications" class="custom-checkbox" checked>
            </div>
        </div>

        <div class="card settings-section">
            <h3 class="settings-section-title">Data Management</h3>
            
            <div style="display: flex; gap: 1rem;">
                <button id="export-csv-btn" class="btn btn-primary btn-icon-text" style="flex: 1; justify-content: center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Export as CSV
                </button>
                <button id="export-pdf-btn" class="btn btn-primary btn-icon-text" style="flex: 1; justify-content: center;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    Export as PDF
                </button>
            </div>
            <p style="font-size: 0.875rem; color: var(--text-medium); margin-top: 1rem;">Download all your transaction data in CSV or PDF format for backup or analysis.</p>
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
            <p class="danger-warning">These actions cannot be undone. Please proceed with caution.</p>
            
            <button id="delete-account-btn" class="btn-delete-account">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
                Delete Account
            </button>
        </div>
    `;
};

export const renderCategories = (categories) => {
    const incomeCategories = categories.filter(c => c.type === 'income');
    const expenseCategories = categories.filter(c => c.type === 'expense');

    return `
        <div class="categories-page">
            <div class="categories-header">
                <div>
                    <h1 class="categories-title">Categories</h1>
                    <p class="categories-subtitle">Manage your transaction categories</p>
                </div>
                <button id="add-category-btn" class="btn-add-category">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add Category
                </button>
            </div>

            <div class="categories-sections">
                <!-- Income Categories -->
                <div class="category-section">
                    <h3 class="section-title income-title">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                            <line x1="7" y1="7" x2="7.01" y2="7"></line>
                        </svg>
                        Income Categories (${incomeCategories.length})
                    </h3>
                    <div class="categories-list">
                        ${incomeCategories.map(c => `
                            <div class="category-item">
                                <div class="category-left">
                                    <div class="category-color" style="background-color: ${c.color || '#10B981'}"></div>
                                    <span class="category-name">${c.name}</span>
                                    <span class="category-type income">Income</span>
                                </div>
                                <div class="category-actions">
                                    <button class="action-btn edit-category-btn" data-id="${c.id}" title="Edit">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                    </button>
                                    <button class="action-btn delete-category-btn" data-id="${c.id}" title="Delete">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Expense Categories -->
                <div class="category-section">
                    <h3 class="section-title expense-title">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                            <line x1="7" y1="7" x2="7.01" y2="7"></line>
                        </svg>
                        Expense Categories (${expenseCategories.length})
                    </h3>
                    <div class="categories-list">
                        ${expenseCategories.map(c => `
                            <div class="category-item">
                                <div class="category-left">
                                    <div class="category-color" style="background-color: ${c.color || '#EF4444'}"></div>
                                    <span class="category-name">${c.name}</span>
                                    <span class="category-type expense">Expense</span>
                                </div>
                                <div class="category-actions">
                                    <button class="action-btn edit-category-btn" data-id="${c.id}" title="Edit">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                    </button>
                                    <button class="action-btn delete-category-btn" data-id="${c.id}" title="Delete">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
};

export const renderCategoryModal = (category = null) => {
    const isEdit = !!category;
    const type = category ? category.type : 'expense';
    
    return `
        <div class="modal-overlay" id="category-modal">
            <div class="modal">
                <div class="modal-header">
                    <div>
                        <h3 class="modal-title">${isEdit ? 'Edit Category' : 'Add Category'}</h3>
                        <p style="color: var(--text-medium); font-size: 0.875rem; margin-top: 0.25rem;">${isEdit ? 'Update category details' : 'Create a new category'}</p>
                    </div>
                    <button class="close-btn" id="close-category-modal">&times;</button>
                </div>
                <form id="category-form" data-mode="${isEdit ? 'edit' : 'add'}" ${isEdit ? `data-id="${category.id}"` : ''}>
                    <div class="modal-body">
                        <div class="input-group">
                            <label class="input-label">Category Name *</label>
                            <input type="text" name="name" class="input-field" placeholder="e.g., Groceries, Rent..." required value="${category ? category.name : ''}">
                        </div>

                        <div class="input-group">
                            <label class="input-label">Type *</label>
                            <select name="type" class="input-field" required>
                                <option value="expense" ${type === 'expense' ? 'selected' : ''}>Expense</option>
                                <option value="income" ${type === 'income' ? 'selected' : ''}>Income</option>
                            </select>
                        </div>

                        <div class="input-group">
                            <label class="input-label">Color *</label>
                            <select name="color" class="input-field" required>
                                <option value="#10B981" ${(category?.color || '#10B981') === '#10B981' ? 'selected' : ''}>🟢 Emerald</option>
                                <option value="#3B82F6" ${category?.color === '#3B82F6' ? 'selected' : ''}>🔵 Blue</option>
                                <option value="#8B5CF6" ${category?.color === '#8B5CF6' ? 'selected' : ''}>🟣 Purple</option>
                                <option value="#F97316" ${category?.color === '#F97316' ? 'selected' : ''}>🟠 Orange</option>
                                <option value="#EF4444" ${category?.color === '#EF4444' ? 'selected' : ''}>🔴 Red</option>
                                <option value="#EAB308" ${category?.color === '#EAB308' ? 'selected' : ''}>🟡 Yellow</option>
                                <option value="#6B7280" ${category?.color === '#6B7280' ? 'selected' : ''}>⚫ Gray</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline" id="cancel-category-modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">${isEdit ? 'Save Changes' : 'Create'}</button>
                    </div>
                </form>
            </div>
        </div>
    `;
};
