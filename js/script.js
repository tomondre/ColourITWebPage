/*globals DOMParser: false, XMLHttpRequest: false/*/
var text = "<?xml version=\"1.0\" encoding=\"UTF-8\"    ?>\n" +
    "<projects><project><number>1</number><projectName>Lost equipment</projectName><description>System for finding lost equipment in the sea</description><requirements>Connect with danish government</requirements><status>Done</status></project><project><number>2</number><projectName>Dsdsd</projectName><description>Systedsds for finding lost equipment in the sea</description><requirements>Connect dsdsdswith danish government</requirements>\n<status>In proccess</status></project></projects>"

var parser, xmlDoc, document;

function displayContent(n) {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text, "text/xml")
    var x = xmlDoc.getElementsByTagName("number");
    return x[n].childNodes[0].nodeValue;
}

var divs = document.getElementById("25");
divs[0].innerHTML = displayContent(0);

// displayTable();
//
// function displayTable() {
//     parser = new DOMParser();
//     xmlDoc = parser.parseFromString(text, "text/xml");
//     var x = xmlDoc.getElementsByTagName("class");
//     var listLength = x.length;
//
//     var table = "<table><tr><th>ID</th><th>Project Name</th><th>Description</th><th>Requirements</th><th>Status</th></tr>"
//
//     for (var i = 0; i < listLength; i++) {
//         table += "<tr><td>" + x[i].getElementsByTagName("number")[0].childNodes[0].nodeValue +
//             "</td><td>" + x[i].getElementsByTagName("projectName")[0].childNodes[0].nodeValue +
//             "</td><td>" + x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue +
//             "</td><td>" + x[i].getElementsByTagName("requirements")[0].childNodes[0].nodeValue +
//             "</td><td>" + x[i].getElementsByTagName("status")[0].childNodes[0].nodeValue +
//             "</td></tr>"
//     }
//
//     table += "</table>";
//     document.getElementById("tab").innerHtml = table;
// }
//
// function readXML() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             showData(this);
//         }
//
//     };
//     xhttp.open("GET", xml / projects.xml, true);
//     xhttp.send();
// }
//
// function showData(xml) {
//
//     var xmlDoc = xml.responseXML;
//     var x = xmlDoc.getElementsByTagName("class");
//     var listLength = x.length;
//
//     var table = "<table><tr><th>ID</th><th>Project Name</th><th>Description</th><th>Requirements</th><th>Status</th></tr>"
//
//     for (var i = 0; i < listLength; i++) {
//         table += "<tr><td>" + x[i].getElementsByTagName("number")[0].childNodes[0].nodeValue +
//             "</td><td>" + x[i].getElementsByTagName("projectName")[0].childNodes[0].nodeValue +
//             "</td><td>" + x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue +
//             "</td><td>" + x[i].getElementsByTagName("requirements")[0].childNodes[0].nodeValue +
//             "</td><td>" + x[i].getElementsByTagName("status")[0].childNodes[0].nodeValue +
//             "</td></tr>"
//     }
//
//     table += "</table>";
//     document.getElementById(tab)
// }
//
// readXML();