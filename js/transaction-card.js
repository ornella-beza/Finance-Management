export const renderTransactionCard = (transaction, currency, categories) => {
    const category = categories.find(c => c.name === transaction.category);
    const color = category ? category.color : (transaction.type === 'income' ? '#10B981' : '#EF4444');
    const { formatCurrency } = await import('./settings.js');
    
    return `
        <div class="t-card">
            <div class="t-card-left">
                <div class="t-card-icon" style="background-color: ${color}20; color: ${color};">
                    ${transaction.type === 'income' ? 
                        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>' : 
                        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>'
                    }
                </div>
                <div class="t-card-info">
                    <h4>${transaction.description}</h4>
                    <p>${transaction.category}</p>
                </div>
            </div>
            <div class="t-card-right">
                <div class="t-card-amount ${transaction.type}">
                    ${transaction.type === 'income' ? '+' : '-'}${formatCurrency(transaction.amount, currency).replace(/^[^\d-]+/, '')}
                </div>
                <div class="t-card-date">${new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            </div>
            <div class="t-card-actions">
                <button class="action-btn edit-btn" data-id="${transaction.id}" title="Edit">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                <button class="action-btn delete-btn" data-id="${transaction.id}" title="Delete">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            </div>
        </div>
    `;
};
