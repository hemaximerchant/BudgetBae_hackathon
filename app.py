from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os
from datetime import datetime
import random

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev_key_for_testing')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'mysql://username:password@localhost/budgetbae_db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    user_type = db.Column(db.String(20), nullable=False)  # 'student' or 'professional'
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    expenses = db.relationship('Expense', backref='user', lazy=True)
    trips = db.relationship('Trip', backref='user', lazy=True)

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(200))
    category = db.Column(db.String(50))
    date = db.Column(db.DateTime, default=datetime.utcnow)
    receipt_url = db.Column(db.String(200))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    trip_id = db.Column(db.Integer, db.ForeignKey('trip.id'), nullable=True)

class Trip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    destination = db.Column(db.String(100), nullable=False)
    purpose = db.Column(db.String(200))
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, approved, rejected
    approver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    expenses = db.relationship('Expense', backref='trip', lazy=True)

class PolicyViolation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(100), nullable=False)
    count = db.Column(db.Integer, default=0)

# Helper functions
def get_student_categories():
    return [
        {"name": "Tuition & Fees", "icon": "fas fa-graduation-cap", "amount": "1200.00"},
        {"name": "Books & Supplies", "icon": "fas fa-book", "amount": "350.75"},
        {"name": "Ramen & Snacks", "icon": "fas fa-utensils", "amount": "280.50"},
        {"name": "Coffee & Energy Drinks", "icon": "fas fa-mug-hot", "amount": "120.25"},
        {"name": "Dorm Essentials", "icon": "fas fa-home", "amount": "95.00"}
    ]

def get_professional_categories():
    return [
        {"name": "Rent & Utilities", "icon": "fas fa-home", "amount": "1500.00"},
        {"name": "Groceries", "icon": "fas fa-shopping-cart", "amount": "450.75"},
        {"name": "Transportation", "icon": "fas fa-car", "amount": "320.50"},
        {"name": "Entertainment", "icon": "fas fa-film", "amount": "180.25"},
        {"name": "Investments", "icon": "fas fa-chart-line", "amount": "500.00"}
    ]

def get_meme_of_the_day():
    memes = [
        {
            "url": "https://i.imgur.com/XqpQlNH.jpg",
            "caption": "Me checking my bank account after a weekend of 'self-care'"
        },
        {
            "url": "https://i.imgur.com/JG9wvxo.jpg",
            "caption": "When you realize you spent your entire paycheck in 3 days"
        },
        {
            "url": "https://i.imgur.com/8XAyVSI.jpg",
            "caption": "My budget: exists. Me: I'm gonna pretend I didn't see that"
        },
        {
            "url": "https://i.imgur.com/ZHWfuYO.jpg",
            "caption": "When someone asks what happened to your savings"
        },
        {
            "url": "https://i.imgur.com/kYgnAxt.jpg",
            "caption": "Me explaining to my future self why I needed that $7 coffee"
        }
    ]
    return random.choice(memes)

def get_user_greeting(user_type):
    student_greetings = [
        "Ready to track those ramen expenses? Let's get this bread! 🍞",
        "Time to see where your tuition money isn't going! 💸",
        "Let's make sure you're not spending all your money on energy drinks! ⚡",
        "College life be expensive, but we're here to help you flex on a budget! 💪"
    ]
    
    professional_greetings = [
        "Adulting like a boss! Let's see those stonks! 📈",
        "Time to see where your hard-earned cash is going! 💰",
        "Balancing that work-life budget? We got you fam! ✨",
        "Let's make sure your coffee budget isn't bigger than your rent! ☕"
    ]
    
    if user_type == 'student':
        return random.choice(student_greetings)
    else:
        return random.choice(professional_greetings)

