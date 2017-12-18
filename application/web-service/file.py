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

	def compare(self, attributes):
    		
		with open(self.name, 'r') as csvfile:
			reader = csv.DictReader(csvfile)
			
			conjunto1991 = []
			conjunto2010 = []

			for row in reader:
				#print(row['UFN'], row['IDHM'])
				if int(row['ANO']) == 1991 :
					lista = []
				
					for attr in attributes:
						try:
							lista.append(row[attr])
						except ValueError as e:
							print(e)
						

					conjunto1991.append(lista)
    				
				if int(row['ANO']) == 2010 :
					lista = []
				
					for attr in attributes:
						try:
							lista.append(row[attr])
						except ValueError as e:
							print(e)
						

					conjunto2010.append(lista)

			result = []
			for i in range(len(conjunto1991)):
    
				item = []
				
				item.append(conjunto1991[i][0])
				item.append((float(conjunto2010[i][1]) - float(conjunto1991[i][1])))
				item.append(conjunto1991[i][2])
				

				result.append(item)

		
		return result

