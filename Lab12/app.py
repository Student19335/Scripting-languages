from flask import Flask, render_template, request
import sqlite3 as sql

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', title='', content='')

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

if __name__ == '__main__':
    app.run(debug = True)