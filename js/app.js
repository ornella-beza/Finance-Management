import { registerUser, loginUser, logoutUser, subscribeToAuthChanges, signInWithGoogle, changePassword, deleteUserAccount } from './auth.js';
import { addTransaction, subscribeToTransactions, deleteTransaction, updateTransaction, subscribeToCategories, addCategory, updateCategory, deleteCategory } from './db.js';
import { renderLogin, renderSignup, renderDashboard, renderDashboardContent, renderModal, renderCategories, renderCategoryModal, renderTransactions, renderAnalytics } from './ui.js';
import { renderCharts } from './charts.js';
import { exportToCSV, exportToPDF, getCurrencyPreference, saveCurrencyPreference, getEmailNotificationPreference, saveEmailNotificationPreference, formatCurrency } from './settings.js';

const app = document.getElementById('app');
let currentUser = null;
let currentTransactions = [];
let currentCategories = [];
let unsubscribeTransactions = null;
let unsubscribeCategories = null;
let isDataLoaded = { transactions: false, categories: false };

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
            isDataLoaded.transactions = true;
            if (isDataLoaded.categories) {
                updateDashboardView();
            }
        });

        if (unsubscribeCategories) unsubscribeCategories();
        unsubscribeCategories = subscribeToCategories((categories) => {
            currentCategories = categories;
            isDataLoaded.categories = true;
            if (isDataLoaded.transactions) {
                updateDashboardView();
            }
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
    
    // Google Sign In
    const googleBtns = document.querySelectorAll('.btn-google');
    googleBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            try {
                await signInWithGoogle();
            } catch (error) {
                console.error(error);
                alert(error.message);
            }
        });
    });
    
    // Password Toggle
    const togglePasswordLogin = document.getElementById('toggle-password-login');
    if (togglePasswordLogin) {
        togglePasswordLogin.addEventListener('click', () => {
            const input = document.getElementById('password');
            if (input.type === 'password') {
                input.type = 'text';
                // Eye Off Icon
                togglePasswordLogin.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
            } else {
                input.type = 'password';
                // Eye Icon
                togglePasswordLogin.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
            }
        });
    }
};

const setupDashboardListeners = () => {
    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;
            if (page) {
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                updateDashboardView(page);
            }
        });
    });

    // Logout
    const logoutBtns = document.querySelectorAll('#logout-btn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            try {
                if (unsubscribeTransactions) unsubscribeTransactions();
                if (unsubscribeCategories) unsubscribeCategories();
                await logoutUser();
                currentUser = null;
                navigateTo('login');
            } catch (error) {
                console.error("Logout error:", error);
            }
        });
    });

    // Profile Settings
    const profileSettingsBtn = document.getElementById('profile-settings');
    if (profileSettingsBtn) {
        profileSettingsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            updateDashboardView('settings');
        });
    }

    // Account Settings
    const accountSettingsBtn = document.getElementById('account-settings');
    if (accountSettingsBtn) {
        accountSettingsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            updateDashboardView('settings');
        });
    }

    // User Dropdown
    const userMenuBtn = document.getElementById('user-menu-btn');
    const userDropdown = document.getElementById('user-dropdown');
    if (userMenuBtn && userDropdown) {
        userMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!userDropdown.contains(e.target) && !userMenuBtn.contains(e.target)) {
                userDropdown.classList.remove('show');
            }
        });
    }

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const mobileOverlay = document.getElementById('mobile-overlay');
    
    if (mobileMenuBtn && sidebar && mobileOverlay) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            mobileOverlay.classList.toggle('show');
        });
        
        mobileOverlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            mobileOverlay.classList.remove('show');
        });
        
        // Close mobile menu when nav item is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                sidebar.classList.remove('open');
                mobileOverlay.classList.remove('show');
            });
        });
    }
};

const updateDashboardView = (page = null) => {
    const mainView = document.getElementById('main-view');
    const headerTitle = document.querySelector('.header-title');
    if (!mainView) return;

    // Determine current page if not provided
    if (!page) {
        const activeNav = document.querySelector('.nav-item.active');
        page = activeNav ? activeNav.dataset.page : 'dashboard';
    }

    // Update Header Title
    if (headerTitle) {
        headerTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1);
    }

    // Update navigation active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(nav => {
        nav.classList.remove('active');
        if (nav.dataset.page === page) {
            nav.classList.add('active');
        }
    });

    switch(page) {
        case 'dashboard':
            mainView.innerHTML = renderDashboardContent(currentTransactions, currentUser);
            import('./charts.js').then(chartsModule => {
                chartsModule.renderBalanceTrendChart(currentTransactions);
            });
            setupDashboardTransactionListeners();
            break;
        case 'transactions':
            mainView.innerHTML = renderTransactions(currentTransactions);
            setupTransactionListeners();
            populateCategoryFilter();
            break;
        case 'categories':
            mainView.innerHTML = renderCategories(currentCategories);
            setupCategoryListeners();
            break;
        case 'analytics':
            mainView.innerHTML = renderAnalytics(currentTransactions);
            setTimeout(() => {
                renderCharts(currentTransactions);
            }, 100);
            break;
        case 'settings':
            import('./ui.js').then(module => {
                if (module.renderSettings) {
                    mainView.innerHTML = module.renderSettings(currentUser);
                    setupSettingsListeners();
                }
            });
            break;
    }
};

