
$(function () {
  //cartCard.ejs//
  $("#cartNum").change(() => {
    let url = $("#cartForm").attr("action") + "?qty=" + $("#cartNum").val();
    $("#cartForm").attr("action", url);
  });
  //cart.ejs//


  let sumItem = 0;
    $(".item_qty").each(() => {
      let val = Number($('.item_qty').val());
      sumItem += val
    });
  $("#sum_qty").text("合計：" + sumItem + "点");
  

});

