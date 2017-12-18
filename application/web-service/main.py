#!/usr/bin/python
from flask import Flask, request, jsonify, json

from flask_cors import CORS

from file import File

app = Flask(__name__)
CORS(app)

print('')
print('============================================================')
print('=================== Visualization Server ===================')
print('============================================================')


@app.route('/')
def home():
	return "Hello, everyone"


# Lista os atributos selecionados das cidades por estado
@app.route('/states/<number>/<year>', methods=['GET', 'POST'])
def state(number, year):
	data = json.loads(request.form['data'])

	file = File('../data/estados.csv')
	lista = file.select(data['attributes'], year)

	return jsonify(lista)


# Lista os atributos especificados de todas as cidades do pais
@app.route('/cities/<number>/<year>', methods=['GET', 'POST'])
def cities(number, year):
	data = json.loads(request.form['data'])

	file = File('../data/cidades.csv')
	lista = file.select(data['attributes'], year)

	return jsonify(lista)

@app.route('/qualidadevida/<year>', methods=['GET', 'POST'])
def qualidadevida(year):
    	
	data = json.loads(request.form['data'])

	file = File('../data/cidades.csv')
	lista = file.select(data['attributes'], year)

	return jsonify(lista)

@app.route('/evolucao', methods=['GET', 'POST'])
def evolucao():
    	
	data = json.loads(request.form['data'])

	file = File('../data/cidades.csv')
	lista = file.compare(data['attributes'])

	return jsonify(lista)


#####################################
if __name__ == '__main__':
	app.run()
