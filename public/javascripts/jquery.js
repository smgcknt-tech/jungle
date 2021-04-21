$(function () {
  //cartCard.ejs//
  $("#cartNum").change(() => {
    let url = $("#cartForm").attr("action") + "?qty=" + $("#cartNum").val();
    $("#cartForm").attr("action", url);
  });
  //cart.ejs//
  let totalItem = 0;
  $(".eachSelect-1 option").each((i, val) => {
    let a = Number($(val).val());
    totalItem += a;
  });

  let totalPrice = 0;
  $(".sumPrice").each((i, val) => {
    b = Number($(val).text());
    totalPrice += b;
  });

  $("#sum_price").text("合計：" + totalPrice + "円");
  $("#sum_qty").text("合計：" + totalItem + "点");
});
