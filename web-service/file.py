import csv



class File:

	def __init__(self, name):
		self.name = name

	#'../data/estados.csv'
	def select(self, attributes, year):
		
		with open(self.name, 'r') as csvfile:
			reader = csv.DictReader(csvfile)
			conjunto = []
			for row in reader:
				#print(row['UFN'], row['IDHM'])
				if row['ANO'] == year :
					lista = []
				
					for attr in attributes:
						try:
							lista.append(row[attr])
						except ValueError as e:
							print(e)
						

					conjunto.append(lista)
		
		return conjunto

