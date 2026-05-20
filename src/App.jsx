import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    propertyPrice: "",
    deposit: "",
    interestRate: "",
    termYears: "",
    income: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const calculateMortgage = () => {
    const price = Number(form.propertyPrice);
    const deposit = Number(form.deposit);
    const annualRate = Number(form.interestRate);
    const years = Number(form.termYears);

    if (!price || !deposit || !annualRate || !years) {
      alert("Please fill in all required fields.");
      return;
    }

    if (deposit >= price) {
      alert("Deposit cannot be greater than or equal to the property price.");
      return;
    }

    const loanAmount = price - deposit;
    const monthlyRate = annualRate / 100 / 12;
    const totalMonths = years * 12;

    const monthlyPayment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);

    const totalRepayment = monthlyPayment * totalMonths;
    const totalInterest = totalRepayment - loanAmount;

    setResult({
      loanAmount,
      monthlyPayment,
      totalRepayment,
      totalInterest,
    });
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Mortgage Calculator</h1>
        <p>
          Estimate your monthly payments using a simple step-by-step calculator.
        </p>
      </header>

      <main className="calculator">
        <section className="form-section">
          <h2>Step 1: Property Details</h2>

          <label>Property Price (£)</label>
          <input
            type="number"
            name="propertyPrice"
            value={form.propertyPrice}
            onChange={handleChange}
            placeholder="Example: 250000"
          />
          <small>Total price of the property you want to buy.</small>

          <label>Deposit (£)</label>
          <input
            type="number"
            name="deposit"
            value={form.deposit}
            onChange={handleChange}
            placeholder="Example: 25000"
          />
          <small>The amount you can pay upfront.</small>

          <h2>Step 2: Mortgage Details</h2>

          <label>Interest Rate (%)</label>
          <input
            type="number"
            name="interestRate"
            value={form.interestRate}
            onChange={handleChange}
            placeholder="Example: 5"
          />
          <small>The yearly interest rate from your lender.</small>

          <label>Mortgage Term (Years)</label>
          <input
            type="number"
            name="termYears"
            value={form.termYears}
            onChange={handleChange}
            placeholder="Example: 25"
          />
          <small>How many years you plan to repay the mortgage over.</small>

          <h2>Step 3: Income</h2>

          <label>Annual Income (£)</label>
          <input
            type="number"
            name="income"
            value={form.income}
            onChange={handleChange}
            placeholder="Example: 35000"
          />
          <small>This helps users understand affordability.</small>

          <button onClick={calculateMortgage}>Calculate Monthly Payment</button>
        </section>

        <section className="results-section">
          <h2>Your Results</h2>

          {!result ? (
            <p className="empty">
              Enter your details and click calculate to view your mortgage
              estimate.
            </p>
          ) : (
            <div className="results">
              <div className="result-card">
                <span>Loan Amount</span>
                <strong>£{result.loanAmount.toFixed(2)}</strong>
              </div>

              <div className="result-card">
                <span>Estimated Monthly Payment</span>
                <strong>£{result.monthlyPayment.toFixed(2)}</strong>
              </div>

              <div className="result-card">
                <span>Total Repayment</span>
                <strong>£{result.totalRepayment.toFixed(2)}</strong>
              </div>

              <div className="result-card">
                <span>Total Interest</span>
                <strong>£{result.totalInterest.toFixed(2)}</strong>
              </div>

              <div className="chart-placeholder">
                Mortgage Breakdown Chart Placeholder
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;