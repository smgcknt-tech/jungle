$(() => {

paypal.Buttons({
    createOrder: function(data, actions) {
      const payment = document.getElementById('ordered_price').getAttribute("value");
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: payment
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        alert('Transaction completed! ');
      });
    }    
}).render('#paypal-button-container');

});
