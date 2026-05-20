const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/calculate-mortgage", (req, res) => {
  const { propertyPrice, deposit, interestRate, termYears } = req.body;

  const price = Number(propertyPrice);
  const upfrontDeposit = Number(deposit);
  const annualRate = Number(interestRate);
  const years = Number(termYears);

  if (!price || !upfrontDeposit || !annualRate || !years) {
    return res.status(400).json({
      error: "Please provide all required mortgage values.",
    });
  }

  if (upfrontDeposit >= price) {
    return res.status(400).json({
      error: "Deposit cannot be greater than or equal to property price.",
    });
  }

  const loanAmount = price - upfrontDeposit;
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;

  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const totalRepayment = monthlyPayment * totalMonths;
  const totalInterest = totalRepayment - loanAmount;

  res.json({
    loanAmount,
    monthlyPayment,
    totalRepayment,
    totalInterest,
  });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});