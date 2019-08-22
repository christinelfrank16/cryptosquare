$(document).ready(function() {

  $("form#user-input").submit(function(event) {
    event.preventDefault();
    var userInput = $("input#sentence").val();

    $("#output").text(encryptSentence(userInput));
  });

});

function encryptSentence(sentence){
  return sentence;
}
