/*globals DOMParser: false, XMLHttpRequest: false*/
var XMLText = "<?xml version=\"1.0\" encoding=\"UTF-8\"    ?>\n" +
    "<ongoingProjects><projects><projectName>Akaskd</projectName><projectTeam><employees><firstName>Peter</firstName><lastName>PETERSN</lastName><role>Developer</role><employeeID>25</employeeID><tasks></tasks></employees><employees><firstName>35</firstName><lastName>oodoksd</lastName><role>Productowner</role><employeeID>21</employeeID><tasks></tasks></employees></projectTeam><requirementList><requirements><estimateTime>20.0</estimateTime><priorityNumber>2</priorityNumber><description>LMM</description><taskList></taskList><requirementTablePath>23</requirementTablePath><deadline><month>11</month><year>2020</year><day>20</day></deadline><requirementType>Functional</requirementType><status>Started</status><responsibleEmployee><firstName>Peter</firstName><lastName>PETERSN</lastName><role>Developer</role><employeeID>25</employeeID><tasks></tasks></responsibleEmployee></requirements><requirements><estimateTime>50.0</estimateTime><priorityNumber>4</priorityNumber><description>dsdsds</description><taskList></taskList><requirementTablePath>21</requirementTablePath><deadline><month>0</month><year>8555</year><day>11</day></deadline><requirementType>Functional</requirementType><status>Started</status><responsibleEmployee><firstName>Peter</firstName><lastName>PETERSN</lastName><role>Developer</role><employeeID>25</employeeID><tasks></tasks></responsibleEmployee></requirements></requirementList><status>Inprocess</status></projects><projects><projectName>asdadasdfdfd</projectName><projectTeam></projectTeam><requirementList></requirementList><status>Inprocess</status></projects><projects><projectName>sdsdsds</projectName><projectTeam></projectTeam><requirementList></requirementList><status>Inprocess</status></projects></ongoingProjects>"


var selectedProjectIndex = -1;
var selectedRequirementIndex = -1;
var requirementTablePath = "reqTab";           //ID of requirementTable element
var projectTablePath = "projectTab"              //ID of projectTable element
var taskTablePath = "taskTab"

displayMainTable(projectTablePath);

function displayMainTable(projectTablePath) {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(XMLText, "text/xml");
    var x = xmlDoc.getElementsByTagName("projects");
    var listLength = x.length;
    var table = "<tr><th>Project Name</th><th>Status</th></tr>"
    for (var i = 0; i < listLength; i++) {
        table +=
            "</tr id=i><td>" + x[i].getElementsByTagName("projectName")[0].childNodes[0].nodeValue +
            "</td><td>" + x[i].getElementsByTagName("status")[0].childNodes[0].nodeValue +
            "</td></tr>";
    }
    document.getElementById(projectTablePath).innerHTML = table;
    addIndexesToTableRow(projectTablePath);
    addRowHandlers(projectTablePath);
}

function displayRequirementTable(projectIndex, requirementTablePath) {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(XMLText, "text/xml");
    var x = xmlDoc.getElementsByTagName("projects")[projectIndex].getElementsByTagName("requirements");
    var listLength = x.length;
    console.log(projectIndex)
    var table = "<tr><th>requirementTablePath</th><th>PriorityNumber</th><th>Status</th><th>Description</th><th>EstimateTime</th><th>Type</th></tr>";
    for (var i = 0; i < listLength; i++) {
        table +=
            "</tr><td>" + x[i].getElementsByTagName("requirementId")[0].childNodes[0].nodeValue +
            "</td><td>" + x[i].getElementsByTagName("priorityNumber")[0].childNodes[0].nodeValue +
            "</td><td>" + x[i].getElementsByTagName("status")[0].childNodes[0].nodeValue +
            "</td><td>" + x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue +
            "</td><td>" + x[i].getElementsByTagName("estimateTime")[0].childNodes[0].nodeValue +
            "</td><td>" + x[i].getElementsByTagName("requirementType")[0].childNodes[0].nodeValue +
            "</td></tr>";
    }
    console.log(table)
    document.getElementById(requirementTablePath).innerHTML = table;
    //addIndexesToTableRow(requirementTablePath);
    //addRowHandlers(requirementTablePath);
}


//TODO
function addRowHandlers(ID) {
    var table = document.getElementById(ID);
    var rows = table.getElementsByTagName("tr");
    for (i = 1; i < rows.length; i++) {
        var currentRow = table.rows[i];
        var createClickHandler =
            function (row) {
                return function () {
                    console.log(row.id)
                        // selectedProjectIndex = row.id;
                        // selectedRequirementIndex = -1;
                        displayRequirementTable(row.id, requirementTablePath)
                    // if (ID == requirementTablePath) {
                    //     selectedRequirementIndex = row.id;
                    //     displayTaskTable(selectedProjectIndex, row.id ,taskTablePath)
                        // if (selectedRequirementIndex > -1) {
                        //     displayTaskTable(selectedProjectIndex, selectedRequirementIndex,taskTablePath)
                        // }
                    }
                };
            }
        currentRow.onclick = createClickHandler(currentRow);
    }


