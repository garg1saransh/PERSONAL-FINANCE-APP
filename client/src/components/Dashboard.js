export default function Dashboard({ assets }) {
  const totalInvested = assets.reduce((acc, a) => acc + a.amountInvested, 0);
  const totalCurrent = assets.reduce((acc, a) => acc + a.currentValue, 0);
  const gain = totalCurrent - totalInvested;
  const gainPercent = ((gain / totalInvested) * 100).toFixed(2);

  return (
    <div style={{ margin: '1rem 0' }}>
      <h2>📊 Portfolio Summary</h2>
      <p>💰 Invested: ₹{totalInvested}</p>
      <p>📈 Current Value: ₹{totalCurrent}</p>
      <p style={{ color: gain >= 0 ? 'green' : 'red' }}>
        {gain >= 0 ? '🔼 Profit' : '🔽 Loss'}: ₹{gain} ({gainPercent}%)
      </p>
    </div>
  );
}
