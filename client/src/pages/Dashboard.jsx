function Dashboard({ assets = [] }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total Assets: {assets.length}</p>
    </div>
  );
}

export default Dashboard;
