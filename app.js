
const express = require('express'); 
const ejs = require('ejs');
const path = require('path');
const ethers = require('ethers');


const app = express(); 
const PORT = 3000; 
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Define a route to render the EJS template
app.get('/', (req, res) => {
    res.render('index', {
        pageTitle: 'Crypto Wallet'
    });
});

let provider = ethers.getDefaultProvider("https://polygon-mumbai.g.alchemy.com/v2/5DDa8sn9qNYdWCq8e-B4h8wIo6D3y8vK");
let etherscanProvider = new ethers.EtherscanProvider();

app.get('/create-account', (req, res) => {

    try {
        const wallet = ethers.Wallet.createRandom();
        let newWallet = {
            "message": "Success",
            "Mnemonic": wallet.mnemonic.phrase.toString(),
            "Address": wallet.address.toString(),
            "PrivateKey": wallet.privateKey.toString()
        }
        res.render('create', {
            newWallet: newWallet
        });
    }
    catch {
        result = {
            "message": "error"
        }
        res.send(result)
    }
    
});

app.get('/import-account', (req, res) => {
    res.render('import', {
        pageTitle: 'Import Account'
    });
});

app.post('/import', async (req, res) => {
    try {
        let mnemonic = req.body.mnemonic;
        let result = await generateAccountFromMnemonic(mnemonic);
        console.log(result);
        var balance = await provider.getBalance(result.Address);
        balanceInEthers = await ethers.formatEther(balance);
        var history = await etherscanProvider.getHistory(result.Address);
        // history.forEach(element => {
        //     console.log(element);
        // });
        // console.log(history);
        res.render('home', {
            result: result,
            balance: balanceInEthers,
            history:history
        });
    }
    catch(error) {
        let result = {
            "message": error
        }
        res.send(result)
    }
});

function generateAccountFromMnemonic(mnemonic) {
    try {
       const wallet = ethers.Wallet.fromPhrase(mnemonic);
        //const wallet = ethers.Wallet.
        const address = wallet.address;
        const privateKey = wallet.privateKey;

        result = {
            "message": "Success",
            "Mnemonic": mnemonic,
            "Address": address,
            "PrivateKey": privateKey
        }

        return result;
    }
    catch(Error) {
        result = {
            "message": Error.message 
        }
        return result;
    }

}
  
app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Server is Successfully Running, and App is listening on port "+ PORT); 
    else 
        console.log("Error occurred, server can't start", error); 
    } 
); 