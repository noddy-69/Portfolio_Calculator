const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/calculate', (req, res) => {
    const { investment, buyPrice, sellPrice, investmentFee, exitFee } = req.body;

    const parsedInvestment = parseFloat(investment);
    const parsedBuyPrice = parseFloat(buyPrice);
    const parsedSellPrice = parseFloat(sellPrice);
    const parsedInvestmentFee = parseFloat(investmentFee);
    const parsedExitFee = parseFloat(exitFee);

    const coinsPurchased = parsedInvestment / parsedBuyPrice;
    const totalSellValue = coinsPurchased * parsedSellPrice;
    const totalInvestment = parsedInvestment + parsedInvestmentFee;
    const totalTakeHome = totalSellValue - parsedExitFee;
    const profitLoss = totalTakeHome - totalInvestment;
    const profitLossPercentage = ((parsedSellPrice - parsedBuyPrice) / parsedBuyPrice) * 100;

    res.json({
        profitLoss: profitLoss.toFixed(2),
        profitLossPercentage: profitLossPercentage.toFixed(2),
        totalInvestment: totalInvestment.toFixed(2),
        totalTakeHome: totalTakeHome.toFixed(2)
    });
});

module.exports = app;
module.exports.handler = serverless(app);