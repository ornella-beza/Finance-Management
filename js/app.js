import { registerUser, loginUser, logoutUser, subscribeToAuthChanges, signInWithGoogle, changePassword, deleteUserAccount } from './auth.js';
import { addTransaction, subscribeToTransactions, deleteTransaction, updateTransaction } from './db.js';
import { renderLogin, renderSignup, renderDashboard, renderDashboardContent, renderModal } from './ui.js';
import { renderCharts } from './charts.js';
import { exportToCSV, exportToPDF, getCurrencyPreference, saveCurrencyPreference, getEmailNotificationPreference, saveEmailNotificationPreference } from './settings.js';

const app = document.getElementById('app');
let currentUser = null;
let unsubscribeTransactions = null;

// Routing Logic
const routes = {
    login: () => {
        app.innerHTML = renderLogin();
        setupAuthListeners();
    },
    signup: () => {
        app.innerHTML = renderSignup();
        setupAuthListeners();
    },
    dashboard: () => {
        if (!currentUser) {
            navigateTo('login');
            return;
        }
        app.innerHTML = renderDashboard(currentUser);
        setupDashboardListeners();
        
        // Subscribe to real-time updates
        if (unsubscribeTransactions) unsubscribeTransactions();
        unsubscribeTransactions = subscribeToTransactions((transactions) => {
            currentTransactions = transactions;
            // Default to analytics view as per design request (or keep dashboard)
            // Let's default to Analytics since that's what the user asked for "dashboard analysis"
            // But the nav says "Analytics" is separate. I'll default to Analytics for now to show the work.
            // Actually, let's check the active nav item.
            const activeNav = document.querySelector('.nav-item.active');
            const page = activeNav ? activeNav.dataset.page : 'analytics'; // Defaulting to analytics to show off the new view
            
            // If defaulting to analytics, update nav
            if (!activeNav) {
                 const analyticsNav = document.querySelector('[data-page="analytics"]');
                 if (analyticsNav) analyticsNav.classList.add('active');
            }

            updateDashboardView(page);
        });
    }
};

const navigateTo = (route) => {
    if (routes[route]) {
        routes[route]();
    }
};

// Event Listeners
const setupAuthListeners = () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            try {
                await loginUser(email, password);
            } catch (error) {
                alert(error.message);
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const fullname = document.getElementById('fullname').value;
            try {
                await registerUser(email, password, fullname);
            } catch (error) {
                alert(error.message);
            }
        });
    }

    if (switchToSignup) {
        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('signup');
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('login');
        });
    }

    // Google Sign-In button
    const googleBtn = document.querySelector('.btn-google');
    if (googleBtn) {
        googleBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await signInWithGoogle();
            } catch (error) {
                alert(error.message);
            }
        });
    }

    // Password visibility toggle
    const togglePasswordLogin = document.getElementById('toggle-password-login');
    const togglePasswordSignup = document.getElementById('toggle-password-signup');
    
    if (togglePasswordLogin) {
        togglePasswordLogin.addEventListener('click', () => {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            
            // Toggle eye icon
            const eyeIcon = togglePasswordLogin.querySelector('.eye-icon');
            if (type === 'text') {
                eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
            } else {
                eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
            }
        });
    }

    if (togglePasswordSignup) {
        togglePasswordSignup.addEventListener('click', () => {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            
            // Toggle eye icon
            const eyeIcon = togglePasswordSignup.querySelector('.eye-icon');
            if (type === 'text') {
                eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
            } else {
                eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
            }
        });
    }
};

const setupDashboardListeners = () => {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await logoutUser();
            } catch (error) {
                console.error(error);
            }
        });
    }

    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const page = item.dataset.page;
            updateDashboardView(page);
        });
    });
};

let currentTransactions = [];

const updateDashboardView = (page) => {
    const mainView = document.getElementById('main-view');
    if (!mainView) return;

    if (page === 'analytics') {
        import('./ui.js').then(module => {
            mainView.innerHTML = module.renderAnalytics(currentTransactions);
            renderCharts(currentTransactions);
        });
    } else if (page === 'transactions') {
        import('./ui.js').then(module => {
            mainView.innerHTML = module.renderTransactions(currentTransactions);
            setupTransactionListeners();
        });
    } else if (page === 'dashboard') {
        import('./ui.js').then(module => {
            mainView.innerHTML = module.renderDashboardContent(currentTransactions, currentUser);
            // We need to import renderBalanceTrendChart from charts.js
            // Since charts.js is a global script (no export), we assume the function is available globally 
            // OR we need to update charts.js to be a module. 
            // The current charts.js setup seems to be using ES modules based on previous edits (export const).
            // So we should import it.
            import('./charts.js').then(chartsModule => {
                chartsModule.renderBalanceTrendChart(currentTransactions);
            });
            setupTransactionListeners();
        });
    } else if (page === 'settings') {
        import('./ui.js').then(module => {
            mainView.innerHTML = module.renderSettings(currentUser);
            setupSettingsListeners();
        });
    }
};

