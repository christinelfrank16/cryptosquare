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
  var dimension = Math.sqrt(newSentence.length);
  var table = [];
  var tableWidth = Math.round(dimension);
  while(newSentence.length > 0){
    var row = [];
    for(var tableElement = 0; tableElement < tableWidth; tableElement++){
      if(newSentence[tableElement]){
        row.push(newSentence[tableElement]);
      }else{
        row.push("");
      }
    }
    newSentence = newSentence.substring(tableWidth, newSentence.length);
    table.push(row);
  }
  var count = 0;
  var output = "";
  for (var column=0; column<tableWidth; column++){
    for (var row =0; row<table.length; row++){
      if (count === 5){
        output+= " ";
        count = 0;
      }
      if (table[row][column] !== ""){
        output+= table[row][column];
        count++;

      }
    }
  }
  console.log(table);
  console.log(sentence);
  return output;
}
