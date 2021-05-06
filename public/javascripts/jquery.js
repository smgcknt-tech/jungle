$(() => {
  //cartCard.ejs//
  $("#cartNum").change(() => {
    let url = $("#cartForm").attr("action") + "?qty=" + $("#cartNum").val();
    $("#cartForm").attr("action", url);
  });
  //cart.ejs//

  const calculateTotalItem = () => {
    let totalItem = 0;
    $(".eachInput").each((i, val) => {
      let a = Number($(val).val());
      totalItem += a;
      $("#sum_qty").text("合計：" + totalItem + "点");
    });
  };
  calculateTotalItem();

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    $(".sumPrice").each((i, val) => {
      let b = Number($(val).text().slice(2, -1));
      totalPrice += b;
      $("#sum_price").text("合計：" + totalPrice + "円");
    });
  };
  calculateTotalPrice();

  $(".eachInput").change(() => {
    let eachPrice = [];
    $(".eachPrice").each((i, val) => {
      a = Number($(val).text().slice(0, -1));
      eachPrice.push(a);
    });
    let totalItem = 0;
    let sumPrice = [];
    $(".eachInput").each((i, val) => {
      let qty = Number($(val).val());
      let id = $(val).attr("id");
      totalItem += qty;
      let b = qty * eachPrice[i];
      sumPrice.push(b);
      $("#sum_qty").text("合計：" + totalItem + "点");

      $.ajax({
        type: "POST",
        url: "/cart/update/qty",
        data: { qty: qty, id: id },
        dataType: "json",
        success: function (response) {
          console.log(response);
        },
      });
    });

    $(".sumPrice").each((i, val) => {
      $(val).text("小計 " + sumPrice[i] + "円");
    });

    let totalPrice = 0;
    $(".sumPrice").each((i, val) => {
      let b = Number($(val).text().slice(2, -1));
      totalPrice += b;
      $("#sum_price").text("合計：" + totalPrice + "円");
    });
  });

  $(".cart_delete").on("click", (e) => {
    let id = Number($(e.currentTarget).data("id"));
    $.ajax({
      type: "POST",
      url: "/cart/delete",
      dataType: "json",
      data: { id: id },
    }).done((cartNum) => {
      $(e.currentTarget).parents(".eachCart").remove();
      $("#badge").text(cartNum);
      if (cartNum > 0) {
        calculateTotalItem();
        calculateTotalPrice();
      } else {
        $("#cart-sum").remove();
        $("#cart-box").append("<h2>現在登録された商品はございません。</h2>");
      }
    });
  });

  //Shipping.ejs//
  const step2 = $("button[id='step2']");
  step2.on("click", (e) => {
    const postalCode = $("input[name='postal-code']");
    const adress = $("input[name='adress']");

    if (postalCode.val() === "") {
      e.preventDefault();
      postalCode.attr("placeholder", "未入力です!").addClass("red");
    }
    if (adress.val() === "") {
      e.preventDefault();
      adress.attr("placeholder", "未入力です!").addClass("red");
    }
  });

  //Payment.ejs//
  const step3 = $("button[id='step3']");
  step3.on("click", (e) => {
    const checkedMethod = $("input:radio[name='paymentMethod']:checked");
    if (checkedMethod.length === 0) {
      e.preventDefault();
      $("#payment-title").append(
        '<h1 class="red">お支払い方法が未入力です!</h1>'
      );
    }
  });
});
