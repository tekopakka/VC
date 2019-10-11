var socket = io();

$(function(){
  $('#header').load(host + "/html/2.0/header.html");
  $('#footer').load(host + "/html/2.0/footer.html");
})

function initial_register_text_inputs(){
  color_input_text("#username_input", "initial");
  color_input_text("#firstname_input", "initial");
  color_input_text("#lastname_input", "initial");
  color_input_text("#email_input", "initial");
  color_input_text("#password_input", "initial");
  color_input_text("#password_input2", "initial");
  $('#register_error_text').css("display", "none");
}

function color_input_text(element, color){
  $(element).css("border-color", color);
}

$('#confirm_register').click(function(){
  initial_register_text_inputs();
  if($('#username_input').val() == ""){ color_input_text('#username_input', "red"); }
  if($('#firstname_input').val() == ""){ color_input_text('#firstname_input', "red"); }
  if($('#lastname_input').val() == ""){ color_input_text('#lastname_input', "red"); }
  if($('#email_input').val() == ""){ color_input_text('#email_input', "red"); }
  if($('#password_input').val() == ""){ color_input_text('#password_input', "red"); }
  if($('#password_input2').val() == ""){ color_input_text('#password_input2', "red"); }
  if( $('#username_input').val() == "" ||
      $('#firstname_input').val() == "" ||
      $('#lastname_input').val() == "" ||
      $('#email_input').val() == "" ||
      $('#password_input').val() == "" ||
      $('#password_input2').val() == ""){ return; }

  else if($('#password_input').val() != $('#password_input2').val()){
    color_input_text("#password_input", "red");
    color_input_text("#password_input2", "red");
    $('#register_error_text').html("Salasanat eivät täsmää");
    $('#register_error_text').css("display", "block");
    return;
  }

  var register = {};
  register["id"] = makeid(8);
  register["username"] = $('#username_input').val();
  register["firstname"] = $('#firstname_input').val();
  register["lastname"] = $('#lastname_input').val();
  register["email"] = $('#email_input').val();
  register["password1"] = $('#password_input').val();
  register["password2"] = $('#password_input2').val();
  socket.emit("register attempt", register);
});

socket.on('register success', function(){
  alert("Rekisteröinti onnistui!");
  goToPage("/");
});

socket.on('invalid username', function(){
  $('#register_error_text').html("Käyttäjänimi on varattu");
  color_input_text("#username_input", "red");
  $('#register_error_text').css("display", "block");
});

socket.on('invalid email', function(){
  console.log("huono email");
  $('#register_error_text').html("Sähköposti on jo käytössä");
  color_input_text("#email_input", "red");
  $('#register_error_text').css("display", "block");
});
