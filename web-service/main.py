import csv

with open('../data/estados.csv', 'r', newline='') as csvfile:
	reader = csv.DictReader(csvfile)
	for row in reader:
		print(row['UFN'], row['IDHM'])