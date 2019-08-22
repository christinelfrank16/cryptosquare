$(document).ready(function() {

  $("form#user-input").submit(function(event) {
    event.preventDefault();
    var userInput = $("input#sentence").val();

    $("#output").text(encryptSentence(userInput));
  });
});

function encryptSentence(sentence){
  sentence = sentence.toLowerCase();
  var regex = /[a-z]/;
  var newSentence = "";
  for (var i=0; i<sentence.length; i++) {
    if (regex.test(sentence[i])){
      newSentence += sentence[i];
    }
  }
  return newSentence;
}
