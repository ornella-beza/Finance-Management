import { registerUser, loginUser, logoutUser, subscribeToAuthChanges } from './auth.js';
import { addTransaction, subscribeToTransactions, deleteTransaction, updateTransaction } from './db.js';
import { renderLogin, renderSignup, renderDashboard, renderDashboardContent, renderModal } from './ui.js';
import { renderCharts } from './charts.js';

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



