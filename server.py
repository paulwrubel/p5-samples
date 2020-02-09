from flask import Flask

app = Flask(__name__, static_folder='/docs')

@app.route('/')
def root():
    return app.send_static_file('index.html')