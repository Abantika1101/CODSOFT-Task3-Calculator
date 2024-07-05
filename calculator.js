document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('button'));
    let valueStack = [];
    let undoStack = [];

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                display.textContent = '0';
                valueStack = [];
                undoStack = [];
            } else if (value === 'Undo') {
                if (undoStack.length > 0) {
                    valueStack = undoStack.pop();
                    display.textContent = valueStack.join('') || '0';
                }
            } else if (value === 'Redo') {
                // Implement redo functionality if needed
            } else if (value === 'Del') {
                valueStack.pop();
                display.textContent = valueStack.join('') || '0';
            } else if (value === '=') {
                try {
                    const result = eval(valueStack.join(''));
                    undoStack.push([...valueStack]);
                    display.textContent = result;
                    valueStack = [result];
                } catch {
                    display.textContent = 'Error';
                    valueStack = [];
                }
            } else {
                if (valueStack.length === 0 && value === '.') {
                    valueStack.push('0');
                }
                if (['/', '*', '-', '+'].includes(value) && ['/', '*', '-', '+'].includes(valueStack[valueStack.length - 1])) {
                    valueStack[valueStack.length - 1] = value; // Replace the operator if already present
                } else {
                    valueStack.push(value);
                }
                display.textContent = valueStack.join('');
            }
        });
    });
});
