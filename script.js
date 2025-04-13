document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar sections
    const sidebarHeaders = document.querySelectorAll('.sidebar-header');
    sidebarHeaders.forEach(header => {
        header.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-chevron-right')) {
                icon.classList.replace('fa-chevron-right', 'fa-chevron-down');
            } else {
                icon.classList.replace('fa-chevron-down', 'fa-chevron-right');
            }
            
            // Toggle menu visibility
            const menu = this.nextElementSibling;
            if (menu && menu.classList.contains('sidebar-menu')) {
                if (this.classList.contains('active')) {
                    menu.style.display = 'block';
                } else {
                    menu.style.display = 'none';
                }
            }
        });
    });
    
    // Initialize charts if we're on the dashboard page
    const spendChartCanvas = document.getElementById('spendChart');
    if (spendChartCanvas) {
        // Spend Summary Chart
        const spendCtx = spendChartCanvas.getContext('2d');
        const spendChart = new Chart(spendCtx, {
            type: 'line',
            data: {
                labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
                datasets: [{
                    label: 'Spend Amount',
                    data: [20000, 40000, 110000, 90000, 140000, 180000, 200000, 200000, 180000, 150000, 140000, 120000],
                    borderColor: '#8a2be2',
                    backgroundColor: 'rgba(138, 43, 226, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointRadius: 4,
                    pointBackgroundColor: '#8a2be2',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 200000,
                        ticks: {
                            callback: function(value) {
                                return '$' + value / 1000 + 'k';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
        
        // Policy Violations Chart
        const policyCtx = document.getElementById('policyChart').getContext('2d');
        const policyChart = new Chart(policyCtx, {
            type: 'doughnut',
            data: {
                labels: ['Expense amount limit', 'Description mandatory', 'Receipt required limit'],
                datasets: [{
                    data: [35.14, 32.43, 32.43],
                    backgroundColor: ['#ef4444', '#000000', '#8a2be2'],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }
    
    // Form validation for login and register
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const passwordField = document.getElementById('password');
            if (passwordField && passwordField.value.length < 6) {
                e.preventDefault();
                alert('Password too short! Make it at least 6 characters for the vibes ✨');
            }
            
            // Check if confirm password matches (on register page)
            const confirmPasswordField = document.getElementById('confirm_password');
            if (confirmPasswordField && confirmPasswordField.value !== passwordField.value) {
                e.preventDefault();
                alert('Passwords don\'t match! No cap, they need to be the same 💀');
            }
        });
    }
    
    // Add fun animations to cards
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) {
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
            });
        });
    }
});
