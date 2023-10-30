import { useEffect, useState } from "react";

function Card() {
  const [amountValue, setAmountValue] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [converted, setConverted] = useState(null);

  const handleInputChange = (e) => {
    setAmountValue(e.target.value);
  };

  const fetchData = async () => {
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amountValue}&from=${fromCurrency}&to=${toCurrency}`
    );
    if (res.ok) {
      const data = await res.json();
      setConverted(data.rates[toCurrency]);
      console.log(data.rates[toCurrency]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const toCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <div className="w-96 h-96 bg-white rounded-xl flex items-center flex-col">
      <form className="mt-5">
        <label className="text-slate-400 text-sm p-1">Amount</label> <br></br>
        <input
          className="border-2 w-80 h-9 rounded"
          type="text"
          onChange={handleInputChange}
          value={amountValue}
        />
      </form>
      <div className="w-80 flex justify-between mt-5">
        <select
          className="w-28 border-2 h-9 rounded"
          onChange={fromCurrencyChange}
          value={fromCurrency}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select
          className="w-28 border-2 h-9 rounded"
          onChange={toCurrencyChange}
          value={toCurrency}
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <button
        className="mt-5 w-80 h-32 bg-red-500 rounded text-white hover:bg-red-400 p-2"
        onClick={fetchData}
      >
        Convert
      </button>
      <p className="mt-6 text-slate-400">Exchange Converter</p>
      <h1 className="mt-4 text-4xl font-semibold">
        {converted} {toCurrency}
      </h1>
      <div className="w-96 h-12 bg-red-500 mt-20 rounded p-2"></div>
    </div>
  );
}

export default Card;
