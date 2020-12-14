/*globals DOMParser: false, XMLHttpRequest: false*/
// initializing global values used later in the script. Path variables are paths to different tables. The variables are used often so its easier to initialize them like this.
var selectedProjectIndex = -1;
var requirementTablePath = "reqTab";
var projectTablePath = "projectTab";
var taskTablePath = "taskTab";
var parser
var xmlDoc;
var document;
//Input to fetch is our generated file from the system.
fetch('XML/project.xml').then((response) => {
    response.text().then((XMLText) => {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(XMLText, 'text/xml')
        var y = xmlDoc.getElementsByTagName("projects");
        displayMainTable();

        //Function for displaying Table with project informations.
        function displayMainTable() {

            //Number of Project elements inside y
            var listLength = y.length;
            //table header row
            var table = "<table><tr><th>Project Name</th><th>Status</th></tr>"

            //Filling out rows one by one. List length represents how many projects are in the xml file.
            for (var i = 0; i < listLength; i++) {
                table +=
                    "</tr><td class='name'>" + y[i].getElementsByTagName("projectName")[0].childNodes[0].nodeValue +
                    "</td><td>" + y[i].getElementsByTagName("status")[y[i].getElementsByTagName("status").length - 1].childNodes[0].nodeValue +
                    "</td></tr>";
            }
            table += "</table>"

            //Filling out table in the projects.html with table that was made
            document.getElementById(projectTablePath).innerHTML = table;

            //Adding row handlers so they are clickable
            addRowHandlers(projectTablePath);

            //Adding some css properties for the table
            underLineTR()
        }

        //Displays Requirement table. Input to this function is selected project index.
        function displayRequirementTable() {

            //Reading project on the given index.
            var x = y[selectedProjectIndex].getElementsByTagName("requirements");

            //Number of Requirement elements inside x
            var listLength = x.length;

            //Adding table header row
            var table = "<table><tr><th>Requirement Name</th><th>Priority Number</th><th>Status</th><th>Description</th><th>Estimate Time</th><th>Type</th></tr>";

            //filling out informations Requirement informations into the table
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

            //Filling out table in projects.html with the made table.
            document.getElementById(requirementTablePath).innerHTML = table;

            //Making Requirement table row clickable
            addRowHandlers(requirementTablePath);

            //Styling the table rows
            underLineTR();
        }

        //Displaying the Task table. Input is selected project index and selected requirement index.
        function displayTaskTable(requirementIndex) {

            //Getting only tasks in the given project index and given requirement index
            var x = y[selectedProjectIndex].getElementsByTagName("requirements")[requirementIndex].getElementsByTagName("taskList")[0].getElementsByTagName("tasks");

            //Number of Tasks elements in the list
            var listLength = x.length;

            //Making a header row of a table
            var table = "<tr><th>TaskID</th><th>Description</th><th>EstimateTime</th><th>TimeUsed</th><th>IsDone</th></tr>"

            //Filling out tasks infromations to the table
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
            //Filling out the table in the projects.html with Task table that we have made
            document.getElementById(taskTablePath).innerHTML = table;

            //Adding styling
            underLineTR();
        }

        //Function for adding row handlers to a table rows so they are clickable. Input path represents path to the table
        function addRowHandlers(path) {

            //Adding indexes to the table so we can use these indexes later.
            addIndexesToTableRow(path);

            //Getting a table with a given path.
            var table = document.getElementById(path);

            //Getting a rows from the table
            var rows = table.getElementsByTagName("tr");

            //Adding a handler to every row in the table
            for (i = 0; i < rows.length; i++) {

                //Current row in the loop
                var currentRow = table.rows[i];

                //Creating function for adding handlers
                var createClickHandler =
                    function (row) {
                        return function () {

                            //Comparing if the given path is for project or for requirement so we display requirement table or task table
                            if (path == projectTablePath) {

                                //Saving selected id of project/row in the project table
                                selectedProjectIndex = row.id;

                                //Everytime when the project row is clicked, task table is reseted so there are not Task which are not relevant to selected project
                                resetTaskTable();

                                //Requirement header is now visible
                                displayReqHeader();

                                //Displaying Requirement table
                                displayRequirementTable()
                            }

                            //If requirement table row have been clicked, task table will be displayed with informations from the selected requirement
                            else if (path == requirementTablePath) {

                                //Task header is now visible
                                displayTaskHeader();

                                //Displays Task table
                                displayTaskTable(row.id)
                            }
                        }
                    };

                //Calling the function that is creating handlers
                currentRow.onclick = createClickHandler(currentRow);
            }
        }

        //Adding indexes to the rows in the table. Input is the path to table we want to add indexes to.
        function addIndexesToTableRow(path) {

            //getting a rows from the given table
            var li = document.getElementById(path).getElementsByTagName("tr");

            //Scrolling through rows. We are not adding index to the first row because its not clickable header row
            for (i = 1; i < li.length; i++) {
                li[i].id = i - 1;
            }
        }

        //Function to reset Task table and Task header
        function resetTaskTable() {
            document.getElementById(taskTablePath).innerHTML = "";
            document.getElementById("taskHeader").innerHTML = "";
        }

        //Function to display requirement header
        function displayReqHeader() {
            document.getElementById("reqHeader").innerHTML = "<h2>Requirements</h2>"
        }

        //Function to display Task header
        function displayTaskHeader() {
            document.getElementById("taskHeader").innerHTML = "<h2>Tasks</h2>"
        }

        //Styling the first column of the table
        function underLineTR() {
            var temp = document.getElementsByClassName("name");
            for (i = 0; i < temp.length; i++) {
                temp[i].style.textDecoration = "underline";
            }
        }

    })
})