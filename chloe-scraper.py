import requests
import json
from bs4 import BeautifulSoup

chloe = {
	'ready-to-wear': {
		'new-arrivals': 'https://www.chloe.com/us/see-by-chloe/shop-online/women/see-by-chloe-ready-to-wear-new-arrivals',
		'tops-and-blouses': 'https://www.chloe.com/us/see-by-chloe/shop-online/women/see-by-chloe-tops',
		'dresses': 'https://www.chloe.com/us/see-by-chloe/shop-online/women/see-by-chloe-dresses',
		'pants': 'https://www.chloe.com/us/see-by-chloe/shop-online/women/see-by-chloe-pants',
		'skirts-and-shorts': 'https://www.chloe.com/us/see-by-chloe/shop-online/women/see-by-chloe-skirts-shorts',
		'coats-and-jackets': 'https://www.chloe.com/us/see-by-chloe/shop-online/women/see-by-chloe-coats-jackets',
		'knitwear': 'https://www.chloe.com/us/see-by-chloe/shop-online/women/see-by-chloe-knitwear'
	},
	'bags': {
		'new-arrivals': 'https://www.chloe.com/us/see-by-chloe/shop-online/women/new-arrivals-bags-see-by-chloe',
		'crossbody-bags': 'https://www.chloe.com/us/see-by-chloe/shop-online/women/handbags-see-by-chloe',
		'tote-bags': 'https://www.chloe.com/us/see-by-chloe/shop-online/women/tote-bags-see-by-chloe',
		'mini-bags': 'https://www.chloe.com/us/see-by-chloe/shop-online/women/mini-bags-see-by-chloe',
		'backpacks': 'https://www.chloe.com/us/see-by-chloe/shop-online/women/backpacks-see-by-chloe'
	},
	'accessories': {
		'new-arrivals': 'https://www.chloe.com/us/see-by-chloe/shop-online/women/new-arrivals-accessories-see-by-chloe',
		'wallets': 'https://www.chloe.com/us/see-by-chloe/shop-online/women/wallets-see-by-chloe',
		'small-leather-goods': 'https://www.chloe.com/us/see-by-chloe/shop-online/women/see-by-chloe-small-leather-goods',
		'shoes': 'https://www.chloe.com/us/see-by-chloe/shop-online/women/see-by-chloe-shoes'
	}
}

catalog = {} #just organization and product codes
inventory = {} #total inventory and information

def getCode(lnk):
	lnk = lnk[lnk.index('_cod') + 1:]
	lnk = lnk[:lnk.index('.')]
	return lnk

for category in chloe:
	categoryPages = {}
	for catalogPage in chloe[category]:
		pageItems = []
		URL = chloe[category][catalogPage]
		page = requests.get(URL)
		soup = BeautifulSoup(page.content, 'html.parser')

		filtered_soup = soup.find_all('a', class_='wrapper')

		links = [s['href'] for s in filtered_soup if s.has_attr('href')] #get all product links on page

		#each product
		for link in links:
			URL = link
			itemCode = getCode(URL)
			pageItems.append(itemCode) 
			if itemCode in inventory: 
				continue
			page = requests.get(URL)
			soup = BeautifulSoup(page.content, 'html.parser')

			#product name
			filtered_soup = soup.find_all('h1', class_='productName')
			productName = [s.string.strip().strip('\r\n') for s in filtered_soup if s.string][0]

			#product details
			filtered_soup = soup.find_all('span', class_='value')
			productDetails = [s.string for s in filtered_soup if s.string][1:5]

			#product images
			filtered_soup = soup.find('ul', class_='alternativeImages')
			filtered_soup = filtered_soup.find_all('img')
			images = [s['data-origin'] for s in filtered_soup if s.has_attr('data-origin')]
			images = [s['src'] for s in filtered_soup if s.has_attr('src') and not s['src'] in images] + images
			
			info = {"productName": productName, "blurb": productDetails[0], "price": productDetails[1], "details": productDetails[2], "description": productDetails[3], "images": images}
			inventory[itemCode] = info
			
		categoryPages[catalogPage] = pageItems
	catalog[category] = categoryPages

with open('see-by-chloe.js', 'w') as out_file:
	out_file.write('let inventory = %s;\n\nlet catalog = %s;' % (json.dumps(inventory, indent=4), json.dumps(catalog, indent=4)))


