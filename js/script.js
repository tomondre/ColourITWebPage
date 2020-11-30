/*globals DOMParser: false, XMLHttpRequest: false*/
var text = "<?xml version=\"1.0\" encoding=\"UTF-8\"    ?>\n" +
    "<projects><project><number>1</number><projectName>Lost equipment</projectName><description>System for finding lost equipment in the sea</description><requirements>Connect with danish government</requirements><status>Done</status></project><project><number>2</number><projectName>Dsdsd</projectName><description>Systedsds for finding lost equipment in the sea</description><requirements>Connect dsdsdswith danish government</requirements><status>In proccess</status></project></projects>"

var parser, xmlDoc, document;
//
// function displayContent(n, tag) {
//     parser = new DOMParser();
//     xmlDoc = parser.parseFromString(text, "text/xml")
//     var x = xmlDoc.getElementsByTagName(tag);
//     return x[n].childNodes[0].nodeValue;
// }
//
// var divs = document.getElementsByClassName("table");
// divs[0].innerHTML = displayContent(0, "projectName");


// displayTable();
//
// function displayTable() {
//     parser = new DOMParser();
//     xmlDoc = parser.parseFromString(text, "text/xml");
//     var x = xmlDoc.getElementsByTagName("project");
//     var listLength = x.length;
//
//     var table = "<table><tr><th>ID</th><th>Project Name</th><th>Description</th><th>Requirements</th><th>Status</th></tr>"
//
//     for (var i = 0; i < listLength; i++) {
//         table +=
//             "<tr><td>" + x[i].getElementsByTagName("number")[0].childNodes[0].nodeValue +
//             "</td><td>" + x[i].getElementsByTagName("projectName")[0].childNodes[0].nodeValue +
//             "</td><td>" + x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue +
//             "</td><td>" + x[i].getElementsByTagName("requirements")[0].childNodes[0].nodeValue +
//             "</td><td>" + x[i].getElementsByTagName("status")[0].childNodes[0].nodeValue +
//             "</td></tr>";
//     }
//
//     table += "</table>";
//
//     document.getElementById("tab").innerHTML = table;
// }

function readXML() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            showData(this);
        }
    };
    xhttp.open("GET", "XML/project.xml", true);
    xhttp.send();
}

function showData(xml) {

    xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("project");
    var listLength = x.length;

    var table = "<table><tr><th>ID</th><th>Project Name</th><th>Description</th><th>Requirements</th><th>Status</th></tr>"

    for (var i = 0; i < listLength; i++) {
        table +=
            "<tr><td>" + x[i].getElementsByTagName("number")[0].childNodes[0].nodeValue +
            "</td><td>" + x[i].getElementsByTagName("projectName")[0].childNodes[0].nodeValue +
            "</td><td>" + x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue +
            "</td><td>" + x[i].getElementsByTagName("requirements")[0].childNodes[0].nodeValue +
            "</td><td>" + x[i].getElementsByTagName("status")[0].childNodes[0].nodeValue +
            "</td></tr>";
    }
    table += "</table>";
    document.getElementById("tab").innerHTML = table;
}
readXML();