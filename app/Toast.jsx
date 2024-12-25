import Toast from 'react-native-toast-message';

// Show toast on quantity update
const updateQuantity = (item, isIncrement) => {
  const newQuantity = isIncrement ? item.quantity + 1 : item.quantity - 1;
  if (newQuantity < 1) {
    Toast.show({
      type: 'error',
      text1: 'Quantity cannot be less than 1',
    });
    return;
  }
  item.quantity = newQuantity; // Update your state or redux store here
  Toast.show({
    type: 'success',
    text1: `${item.name} quantity updated to ${newQuantity}`,
  });
};
