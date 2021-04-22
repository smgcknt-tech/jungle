$(function () {
  //cartCard.ejs//
  $("#cartNum").change(() => {
    let url = $("#cartForm").attr("action") + "?qty=" + $("#cartNum").val();
    $("#cartForm").attr("action", url);
  });
  //cart.ejs//
  
  
  let totalItem = 0;
  $(".eachInput").each((i, val) => {
    let a  = Number($(val).val());
    totalItem += a;
  });
  $("#sum_qty").text("合計：" + totalItem + "点");
  



  $('.eachInput').change(()=>{
  let totalItem = 0
  $('.eachInput').each((i,val) => {
    let a = Number($(val).val());
    totalItem = totalItem + a;
    console.log(totalItem)
    $("#sum_qty").text("合計：" + totalItem + "点");
  });
});


  
  $(".sumPrice").each((i, val) => {
    let totalPrice = 0;
    let b = Number($(val).text());
    totalPrice += b;
    $("#sum_price").text("合計：" + totalPrice + "円");  
  });

  
});
