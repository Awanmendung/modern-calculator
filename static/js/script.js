/**
 * Modern Calculator - Frontend JavaScript
 * Handles UI interactions and API communication
 */

class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.expression = document.getElementById('expression');
        this.historyList = document.getElementById('historyList');
        this.statusIndicator = document.getElementById('status');
        this.clearHistoryBtn = document.getElementById('clearHistory');
        
        this.currentInput = '0';
        this.previousExpression = '';
        this.waitingForNewInput = false;
        
        this.init();
    }
    
    init() {
        // Bind button events
        this.bindButtons();
        
        // Bind keyboard events
        this.bindKeyboard();
        
        // Bind history clear button
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
        
        // Load history on start
        this.loadHistory();
        
        // Check server connection
        this.checkConnection();
    }
    
    bindButtons() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.dataset.value;
                const action = button.dataset.action;
                
                if (value !== undefined) {
                    this.handleInput(value);
                } else if (action) {
                    this.handleAction(action);
                }
                
                // Add ripple effect
                this.createRipple(button, event);
            });
        });
    }
    
    bindKeyboard() {
        document.addEventListener('keydown', (e) => {
            const key = e.key;
            
            // Numbers
            if (/^[0-9]$/.test(key)) {
                this.handleInput(key);
            }
            // Operators
            else if (['+', '-', '*', '/'].includes(key)) {
                this.handleInput(key);
            }
            // Decimal point
            else if (key === '.' || key === ',') {
                this.handleInput('.');
            }
            // Calculate
            else if (key === 'Enter' || key === '=') {
                e.preventDefault();
                this.handleAction('calculate');
            }
            // Clear
            else if (key === 'Escape' || key === 'c' || key === 'C') {
                this.handleAction('clear');
            }
            // Delete
            else if (key === 'Backspace') {
                this.handleAction('delete');
            }
            // Percent
            else if (key === '%') {
                this.handleInput('%');
            }
        });
    }
    
    handleInput(value) {
        // If waiting for new input after calculation, start fresh
        if (this.waitingForNewInput) {
            if (['+', '-', '*', '/', '%'].includes(value)) {
                // Continue with the result
                this.waitingForNewInput = false;
            } else {
                // Start fresh
                this.currentInput = '';
                this.previousExpression = '';
                this.waitingForNewInput = false;
            }
        }
        
        // Handle decimal point
        if (value === '.') {
            // Get the last number in the expression
            const parts = this.currentInput.split(/[\+\-\*\/\%]/);
            const lastNumber = parts[parts.length - 1];
            
            // Don't add decimal if last number already has one
            if (lastNumber.includes('.')) {
                return;
            }
            
            // If current input is empty or ends with operator, add "0."
            if (this.currentInput === '0' || this.currentInput === '') {
                this.currentInput = '0.';
                this.updateDisplay();
                return;
            }
            
            if (/[\+\-\*\/\%]$/.test(this.currentInput)) {
                this.currentInput += '0.';
                this.updateDisplay();
                return;
            }
        }
        
        // Handle operators
        if (['+', '-', '*', '/', '%'].includes(value)) {
            // Don't allow operator at the start (except minus)
            if (this.currentInput === '0' || this.currentInput === '') {
                if (value === '-') {
                    this.currentInput = '-';
                    this.updateDisplay();
                }
                return;
            }
            
            // Replace last operator if pressing another operator
            if (/[\+\-\*\/\%]$/.test(this.currentInput)) {
                this.currentInput = this.currentInput.slice(0, -1) + value;
                this.updateDisplay();
                return;
            }
        }
        
        // Handle numbers
        if (this.currentInput === '0' && value !== '.') {
            this.currentInput = value;
        } else {
            this.currentInput += value;
        }
        
        this.updateDisplay();
    }
    
    handleAction(action) {
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'delete':
                this.delete();
                break;
            case 'percent':
                this.handleInput('%');
                break;
            case 'calculate':
                this.calculate();
                break;
        }
    }
    
    clear() {
        this.currentInput = '0';
        this.previousExpression = '';
        this.waitingForNewInput = false;
        this.updateDisplay();
    }
    
    delete() {
        if (this.waitingForNewInput) {
            this.clear();
            return;
        }
        
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        
        this.updateDisplay();
    }
    
    async calculate() {
        // Don't calculate if expression ends with operator
        if (/[\+\-\*\/\%]$/.test(this.currentInput)) {
            return;
        }
        
        // Don't calculate if just a number
        if (!/[\+\-\*\/\%]/.test(this.currentInput)) {
            return;
        }
        
        const expression = this.currentInput;
        
        try {
            // Show loading state
            this.display.classList.add('loading');
            
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ expression })
            });
            
            const data = await response.json();
            
            this.display.classList.remove('loading');
            
            if (data.success) {
                // Format result
                let result = data.result;
                if (typeof result === 'number') {
                    // Round to avoid floating point issues
                    result = Math.round(result * 1000000000) / 1000000000;
                }
                
                this.previousExpression = expression + ' =';
                this.currentInput = String(result);
                this.waitingForNewInput = true;
                
                this.updateDisplay();
                this.loadHistory();
                this.setStatus('connected');
            } else {
                this.showError(data.error || 'Calculation error');
            }
        } catch (error) {
            this.display.classList.remove('loading');
            this.showError('Server connection error');
            this.setStatus('error');
            console.error('Calculation error:', error);
        }
    }
    
    updateDisplay() {
        // Format display with thousand separators for readability
        const displayValue = this.formatNumber(this.currentInput);
        this.display.textContent = displayValue;
        this.display.classList.remove('error');
        
        // Update expression display
        this.expression.textContent = this.previousExpression;
    }
    
    formatNumber(value) {
        // Don't format if it contains operators (it's an expression)
        if (/[\+\-\*\/\%]/.test(value) && !value.startsWith('-')) {
            return this.formatExpression(value);
        }
        return value;
    }
    
    formatExpression(expr) {
        // Replace operators with prettier symbols for display
        return expr
            .replace(/\*/g, ' × ')
            .replace(/\//g, ' ÷ ')
            .replace(/\+/g, ' + ')
            .replace(/\-/g, ' − ')
            .replace(/\%/g, ' % ');
    }
    
    showError(message) {
        this.display.textContent = message;
        this.display.classList.add('error');
        
        setTimeout(() => {
            this.display.classList.remove('error');
            this.updateDisplay();
        }, 2000);
    }
    
    async loadHistory() {
        try {
            const response = await fetch('/api/history');
            const data = await response.json();
            
            if (data.success && data.history.length > 0) {
                this.renderHistory(data.history);
            } else {
                this.renderEmptyHistory();
            }
        } catch (error) {
            console.error('Failed to load history:', error);
        }
    }
    
    renderHistory(history) {
        this.historyList.innerHTML = history
            .reverse()
            .map(item => `
                <div class="history-item" data-expression="${item.expression}" data-result="${item.result}">
                    <div class="history-expression">${this.formatExpression(item.expression)}</div>
                    <div class="history-result">= ${item.result}</div>
                </div>
            `)
            .join('');
        
        // Add click handlers to history items
        this.historyList.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', () => {
                this.currentInput = item.dataset.result;
                this.previousExpression = item.dataset.expression + ' =';
                this.waitingForNewInput = true;
                this.updateDisplay();
            });
        });
    }
    
    renderEmptyHistory() {
        this.historyList.innerHTML = `
            <div class="history-empty">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <p>No calculations yet</p>
            </div>
        `;
    }
    
    async clearHistory() {
        try {
            await fetch('/api/history', { method: 'DELETE' });
            this.renderEmptyHistory();
        } catch (error) {
            console.error('Failed to clear history:', error);
        }
    }
    
    async checkConnection() {
        try {
            const response = await fetch('/api/history');
            if (response.ok) {
                this.setStatus('connected');
            } else {
                this.setStatus('error');
            }
        } catch (error) {
            this.setStatus('error');
        }
    }
    
    setStatus(status) {
        if (status === 'connected') {
            this.statusIndicator.innerHTML = `
                <span class="status-dot"></span>
                Connected to Server
            `;
            this.statusIndicator.classList.remove('error');
        } else {
            this.statusIndicator.innerHTML = `
                <span class="status-dot"></span>
                Connection Error
            `;
            this.statusIndicator.classList.add('error');
        }
    }
    
    createRipple(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${event.clientX - rect.left - size/2}px;
            top: ${event.clientY - rect.top - size/2}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    }
}

// Add ripple animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize calculator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.calculator = new Calculator();
});
