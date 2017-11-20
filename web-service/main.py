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
	'''
	if (number == 1):
		
	elif (number == 2):
		
	elif (number == 3):
		
	elif (number == 4):
		
	else:
		print('error')
	'''	
	return jsonify(lista)


# Lista os atributos especificados de todas as cidades do pais
@app.route('/cities')
def cities():
	return 'Hello, Cities!'


#####################################
if __name__ == '__main__':
	app.run()