function addIndexesToTableRow(tableID) {
    var li = document.getElementById(tableID).getElementsByTagName("tr");
    for (i = 1; i < li.length; i++) {
        li[i].id = i - 1;
    }
}

////TODO edit when task exported
// function displayTaskTable(projectIndex, requirementIndex, requirementTablePath) {
//     parser = new DOMParser();
//     xmlDoc = parser.parseFromString(XMLText, "text/xml");
//     var x = xmlDoc.getElementsByTagName("projects")[projectIndex].getElementsByTagName("requirements")[requirementIndex].getElementsByTagName("taskList");
//     var listLength = x.length;
//     table = "<tr><th>requirementTablePath</th><th>PriorityNumber</th><th>Status</th><th>Description</th><th>EstimateTime</th><th>Type</th></tr>"
//     for (var i = 0; i < listLength; i++) {
//         table +=
//             "</tr><td>" + x[i].getElementsByTagName("requirementId")[0].childNodes[0].nodeValue +
//             "</td><td>" + x[i].getElementsByTagName("priorityNumber")[0].childNodes[0].nodeValue +
//             "</td><td>" + x[i].getElementsByTagName("status")[0].childNodes[0].nodeValue +
//             "</td><td>" + x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue +
//             "</td><td>" + x[i].getElementsByTagName("estimateTime")[0].childNodes[0].nodeValue +
//             "</td><td>" + x[i].getElementsByTagName("requirementType")[0].childNodes[0].nodeValue +
//             "</td></tr>";
//     }
//     document.getElementById(taskTablePath).appendHTML = "<h2> Requirements </h2>";
//     document.getElementById(taskTablePath).innerHTML = table;
//     addIndexesToTableRow(taskTablePath);
//     addRowHandlers(taskTablePath);
// }


//var JsonText = [{"projects":[{"projectName":"Akaskd","projectTeam":{"employees":[{"employeeID":25,"firstName":"Peter","lastName":"PETERSN","role":"Developer","tasks":{"tasks":[]}},{"employeeID":21,"firstName":"35","lastName":"oodoksd","role":"Product owner","tasks":{"tasks":[]}}]},"requirementList":{"requirements":[{"requirementTablePath":"23","description":"LMM","status":"Started","estimateTime":20.0,"priorityNumber":2,"deadline":{"day":20,"month":11,"year":2020},"taskList":{"tasks":[]},"responsibleEmployee":{"employeeID":25,"firstName":"Peter","lastName":"PETERSN","role":"Developer","tasks":{"tasks":[]}},"requirementType":"Functional"},{"requirementTablePath":"21","description":"dsdsds","status":"Started","estimateTime":50.0,"priorityNumber":4,"deadline":{"day":11,"month":0,"year":8555},"taskList":{"tasks":[]},"responsibleEmployee":{"employeeID":25,"firstName":"Peter","lastName":"PETERSN","role":"Developer","tasks":{"tasks":[]}},"requirementType":"Functional"}]},"status":"In process"},{"projectName":"asdadasd","projectTeam":{"employees":[]},"requirementList":{"requirements":[]},"status":"In process"},{"projectName":"sdsdsds","projectTeam":{"employees":[]},"requirementList":{"requirements":[]},"status":"In process"}]}];
// buildTable(JsonText)
//
// function buildTable(data) {
//     var table = "<table><tr><th>Project Name</th><th>Status</th></tr>"
//     for (var i = 0; i < data.length; i++) {
//
//         table +=
//             "<tr><td>" + data[i].projectName +
//             "</td><td>" + data[i].status +
//             "</td></tr>";
//     }
//
//     table += "</table>";
//
//     document.getElementById("25").innerHTML = table;
//     }
//
// document.getElementById(h2).innerHTML =" XmlText";

//var parser, xmlDoc, document;
//
// function displayContent(n, tag) {
//     parser = new DOMParser();
//     xmlDoc = parser.parseFromString(XMLText, "text/xml")
//     var x = xmlDoc.getElementsByTagName(tag);
//     return x[n].childNodes[0].nodeValue;
// }
//
// var divs = document.getElementsByClassName("table");
// divs[0].innerHTML = displayContent(0, "projectName");


// function readXML() {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             showData(this);
//         }
//     };
//     xhttp.open("GET", "XML/project.xml", true);
//     xhttp.send();
// }
//
// function showData(xml) {
//
//     xmlDoc = xml.responseXML;
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
//     table += "</table>";
//     document.getElementById("tab").innerHTML = table;
// }
// readXML();