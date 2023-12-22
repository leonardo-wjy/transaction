import Order from '../../domain/entities/Order';

class CreateOrder {
  execute(orderData) {
    const order = new Order(orderData);
    // Lakukan logika bisnis atau kirim ke backend
    console.log('Order Created:', order);
  }
}

export default CreateOrder;