const renderTransactionsView = (container) => {
    // Build the HTML structure using pure DOM manipulation to avoid Vite parser issues
    const filtersBar = document.createElement('div');
    filtersBar.className = 'filters-bar';
    
    // Search filter
    const searchGroup = document.createElement('div');
    searchGroup.className = 'filter-group';
    searchGroup.style.flex = '2';
    
    const searchLabel = document.createElement('label');
    searchLabel.textContent = 'Search';
    
    const inputWithIcon = document.createElement('div');
    inputWithIcon.className = 'input-with-icon';
    
    const inputIcon = document.createElement('div');
    inputIcon.className = 'input-icon';
    inputIcon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.id = 'search-input';
    searchInput.className = 'input-field has-icon';
    searchInput.placeholder = 'Search transactions...';
    
    inputWithIcon.appendChild(inputIcon);
    inputWithIcon.appendChild(searchInput);
    searchGroup.appendChild(searchLabel);
    searchGroup.appendChild(inputWithIcon);
    
    // Category filter
    const categoryGroup = document.createElement('div');
    categoryGroup.className = 'filter-group';
    
    const categoryLabel = document.createElement('label');
    categoryLabel.textContent = 'Category';
    
    const categoryFilter = document.createElement('select');
    categoryFilter.id = 'category-filter';
    categoryFilter.className = 'input-field';
    
    const allOption = document.createElement('option');
    allOption.value = 'All';
    allOption.textContent = 'All Categories';
    categoryFilter.appendChild(allOption);
    
    currentCategories.forEach(c => {
        const option = document.createElement('option');
        option.value = c.name;
        option.textContent = c.name;
        categoryFilter.appendChild(option);
    });
    
    categoryGroup.appendChild(categoryLabel);
    categoryGroup.appendChild(categoryFilter);
    
    // Add transaction button
    const addBtn = document.createElement('button');
    addBtn.id = 'add-transaction-btn';
    addBtn.className = 'btn btn-primary';
    addBtn.style.height = '42px';
    addBtn.style.marginBottom = '1px';
    addBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 0.5rem;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Add Transaction';
    
    filtersBar.appendChild(searchGroup);
    filtersBar.appendChild(categoryGroup);
    filtersBar.appendChild(addBtn);
    
    // Transactions list container
    const listContainer = document.createElement('div');
    listContainer.id = 'transactions-list-container';
    
    container.innerHTML = '';
    container.appendChild(filtersBar);
    container.appendChild(listContainer);

    const renderList = (transactions) => {
        const listContainer = document.getElementById('transactions-list-container');
        const currency = getCurrencyPreference();
        
        // Clear existing content
        listContainer.innerHTML = '';
        
        if (transactions.length === 0) {
            const emptyDiv = document.createElement('div');
            emptyDiv.style.textAlign = 'center';
            emptyDiv.style.padding = '3rem';
            emptyDiv.style.color = 'var(--text-medium)';
            emptyDiv.textContent = 'No transactions found';
            listContainer.appendChild(emptyDiv);
            return;
        }
        
        // Render each transaction using DOM manipulation
        transactions.forEach(t => {
            const category = currentCategories.find(c => c.name === t.category);
            const color = category ? category.color : (t.type === 'income' ? '#10B981' : '#EF4444');
            
            const card = document.createElement('div');
            card.className = 't-card';
            
            // Left section
            const cardLeft = document.createElement('div');
            cardLeft.className = 't-card-left';
            
            const icon = document.createElement('div');
            icon.className = 't-card-icon';
            icon.style.backgroundColor = color + '20';
            icon.style.color = color;
            icon.innerHTML = t.type === 'income' ? 
                '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>' : 
                '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>';
            
            const info = document.createElement('div');
            info.className = 't-card-info';
            const h4 = document.createElement('h4');
            h4.textContent = t.description;
            const p = document.createElement('p');
            p.textContent = t.category;
            info.appendChild(h4);
            info.appendChild(p);
            
            cardLeft.appendChild(icon);
            cardLeft.appendChild(info);
            
            // Right section
            const cardRight = document.createElement('div');
            cardRight.className = 't-card-right';
            
            const amount = document.createElement('div');
            amount.className = 't-card-amount ' + t.type;
            amount.textContent = (t.type === 'income' ? '+' : '-') + formatCurrency(t.amount, currency).replace(/^[^\d-]+/, '');
            
            const date = document.createElement('div');
            date.className = 't-card-date';
            date.textContent = new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            
            cardRight.appendChild(amount);
            cardRight.appendChild(date);
            
            // Actions section
            const actions = document.createElement('div');
            actions.className = 't-card-actions';
            
            const editBtn = document.createElement('button');
            editBtn.className = 'action-btn edit-btn';
            editBtn.dataset.id = t.id;
            editBtn.title = 'Edit';
            editBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'action-btn delete-btn';
            deleteBtn.dataset.id = t.id;
            deleteBtn.title = 'Delete';
            deleteBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>';
            
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            
            // Assemble card
            card.appendChild(cardLeft);
            card.appendChild(cardRight);
            card.appendChild(actions);
            
            listContainer.appendChild(card);
        });
    };

    renderList(currentTransactions);
};

