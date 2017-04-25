from flask import Flask, render_template
from flask_bootstrap import Bootstrap
from flask_sqlalchemy import SQLAlchemy
from flask_restless import APIManager
from enum import unique

app = Flask(__name__)
app.config.from_pyfile('config.cfg')
Bootstrap(app)
db = SQLAlchemy(app)

class account(db.Model):
    id = db.Column(db.Integer, unique=True, primary_key=True)
    acc_date = db.Column(db.DateTime)
    acc_type = db.Column(db.String(50))
    acc_category = db.Column(db.String(50))
    description = db.Column(db.String(100))
    quantity = db.Column(db.Integer)
    unit_price = db.Column(db.Integer)
    amount = db.Column(db.Integer)

# Create the Flask-Restless API manager.
manager = APIManager(app, flask_sqlalchemy_db=db)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
manager.create_api(account, methods=['GET', 'POST', 'DELETE', 'PUT'])

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/income')
def income():
    return render_template('income.html')

@app.route('/expense')
def expense():
    return render_template('expense.html')

@app.route('/mytemplate')
def mytemplate():
    return render_template('mytemplate.html')

if __name__ == '__main__':
    # Create the database tables.
    db.create_all()

    # start the flask loop
    app.run(host='0.0.0.0', debug=True)