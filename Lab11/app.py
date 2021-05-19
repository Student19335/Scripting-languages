from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', title='', content='')

@app.route('/about')
def about():
    title = 'O mnie'
    content = 'To jest strona poświęcona mojej osobie'
    return render_template('about.html', title=title, content=content)

@app.route('/info')
def info():
    title = 'Informacje'
    content = 'To jest strona z informacjami'

    infos = [
        {
            'author': 'Adam',
            'content': 'Informacje o Adamie'
        },
        {
            'author': 'Ewa',
            'content': 'Informacje o Ewie'
        },
        {
            'author': 'Gal Anonim',
            'content': 'Informacje o Galu Anonimie'
        }
    ]

    return render_template('info.html', title=title, content=content, infos=infos)

if __name__ == '__main__':
    app.run(debug = True)