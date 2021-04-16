$(function(){
  $('#cartNum').click(function(){        
      let qty = $('#cartNum').val();
      let cartAction = $('#cartForm').attr('action');
      cartFormUrl = cartAction + "?qty=" + qty;
      $('#cartForm').attr('action',cartFormUrl);
  });

});