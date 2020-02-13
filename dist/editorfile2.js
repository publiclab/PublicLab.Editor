$(document).ready(function(){
  $('#ple-save').attr('disabled',true);
  $('#ple-preview').attr('disabled',true);
  $('#titleBar').keyup(function(){
      if($(this).val().length !=0){
          $('#ple-save').attr('disabled', false);
          $('#ple-preview').attr('disabled', false);
      }
      else
      {
          $('#ple-save').attr('disabled', true);
          $('#ple-preview').attr('disabled', true);
      }
  })
});

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function closeNav() {
  document.getElementById("displayInfo").style.opacity = 0;
  document.getElementById("fusion").style.width = 0;
  var blocks = document.getElementsByClassName("block");
  for (var k = 0 ; k < blocks.length ; k++) {
      blocks[k].parentNode.removeChild(blocks[k]);
  }
  document.getElementById("tokenDisplay").parentNode.removeChild(document.getElementById("tokenDisplay"));
}

function previewFunction() {
  document.getElementById("fusion").style.width = "100vw";
  setTimeout(function() {
      document.getElementById("displayInfo").style.opacity = 1;
  }, 300);
  var unorderedList = document.getElementsByTagName('li');
  if (document.getElementById("myGoals").childElementCount == 2) {
      for (var i = 0 ; i < unorderedList.length ; i++) {
          var created = document.createElement("pre");
          created.className = "pre";
          created.style.width = "auto";
          created.style.maxWidth = "70vw";
          created.style.background = "#fff";
          created.style.padding = "5px";
          created.style.fontFamily = "Ubuntu, sans-serif;";
          created.style.fontSize = "20px";
          created.style.height = "auto";
          created.innerHTML = localStorage.getItem("printList"+i);
          document.getElementById("myGoals").append(created);
      }
  }

  if (document.getElementById("tablaRow").childElementCount == 0) {
      var tableHead = document.getElementsByTagName("th");
      var timesRepeat = tableHead.length;
      for (var u = 0 ; u < timesRepeat ; u++) {
          var the = document.createElement("th");
          the.setAttribute("class", "hiden");
          the.innerHTML = localStorage.getItem("tableHead"+u);
          var tablaRow = document.getElementsByClassName("tabla")[0].tHead.children[0];
          tablaRow.append(the);
      }
  }

  if(document.getElementsByTagName("tbody")[1].childElementCount == 0) {
      var tableHead = document.getElementsByClassName("table")[0].getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("th");
      var rowCount = document.getElementsByClassName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
      var tableDataCount = 0;
      for (var b = 0 ; b < rowCount.length ; b++) {
          tableDataCount += rowCount[b].childElementCount;
      }
      var repeat = tableDataCount/(tableHead.length);
      var counter = 0;
      var tbody = document.getElementById("tbody");
      var arr = [];
      for (var p = 0 ; p < repeat ; p++) {
          arr[p] = document.createElement("tr");
          for (var k = counter ; k < (counter+tableHead.length) ; k++) {
              var tdata = document.createElement("td");
              tdata.setAttribute("class", "dataTable"+k);
              var node = document.createTextNode(localStorage.getItem("tabledata" + k));
              tdata.appendChild(node);
              arr[p].appendChild(tdata);
          }
          tbody.append(arr[p]);
          counter+=tableHead.length;
      }
  }

  var tokenLabel = document.getElementsByClassName("token-label");
  if(document.getElementById("createToken").childElementCount == 1) {
      var tokenDisplay = document.createElement("div");
      tokenDisplay.setAttribute("id", "tokenDisplay");
      document.getElementById("createToken").append(tokenDisplay);
      for (var x = 0 ; x < tokenLabel.length ; x++) {
          var tokenDiv = document.createElement("div");
          tokenDiv.className = "block";
          tokenDiv.style.width = "auto";
          tokenDiv.style.maxWidth = "70vw";
          tokenDiv.style.background = "#fff";
          tokenDiv.style.padding = "5px";
          tokenDiv.style.fontFamily = "Ubuntu, sans-serif;";
          tokenDiv.style.fontSize = "20px";
          tokenDiv.style.height = "auto";
          tokenDiv.innerHTML = localStorage.getItem("tokenLabel"+x);
          document.getElementById("tokenDisplay").append(tokenDiv);
      }
  }
}

