<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="">
  <meta name="author" content="">
  <link rel="icon" href="../../favicon.ico">
  <title>Double Degree's UAP</title>

  <link href="assets/css/bootstrap.css" rel="stylesheet">
  <link href="assets/css/dashboard.css" rel="stylesheet">

  <script src="assets/js/jquery.min.js"></script>
  <script src="assets/js/bootstrap.js"></script>
  <script src="assets/js/uap.js"></script>
  <script src="assets/js/editabletable.js"></script> 
  <script src="assets/js/ie10-viewport-bug-workaround.js"></script>

  <?php 
  include 'assets/php/init.php';
  include 'assets/php/uap.php';
  include 'assets/php/ModelTable.php';
  ?>

</head>

<body>

  <div class="navbar navbar-fixed-top" role="navigation">
    <div class="container-fluid">
      <div class="navbar-header"><a class="navbar-brand">Double Degree's UAP v1.0</a></div>
    </div>
  </div>

  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 col-md-2 sidebar">
        <ul class="nav nav-sidebar">
          <li>Program</li>
          <select class="form-control" id="selProgram" name="selProgram">
            <option value="None" selected="selected">None</option>
            <?php 
            fetchList(0);
            ?>
          </select>
          <select class="form-control multiselect" id="showProgram" size="8"></select>
          <li>Majors</li>
          <select class="form-control" id="selMajor" name="selMajor">
            <option value="None" selected="selected">None</option>
            <?php 
            fetchList(1);
            ?>
          </select>
          <select class="form-control multiselect" id="showMajor" size="8"></select>
          <li>Minors</li>
          <select class="form-control" id="selMinor" name="selMinor">
            <option value="None" selected="selected">None</option>
            <?php 
            fetchList(2);
            ?>
          </select>
          <select class="form-control multiselect" id="showMinor" size="8"></select>
          <li>Concentrations</li>
          <select class="form-control" id="selConcentration" name="selConcentration">
            <option value="None" selected="selected">None</option>
            <?php 
            fetchList(3);
            ?>
          </select>
          <select class="form-control multiselect" id="showConcentration" size="8"></select>
          <li>Designations</li>
          <select class="form-control" id="selDesignation" name="selDesignation">
            <option value="None" selected="selected">None</option>
            <?php 
            fetchList(4);
            ?>
          </select>
          <select class="form-control multiselect" id="showDesignation" size="8"></select>
        </ul>
      </div>

      <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">

        <h2 class="sub-header">Welcome!</h2>
        <p>This is a Work-In-Progress Universal Academic Planner for 
          University of Waterloo's Double Degree students. It is made by 
          Davis Wu based on Sasha Ramani's original Excel UAP. Because it is still WIP, please
          double check your courses with Official Waterloo resources!</p>
          <div class="row">  
            <div class="col-md-6" style="text-align: center;">
              Choose Starting Year: 
              <select class="form-control" id="selYear" name="selYear" style="width: 150px; display: inline;">
                <option value="2011" selected="true">2011</option>
                <option value="2012">2012</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
              </select>
            </div>
            <div class="col-md-6" style="text-align: center;">
              Load Scheme: 
              <select class="form-control" id="selScheme" name="selScheme" style="width: 150px; display: inline;">
                <?php
                fetchScheme();
                ?>
              </select>
            </div>
          </div>
          <h2 class="sub-header">Schedule</h2>
          <table id="mainTable" class="table table-condensed">
            <?php 
            loadModelTable();
            ?>
          </table>

          <h2 class="sub-header">Course Guide</h2>
          <div class="row">
            <div class="col-xs-3 col-sm-4 placeholder">
              <h4 align="center">Description</h4>
              <div class="well well-lg" id="showDescLeft"></div>
            </div>
            <div class="col-xs-3 col-sm-4 placeholder">
              <div class="choose-left-right">
                <i class="glyphicon glyphicon-chevron-left" id="displaydironleft" style="color: #000000"></i>
                <i class="glyphicon glyphicon-chevron-right" id="displaydironright" style="color: #C0C0C0"></i>
                <h4>All Courses</h4>
              </div>
              <select class="form-control dir-select" id="selDirectory" name="selDirectory">
                <option value="None" selected="selected">None</option>
                <?php 
                fetchDir();
                ?>
              </select>
              <select class="form-control multiselect" id="showDirectory" size="16"></select>
            </div>  
            <div class="col-xs-3 col-sm-4 placeholder">
              <h4 align="center">Description</h4>
              <div class="well well-lg" id="showDescRight"></div>
            </div>
          </div>  

          <h2 class="sub-header">Achievements</h2>
          <div class="row">
            <div class="col-md-2" style="text-align: center;">
              <button type="button" class="btn btn-default btn-md" onclick="fetchAchievement()">
                <span class="glyphicon glyphicon-road"></span> Calculate
              </button>
            </div>

            <div class="col-md-10">
              <div class="well well-sm" id="showAchievement"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script>
    $('#mainTable').editableTableWidget().takenCourses().find('td:first').focus();
    $('#mainTable').editableTableWidget();  

    $('#selYear').on('change', function() {
      loadTableHeader(this.value);
    });
    $('#selScheme').on('change', function() {
      loadTableScheme(this.value);
    });

    $('#selProgram').on('change', function() {
      var id = this.value;
      if (id != "None") { fetchReq(id, 0); }
    });
    $('#selMajor').on('change', function() {
      var id = this.value;
      if (id != "None") { fetchReq(id, 1); }
    });
    $('#selMinor').on('change', function() {
      var id = this.value;
      if (id != "None") { fetchReq(id, 2); }
    });
    $('#selConcentration').on('change', function() {
      var id = this.value;
      if (id != "None") { fetchReq(id, 3); }
    });
    $('#selDesignation').on('change', function() {
      var id = this.value;
      if (id != "None") { fetchReq(id, 4); }
    });
    $('#selDirectory').on('change', function() {
      var id = this.value;
      if (id != "None") { fetchCourse(id); }
    });
    $('#showDirectory').on('change', function() {
      var id = this.value;
      if (id != "None") { displayCourse(id, whichside); }
    });

    $('#displaydironleft').click(function(ev) {
      $('#displaydironleft').css('color', '#000000');
      $('#displaydironright').css('color', '#C0C0C0');
      whichside = true;
    });
    $('#displaydironright').click(function(ev) {
      $('#displaydironleft').css('color', '#C0C0C0');
      $('#displaydironright').css('color', '#000000');
      whichside = false;
    });
    $(document).ready(function() { 
    });

    </script>

  </body>
  </html>
