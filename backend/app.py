from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # ← allow all origins + methods during dev


# Expenses data keyed by date (YYYY-MM-DD)
EXPENSES = {
    "2026-01-05": {"amount": 45.99, "description": "Lunch"},
    "2026-01-12": {"amount": 120.00, "description": "Software"},
    "2026-01-20": {"amount": 89.50, "description": "Office supplies"},
    "2026-02-03": {"amount": 250.00, "description": "Travel"},
    "2026-02-14": {"amount": 65.00, "description": "Dinner"},
    "2026-02-28": {"amount": 199.99, "description": "Equipment"},
    "2026-03-10": {"amount": 35.00, "description": "Books"},
    "2026-03-22": {"amount": 150.00, "description": "Conference"},
    "2026-04-05": {"amount": 75.50, "description": "Team lunch"},
    "2026-04-18": {"amount": 320.00, "description": "Hardware"},
    "2026-05-01": {"amount": 55.00, "description": "Subscription"},
    "2026-05-15": {"amount": 180.00, "description": "Training"},
    "2026-06-08": {"amount": 95.00, "description": "Supplies"},
    "2026-06-25": {"amount": 420.00, "description": "Software license"},
    "2026-07-04": {"amount": 85.00, "description": "Team event"},
    "2026-07-20": {"amount": 210.00, "description": "Travel"},
    "2026-08-12": {"amount": 145.00, "description": "Office"},
    "2026-09-03": {"amount": 78.50, "description": "Lunch"},
    "2026-10-15": {"amount": 550.00, "description": "Equipment"},
    "2026-11-22": {"amount": 125.00, "description": "Books"},
    "2026-12-10": {"amount": 300.00, "description": "Holiday party"},
}


@app.route("/api/expenses", methods=["GET"])
def get_expenses():
    """Return all expenses."""
    return jsonify(EXPENSES)


@app.route("/api/expenses/<date>", methods=["GET"])
def get_expense_by_date(date):
    """Return expense for a specific date."""
    expense = EXPENSES.get(date)
    if expense:
        return jsonify(expense)
    return jsonify({"error": "No expense found for this date"}), 404


if __name__ == "__main__":
    app.run(debug=True, port=5000)