var selectOne = "";
var one = "";
var locationNameOne = "";
var latitudeNameOne = "";
var longitudeNameOne = "";
var aboutMyProjectOne = "";
var unorderedlistOne = [];
var tbhOne = [];
var tbdOne = [];

localStorage.setItem("chooseOption", selectOne);
localStorage.setItem("title", one);
localStorage.setItem("placenameInput", locationNameOne);
localStorage.setItem("lat", latitudeNameOne);
localStorage.setItem("lng", longitudeNameOne);
localStorage.setItem("aboutMyProject", aboutMyProjectOne);
var unorderedList = document.getElementsByTagName('li');
for (var i = 0 ; i < unorderedList.length ; i++) {
  localStorage.setItem("printList"+i, unorderedlistOne[i]);
}
var tableData = document.getElementsByTagName('td');
for (var k = 0 ; k < tableData.length ; k++) {
  localStorage.setItem("tabledata" + k, tableData[k].innerHTML);
}

var tableHead = document.getElementsByClassName("table")[0].getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("th");
var headerLength = tableHead.length;
for (var g = 0 ; g < tableHead.length ; g++) {
  localStorage.setItem("printHead"+g, tbhOne[g]);
}

var rowCount = document.getElementsByClassName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
var tableDataCount = 0;
for (var b = 0 ; b < rowCount.length ; b++) {
  tableDataCount += rowCount[b].childElementCount;
}
for (var k = 0 ; k < tableDataCount ; k++) {
  tbdOne[k] = '';
  localStorage.setItem("printData"+k, tbdOne[k]);
}

var selectTemp = localStorage.getItem("chooseOption");
var temp = localStorage.getItem("title");
var locationNameTemp = localStorage.getItem("placenameInput");
var latTemp = localStorage.getItem("lat");
var longTemp = localStorage.getItem("lng");
var aboutMyProjectTemp = localStorage.getItem("aboutMyProject");
var unorderedListTemp = [];
for (var i = 0 ; i < unorderedList.length ; i++) {
  unorderedListTemp[i] = localStorage.getItem("printList"+i);
}
var tbhTemp = [];
for (var g = 0 ; g < tableHead.length ; g++) {
  tbhTemp[g] = localStorage.getItem("printHead"+g);
  tbhTemp[g] = '';
}
var tbdTemp = [];

var change = 0;

var optionSelect = document.getElementById("optionSelect");
var locationName = document.getElementById("locationName");
var latName = document.getElementById("lati");
var longName = document.getElementById("longi");
var aboutHeader = document.getElementById("aboutHeader");
var block = document.getElementsByClassName("block");
var hiden = document.getElementsByClassName("hiden");
var tablaRow = document.getElementsByClassName("tabla")[0].tHead.children[0];
var tablaData = document.getElementsByClassName("tabla")[0].tBody;

