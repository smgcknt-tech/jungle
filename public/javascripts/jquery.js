
$(function () {
  //cartCard.ejs//
  $("#cartNum").change(() => {
    let url = $("#cartForm").attr("action") + "?qty=" + $("#cartNum").val();
    $("#cartForm").attr("action", url);
  });
  //cart.ejs//


  let sumItem = 0;
    $(".eachSelect option").each((i,val) => {
      let a = Number($(val).val());
      sumItem += a
    });
  $("#sum_qty").text("合計：" + sumItem + "点");


});
