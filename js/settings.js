// Currency formatting utilities
export const getCurrencySymbol = (currency) => {
    const symbols = {
        'USD': '$',
        'EUR': '€',
        'GBP': '£',
        'RWF': 'FRw'
    };
    return symbols[currency] || '$';
};

export const formatCurrency = (amount, currency = 'USD') => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency === 'RWF' ? 'USD' : currency, // RWF not in Intl, use custom
        minimumFractionDigits: currency === 'RWF' ? 0 : 2,
        maximumFractionDigits: currency === 'RWF' ? 0 : 2
    });
    
    if (currency === 'RWF') {
        // Custom formatting for RWF
        return `FRw ${Math.round(amount).toLocaleString('en-US')}`;
    }
    
    return formatter.format(amount);
};

// LocalStorage utilities
export const saveCurrencyPreference = (currency) => {
    localStorage.setItem('preferredCurrency', currency);
};

export const getCurrencyPreference = () => {
    return localStorage.getItem('preferredCurrency') || 'USD';
};

export const saveEmailNotificationPreference = (enabled) => {
    localStorage.setItem('emailNotifications', enabled.toString());
};

export const getEmailNotificationPreference = () => {
    const pref = localStorage.getItem('emailNotifications');
    return pref === null ? true : pref === 'true';
};

// Firestore user preferences
export const saveUserPreferences = async (userId, preferences) => {
    try {
        const { doc, updateDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
        const { db } = await import('./firebase-config.js');
        
        await updateDoc(doc(db, 'users', userId), {
            preferences
        });
    } catch (error) {
        console.error('Error saving preferences:', error);
    }
};

export const getUserPreferences = async (userId) => {
    try {
        const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");
        const { db } = await import('./firebase-config.js');
        
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
            return userDoc.data().preferences || {};
        }
        return {};
    } catch (error) {
        console.error('Error getting preferences:', error);
        return {};
    }
};

// CSV Export
export const exportToCSV = (transactions) => {
    if (!transactions || transactions.length === 0) {
        alert('No transactions to export');
        return;
    }

    // CSV headers
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    
    // Convert transactions to CSV rows
    const rows = transactions.map(t => {
        const date = t.date.toDate ? t.date.toDate() : new Date(t.date);
        return [
            date.toLocaleDateString(),
            `"${t.description || 'No description'}"`, // Wrap in quotes to handle commas
            t.category || 'Other',
            t.type,
            t.amount
        ];
    });

    // Combine headers and rows
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

// PDF Export
export const exportToPDF = (transactions) => {
    if (!transactions || transactions.length === 0) {
        alert('No transactions to export');
        return;
    }

    const currency = getCurrencyPreference();

    // Access jsPDF from window (loaded via CDN)
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Transaction Report', 14, 20);
    
    // Add date
    doc.setFontSize(11);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // Prepare table data
    const tableData = transactions.map(t => {
        const date = t.date.toDate ? t.date.toDate() : new Date(t.date);
        return [
            date.toLocaleDateString(),
            t.description || 'No description',
            t.category || 'Other',
            t.type.charAt(0).toUpperCase() + t.type.slice(1),
            formatCurrency(t.amount, currency)
        ];
    });

    // Add table using autoTable plugin
    doc.autoTable({
        head: [['Date', 'Description', 'Category', 'Type', 'Amount']],
        body: tableData,
        startY: 40,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [16, 185, 129] }, // Primary green color
        alternateRowStyles: { fillColor: [245, 245, 245] }
    });

    // Calculate totals
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    // Add summary
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Total Income: ${formatCurrency(totalIncome, currency)}`, 14, finalY);
    doc.text(`Total Expense: ${formatCurrency(totalExpense, currency)}`, 14, finalY + 7);
    doc.setFont(undefined, 'bold');
    doc.text(`Net: ${formatCurrency(totalIncome - totalExpense, currency)}`, 14, finalY + 14);

    // Save PDF
    doc.save(`transactions_${new Date().toISOString().split('T')[0]}.pdf`);
};
