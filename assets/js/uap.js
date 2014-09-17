//Global Variables
var whichside = true; //determines which side to display course informaton (true = left; false = right)

function fetchAchievement() {
	$.ajax({
		type: "POST",
		url: "assets/php/fetch_achievement.php",
		datatype: "json",
		success: function(data) {
			GenerateAchievements(JSON.parse(data));
		}
	});
}

function GenerateAchievements(data) {
	var box = $('#showAchievement');
	box.html("");
	for (var i = 0; i < data.length; i ++) {
		pass = 1;
		curbool = data[i][1];
		for (var j = 0; j < curbool.length; j++) {
			if (!eval(curbool[j])) {
				pass = 0;
			}
		}
		if (pass == 1) {
			if (data[i][2] == 0) {
				box.append(data[i][0] + " Degree" + " with a: ");
			} else if (data[i][2] == 1) {
				box.append(data[i][0] + " Major" + "; ");
			} else if (data[i][2] == 2) {
				box.append(data[i][0] + " Minor" + "; ");
			} else if (data[i][2] == 3) {
				box.append(data[i][0] + " Concentration" + "; ");
			} else if (data[i][2] == 4) {
				box.append(data[i][0] + " Designation" + "; ");
			} else {
				box.append(data[i][0] + ".");
			}
		}
	}
}

function displayCourse(id, w, isnew) {
	$.ajax({
		type: "POST",
		url: "assets/php/display_course.php",
		data: "id="+id,
		datatype: "json",
		success: function(data) {
			info = JSON.parse(data);
			if (data == 0 && id != "" && isnew == 1) {
				alert("Warning! "+id+" is not a valid course.");
			} else if (data != 0) {
				if (w == true) {
					var box = $('#showDescLeft');
				} else {
					var box = $('#showDescRight');
				}
				box.html("");
				box.append(info[0] + ": " + info[10] + "<br>");
				box.append("Type: " + info[9] + "<br>");
				box.append("Campus: " + info[1] + "<br>");
				box.append("Offered: Fall(" + info[2] + ") Winter(" + info[3] + ") Spring(" + info[4] + ")" + "<br>");
				box.append("<br>Description: <br>" + info[11] + "<br>");
				box.append("Pre-Requisites: " + info[5] + "<br>");
				box.append("Co-Requisites: " + info[6] + "<br>");
				box.append("Anti-Requisites: " + info[7] + "<br>");
				box.append("Cross-listed as: " + info[8] + "<br>");
				return info;
			}
		}
	});
}

function fetchCourse(id) {
	$.ajax({
		type: "POST",
		url: "assets/php/fetch_course.php",
		data: "id="+id,
		datatype: "json",
		success: function(data) {
			GenerateCourses(JSON.parse(data));
		}
	});
}

function GenerateCourses(data) {
	var box = $('#showDirectory');
	box.html("");
	for (var i = 0; i < data.length; i++) {
		box.append('<option value="' + data[i][0] + '">' + data[i][0] + ': ' + data[i][1] + '</option>');
	}
}

function fetchReq(id, val) {
	$.ajax({
		type: "POST",
		url: "assets/php/fetch_req.php", 
		data: "id="+id,
		datatype: "json",
		success: function(data) {
			GenerateRequirements(JSON.parse(data), val);
		}
	});
}

function GenerateRequirements(data, val) {
	switch (val) {
		case 0: var box = $('#showProgram');break;
		case 1: var box = $('#showMajor');break;
		case 2: var box = $('#showMinor');break;
		case 3: var box = $('#showConcentration');break;
		case 4: var box = $('#showDesignation');break;
	}
	box.html("");
	for (var i = 0; i < data.length; i++) {
		box.append('<option title="' + data[i].desc + '" data-bool="' + data[i].bool + '" value="' + data[i].name + '">' + data[i].name + '</option>');
	}
	ColorRequirements(val);
};

function ColorRequirements(val) {
	switch (val) {
		case 0: var box = $('#showProgram > option');break;
		case 1: var box = $('#showMajor > option');break;
		case 2: var box = $('#showMinor > option');break;
		case 3: var box = $('#showConcentration > option');break;
		case 4: var box = $('#showDesignation > option');break;
	}
	for (var i = 0; i < box.length; i++) {
		if (eval(box[i].getAttribute("data-bool"))) {
			$(box[i]).removeClass("red green").addClass("green");
		} else {
			$(box[i]).removeClass("red green").addClass("red");
		}
	}
}

/*The following are helper functions for use of the booleans*/

//Return True/False if they are taking this course
function TakingThisCourse(course) {
	return(courses.indexOf(course) != -1);
}

function Count(course) {
	if (TakingThisCourse(course)) {
		return 1;
	} else {
		return 0;
	}
}

function Family(word) {
	var c = (word.slice(0,(word.length - 3)));
	//This is because some BU courses end with a letter ex, BU481R
	if (c.indexOf("BU") != -1 && c.indexOf("MAT") == -1) {
		return "BU";
	} else {
		return c; 
	}
}

function Level(word) {
	if (Family(word) == "BU") {
		return (word.slice(2,3)); //This is because some BU courses end with a letter ex, BU481R
	} else {
		return (word.slice(word.length-3, word.length-2));
	}

}

function Code(word) {
	return (word.slice(word.length-3, word.length));
}

function CountByFamily(family) {
	var c = 0; 
	for (var i = 0; i < courses.length; i ++) {
		if (Family(courses[i]) == family) {
			c += 1;
		}
	}
	return(c);
}

function CountByFamilyAndLevel(family, level) {
	var c = 0;
	for (var i = 0; i < courses.length; i ++) {
		if (Family(courses[i]) == family && Level(courses[i]) == level) {
			c += 1;
		}
	}
	return(c);
}

function CountByFamilyAndRange(family, rangelow, rangehigh) {
	var c = 0;
	for (var i = 0; i < courses.length; i ++) {
		if ((Family(courses[i]) == family) && (Code(courses[i]) <= rangehigh) && (Code(courses[i]) >= rangelow)) {
			c += 1;
		}
	}
	return(c);
}

function NumberOfMathCourses() {
	var c = 0;
	for (var i = 0; i < courses.length; i ++) {
		if (Family(courses[i]) == "ACTSC" || 
			Family(courses[i]) == "AMATH" || 
			Family(courses[i]) == "CO" || 
			Family(courses[i]) == "CM" || 
			Family(courses[i]) == "CS" ||
			Family(courses[i]) == "MATH" || 
			Family(courses[i]) == "MATHBUS" ||
			Family(courses[i]) == "MATBUS" || 
			Family(courses[i]) == "PMATH" || 
			Family(courses[i]) == "SE" ||  
			Family(courses[i]) == "STAT") {
			c += 1;
	}
}
return(c);
}

function TotalCount() {
	return courses.length; 
}