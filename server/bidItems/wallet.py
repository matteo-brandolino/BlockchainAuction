from web3 import Web3

w3 = Web3(Web3.HTTPProvider('https://ropsten.infura.io/v3/577b6204efe2471f978efa1be5deb895'))
account = w3.eth.account.create()
privateKey = account.privateKey.hex()
address = account.address

print (f" Address: {address}\n Key: {privateKey}")