const setupTransactionListeners = () => {
    const addBtn = document.getElementById('add-transaction-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            import('./ui.js').then(module => {
                const modalHtml = module.renderModal();
                document.body.insertAdjacentHTML('beforeend', modalHtml);
                setupModalListeners();
            });
        });
    }

    // ... existing delete listeners ...
    const transactionList = document.querySelector('.transactions-list');
    if (transactionList) {
        transactionList.addEventListener('click', async (e) => {
            const deleteBtn = e.target.closest('.delete-btn');
            const editBtn = e.target.closest('.edit-btn');
            const viewBtn = e.target.closest('.view-btn');

            if (deleteBtn) {
                const id = deleteBtn.dataset.id;
                if (confirm('Are you sure you want to delete this transaction?')) {
                    try {
                        await deleteTransaction(id);
                    } catch (error) {
                        console.error(error);
                    }
                }
            } else if (editBtn) {
                const id = editBtn.dataset.id;
                const transaction = currentTransactions.find(t => t.id === id);
                if (transaction) {
                    import('./ui.js').then(module => {
                        const modalHtml = module.renderModal(transaction);
                        document.body.insertAdjacentHTML('beforeend', modalHtml);
                        setupModalListeners();
                    });
                }
            } else if (viewBtn) {
                const id = viewBtn.dataset.id;
                const transaction = currentTransactions.find(t => t.id === id);
                if (transaction) {
                    alert(`Transaction Details:\n\nDescription: ${transaction.description}\nAmount: $${transaction.amount}\nCategory: ${transaction.category}\nDate: ${transaction.date}\nType: ${transaction.type}`);
                }
            }
        });
    }
};

const setupModalListeners = () => {
    const modal = document.getElementById('transaction-modal');
    const closeBtn = document.getElementById('close-modal');
    const cancelBtn = document.getElementById('cancel-modal');
    const form = document.getElementById('transaction-form');
    const segmentBtns = document.querySelectorAll('.segment-btn');
    const typeInput = document.getElementById('transaction-type');

    const closeModal = () => modal.remove();

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Segmented Control Logic
    segmentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            segmentBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            typeInput.value = btn.dataset.value;
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const mode = form.dataset.mode;
        
        const transaction = {
            type: typeInput.value,
            amount: formData.get('amount'),
            category: formData.get('category'),
            date: formData.get('date'),
            description: formData.get('description')
        };

        try {
            if (mode === 'edit') {
                const id = form.dataset.id;
                await updateTransaction(id, transaction);
            } else {
                await addTransaction(transaction);
            }
            closeModal();
        } catch (error) {
            alert("Error saving transaction: " + error.message);
        }
    });
};

