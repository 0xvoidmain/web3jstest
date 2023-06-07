const web3 = require('web3')

const Web3 = new web3(
    new web3.providers.HttpProvider("http://135.125.8.163:8585")
)

const MBW = new Web3.eth.Contract(require('./mintburnwaper.json'), '0x325b5BAba7ac1cDE57FB7Ae3E0a0Ea8640486BD1')
const tETH = new Web3.eth.Contract(require('./mintburnwaper.json'), '0xA1Ff8559646a79e47ECDfaCA60272F3081998569')

async function GetEventData(txHash, event) {
    var transaction = await Web3.eth.getTransactionReceipt(txHash)
    var eventLogs = HamsterCageABI.find(e => e.name == event)
    var eventSignature = Web3.eth.abi.encodeEventSignature(eventLogs)

    return transaction.logs
        .filter(e => e.topics[0] == eventSignature)
        .map(log => Web3.eth.abi.decodeLog(eventLogs.inputs, log.data, log.topics.slice(1)))
}

async function main() {
    console.log(57404801, 'totalMinted', (
        await MBW.methods.totalMinted().call({
            from: '0xeA7D9225F74BF8206Ac8d9AD358b7Cc2c716EE89'
        }, 57404801)
    ) / 10**18)

    console.log(57404801, 'totalSupply', (
        await tETH.methods.totalSupply().call({
            from: '0xeA7D9225F74BF8206Ac8d9AD358b7Cc2c716EE89'
        }, 57404801)
    )/ 10 ** 18)


    console.log(57432925, 'totalMinted', (
        await MBW.methods.totalMinted().call({
            from: '0xeA7D9225F74BF8206Ac8d9AD358b7Cc2c716EE89'
        }, 57432925)
    ) / 10**18)

    console.log(57432925, 'totalSupply', (
        await tETH.methods.totalSupply().call({
            from: '0xeA7D9225F74BF8206Ac8d9AD358b7Cc2c716EE89'
        }, 57432925)
    )/ 10 ** 18)
}

main()