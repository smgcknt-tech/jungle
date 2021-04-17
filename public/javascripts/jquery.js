$(function(){

  $('#cartNum').change(()=> {
    let url = $('#cartForm').attr('action') +'?qty='+ $('#cartNum').val();
    $('#cartForm').attr('action',url);
  } );

});