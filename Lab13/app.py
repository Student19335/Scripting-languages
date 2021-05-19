from flask import Flask, Response, redirect, url_for, request, session, abort, render_template
import sqlite3 as sql
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user

app = Flask(__name__)

app.config.update(
    DEBUG = True,
    SECRET_KEY = 'secret_key'
)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login"

class User(UserMixin):
    def __init__(self, id):
        self.id = id
        self.name = ''
        self.password = ''

    def __repr__(self):
        return "%d/%s/%s" % (self.id, self.name, self.password)

users = []

root = User(0)
root.name = 'root'
root.password = 'root'

users.append(root)

@app.route('/')
def index():
    return render_template('index.html', title = '', content = '')

@app.route('/about')
@login_required
def about():
    title = 'O mnie'
    content = 'To podstrona o mnie...'
    return render_template('about.html', title=title, content=content)

@app.route('/login', methods=['GET','POST'])
def login():
    title = 'Zaloguj się'
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username == 'root' and password == 'root':
            id = 1
            user = User(id)
            login_user(user)
            return redirect(url_for('index'))
        else:
            return abort(401)
    else:
        return render_template('login.html', title=title)

@app.errorhandler(401)
def page_not_found(e):
    title = "Nie udało się zalogować"
    content = "Zły login lub hasło"
    return render_template('error.html', title=title, content=content)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    title = "Zostałeś wylogowany"
    return render_template('logout.html',title=title)

@app.route('/add', methods = ['POST', 'GET'])
def add():
    if request.method == 'POST':
        conn = sql.connect('employees.db')
        try:
            fullname = request.form['fullname']
            number = request.form['number']
            address = request.form['address']

            cur = conn.cursor()
            cur.execute('INSERT INTO employees(fullname, number, address) VALUES (?, ?, ?)', (fullname, number, address))
            conn.commit()
            msg = 'Pomyślnie dodany pracownik'

        except:
            conn.rollback()
            msg = 'Nie udało się dodać pracownika'

        finally:
            conn.close()
            return render_template('add.html', msg = msg)
    return render_template('add.html')
    

@app.route('/list')
def list():
    conn = sql.connect("employees.db")
    cur = conn.cursor()
    conn.row_factory = sql.Row
    cur = conn.cursor()
    cur.execute('SELECT * FROM employees ORDER BY fullname')
    rows = cur.fetchall()
    return render_template('list.html', rows=rows)

@login_manager.user_loader
def load_user(userid):
    return User(userid)

if __name__ == '__main__':
    app.run(debug = True)



