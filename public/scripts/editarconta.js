document.getElementById('olho2').addEventListener('mousedown', function() {
    document.getElementById('pass2').type = 'text';
  });
  
  document.getElementById('olho2').addEventListener('mouseup', function() {
    document.getElementById('pass2').type = 'password';
  });
  
  // Para que o password não fique exposto apos mover a imagem.
  document.getElementById('olho2').addEventListener('mousemove', function() {
    document.getElementById('pass2').type = 'password';
  });


  document.getElementById('olho3').addEventListener('mousedown', function() {
    document.getElementById('pass3').type = 'text';
  });
  
  document.getElementById('olho3').addEventListener('mouseup', function() {
    document.getElementById('pass3').type = 'password';
  });
  
  // Para que o password não fique exposto apos mover a imagem.
  document.getElementById('olho3').addEventListener('mousemove', function() {
    document.getElementById('pass3').type = 'password';
  });