const populateCategoryFilter = () => {
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter && currentCategories.length > 0) {
        // Clear existing options except "All Categories"
        categoryFilter.innerHTML = '<option value="all">All Categories</option>';
        
        // Add current categories
        currentCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = category.name;
            categoryFilter.appendChild(option);
        });
    }
};

const setupDashboardTransactionListeners = () => {
    // Add Transaction buttons on dashboard
    const addTransactionBtns = document.querySelectorAll('#add-transaction-btn, #add-first-transaction');
    addTransactionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.insertAdjacentHTML('beforeend', renderModal(null, currentCategories));
            setupModalListeners();
        });
    });
};

const setupTransactionListeners = () => {
    // Add Transaction Button
    const addBtn = document.getElementById('add-transaction-btn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            document.body.insertAdjacentHTML('beforeend', renderModal(null, currentCategories));
            setupModalListeners();
        });
    }

    // Add first transaction button
    const addFirstBtn = document.getElementById('add-first-transaction');
    if (addFirstBtn) {
        addFirstBtn.addEventListener('click', () => {
            document.body.insertAdjacentHTML('beforeend', renderModal(null, currentCategories));
            setupModalListeners();
        });
    }

    // Export CSV Button
    const exportBtn = document.getElementById('export-csv-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            exportToCSV(currentTransactions);
        });
    }

    // Search and Filters
    const searchInput = document.getElementById('search-transactions');
    const typeFilter = document.getElementById('type-filter');
    const categoryFilter = document.getElementById('category-filter');
    const clearFiltersBtn = document.getElementById('clear-filters');

    const filterTransactions = () => {
        const query = searchInput ? searchInput.value.toLowerCase() : '';
        const type = typeFilter ? typeFilter.value : 'all';
        const category = categoryFilter ? categoryFilter.value : 'all';

        const filtered = currentTransactions.filter(t => {
            const description = (t.description || '').toLowerCase();
            const matchesSearch = !query || description.includes(query) || (t.category || '').toLowerCase().includes(query);
            const matchesType = type === 'all' || t.type === type;
            const matchesCategory = category === 'all' || t.category === category;
            return matchesSearch && matchesType && matchesCategory;
        });

        // Re-render transactions list with filtered data
        const mainView = document.getElementById('main-view');
        if (mainView) {
            mainView.innerHTML = renderTransactions(filtered);
            setupTransactionListeners(); // Re-setup listeners after re-render
        }
    };

    if (searchInput) searchInput.addEventListener('input', filterTransactions);
    if (typeFilter) typeFilter.addEventListener('change', filterTransactions);
    if (categoryFilter) categoryFilter.addEventListener('change', filterTransactions);
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (typeFilter) typeFilter.value = 'all';
            if (categoryFilter) categoryFilter.value = 'all';
            filterTransactions();
        });
    }

    // Edit and Delete buttons for transaction items
    document.querySelectorAll('.edit-transaction-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const transaction = currentTransactions.find(t => t.id === id);
            document.body.insertAdjacentHTML('beforeend', renderModal(transaction, currentCategories));
            setupModalListeners();
        });
    });

    document.querySelectorAll('.delete-transaction-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            if (confirm('Are you sure you want to delete this transaction?')) {
                const id = btn.dataset.id;
                try {
                    await deleteTransaction(id);
                } catch (error) {
                    alert('Error deleting transaction');
                }
            }
        });
    });
};

