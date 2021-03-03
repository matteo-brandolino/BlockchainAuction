from web3 import Web3

def sendTransaction(message):
    w3 = Web3(Web3.HTTPProvider('https://ropsten.infura.io/v3/577b6204efe2471f978efa1be5deb895'))
    address = '0x3CF6f6FEAAF9277662cBEDcfb79039142Af648c0'
    privateKey = '0xb91f5f3453f22d7d6326b8fd6e9b2e031f273843b6acd1f3ddd39c69d3a82346'
    nonce = w3.eth.getTransactionCount(address)
    gasPrice = w3.eth.gas_price
    value = w3.toWei(0, 'ether')
    signedTx = w3.eth.account.signTransaction(dict(
        nonce=nonce,
        gasPrice= gasPrice,
        gas= 100000,
        to='0x0000000000000000000000000000000000000000',
        value = value,
        data = message.encode('utf-8')
    ), privateKey)

    tx = w3.eth.sendRawTransaction(signedTx.rawTransaction)
    txId = w3.toHex(tx)
    return txId