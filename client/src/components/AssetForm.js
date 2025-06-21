import { useState } from 'react';
import api from '../api';

export default function AssetForm({ onAssetAdded }) {
  const [form, setForm] = useState({
    type: '',
    name: '',
    amountInvested: '',
    currentValue: '',
    purchaseDate: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await api.post('/assets', {
      ...form,
      amountInvested: Number(form.amountInvested),
      currentValue: Number(form.currentValue),
      metadata: {},
    });
    onAssetAdded(res.data);
    setForm({ type: '', name: '', amountInvested: '', currentValue: '', purchaseDate: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="type" placeholder="Type (e.g., stock)" value={form.type} onChange={handleChange} />
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="amountInvested" placeholder="Amount Invested" value={form.amountInvested} onChange={handleChange} />
      <input name="currentValue" placeholder="Current Value" value={form.currentValue} onChange={handleChange} />
      <input name="purchaseDate" type="date" value={form.purchaseDate} onChange={handleChange} />
      <button type="submit">Add Asset</button>
    </form>
  );
}
