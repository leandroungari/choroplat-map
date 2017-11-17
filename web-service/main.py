#!/usr/bin/python
from flask import Flask, request, jsonify, json
from flask_cors import CORS

from file import File

app = Flask(__name__)
CORS(app)



@app.route('/')
def home():
	return "Hello, everyone"


#Lista os atributos selecionados das cidades por estado
@app.route('/states', methods=['GET','POST'])
def state():
	
	data = json.loads(request.form['data'])
	
	file = File('../data/estados.csv')
	lista = file.select(data['attributes'])

	return jsonify(lista)

#Lista os atributos especificados de todas as cidades do pais
@app.route('/cities')
def cities():
    return 'Hello, Cities!'



#####################################
if __name__ == '__main__':
   app.run()