from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def main():
 return render_template("index.html")

@app.route("/about")
def about():
 return render_template("about.html")

@app.route('/about1/<name>')
def about1(name):
 return render_template("about1.html",name='Luigi')

if __name__ == "__main__":
 app.run()