const setupSettingsListeners = () => {
    // Load saved preferences
    const currencySelect = document.getElementById('currency-select');
    const emailNotifications = document.getElementById('email-notifications');
    
    if (currencySelect) {
        currencySelect.value = getCurrencyPreference();
        currencySelect.addEventListener('change', (e) => {
            saveCurrencyPreference(e.target.value);
            alert(`Currency updated to ${e.target.value}. Refresh the page to see changes.`);
        });
    }

    if (emailNotifications && currentUser) {
        // Load from Firestore
        import('./settings.js').then(async (settings) => {
            const prefs = await settings.getUserPreferences(currentUser.uid);
            emailNotifications.checked = prefs.emailNotifications !== false;
        });

        emailNotifications.addEventListener('change', async (e) => {
            saveEmailNotificationPreference(e.target.checked);
            
            // Save to Firestore
            if (currentUser) {
                const { getUserPreferences, saveUserPreferences } = await import('./settings.js');
                const prefs = await getUserPreferences(currentUser.uid);
                prefs.emailNotifications = e.target.checked;
                await saveUserPreferences(currentUser.uid, prefs);
            }
        });
    }

    // Change Password
    const changePasswordBtn = document.getElementById('change-password-btn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            showChangePasswordModal();
        });
    }

    // Export CSV
    const exportCsvBtn = document.getElementById('export-csv-btn');
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => {
            exportToCSV(currentTransactions);
        });
    }

    // Export PDF
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', () => {
            exportToPDF(currentTransactions);
        });
    }

    // Delete Account
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', async () => {
            const confirmed = confirm(
                'Are you absolutely sure you want to delete your account?\n\n' +
                'This will permanently delete:\n' +
                '- Your account\n' +
                '- All your transactions\n' +
                '- All your data\n\n' +
                'This action CANNOT be undone!'
            );

            if (confirmed) {
                const doubleConfirm = prompt('Type "DELETE" to confirm account deletion:');
                if (doubleConfirm === 'DELETE') {
                    try {
                        // Delete all user transactions first
                        const { collection, query, where, getDocs, deleteDoc, doc } = await import(
                            "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
                        );
                        const { db, auth } = await import('./firebase-config.js');
                        
                        const q = query(
                            collection(db, 'transactions'),
                            where('userId', '==', auth.currentUser.uid)
                        );
                        const snapshot = await getDocs(q);
                        const deletePromises = snapshot.docs.map(docSnapshot => 
                            deleteDoc(doc(db, 'transactions', docSnapshot.id))
                        );
                        await Promise.all(deletePromises);

                        // Delete user account
                        await deleteUserAccount();
                        alert('Your account has been deleted successfully.');
                    } catch (error) {
                        if (error.code === 'auth/requires-recent-login') {
                            alert('For security reasons, please log out and log back in before deleting your account.');
                        } else {
                            alert('Error deleting account: ' + error.message);
                        }
                    }
                }
            }
        });
    }
};

const showChangePasswordModal = () => {
    const modalHtml = `
        <div class="modal-overlay" id="change-password-modal">
            <div class="modal">
                <div class="modal-header">
                    <div>
                        <h3 class="modal-title">Change Password</h3>
                        <p style="color: var(--text-medium); font-size: 0.875rem; margin-top: 0.25rem;">Update your account password</p>
                    </div>
                    <button class="close-btn" id="close-password-modal">&times;</button>
                </div>
                <form id="change-password-form">
                    <div class="modal-body">
                        <div class="input-group">
                            <label class="input-label">Current Password *</label>
                            <div class="input-with-icon">
                                <input type="password" id="current-password" class="input-field" required>
                                <button type="button" class="password-toggle" data-target="current-password" aria-label="Toggle password visibility">
                                    <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="input-group">
                            <label class="input-label">New Password *</label>
                            <div class="input-with-icon">
                                <input type="password" id="new-password" class="input-field" minlength="6" required>
                                <button type="button" class="password-toggle" data-target="new-password" aria-label="Toggle password visibility">
                                    <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="input-group">
                            <label class="input-label">Confirm New Password *</label>
                            <div class="input-with-icon">
                                <input type="password" id="confirm-password" class="input-field" minlength="6" required>
                                <button type="button" class="password-toggle" data-target="confirm-password" aria-label="Toggle password visibility">
                                    <svg class="eye-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline" id="cancel-password-modal" style="border: 1px solid var(--border-color);">Cancel</button>
                        <button type="submit" class="btn btn-primary">Change Password</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const modal = document.getElementById('change-password-modal');
    const closeBtn = document.getElementById('close-password-modal');
    const cancelBtn = document.getElementById('cancel-password-modal');
    const form = document.getElementById('change-password-form');

    const closeModal = () => modal.remove();

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Password visibility toggles
    const toggleButtons = modal.querySelectorAll('.password-toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const passwordInput = document.getElementById(targetId);
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            
            // Toggle eye icon
            const eyeIcon = button.querySelector('.eye-icon');
            if (type === 'text') {
                eyeIcon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>';
            } else {
                eyeIcon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
            }
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            alert('New passwords do not match!');
            return;
        }

        try {
            await changePassword(currentPassword, newPassword);
            alert('Password changed successfully!');
            closeModal();
        } catch (error) {
            if (error.message.includes('Google sign-in')) {
                alert(error.message);
            } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                alert('Current password is incorrect.');
            } else if (error.code === 'auth/weak-password') {
                alert('New password is too weak. Please use at least 6 characters.');
            } else {
                alert('Error changing password: ' + error.message);
            }
        }
    });
};

// Initialize App
console.log("Initializing App...");
subscribeToAuthChanges((user) => {
    console.log("Auth state changed:", user);
    currentUser = user;
    if (user) {
        console.log("User logged in, navigating to dashboard");
        navigateTo('dashboard');
    } else {
        console.log("No user, navigating to login");
        navigateTo('login');
    }
});



