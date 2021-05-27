$(() => {
  //cartCard.ejs//
  $("#cartNum").change(() => {
    let url = $("#cartForm").attr("action") + "?qty=" + $("#cartNum").val();
    $("#cartForm").attr("action", url);
  });
  $("#cartNum").change(() => {
    let url = $("#SignUpButton").attr("href") + "?qty=" + $("#cartNum").val();
    $("#SignUpButton").attr("href", url);
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
      let b = Number($(val).data("price"));
      totalPrice += b;
      let taxIncluded = totalPrice + totalPrice * 0.1;
      $("#sum_price").text("合計：" + Math.ceil(taxIncluded).toLocaleString() + "円(税込)");
    });
  };
  calculateTotalPrice();

  $(".eachInput").change(() => {
    let eachPrice = [];
    $(".eachPrice").each((i, val) => {
      a = Number($(val).data("price"));
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
      let b = Number(sumPrice[i]);
      totalPrice += b;
      let taxIncluded = totalPrice + totalPrice * 0.1;
      $("#sum_price").text("合計：" + Math.ceil(taxIncluded).toLocaleString() + "円(税込)");
    });
  });

  $(".cart_delete").on("click", (e) => {
    let id = $(e.currentTarget).data("id");
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
    })
  });

  //SignIn.ejs//
  $("#signIn-button").on("click", (e) => {
    const email = $("input[name='email']");
    const password = $("input[name='password']");
    const arr = [email, password];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].val() === "") {
        e.preventDefault();
        arr[i].attr("placeholder", "未入力です!").addClass("red");
      }
    }
  });

  //Shipping.ejs//
  const step2 = $("button[id='step2']");
  step2.on("click", (e) => {
    const postalCode = $("input[id='postal-code']");
    const adress = $("input[id='adress']");

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
      $("#payment-title").append('<h1 class="red">未入力です!</h1>');
    }
  });

  //OrderConfirmation.ejs//
  const calculateOrderedItem = () => {
    let totalItem = 0;
    $(".eachQty").each((i, val) => {
      let a = Number($(val).data("qty"));
      totalItem += a;
      $("#ordered_qty").text("合計：" + totalItem + "点");
    });
  };
  calculateOrderedItem();

  const calculateOrderedTotalPrice = () => {
    let totalPrice = 0;
    $(".orderedSumPrice").each((i, val) => {
      let b = Number($(val).text().slice(2,-1).split(",").join(""))
      totalPrice += b;
      let taxIncluded = totalPrice + totalPrice * 0.1;
      $("#ordered_price").text("合計：" + Math.ceil(taxIncluded).toLocaleString() + "円(税込)");
      $("#ordered_price").attr("value",Math.ceil(taxIncluded))
    });
  };

  calculateOrderedTotalPrice();

  const showPaymentButton = () => {
    const payment = $("#payment_method").text();
    if (payment.includes("paypal")) {
      $("#payment_button").html(
        '<li id = "payment_button"> <div id="paypal-button-container"></div> </li>'
      );
    } else if (payment.includes("着払い")) {
      $("#payment_button").html(
        '<li id = "payment_button"> <button class="primary width-100" id="cash_on_delivery">着払い</button></li>'
      );
    }
  };
  showPaymentButton();

  $("#cash_on_delivery").on("click", (e) => {
    const ordered_price = $("#ordered_price").attr("value");
    let ordered_products =[];
    $(".eachCart").each((i, val) => {
      const id = $(val).attr("key")
      const qty =Number($(val).data("qty"))
      const obj ={ productId:id, productQty:qty}
      ordered_products.push(obj);
    });
    const data = {
      ordered_price: ordered_price,
      method: "現金",
      payment: "完了",
      ordered_products:ordered_products,
    };
    $.post("/checkOut/create/order", data, () => {}, "json");
    window.location.href="/checkOut/thanks"
  });


  //UserProfile.ejs//
  const updateProfile = $("button[id='updateConfirmation']");
  updateProfile.on("click", (e) => {
    const updatedPassword = $("input[name='password']");
    if (updatedPassword.val() === "") {
      e.preventDefault();
      updatedPassword.attr("placeholder", "未入力です!").addClass("red");
    }
  });

  //productList.ejs//
  $(".product_delete").on("click", (e) => {
    let id = $(e.currentTarget).attr("id");
    const data = { id: id };
    $.ajax({
      type: "POST",
      url: "/api/delete/product",
      dataType: "json",
      data: data,
    }).done((results) => {
      $(e.currentTarget).closest(".eachProduct").remove();
    });
  });

  //productRegister.ejs//

  $("#imageFile").on("change", (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    $.ajax({
      url: "/upload/image/s3",
      type: "POST",
      contentType: false,
      processData: false,
      cache: false,
      data: bodyFormData,
      success: (res) => {
        alert(res);
        $("input[name=image]").val(res);
      },
      error: () => {
        alert("Error: In sending the request!");
      },
    });
  });

  $("#register-button").on("click", (e) => {
    const name = $("input[name='name']");
    const price = $("input[name='price']");
    const image = $("input[name='image']");
    const category = $("input[name='category']");
    const brand = $("input[name='brand']");
    const countInStock = $("input[name='countInStock']");
    const description = $("textarea[name='description']");
    const arr = [
      name,
      price,
      image,
      category,
      brand,
      countInStock,
      description,
    ];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].val() === "") {
        e.preventDefault();
        arr[i].attr("placeholder", "未入力です!").addClass("red");
      }
    }
  });

  //header.ejs//
  $("input[name='search_key']").val("");
  //searchBox.ejs//

  $("#search-button").on("click", (e) => {
    const kwd = $("input[name='search_key']");
    const arr = [kwd];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].val() === "") {
        e.preventDefault();
        arr[i].attr("placeholder", "未入力です!").addClass("red");
      }
    }
  });
  //sideBar.ejs//
  $(".open-sidebar").on("click", () => {
    $("#sideBar").addClass("open");
  });
  $(".close-sidebar").on("click", () => {
    $("#sideBar").removeClass("open");
  });


  //review.ejs//
  $("#review-form-button").on("click", (e) => {
    const title = $("input[name='title']");
    const comment= $("textarea[name='comment']");
    const public_name = $("input[name='public_name']");
    const arr = [title,comment,public_name];
    const checkedReview = $("input:radio[name='review']:checked");
    if (checkedReview.length === 0) {
      e.preventDefault();
      $("label[for='review']").append('※未選択です').addClass("red");;
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].val() === "") {
        e.preventDefault();
        arr[i].attr("placeholder", "未入力です!").addClass("red");
      }
    }

  });

});
