from algoliasearch.search_client import SearchClient
import json

client = SearchClient.create('ONQFXGBCJV', 'ef67df9945bdf28cacfdc182f8981bd3')
index = client.init_index('Chloe')
batch = json.load(open('InventoryData.json'))
index.save_objects(batch, {'autoGenerateObjectIDIfNotExist': True})

index.set_settings({"searchableAttributes": ["productName", "blurb", "productCode"]})

