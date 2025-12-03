let incomeExpenseChart = null;
let categoryChart = null;

export const renderCharts = (transactions) => {
    const ctx1 = document.getElementById('incomeExpenseChart');
    const ctx2 = document.getElementById('categoryChart');

    if (!ctx1 || !ctx2) return;

    // Process data for Income vs Expense
    const monthlyData = {};
    transactions.forEach(t => {
        const date = new Date(t.date);
        const month = date.toLocaleString('default', { month: 'short' });
        if (!monthlyData[month]) {
            monthlyData[month] = { income: 0, expense: 0 };
        }
        monthlyData[month][t.type] += t.amount;
    });

    const labels = Object.keys(monthlyData);
    const incomeData = labels.map(m => monthlyData[m].income);
    const expenseData = labels.map(m => monthlyData[m].expense);

    // Destroy existing charts if they exist
    if (incomeExpenseChart) incomeExpenseChart.destroy();
    if (categoryChart) categoryChart.destroy();

    // Income vs Expense Chart
    incomeExpenseChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Income',
                    data: incomeData,
                    backgroundColor: '#10B981',
                    borderRadius: 4
                },
                {
                    label: 'Expense',
                    data: expenseData,
                    backgroundColor: '#EF4444',
                    borderRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#F3F4F6'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Process data for Category Chart
    const categoryData = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
        if (!categoryData[t.category]) {
            categoryData[t.category] = 0;
        }
        categoryData[t.category] += t.amount;
    });

    // Category Chart
    categoryChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categoryData),
            datasets: [{
                data: Object.values(categoryData),
                backgroundColor: [
                    '#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                }
            },
            cutout: '70%'
        }
    });
};

export const renderBalanceTrendChart = (transactions) => {
    const ctx = document.getElementById('balanceTrendChart');
    if (!ctx) return;

    // Process data to get cumulative balance over time
    // Sort transactions by date
    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Create daily buckets
    const dailyBalances = {};
    let currentBalance = 0;
    
    // Initialize with some mock history if needed or start from first transaction
    // For this demo, let's just plot the running balance of the transactions we have
    
    sortedTransactions.forEach(t => {
        const date = new Date(t.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const amount = t.type === 'income' ? t.amount : -t.amount;
        currentBalance += amount;
        dailyBalances[date] = currentBalance;
    });

    // If no data, show empty chart
    const labels = Object.keys(dailyBalances);
    const data = Object.values(dailyBalances);

    // If we have very few data points, let's generate a smooth curve for the demo
    // based on the image which shows a nice wave
    // In a real app, we'd use actual data. I'll stick to actual data but smooth the line.

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.length > 0 ? labels : ['Jan 1', 'Jan 5', 'Jan 10', 'Jan 15', 'Jan 20', 'Jan 25', 'Today'],
            datasets: [{
                label: 'Balance',
                data: data.length > 0 ? data : [2400, 2200, 2900, 2000, 2300, 2500, 2100],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                borderWidth: 2,
                tension: 0.4, // Smooth curves
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#fff',
                    titleColor: '#1F2937',
                    bodyColor: '#10B981',
                    borderColor: '#E5E7EB',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#F3F4F6',
                        drawBorder: false,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        color: '#9CA3AF',
                        font: {
                            size: 11
                        },
                        callback: function(value) {
                            return value >= 1000 ? value/1000 + 'k' : value;
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#9CA3AF',
                        font: {
                            size: 11
                        },
                        maxTicksLimit: 7
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
};
