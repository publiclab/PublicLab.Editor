// $(document).ready(function(){
//     $('#ple-save').attr('disabled',true);
//     $('#ple-preview').attr('disabled',true);
//     $('#titleBar').keyup(function(){
//         if($(this).val().length !=0){
//             $('#ple-save').attr('disabled', false);
//             $('#ple-preview').attr('disabled', false);
//         }
//         else
//         {
//             $('#ple-save').attr('disabled', true);
//             $('#ple-preview').attr('disabled', true);
//         }
//     })
// });
//
// function saveFunction() {
//     // var bannerImage = document.getElementById('bannerImg');
//
//     var tableHead = document.getElementsByTagName("th");
//     for (var j = 0 ; j < tableHead.length ; j++) {
//         localStorage.setItem("tableHead" + j, tableHead[j].innerHTML);
//     }
//
//     var tableData = document.getElementsByTagName('td');
//     for (var k = 0 ; k < tableData.length ; k++) {
//         localStorage.setItem("tabledata" + k, tableData[k].innerHTML);
//     }
//
//     // var tokenLabel = document.getElementsByClassName("token-label");
//     // for (var x = 0 ; x < tokenLabel.length ; x++) {
//     //     localStorage.setItem("tokenLabel"+x, tokenLabel[x].innerHTML);
//     // }
// }
//
// function getBase64Image(img) {
//     var canvas = document.createElement("canvas");
//     canvas.width = img.width;
//     canvas.height = img.height;
//
//     var ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0);
//
//     var dataURL = canvas.toDataURL("image/png");
//
//     return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
// }
//
// function closeNav() {
//     document.getElementById("displayInfo").style.opacity = 0;
//     document.getElementById("fusion").style.width = 0;
//     var pre = document.getElementById("myGoals").getElementsByTagName("pre");
//     for (var k = 0 ; k < pre.length ; k++) {
//         document.getElementById("myGoals").getElementsByTagName("pre")[k].remove();
//     }
//     var removeElement = document.getElementsByClassName("block");
//     for (var j = 0 ; j < removeElement.length ; j++) {
//         removeElement[j].parentNode.remove(removeElement[j]);
//     }
// }
//
// function previewFunction() {
//     console.log("preview mode");
//     document.getElementById("fusion").style.width = "100vw";
//     setTimeout(function() {
//         document.getElementById("displayInfo").style.opacity = 1;
//     }, 300);
//     var unorderedList = document.getElementsByTagName('li');
//     var lengthOfList = unorderedList.length;
//     if (document.getElementById("myGoals").childElementCount == 2) {
//         for (var i = 0 ; i < unorderedList.length ; i++) {
//             var created = document.createElement("pre");
//             created.className = "pre";
//             created.style.width = "auto";
//             created.style.maxWidth = "70vw";
//             created.style.background = "#fff";
//             created.style.padding = "5px";
//             created.style.fontFamily = "Ubuntu, sans-serif;";
//             created.style.fontSize = "20px";
//             created.style.height = "auto";
//             created.innerHTML = localStorage.getItem("printList"+i);
//             document.getElementById("myGoals").append(created);
//         }
//     }
//     // console.log(localStorage.getItem("imgData"));
//
//     if (document.getElementById("tablaRow").childElementCount == 0) {
//         // var hiden = document.getElementsByClassName('hiden');
//         var tableHead = document.getElementsByTagName("th");
//         var timesRepeat = tableHead.length;
//         for (var u = 0 ; u < timesRepeat ; u++) {
//             var the = document.createElement("th");
//             the.setAttribute("class", "hiden");
//             the.innerHTML = localStorage.getItem("tableHead"+u);
//             var tablaRow = document.getElementsByClassName("tabla")[0].tHead.children[0];
//             tablaRow.append(the);
//         }
//     }
//
//     if(document.getElementsByTagName("tbody")[1].childElementCount == 0) {
//         var tableHead = document.getElementsByTagName("th");
//         // console.log(tableHead);
//         var tableData = document.getElementsByTagName('td');
//         var repeat = tableData.length/(tableHead.length/2);
//         var counter = 0;
//         var tbody = document.getElementsByTagName("tbody")[1];
//         for (var p = 0 ; p < 2 ; p++) {
//             var trow = document.createElement("tr");
//             for (var k = counter ; k < (counter+5) ; k++) {
//                 var tdata = document.createElement("td");
//                 var node = document.createTextNode(localStorage.getItem("tabledata" + k));
//                 tdata.appendChild(node);
//                 trow.appendChild(tdata);
//             }
//             tbody.appendChild(trow);
//             counter+=5;
//         }
//     }
//
//     var tokenLabel = document.getElementsByClassName("token-label");
//     if(document.getElementById("tokenDisplay").childElementCount == 0) {
//         for (var x = 0 ; x < tokenLabel.length ; x++) {
//             var tokenDiv = document.createElement("div");
//             tokenDiv.className = "block"
//             tokenDiv.style.width = "auto";
//             tokenDiv.style.maxWidth = "70vw";
//             tokenDiv.style.background = "#fff";
//             tokenDiv.style.padding = "5px";
//             tokenDiv.style.fontFamily = "Ubuntu, sans-serif;";
//             tokenDiv.style.fontSize = "20px";
//             tokenDiv.style.height = "auto";
//             // tokenDiv.innerHTML = localStorage.getItem("tokenLabel"+x);
//             document.getElementById("tokenDisplay").append(tokenDiv);
//         }
//     }
// }
//
// var one = "";
// var locationNameOne = "";
// var latitudeNameOne = "";
// var longitudeNameOne = "";
// var aboutMyProjectOne = "";
// var unorderedlistOne = [];
// var unorderedList = document.getElementsByTagName('li');
// var tokenLabelOne = [];
// var allTokens = document.getElementsByClassName("token-label");
//
// localStorage.setItem("title", one);
// localStorage.setItem("placenameInput", locationNameOne);
// localStorage.setItem("lat", latitudeNameOne);
// localStorage.setItem("lng", longitudeNameOne);
// localStorage.setItem("aboutMyProject", aboutMyProjectOne);
// for (var i = 0 ; i < unorderedList.length ; i++) {
//     localStorage.setItem("printList"+i, unorderedlistOne[i]);
// }
// for (var j = 0 ; j < allTokens.length ; j++) {
//     localStorage.setItem("tokens"+j, tokenLabelOne[j]);
// }
//
// var temp = localStorage.getItem("title");
// var locationNameTemp = localStorage.getItem("placenameInput");
// var latTemp = localStorage.getItem("lat");
// var longTemp = localStorage.getItem("lng");
// var aboutMyProjectTemp = localStorage.getItem("aboutMyProject");
// var unorderedListTemp = [];
// for (var i = 0 ; i < unorderedList.length ; i++) {
//     unorderedListTemp[i] = localStorage.getItem("printList"+i);
// }
// var allTokensTemp = [];
// for (var j = 0 ; j < allTokens.length ; j++) {
//     allTokensTemp[j] = localStorage.getItem("tokens"+j);
// }
//
// var change = 0;
//
// var locationName = document.getElementById("locationName");
// var latName = document.getElementById("lati");
// var longName = document.getElementById("longi");
// var aboutHeader = document.getElementById("aboutHeader");
// var block = document.getElementsByClassName("block");
//
// function seeChanges(one, change) {
//     if (change == 0) {
//         change=1;
//         titleStorage.innerHTML = '';
//         locationName.innerHTML = '';
//         latName.innerHTML = '';
//         longName.innerHTML = '';
//         aboutHeader.innerHTML = '';
//         var pre = document.getElementById("myGoals").getElementsByClassName("pre");
//         for (var i = 0 ; i < unorderedList.length ; i++) {
//             pre[i].innerHTML = '';
//         }
//         for (var j = 0 ; j < allTokens.length ; j++) {
//             block[j].innerHTML = '';
//         }
//
//         one = temp;
//         locationNameOne = locationNameTemp;
//         latitudeNameOne = latTemp;
//         londitudeNameOne = longTemp;
//         aboutMyProjectOne = aboutMyProjectTemp;
//         for (var i = 0 ; i < unorderedList.length ; i++) {
//             unorderedlistOne[i] = unorderedListTemp[i];
//         }
//         for (var j = 0 ; j < allTokens.length ; j++) {
//             tokenLabelOne[j] = allTokensTemp[j];
//         }
//
//         var titleBar = document.getElementById("titleBar").value;
//         var placenameInput = document.getElementById("placenameInput").value;
//         var lat = document.getElementById('lat').value;
//         var lng = document.getElementById('lng').value;
//         var myproject = document.getElementById('about-my-project').innerHTML;
//         var myGoals = [];
//         for (var i = 0 ; i < unorderedList.length ; i++) {
//             myGoals[i] = document.getElementsByTagName("li")[i].innerHTML;
//         }
//         var allTokensContent = [];
//         for (var j = 0 ; j < allTokens.length ; j++) {
//             allTokensContent[j] = document.getElementsByClassName("token-label")[j].innerHTML;
//         }
//
//         localStorage.setItem("title", titleBar);
//         localStorage.setItem("placenameInput", placenameInput);
//         localStorage.setItem("lat", lat);
//         localStorage.setItem("lng", lng);
//         localStorage.setItem("about-my-project", myproject);
//         for (var i = 0 ; i < unorderedList.length ; i++) {
//             localStorage.setItem("myGoals"+i, myGoals[i]);
//         }
//         for (var j = 0 ; j < allTokens.length ; j++) {
//             localStorage.setItem("allTokenContent"+j, allTokensContent[j]);
//         }
//
//         var other = localStorage.getItem("title");
//         var locationNameOther = localStorage.getItem("placenameInput");
//         var latitudeNameOther = localStorage.getItem("lat");
//         var longitudeNameOther = localStorage.getItem("lng");
//         var aboutMyProjectOther = localStorage.getItem("about-my-project");
//         var unorderedlistOther = [];
//         for (var i = 0 ; i < unorderedList.length ; i++) {
//             unorderedlistOther[i] = localStorage.getItem("myGoals"+i);
//         }
//         var tokenLabelOther = [];
//         for (var j = 0 ; j < allTokens.length ; j++) {
//             tokenLabelOther[j] = localStorage.getItem("allTokenContent"+j);
//         }
//
//         temp = other;
//         locationNameTemp = locationNameOther;
//         latTemp = latitudeNameOther;
//         longTemp = longitudeNameOther;
//         aboutMyProjectTemp = aboutMyProjectOther;
//         for (var i = 0 ; i < unorderedList.length ; i++) {
//             unorderedListTemp[i] = unorderedlistOther[i];
//         }
//         for (var j = 0 ; j < allTokens.length ; j++) {
//             allTokensTemp[j] = tokenLabelOther[j];
//         }
//
//         var diff = JsDiff.diffChars(one, other);
//         var locationDiff = JsDiff.diffChars(locationNameOne, locationNameOther);
//         var latDiff = JsDiff.diffChars(latitudeNameOne, latitudeNameOther);
//         var lngDiff = JsDiff.diffChars(longitudeNameOne, longitudeNameOther);
//         var aboutDiff = JsDiff.diffChars(aboutMyProjectOne, aboutMyProjectOther);
//         var listdiff = [];
//         for (var i = 0 ; i < unorderedList.length ; i++) {
//             listdiff[i] = JsDiff.diffChars(unorderedlistOne[i], unorderedlistOther[i]);
//         }
//         var tokenDiff = [];
//         for (var j = 0 ; j < allTokens.length ; j++) {
//             tokenDiff[j] = JsDiff.diffChars(tokenLabelOne[j], tokenLabelOther[j]);
//         }
//
//         diff.forEach(function(part){
//             // green for additions, red for deletions
//             // grey for common parts
//             var color = part.added ? 'green' :
//             part.removed ? 'red' : 'grey';
//             var span = document.createElement('span');
//             span.style.color = color;
//             span.appendChild(document.createTextNode(part.value));
//             titleStorage.appendChild(span);
//         });
//         locationDiff.forEach(function(part){
//             // green for additions, red for deletions
//             // grey for common parts
//             var color = part.added ? 'green' :
//             part.removed ? 'red' : 'grey';
//             var span = document.createElement('span');
//             span.style.color = color;
//             span.appendChild(document.createTextNode(part.value));
//             locationName.appendChild(span);
//         });
//         latDiff.forEach(function(part){
//             // green for additions, red for deletions
//             // grey for common parts
//             var color = part.added ? 'green' :
//             part.removed ? 'red' : 'grey';
//             var span = document.createElement('span');
//             span.style.color = color;
//             span.appendChild(document.createTextNode(part.value));
//             latName.appendChild(span);
//         });
//         lngDiff.forEach(function(part){
//             // green for additions, red for deletions
//             // grey for common parts
//             var color = part.added ? 'green' :
//             part.removed ? 'red' : 'grey';
//             var span = document.createElement('span');
//             span.style.color = color;
//             span.appendChild(document.createTextNode(part.value));
//             longName.appendChild(span);
//         });
//         aboutDiff.forEach(function(part){
//             // green for additions, red for deletions
//             // grey for common parts
//             var color = part.added ? 'green' :
//             part.removed ? 'red' : 'grey';
//             var span = document.createElement('span');
//             span.style.color = color;
//             span.appendChild(document.createTextNode(part.value));
//             aboutHeader.appendChild(span);
//         });
//         for (var i = 0 ; i < unorderedList.length ; i ++) {
//             listdiff[i].forEach(function(part) {
//                 // green for additions, red for deletions
//                 // grey for common parts
//                 var color = part.added ? 'green' :
//                 part.removed ? 'red' : 'grey';
//                 var span = document.createElement('span');
//                 span.style.color = color;
//                 span.appendChild(document.createTextNode(part.value));
//                 pre[i].appendChild(span);
//             })
//         }
//         for (var j = 0 ; j < allTokens.length ; j++) {
//             tokenDiff[j].forEach(function(part) {
//                 // green for additions, red for deletions
//                 // grey for common parts
//                 var color = part.added ? 'green' :
//                 part.removed ? 'red' : 'grey';
//                 var span = document.createElement('span');
//                 span.style.color = color;
//                 span.appendChild(document.createTextNode(part.value));
//                 block[j].appendChild(span);
//             });
//         }
//     }
//     else if (change == 1) {
//         change=0;
//         titleStorage.innerHTML = '';
//         locationName.innerHTML = '';
//         latName.innerHTML = '';
//         longName.innerHTML = '';
//         aboutHeader.innerHTML = '';
//         for (var i = 0 ; i < unorderedList.length ; i++) {
//             pre[i].innerHTML = '';
//         }
//         for (var j = 0 ; j < allTokens.length ; j++) {
//             block[j].innerHTML = '';
//         }
//
//         other = temp;
//         locationNameOther = locationNameTemp;
//         latitudeNameOther = latTemp;
//         longitudeNameOther = longTemp;
//         aboutMyProjectOther = aboutMyProjectTemp;
//         for (var i = 0 ; i < unorderedList.length ; i++) {
//             unorderedlistOther[i] = unorderedListTemp[i];
//         }
//         for (var j = 0 ; j < allTokens.length ; j++) {
//             tokenLabelOther[j] = allTokensTemp[j];
//         }
//
//         var titleBar = document.getElementById("titleBar").value;
//         var placenameInput = document.getElementById("placenameInput").value;
//         var lat = document.getElementById('lat').value;
//         var lng = document.getElementById('lng').value;
//         var myproject = document.getElementById('about-my-project').innerHTML;
//         var myGoals = [];
//         for (var i = 0 ; i < unorderedList.length ; i++) {
//             myGoals[i] = document.getElementsByTagName("li")[i].innerHTML;
//         }
//         var allTokensContent = [];
//         for (var j = 0 ; j < allTokens.length ; j++) {
//             allTokensContent[j] = document.getElementsByClassName("token-label")[j].innerHTML;
//         }
//
//         localStorage.setItem("title", one);
//         localStorage.setItem("placenameInput", placenameInput);
//         localStorage.setItem("lat", lat);
//         localStorage.setItem("lng", lng);
//         localStorage.setItem("about-my-project", myproject);
//         for (var i = 0 ; i < unorderedList.length ; i++) {
//             localStorage.setItem("myGoals"+i, myGoals[i]);
//         }
//         for (var j = 0 ; j < allTokens.length ; j++) {
//             localStorage.setItem("allTokenContent"+j, allTokensContent[j]);
//         }
//
//         var one = localStorage.getItem("title");
//         var locationNameOne = localStorage.getItem("placenameInput");
//         var latitudeNameOne = localStorage.getItem("lat");
//         var longitudeNameOne = localStorage.getItem("lng");
//         var aboutMyProjectOne = localStorage.getItem("about-my-project");
//         var unorderedlistOther = [];
//         for (var i = 0 ; i < unorderedList.length ; i++) {
//             unorderedlistOther[i] = localStorage.getItem("myGoals"+i);
//         }
//         var tokenLabelOther = [];
//         for (var j = 0 ; j < allTokens.length ; j++) {
//             tokenLabelOther[j] = localStorage.getItem("allTokenContent"+j);
//         }
//
//         temp = one;
//         locationNameTemp = locationNameOne;
//         latTemp = latitudeNameOne;
//         longTemp = longitudeNameOne;
//         for (var i = 0 ; i < unorderedList.length ; i++) {
//             unorderedListTemp[i] = unorderedlistOne[i]
//         }
//         for (var j = 0 ; j < allTokens.length ; j++) {
//             allTokensTemp[j] = tokenLabelOne[j];
//         }
//
//         var diff = JsDiff.diffChars(one, other);
//         var locationDiff = JsDiff.diffChars(locationNameOne, locationNameOther);
//         var latDiff = JsDiff.diffChars(latitudeNameOne, latitudeNameOther);
//         var lngDiff = JsDiff.diffChars(longitudeNameOne, longitudeNameOther);
//         var aboutDiff = JsDiff.diffChars(aboutMyProjectOne, aboutMyProjectOther);
//         var listdiff = [];
//         for (var i = 0 ; i < unorderedList.length ; i++) {
//             listdiff[i] = JsDiff.diffChars(unorderedlistOne[i], unorderedlistOther[i]);
//         }
//         var tokenDiff = [];
//         for (var j = 0 ; j < allTokens.length ; j++) {
//             tokenDiff[j] = JsDiff.diffChars(tokenLabelOne[j], tokenLabelOther[j]);
//         }
//
//         diff.forEach(function(part){
//             // green for additions, red for deletions
//             // grey for common parts
//             var color = part.added ? 'green' :
//             part.removed ? 'red' : 'grey';
//             var span = document.createElement('span');
//             span.style.color = color;
//             span.appendChild(document.createTextNode(part.value));
//             locationName.appendChild(span);
//         });
//         locationDiff.forEach(function(part){
//             // green for additions, red for deletions
//             // grey for common parts
//             var color = part.added ? 'green' :
//             part.removed ? 'red' : 'grey';
//             var span = document.createElement('span');
//             span.style.color = color;
//             span.appendChild(document.createTextNode(part.value));
//             titleStorage.appendChild(span);
//         });
//         latDiff.forEach(function(part){
//             // green for additions, red for deletions
//             // grey for common parts
//             var color = part.added ? 'green' :
//             part.removed ? 'red' : 'grey';
//             var span = document.createElement('span');
//             span.style.color = color;
//             span.appendChild(document.createTextNode(part.value));
//             latName.appendChild(span);
//         });
//         lngDiff.forEach(function(part){
//             // green for additions, red for deletions
//             // grey for common parts
//             var color = part.added ? 'green' :
//             part.removed ? 'red' : 'grey';
//             var span = document.createElement('span');
//             span.style.color = color;
//             span.appendChild(document.createTextNode(part.value));
//             longName.appendChild(span);
//         });
//         aboutDiff.forEach(function(part){
//             // green for additions, red for deletions
//             // grey for common parts
//             var color = part.added ? 'green' :
//             part.removed ? 'red' : 'grey';
//             var span = document.createElement('span');
//             span.style.color = color;
//             span.appendChild(document.createTextNode(part.value));
//             aboutHeader.appendChild(span);
//         });
//         for (var i = 0 ; i < unorderedList.length ; i ++) {
//             listdiff[i].forEach(function(part) {
//                 // green for additions, red for deletions
//                 // grey for common parts
//                 var color = part.added ? 'green' :
//                 part.removed ? 'red' : 'grey';
//                 var span = document.createElement('span');
//                 span.style.color = color;
//                 span.appendChild(document.createTextNode(part.value));
//                 pre[i].appendChild(span);
//             })
//         }
//         for (var j = 0 ; j < allTokens.length ; j++) {
//             tokenDiff[j].forEach(function(part) {
//                 // green for additions, red for deletions
//                 // grey for common parts
//                 var color = part.added ? 'green' :
//                 part.removed ? 'red' : 'grey';
//                 var span = document.createElement('span');
//                 span.style.color = color;
//                 span.appendChild(document.createTextNode(part.value));
//                 block[j].appendChild(span);
//             });
//         }
//     }
// }
