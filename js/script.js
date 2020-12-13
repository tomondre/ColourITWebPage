/*globals DOMParser: false, XMLHttpRequest: false*/
// var XMLText = "<?xml version=\"1.0\" encoding=\"UTF-8\"    ?>\n" +
// "<ongoingProjects><projects><projectName>First project</projectName><projectTeam><employees><firstName>Eliza</firstName><lastName>Manciu</lastName><role/><employeeID>400</employeeID><tasks></tasks></employees><employees><firstName>Khaled</firstName><lastName>Hammoun</lastName><role/><employeeID>3007</employeeID><tasks></tasks></employees></projectTeam><requirementList><requirements><estimateTime>1.0</estimateTime><priorityNumber>1</priorityNumber><description>adf af</description><taskList><tasks><estimatedTime>1.0</estimatedTime><timeUsed>1.0</timeUsed><description>wfj neæwq</description><assignedToTask><employees><firstName>Khaled</firstName><lastName>Hammoun</lastName><role>Project creator</role><employeeID>3007</employeeID><tasks></tasks></employees></assignedToTask><deadline><month>1</month><year>1</year><day>1</day></deadline><isDone>false</isDone><taskID>1</taskID><responsibleEmployee><firstName>Khaled</firstName><lastName>Hammoun</lastName><role>Project creator</role><employeeID>3007</employeeID><tasks></tasks></responsibleEmployee></tasks></taskList><requirementId>First requirement</requirementId><deadline><month>1</month><year>1</year><day>1</day></deadline><requirementType>Functional</requirementType><status>Started</status><responsibleEmployee><firstName>Khaled</firstName><lastName>Hammoun</lastName><role>Project creator</role><employeeID>3007</employeeID><tasks></tasks></responsibleEmployee></requirements></requirementList><status>In process</status></projects><projects><projectName>Second project</projectName><projectTeam><employees><firstName>234213</firstName><lastName>43124</lastName><role/><employeeID>3213</employeeID><tasks></tasks></employees></projectTeam><requirementList><requirements><estimateTime>1.0</estimateTime><priorityNumber>2</priorityNumber><description>32re13r</description><taskList><tasks><estimatedTime>1.0</estimatedTime><timeUsed>1.0</timeUsed><description>fadw feq</description><assignedToTask><employees><firstName>234213</firstName><lastName>43124</lastName><role>Product owner</role><employeeID>3213</employeeID><tasks></tasks></employees></assignedToTask><deadline><month>1</month><year>1</year><day>1</day></deadline><isDone>true</isDone><taskID>12</taskID><responsibleEmployee><firstName>234213</firstName><lastName>43124</lastName><role>Product owner</role><employeeID>3213</employeeID><tasks></tasks></responsibleEmployee></tasks></taskList><requirementId>aygfkyu</requirementId><deadline><month>2</month><year>2</year><day>2</day></deadline><requirementType>Non functional</requirementType><status>Started</status><responsibleEmployee><firstName>234213</firstName><lastName>43124</lastName><role>Product owner</role><employeeID>3213</employeeID><tasks></tasks></responsibleEmployee></requirements></requirementList><status>In process</status></projects></ongoingProjects>";
var selectedProjectIndex = -1;
var requirementTablePath = "reqTab";
var projectTablePath = "projectTab"
var taskTablePath = "taskTab"
var parser
var xmlDoc;
var document;
xmlDoc =
fetch('XML/project.xml').then((response)=>{
    response.text().then((XMLText)=>{
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(XMLText, 'text/xml')
        var y = xmlDoc.getElementsByTagName("projects");
        displayMainTable();
        function displayMainTable() {
            var listLength = y.length;
            var table = "<table><tr><th>Project Name</th><th>Status</th></tr>"
            for (var i = 0; i < listLength; i++) {
                table +=
                    "</tr><td class='name'>" + y[i].getElementsByTagName("projectName")[0].childNodes[0].nodeValue +
                    "</td><td>" + y[i].getElementsByTagName("status")[y[i].getElementsByTagName("status").length-1].childNodes[0].nodeValue +
                    "</td></tr>";
            }
            table += "</table>"
            document.getElementById(projectTablePath).innerHTML = table;
            addIndexesToTableRow(projectTablePath);
            addRowHandlers(projectTablePath);
            underLineTR()
        }

        function displayRequirementTable(projectIndex) {
            var x = y[projectIndex].getElementsByTagName("requirements");
            var listLength = x.length;
            var table = "<table><tr><th>Requirement Name</th><th>Priority Number</th><th>Status</th><th>Description</th><th>Estimate Time</th><th>Type</th></tr>";

            for (var i = 0; i < listLength; i++) {
                table +=
                    "</tr><td class='name'>" + x[i].getElementsByTagName("requirementId")[0].childNodes[0].nodeValue +
                    "</td><td>" + x[i].getElementsByTagName("priorityNumber")[0].childNodes[0].nodeValue +
                    "</td><td>" + x[i].getElementsByTagName("status")[0].childNodes[0].nodeValue +
                    "</td><td>" + x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue +
                    "</td><td>" + x[i].getElementsByTagName("estimateTime")[0].childNodes[0].nodeValue +
                    "</td><td>" + x[i].getElementsByTagName("requirementType")[0].childNodes[0].nodeValue +
                    "</td></tr>";
            }
            table += "</table>"
            document.getElementById(requirementTablePath).innerHTML = table;
            addIndexesToTableRow(requirementTablePath);
            addRowHandlers(requirementTablePath);
            underLineTR();
        }

        function displayTaskTable(projectIndex, requirementIndex) {
            var x = y[projectIndex].getElementsByTagName("requirements")[requirementIndex].getElementsByTagName("taskList")[0].getElementsByTagName("tasks");
            var listLength = x.length;
            var table = "<tr><th>TaskID</th><th>Description</th><th>EstimateTime</th><th>TimeUsed</th><th>IsDone</th></tr>"
            for (var i = 0; i < listLength; i++) {
                if (x[i].childNodes[0] != null) {
                    table +=
                        "</tr><td>" + x[i].getElementsByTagName("taskID")[0].childNodes[0].nodeValue +
                        "</td><td>" + x[i].getElementsByTagName("description")[0].childNodes[0].nodeValue +
                        "</td><td>" + x[i].getElementsByTagName("estimatedTime")[0].childNodes[0].nodeValue +
                        "</td><td>" + x[i].getElementsByTagName("timeUsed")[0].childNodes[0].nodeValue +
                        "</td><td>" + x[i].getElementsByTagName("isDone")[0].childNodes[0].nodeValue +
                        "</td></tr>";
                }
            }
            document.getElementById(taskTablePath).innerHTML = table;
            underLineTR();
        }

        function addRowHandlers(ID) {
            var table = document.getElementById(ID);
            var rows = table.getElementsByTagName("tr");
            for (i = 0; i < rows.length; i++) {
                var currentRow = table.rows[i];
                var createClickHandler =
                    function (row) {
                        return function () {
                            if (ID == projectTablePath) {
                                selectedProjectIndex = row.id;
                                resetTaskTable();
                                displayReqHeader();
                                displayRequirementTable(selectedProjectIndex, requirementTablePath)
                            }
                            if (ID == requirementTablePath)
                            {
                                displayTaskHeader();
                                displayTaskTable(selectedProjectIndex,row.id, taskTablePath)
                            }
                        }
                    };
                currentRow.onclick = createClickHandler(currentRow);
            }
        }

        function addIndexesToTableRow(tableID) {
            var li = document.getElementById(tableID).getElementsByTagName("tr");
            for (i = 1; i < li.length; i++) {
                li[i].id = i - 1;
            }
        }

        function resetTaskTable()
        {
            document.getElementById(taskTablePath).innerHTML ="";
            document.getElementById("taskHeader").innerHTML ="";
        }

        function displayReqHeader(){
            document.getElementById("reqHeader").innerHTML = "<h2>Requirements</h2>"
        }

        function displayTaskHeader(){
            document.getElementById("taskHeader").innerHTML = "<h2>Tasks</h2>"
        }

        function underLineTR(){
            var temp = document.getElementsByClassName("name");
            for (i = 0; i<temp.length; i++){
                temp[i].style.textDecoration = "underline";
            }
        }

    })
})