# Routes
@app.route('/')
def index():
    if 'user_id' in session:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        user = User.query.filter_by(email=email).first()
        
        if user and check_password_hash(user.password_hash, password):
            session['user_id'] = user.id
            flash('Login successful! Vibes are immaculate! ✨', 'success')
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid email or password. Not very cash money of you. 💀', 'danger')
    
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        user_type = request.form.get('user_type')
        
        # Validation
        if not username or not email or not password or not user_type:
            flash('All fields are required! Don\'t be shy, fill them all out! 👀', 'danger')
            return render_template('register.html')
        
        if password != confirm_password:
            flash('Passwords don\'t match! No cap, they need to be the same! 💀', 'danger')
            return render_template('register.html')
        
        # Check if email already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash('Email already registered! Did you forgor? 💀', 'danger')
            return render_template('register.html')
        
        # Create new user
        new_user = User(
            username=username,
            email=email,
            password_hash=generate_password_hash(password),
            user_type=user_type
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        flash('Registration successful! You\'re officially part of the vibe! ✨', 'success')
        return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    user = User.query.get(session['user_id'])
    
    # Get categories based on user type
    top_categories = get_student_categories() if user.user_type == 'student' else get_professional_categories()
    
    # Get meme of the day
    meme = get_meme_of_the_day()
    
    # Get user greeting
    user_greeting = get_user_greeting(user.user_type)
    
    # Get pending trips
    if user.user_type == 'student':
        pending_trips = [
            {"destination": "Spring Break Beach", "purpose": "Vibes and relaxation", "date": "Mar 15"},
            {"destination": "Music Festival", "purpose": "Weekend getaway", "date": "Apr 22"},
            {"destination": "Study Abroad", "purpose": "Educational trip", "date": "Jun 10"},
            {"destination": "Home for Holidays", "purpose": "Family visit", "date": "Dec 20"}
        ]
    else:
        pending_trips = [
            {"destination": "New York", "purpose": "Client meeting", "date": "May 5"},
            {"destination": "San Francisco", "purpose": "Conference", "date": "Jun 15"},
            {"destination": "Chicago", "purpose": "Team building", "date": "Jul 22"},
            {"destination": "Miami", "purpose": "Sales pitch", "date": "Aug 10"}
        ]
    
    # Mock data for dashboard
    total_expense = "1,250.00"
    advances = "350.00"
    reimbursements = "175.50"
    total_trips = "4"
    
    return render_template(
        'dashboard.html', 
        user=user, 
        top_categories=top_categories, 
        pending_trips=pending_trips,
        total_expense=total_expense,
        advances=advances,
        reimbursements=reimbursements,
        total_trips=total_trips,
        meme_url=meme["url"],
        meme_caption=meme["caption"],
        user_greeting=user_greeting
    )

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    flash('You\'ve been logged out! Come back soon bestie! 👋', 'success')
    return redirect(url_for('login'))

# API Routes for AJAX calls
@app.route('/api/expenses')
def get_expenses():
    if 'user_id' not in session:
        return {"error": "Unauthorized"}, 401
    
    user_id = session['user_id']
    user = User.query.get(user_id)
    
    # Generate different categories based on user type
    if user.user_type == 'student':
        categories = ['Tuition', 'Books', 'Food', 'Entertainment', 'Transportation']
    else:
        categories = ['Rent', 'Utilities', 'Groceries', 'Transportation', 'Entertainment']
    
    # Mock data for now
    expenses = []
    for i in range(10):
        expenses.append({
            "id": i + 1,
            "amount": round(random.uniform(10, 500), 2),
            "description": f"Sample expense {i+1}",
            "category": random.choice(categories),
            "date": datetime.now().strftime('%Y-%m-%d')
        })
    
    return {"expenses": expenses}

# Initialize database
@app.before_first_request
def create_tables():
    db.create_all()
    
    # Add initial policy violations if none exist
    if PolicyViolation.query.count() == 0:
        violations = [
            PolicyViolation(type="Expense amount limit", count=35),
            PolicyViolation(type="Description mandatory", count=32),
            PolicyViolation(type="Receipt required limit", count=32)
        ]
        db.session.bulk_save_objects(violations)
        db.session.commit()

if __name__ == '__main__':
    app.run(debug=True)
