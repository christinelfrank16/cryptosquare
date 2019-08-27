$(document).ready(function() {

  $("form#user-input").submit(function(event) {
    event.preventDefault();
    var userInput = $("input#sentence").val();

    $("#output").text(encryptSentence(userInput));
  });

  $("#uncrypt-btn").click(function(){
    var encryptedMsg = $("#output").text();
    $("#message").text(uncryptMsg(encryptedMsg));
  });
});

function uncryptMsg(encryptedMsg){
  var msgNoSpaces = encryptedMsg.replace(/[\s]/g,"");
  var table = createTable(msgNoSpaces, false);
  var transposedTable = transposeTable(table);
  return unscrambleMsg(transposedTable);
}

function unscrambleMsg(table){
  var message = "";
    for (var row =0; row<table.length; row++){
      message += table[row].join("");
    }
    message = cleanUpMessage(message);
  return message;
}

function cleanUpMessage(message){
  var cleanMsg = "";
  var regexChar = /[a-z]/;
  var regexDigit = /[0-9]/;
  for(var i=0; i < message.length; i++){
    if(regexChar.test(message[i])){
      cleanMsg += message[i];
    }
    else if(regexDigit.test(message[i]) && regexChar.test(message[i-1])){
      cleanMsg += " ";
    }
  }
  return cleanMsg;
}

function createTable(formattedSentence, roundDirectionUp){
  var dimension = Math.sqrt(formattedSentence.length);
  var table = [];
  if(roundDirectionUp){
    var tableWidth = Math.ceil(dimension);
  } else {
    var tableWidth = Math.floor(dimension);
  }

  while(formattedSentence.length > 0){
    var row = [];
    for(var tableElement = 0; tableElement < tableWidth; tableElement++){
      if(formattedSentence[tableElement]){
        row.push(formattedSentence[tableElement]);
      }else{
        row.push("-");
      }
    }
    formattedSentence = formattedSentence.substring(tableWidth, formattedSentence.length);
    table.push(row);
  }
  return table;
}

function transposeTable(table){
  var count = 0;
  var message = "";
  var tableWidth = table[0].length;
  var newTable = [];
  for (var column=0; column<tableWidth; column++){
    var newRow = [];
    for (var row =0; row<table.length; row++){
      newRow.push(table[row][column]);
    }
    newTable.push(newRow);
  }
  return newTable;
}

function createMsg(table){
  var count = 0;
  var message = "";
  var tableHeight = table.length;
  var newTable = [];
  for (var row=0; row<tableHeight; row++){
    for (var col=0; col<table[0].length; col++){
      if (count === 5){
        message+= " ";
        count = 0;
      }
      if (table[row][col] !== ""){
        message+= table[row][col];
        count++;
      }
    }
  }
  return message;
}

function encryptSentence(sentence){
  sentence = sentence.toLowerCase();
  var regex = /[a-z]/;
  var newSentence = "";
  for (var i=0; i<sentence.length; i++) {
    if (regex.test(sentence[i])){
      newSentence += sentence[i];
    } else if(sentence[i] === " "){
      newSentence += Math.floor(Math.random()*500)+1;
    }
  }
  var table = createTable(newSentence, true);
  var transposedTable = transposeTable(table);
  var output = createMsg(transposedTable);

  return output;
}
