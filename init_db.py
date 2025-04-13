from app import db, User, Expense, Trip, PolicyViolation
from werkzeug.security import generate_password_hash
from datetime import datetime, timedelta
import random

# Create tables
db.create_all()

# Add sample users with user types
users = [
    {"username": "Admin User", "email": "admin@example.com", "password": "admin123", "user_type": "professional"},
    {"username": "Zoe", "email": "zoe@college.edu", "password": "password123", "user_type": "student"},
    {"username": "Tyler", "email": "tyler@university.edu", "password": "password123", "user_type": "student"},
    {"username": "Emma", "email": "emma@work.com", "password": "password123", "user_type": "professional"},
    {"username": "Noah", "email": "noah@company.com", "password": "password123", "user_type": "professional"},
    {"username": "Olivia", "email": "olivia@school.edu", "password": "password123", "user_type": "student"},
    {"username": "Liam", "email": "liam@business.com", "password": "password123", "user_type": "professional"},
    {"username": "Ava", "email": "ava@college.edu", "password": "password123", "user_type": "student"},
    {"username": "William", "email": "william@startup.com", "password": "password123", "user_type": "professional"},
    {"username": "Sophia", "email": "sophia@university.edu", "password": "password123", "user_type": "student"}
]

for user_data in users:
    # Check if user already exists
    existing_user = User.query.filter_by(email=user_data["email"]).first()
    if not existing_user:
        user = User(
            username=user_data["username"],
            email=user_data["email"],
            password_hash=generate_password_hash(user_data["password"]),
            user_type=user_data["user_type"]
        )
        db.session.add(user)

db.session.commit()

# Get all users
all_users = User.query.all()

# Define categories based on user type
student_categories = ['Tuition', 'Books', 'Food', 'Entertainment', 'Transportation', 'Housing', 'Coffee', 'School Supplies']
professional_categories = ['Rent', 'Utilities', 'Groceries', 'Transportation', 'Entertainment', 'Investments', 'Dining Out', 'Shopping']

# Define trip destinations based on user type
student_destinations = ["Spring Break Beach", "Music Festival", "Study Abroad", "Home Visit", "Campus Tour", "Internship Location"]
professional_destinations = ["New York", "San Francisco", "Chicago", "Miami", "Seattle", "Boston", "Austin", "Denver"]

student_purposes = ["Spring Break", "Weekend Getaway", "Educational Trip", "Family Visit", "Campus Event", "Job Interview"]
professional_purposes = ["Client Meeting", "Conference", "Training", "Team Building", "Sales Pitch", "Product Launch"]

# Add sample trips
for user in all_users:
    # Create 2-5 trips per user
    for _ in range(random.randint(2, 5)):
        start_date = datetime.now() + timedelta(days=random.randint(1, 60))
        end_date = start_date + timedelta(days=random.randint(1, 7))
        
        if user.user_type == 'student':
            destination = random.choice(student_destinations)
            purpose = random.choice(student_purposes)
        else:
            destination = random.choice(professional_destinations)
            purpose = random.choice(professional_purposes)
        
        trip = Trip(
            destination=destination,
            purpose=purpose,
            start_date=start_date,
            end_date=end_date,
            status=random.choice(['pending', 'approved', 'rejected']),
            user_id=user.id,
            approver_id=random.choice(all_users).id
        )
        db.session.add(trip)

db.session.commit()

# Get all trips
all_trips = Trip.query.all()

# Add sample expenses with categories based on user type
for user in all_users:
    # Create 5-10 expenses per user
    for _ in range(random.randint(5, 10)):
        # Some expenses are associated with trips, some are not
        trip = random.choice(all_trips) if random.random() > 0.3 else None
        trip_id = trip.id if trip else None
        
        if user.user_type == 'student':
            category = random.choice(student_categories)
            if category == 'Tuition':
                amount = round(random.uniform(500, 3000), 2)
            elif category == 'Books':
                amount = round(random.uniform(50, 300), 2)
            else:
                amount = round(random.uniform(10, 150), 2)
        else:
            category = random.choice(professional_categories)
            if category == 'Rent':
                amount = round(random.uniform(800, 2500), 2)
            elif category == 'Investments':
                amount = round(random.uniform(100, 1000), 2)
            else:
                amount = round(random.uniform(20, 300), 2)
        
        expense = Expense(
            amount=amount,
            description=f"{category} expense",
            category=category,
            date=datetime.now() - timedelta(days=random.randint(1, 90)),
            receipt_url=None,  # No receipts in this sample data
            user_id=user.id,
            trip_id=trip_id
        )
        db.session.add(expense)

db.session.commit()

# Add policy violations
violations = [
    PolicyViolation(type="Expense amount limit", count=35),
    PolicyViolation(type="Description mandatory", count=32),
    PolicyViolation(type="Receipt required limit", count=32)
]

for violation in violations:
    existing = PolicyViolation.query.filter_by(type=violation.type).first()
    if not existing:
        db.session.add(violation)

db.session.commit()

print("BudgetBae database initialized with sample data! It's giving financial literacy! ✨💸")