function seeChanges(one, change) {
  var tokenLabelOne = [];
  var allTokens = document.getElementsByClassName("token-label");
  var allTokensTemp = [];
  for (var j = 0 ; j < allTokens.length ; j++) {
      allTokensTemp[j] = localStorage.getItem("tokenLabel"+j);
  }
  for (var j = 0 ; j < allTokens.length ; j++) {
      localStorage.setItem("label"+j, tokenLabelOne);
  }
  for (var j = 0 ; j < allTokens.length ; j++) {
      allTokensTemp[j] = localStorage.getItem("tokenLabel"+j);
  }
  var pre = document.getElementsByClassName("pre");
  if (change == 0) {
      change=1;
      optionSelect.innerHTML = '';
      titleStorage.innerHTML = '';
      locationName.innerHTML = '';
      latName.innerHTML = '';
      longName.innerHTML = '';
      aboutHeader.innerHTML = '';
      for (var i = 0 ; i < unorderedList.length ; i++) {
          pre[i].innerHTML = '';
      }
      var block = document.getElementsByClassName("block");
      for (var l = 0 ; l < allTokens.length ; l++) {
          if(block[l])
              block[l].innerHTML = '';
      }
      for (var g = 0 ; g < headerLength ; g++) {
          if(hiden[g]) {
              hiden[g].innerHTML = '';
          }
      }
      // document.getElementsByClassName("tabla")[0].tBodies[0].innerHTML = '';
      var counter = 0;
      for (var p = 0 ; p < repeat ; p++) {
          for (var k = counter ; k < (counter+tableHead.length) ; k++) {
              document.getElementsByClassName("dataTable"+k)[0].innerHTML = '';
          }
          counter+=tableHead.length;
      }

      selectOne = selectTemp;
      one = temp;
      locationNameOne = locationNameTemp;
      latitudeNameOne = latTemp;
      londitudeNameOne = longTemp;
      aboutMyProjectOne = aboutMyProjectTemp;
      for (var i = 0 ; i < unorderedList.length ; i++) {
          unorderedlistOne[i] = unorderedListTemp[i];
      }
      for (var j = 0 ; j < allTokens.length ; j++) {
          tokenLabelOne[j] = allTokensTemp[j];
      }
      for (var g = 0 ; g < headerLength ; g++) {
          tbhOne[g] = tbhTemp[g];
      }
      var tableHead = document.getElementsByClassName("table")[0].getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("th");
      var rowCount = document.getElementsByClassName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr");
      var tableDataCount = 0;
      for (var b = 0 ; b < rowCount.length ; b++) {
          tableDataCount += rowCount[b].childElementCount;
      }
      for (var k = 0 ; k < tableDataCount ; k++) {
          tbdOne[k] = tbdTemp[k];
      }

      var selection = document.getElementById("selection");
      var requiredText = selection.options[selection.selectedIndex].text;
      var titleBar = document.getElementById("titleBar").value;
      var placenameInput = document.getElementById("placenameInput").value;
      var lat = document.getElementById('lat').value;
      var lng = document.getElementById('lng').value;
      var myproject = document.getElementById('about-my-project').innerHTML;
      var myGoals = [];
      for (var i = 0 ; i < unorderedList.length ; i++) {
          myGoals[i] = document.getElementsByTagName("li")[i].innerHTML;
      }
      var allTokensContent = [];
      for (var j = 0 ; j < allTokens.length ; j++) {
          allTokensContent[j] = document.getElementsByClassName("token-label")[j].innerHTML;
      }
      var allTableHeaders = [];
      for (var g = 0 ; g < headerLength ; g++) {
          allTableHeaders[g] = document.getElementsByClassName("table")[0].getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("th")[g].innerHTML;
      }
      var tableHead = document.getElementsByClassName("table")[0].getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("th");
      var repeat = tableDataCount/(tableHead.length);
      var allTableDatas = [];
      var counter = 0;
      for (var p = 0 ; p < repeat ; p++) {
          for (var k = counter ; k < (counter+tableHead.length) ; k++) {
              // allTableDatas[k] = document.getElementsByClassName("table")[0].getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].innerHTML;
              allTableDatas[k] = localStorage.getItem("tabledata"+k)
          }
          counter+=tableHead.length;
      }

      localStorage.setItem("selectionElement", requiredText);
      localStorage.setItem("title", titleBar);
      localStorage.setItem("placenameInput", placenameInput);
      localStorage.setItem("lat", lat);
      localStorage.setItem("lng", lng);
      localStorage.setItem("about-my-project", myproject);
      for (var i = 0 ; i < unorderedList.length ; i++) {
          localStorage.setItem("myGoals"+i, myGoals[i]);
      }
      for (var j = 0 ; j < allTokens.length ; j++) {
          localStorage.setItem("allTokensContent"+j, allTokensContent[j]);
      }
      for (var g = 0 ; g < headerLength ; g++) {
          localStorage.setItem("allTableHeaders"+g, allTableHeaders[g]);
      }
      for (var k = 0 ; k < allTableDatas.length ; k++) {
          localStorage.setItem("allTableDatas"+k, allTableDatas[k]);
      }

      var selectOther = localStorage.getItem("selectionElement");
      var other = localStorage.getItem("title");
      var locationNameOther = localStorage.getItem("placenameInput");
      var latitudeNameOther = localStorage.getItem("lat");
      var longitudeNameOther = localStorage.getItem("lng");
      var aboutMyProjectOther = localStorage.getItem("about-my-project");
      var unorderedlistOther = [];
      for (var i = 0 ; i < unorderedList.length ; i++) {
          unorderedlistOther[i] = localStorage.getItem("myGoals"+i);
      }
      var tokenLabelOther = [];
      for (var j = 0 ; j < allTokens.length ; j++) {
          tokenLabelOther[j] = localStorage.getItem("allTokensContent"+j);
      }
      var tbhOther = [];
      for (var g = 0 ; g < headerLength ; g++) {
          tbhOther[g] = localStorage.getItem("allTableHeaders"+g);
      }
      var counter = 0;
      for (var p = 0 ; p < repeat ; p++) {
          for (var k = counter ; k < (counter+tableHead.length) ; k++) {
              document.getElementsByClassName("dataTable"+k)[0].innerHTML = '';
          }
          counter+=tableHead.length;
      }
      var tbdOther = [];
      for (var k = 0 ; k < allTableDatas.length ; k++) {
          tbdOther[k] = localStorage.getItem("allTableDatas"+k);
      }

      selectTemp = selectOther;
      temp = other;
      locationNameTemp = locationNameOther;
      latTemp = latitudeNameOther;
      longTemp = longitudeNameOther;
      aboutMyProjectTemp = aboutMyProjectOther;
      for (var i = 0 ; i < unorderedList.length ; i++) {
          unorderedListTemp[i] = unorderedlistOther[i];
      }
      for (var j = 0 ; j < allTokens.length ; j++) {
          allTokensTemp[j] = tokenLabelOther[j];
      }
      for (var g = 0 ; g < headerLength ; g++) {
          tbhTemp[g] = tbhOther[g];
      }
      for (var k = 0 ; k < tableDataCount ; k++) {
          tbdTemp[k] = tbdOther[k];
      }

      var selectDiff = JsDiff.diffChars(selectOne, selectOther);
      var diff = JsDiff.diffChars(one, other);
      var locationDiff = JsDiff.diffChars(locationNameOne, locationNameOther);
      var latDiff = JsDiff.diffChars(latitudeNameOne, latitudeNameOther);
      var lngDiff = JsDiff.diffChars(longitudeNameOne, longitudeNameOther);
      var aboutDiff = JsDiff.diffChars(aboutMyProjectOne, aboutMyProjectOther);
      var listdiff = [];
      for (var i = 0 ; i < unorderedList.length ; i++) {
          listdiff[i] = JsDiff.diffChars(unorderedlistOne[i], unorderedlistOther[i]);
      }
      var tokenDiff = [];
      for (var j = 0 ; j < allTokens.length ; j++) {
          tokenDiff[j] = JsDiff.diffChars(tokenLabelOne[j], tokenLabelOther[j]);
      }
      var tbhDiff = [];
      for (var g = 0 ; g < headerLength ; g++) {
          tbhDiff[g] = JsDiff.diffChars(tbhOne[g], tbhOther[g]);
      }
      var tbdDiff = [];
      var counter = 0;
      for (var p = 0 ; p < repeat ; p++) {
          for (var k = counter ; k < (counter+tableHead.length) ; k++) {
              tbdDiff[k] = JsDiff.diffChars(tbdOne[k], tbdOther[k]);
          }
          counter+=tableHead.length;
      }

      selectDiff.forEach(function(part){
          // green for additions, red for deletions
          // grey for common parts
          var color = part.added ? 'green' :
          part.removed ? 'red' : 'grey';
          var span = document.createElement('span');
          span.style.color = color;
          span.appendChild(document.createTextNode(part.value));
          optionSelect.appendChild(span);
      });
      diff.forEach(function(part){
          // green for additions, red for deletions
          // grey for common parts
          var color = part.added ? 'green' :
          part.removed ? 'red' : 'grey';
          var span = document.createElement('span');
          span.style.color = color;
          span.appendChild(document.createTextNode(part.value));
          titleStorage.appendChild(span);
      });
      locationDiff.forEach(function(part){
          // green for additions, red for deletions
          // grey for common parts
          var color = part.added ? 'green' :
          part.removed ? 'red' : 'grey';
          var span = document.createElement('span');
          span.style.color = color;
          span.appendChild(document.createTextNode(part.value));
          locationName.appendChild(span);
      });
      latDiff.forEach(function(part){
          // green for additions, red for deletions
          // grey for common parts
          var color = part.added ? 'green' :
          part.removed ? 'red' : 'grey';
          var span = document.createElement('span');
          span.style.color = color;
          span.appendChild(document.createTextNode(part.value));
          latName.appendChild(span);
      });
      lngDiff.forEach(function(part){
          // green for additions, red for deletions
          // grey for common parts
          var color = part.added ? 'green' :
          part.removed ? 'red' : 'grey';
          var span = document.createElement('span');
          span.style.color = color;
          span.appendChild(document.createTextNode(part.value));
          longName.appendChild(span);
      });
      aboutDiff.forEach(function(part){
          // green for additions, red for deletions
          // grey for common parts
          var color = part.added ? 'green' :
          part.removed ? 'red' : 'grey';
          var span = document.createElement('span');
          span.style.color = color;
          span.appendChild(document.createTextNode(part.value));
          aboutHeader.appendChild(span);
      });
      for (var i = 0 ; i < unorderedList.length ; i ++) {
          listdiff[i].forEach(function(part) {
              // green for additions, red for deletions
              // grey for common parts
              var color = part.added ? 'green' :
              part.removed ? 'red' : 'grey';
              var span = document.createElement('span');
              span.style.color = color;
              span.appendChild(document.createTextNode(part.value));
              pre[i].appendChild(span);
          });
      }
      for (var j = 0 ; j < allTokens.length ; j++) {
          if (block[j]) {
              tokenDiff[j].forEach(function(part) {
                  // green for additions, red for deletions
                  // grey for common parts
                  var color = part.added ? 'green' :
                  part.removed ? 'red' : 'grey';
                  var span = document.createElement('span');
                  span.style.color = color;
                  span.appendChild(document.createTextNode(part.value));
                  block[j].appendChild(span);
              });
          }
      }
      for (var g = 0 ; g < headerLength ; g++) {
          if (hiden[g]) {
              tbhDiff[g].forEach(function(part) {
                  // green for additions, red for deletions
                  // grey for common parts
                  var color = part.added ? 'green' :
                  part.removed ? 'red' : 'grey';
                  var span = document.createElement('span');
                  span.style.color = color;
                  span.appendChild(document.createTextNode(part.value));
                  hiden[g].appendChild(span);
              });
          }
      }
      var counter = 0;
      for (var p = 0 ; p < repeat ; p++) {
          for (var k = counter ; k < (counter+tableHead.length) ; k++) {
              if (document.getElementsByClassName("dataTable"+k)[0]) {
                  tbdDiff[k].forEach(function(part) {
                      // green for additions, red for deletions
                      // grey for common parts
                      var color = part.added ? 'green' :
                      part.removed ? 'red' : 'grey';
                      var span = document.createElement('span');
                      span.style.color = color;
                      span.appendChild(document.createTextNode(part.value));
                      document.getElementsByClassName("dataTable"+k)[0].appendChild(span);
                  });
              }
          }
          counter+=tableHead.length;
      }
  }
}