import React from 'react';
import FormCustomer from '../src/presentation/components/FormCustomer';
import CreateOrder from '../src/presentation/application/usecases/CreateOrder';

function App() {
  const createOrder = new CreateOrder();

  const handleFormSubmit = (orderData) => {
    createOrder.execute(orderData);
  };

  return (
    <div>
      <FormCustomer onSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;