const setupCategoryListeners = () => {
    // Add Category
    document.getElementById('add-category-btn').addEventListener('click', () => {
        document.body.insertAdjacentHTML('beforeend', renderCategoryModal());
        setupCategoryModalListeners();
    });

    // Edit Category
    document.querySelectorAll('.edit-category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const category = currentCategories.find(c => c.id === id);
            document.body.insertAdjacentHTML('beforeend', renderCategoryModal(category));
            setupCategoryModalListeners();
        });
    });

    // Delete Category
    document.querySelectorAll('.delete-category-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            if (confirm('Are you sure you want to delete this category?')) {
                const id = btn.dataset.id;
                try {
                    await deleteCategory(id);
                } catch (error) {
                    alert('Error deleting category');
                }
            }
        });
    });
};

const setupCategoryModalListeners = () => {
    const modal = document.getElementById('category-modal');
    const form = document.getElementById('category-form');
    const closeBtn = document.getElementById('close-category-modal');
    const cancelBtn = document.getElementById('cancel-category-modal');

    const closeModal = () => modal.remove();

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Form Submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const categoryData = {
            name: formData.get('name'),
            type: formData.get('type'),
            color: formData.get('color')
        };

        try {
            if (form.dataset.mode === 'edit') {
                await updateCategory(form.dataset.id, categoryData);
            } else {
                await addCategory(categoryData);
            }
            closeModal();
        } catch (error) {
            alert('Error saving category');
        }
    });
};

const setupModalListeners = () => {
    const modal = document.getElementById('transaction-modal');
    const form = document.getElementById('transaction-form');
    const closeBtn = document.getElementById('close-modal');
    const cancelBtn = document.getElementById('cancel-modal');
    const typeInput = document.getElementById('transaction-type');
    const segmentBtns = modal.querySelectorAll('.segment-btn');

    const closeModal = () => modal.remove();

    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Type Toggle
    segmentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            segmentBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            typeInput.value = btn.dataset.value;
        });
    });

    // Form Submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        
        // Validate required fields
        const amount = formData.get('amount');
        const category = formData.get('category');
        const date = formData.get('date');
        const description = formData.get('description');
        
        if (!amount || !category || !date || !description) {
            alert('Please fill in all required fields');
            return;
        }
        
        const transaction = {
            type: typeInput.value,
            amount: parseFloat(amount),
            category: category,
            date: new Date(date),
            description: description
        };

        try {
            if (form.dataset.mode === 'edit') {
                await updateTransaction(form.dataset.id, transaction);
            } else {
                await addTransaction(transaction);
            }
            closeModal();
        } catch (error) {
            console.error('Error saving transaction:', error);
            alert('Error saving transaction: ' + error.message);
        }
    });
};

const setupSettingsListeners = () => {
    const currencySelect = document.getElementById('currency-select');
    const emailNotifications = document.getElementById('email-notifications');
    const exportCsvBtn = document.getElementById('export-csv-btn');
    const exportPdfBtn = document.getElementById('export-pdf-btn');
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    const changePasswordForm = document.getElementById('change-password-form');
    
    // Currency
    if (currencySelect) {
        currencySelect.value = getCurrencyPreference();
        currencySelect.addEventListener('change', (e) => {
            saveCurrencyPreference(e.target.value);
            alert('Currency updated to ' + e.target.value + '. Refresh the page to see changes.');
        });
    }

    // Email Notifications
    if (emailNotifications && currentUser) {
        import('./settings.js').then(async (settings) => {
            const prefs = await settings.getUserPreferences(currentUser.uid);
            emailNotifications.checked = prefs.emailNotifications !== false;
        });

        emailNotifications.addEventListener('change', async (e) => {
            saveEmailNotificationPreference(e.target.checked);
            if (currentUser) {
                const { getUserPreferences, saveUserPreferences } = await import('./settings.js');
                const prefs = await getUserPreferences(currentUser.uid);
                prefs.emailNotifications = e.target.checked;
                await saveUserPreferences(currentUser.uid, prefs);
            }
        });
    }

    // Exports
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => {
            exportToCSV(currentTransactions);
        });
    }

    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', () => {
            exportToPDF(currentTransactions, currentUser);
        });
    }

    // Delete Account
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', async () => {
            if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                const password = prompt("Please enter your password to confirm deletion:");
                if (password) {
                    try {
                        await deleteUserAccount(password);
                        alert('Your account has been deleted.');
                        navigateTo('login');
                    } catch (error) {
                        alert('Error deleting account: ' + error.message);
                    }
                }
            }
        });
    }

    // Change Password
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (newPassword !== confirmPassword) {
                alert("New passwords do not match.");
                return;
            }

            try {
                await changePassword(currentPassword, newPassword);
                alert("Password changed successfully.");
                changePasswordForm.reset();
            } catch (error) {
                alert("Error changing password: " + error.message);
            }
        });
    }
};

// Init
subscribeToAuthChanges((user) => {
    currentUser = user;
    if (user) {
        navigateTo('dashboard');
    } else {
        navigateTo('login');
    }
});

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



