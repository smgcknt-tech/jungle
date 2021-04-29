$( () =>{
  //cartCard.ejs//
  $("#cartNum").change(() => {
    let url = $("#cartForm").attr("action") + "?qty=" + $("#cartNum").val();
    $("#cartForm").attr("action", url);
  });
  //cart.ejs//

  let totalItem = 0;
  $(".eachInput").each((i, val) => {
    let a = Number($(val).val());
    totalItem += a;
  });
  $("#sum_qty").text("合計：" + totalItem + "点");

  $('.eachInput').change(() => {
    let eachPrice = []
    $('.eachPrice').each((i, val) => {
      a = Number($(val).text().slice(0,-1));
      eachPrice.push(a)
    });
    let totalItem = 0;
    let sumPrice = []
    $('.eachInput').each((i, val) => {
      let a = Number($(val).val());
      totalItem += a;
      let b = a * eachPrice[i];
      sumPrice.push(b)
      $("#sum_qty").text("合計：" + totalItem + "点");
    });
    $('.sumPrice').each((i, val) => {
      $(val).text("小計 "+ sumPrice[i] + "円")
    })

    let totalPrice = 0;
    $(".sumPrice").each((i, val) => {
      let b = Number($(val).text().slice(2,-1));
      totalPrice += b;
      $("#sum_price").text("合計：" + totalPrice + "円");
    });

  });



  let totalPrice = 0;
  $(".sumPrice").each((i, val) => {
    let b = Number($(val).text().slice(2,-1));
    totalPrice += b;
    $("#sum_price").text("合計：" + totalPrice + "円");
  });
});
