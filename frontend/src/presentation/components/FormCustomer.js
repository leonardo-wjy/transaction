import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const FormCustomer = ({ onSubmit }) => {
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([
    { itemName: '', unitPrice: '', quantity: '', total: 0 },
    { itemName: '', unitPrice: '', quantity: '', total: 0 },
    { itemName: '', unitPrice: '', quantity: '', total: 0 },
  ]);

  const [productOptions, setProductOptions] = useState([]);
  
  useEffect(() => {
    // Fetch product data from your API using Axios
    axios.get('http://localhost:4000/api/products')
      .then(response => {
        setProductOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    
    if (field === 'itemName') {
      // Find the selected product from the productList
      const selectedProduct = productOptions.find(product => product.name === value);

      if (selectedProduct) {
        newItems[index].unitPrice = selectedProduct.price;
        newItems[index].total = selectedProduct.price * newItems[index].quantity;
      }
    } else if (field === 'quantity') {
      newItems[index].total = newItems[index].unitPrice * value;
    }

    setItems(newItems);
  };

  const handleSubmit = () => {
    const order = {
        customerName,
        items,
      };
      onSubmit(order);
  };

  return (
    <>
        <div className="card">
            <form>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label className="label">Nama Customer</label>
                            <input
                            type="text"
                            className="text"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            />
                        </div>
                    </div>
                    {items.map((item, index) => (
                        <div key={index}>
                            <div className="row mt-5">
                                <div className="col">
                                    <label className="label">Nama Barang</label>
                                </div>
                                <div className="col">
                                    <label className="label">Harga Satuan</label>
                                </div>
                                <div className="col">
                                    <label className="label">QTY</label>
                                </div>
                                <div className="col">
                                    <label className="label">Total</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col mr-3">
                                    <select
                                        className="select"
                                        value={item.itemName}
                                        onChange={(e) => handleItemChange(index, 'itemName', e.target.value)}
                                    >
                                        <option value="" disabled>Select Item</option>
                                        {productOptions.map((product, index) => (
                                        <option key={index} value={product.name}>
                                            {product.name}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col mr-5">
                                    <input
                                        type="text"
                                        readOnly
                                        className="text-child"
                                        value={item.unitPrice}
                                        onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)}
                                    />
                                </div>
                                <div className="col mr-5">
                                    <input
                                        type="text"
                                        className="text-child"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                    />
                                </div>
                                <div className="col mr-5">
                                    <input type="text" className="text-child" value={item.total} readOnly />
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="row-with-button">
                        <button type="button" className="button" onClick={handleSubmit}>
                            Add Items
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div className='submit-row'>
            <div className='container'>
                <div className="row-with-button">
                    <button type="button" className="button">
                        Cancel
                    </button>
                    &nbsp;
                    <button type="button" className="button">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </>
  );
};

export default FormCustomer;