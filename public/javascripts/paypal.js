$(() => {
  paypal
    .Buttons({
      createOrder: function (data, actions) {
        const payment = document
          .getElementById("ordered_price")
          .getAttribute("value");
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: payment,
              },
            },
          ],
        });
      },
      onApprove:(data, actions) =>{
        return actions.order.capture().then((details) => {
          const ordered_price = $("#ordered_price").attr("value");
          const data = {
            ordered_price: ordered_price,
            method: "paypal",
            payment: "完了",
          };
          $.post("/checkOut/create/order", data, () => {}, "json");
          window.location.href="/checkOut/thanks"
        });
      },
    })
    .render("#paypal-button-container");
});
