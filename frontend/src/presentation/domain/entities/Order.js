class Order {
    constructor({ customerName, items }) {
      this.customerName = customerName;
      this.items = items.map(item => ({
        itemName: item.itemName || '',
        unitPrice: item.unitPrice || 0,
        quantity: item.quantity || 0,
        total: item.total || 0,
      }));
    }
}
  
export default Order;