from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import re

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

# History of calculations
calculation_history = []

def safe_eval(expression):
    """
    Safely evaluate mathematical expression.
    Only allows numbers and basic operators.
    """
    # Remove whitespace
    expression = expression.replace(' ', '')
    
    # Validate expression - only allow numbers, operators, parentheses, and decimal points
    if not re.match(r'^[\d+\-*/().%]+$', expression):
        raise ValueError("Invalid characters in expression")
    
    # Check for empty expression
    if not expression:
        raise ValueError("Empty expression")
    
    # Evaluate safely
    try:
        # Using compile to check syntax first
        code = compile(expression, '<string>', 'eval')
        
        # Only allow safe names (none in this case)
        for name in code.co_names:
            raise ValueError(f"Invalid operation: {name}")
        
        result = eval(code, {"__builtins__": {}}, {})
        return result
    except ZeroDivisionError:
        raise ValueError("Cannot divide by zero")
    except SyntaxError:
        raise ValueError("Invalid expression syntax")

@app.route('/')
def index():
    """Render the calculator page"""
    return render_template('index.html')

@app.route('/privacy-policy')
def privacy_policy():
    """Serve privacy policy page"""
    return app.send_static_file('../privacy-policy.html')


@app.route('/api/calculate', methods=['POST'])
def calculate():
    """
    API endpoint to calculate expression
    Expects JSON: {"expression": "2+2"}
    Returns JSON: {"result": 4, "expression": "2+2"}
    """
    try:
        data = request.get_json()
        
        if not data or 'expression' not in data:
            return jsonify({
                'error': 'No expression provided',
                'success': False
            }), 400
        
        expression = data['expression']
        result = safe_eval(expression)
        
        # Store in history
        history_entry = {
            'expression': expression,
            'result': result
        }
        calculation_history.append(history_entry)
        
        # Keep only last 10 calculations
        if len(calculation_history) > 10:
            calculation_history.pop(0)
        
        return jsonify({
            'expression': expression,
            'result': result,
            'success': True
        })
        
    except ValueError as e:
        return jsonify({
            'error': str(e),
            'success': False
        }), 400
    except Exception as e:
        return jsonify({
            'error': 'Calculation error',
            'success': False
        }), 500

@app.route('/api/history', methods=['GET'])
def get_history():
    """Get calculation history"""
    return jsonify({
        'history': calculation_history,
        'success': True
    })

@app.route('/api/history', methods=['DELETE'])
def clear_history():
    """Clear calculation history"""
    calculation_history.clear()
    return jsonify({
        'message': 'History cleared',
        'success': True
    })

if __name__ == '__main__':
    print("Calculator Server Starting...")
    print("Open http://localhost:5000 in your browser")
    app.run(debug=True, port=5000)
