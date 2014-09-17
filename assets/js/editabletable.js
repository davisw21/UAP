//Global Variables
var courses; // This variable is a list of all the courses in the table (all the courses being taken)

/*global $, window*/
$.fn.editableTableWidget = function (options) {
	'use strict';
	return $(this).each(function () {
		var buildDefaultOptions = function () {
				var opts = $.extend({}, $.fn.editableTableWidget.defaultOptions);
				opts.editor = opts.editor.clone();
				return opts;
			},
			activeOptions = $.extend(buildDefaultOptions(), options),
			ARROW_LEFT = 37, ARROW_UP = 38, ARROW_RIGHT = 39, ARROW_DOWN = 40, ENTER = 13, ESC = 27, TAB = 9,
			element = $(this),
			editor = activeOptions.editor.css('position', 'absolute').hide().appendTo(element.parent()),
			active,
			showEditor = function (select) {
				active = element.find('td:focus');
				if (active.length) {
					editor.val(active.text())
						.removeClass('error')
						.show()
						.offset(active.offset())
						.css(active.css(activeOptions.cloneProperties))
						.width(active.width())
						.height(active.height())
						.focus();
					if (select) {
						editor.select();
					}
				}
			},
			setActiveText = function () {
				var text = editor.val(),
					evt = $.Event('change'),
					originalContent;
				if (active.text() === text || editor.hasClass('error')) {
					return true;
				}
				originalContent = active.html();
				active.text(text).trigger(evt, text);
				if (evt.result === false) {
					active.html(originalContent);
				}
			},
			movement = function (element, keycode) {
				if (keycode === ARROW_RIGHT) {
					return element.next('td');
				} else if (keycode === ARROW_LEFT) {
					return element.prev('td');
				} else if (keycode === ARROW_UP) {
					return element.parent().prev().children().eq(element.index());
				} else if (keycode === ARROW_DOWN) {
					return element.parent().next().children().eq(element.index());
				}
				return [];
			};
		editor.blur(function () {
			setActiveText();
			editor.hide();
		}).keydown(function (e) {
			if (e.which === ENTER) {
				setActiveText();
				editor.hide();
				active.focus();
				e.preventDefault();
				e.stopPropagation();
			} else if (e.which === ESC) {
				editor.val(active.text());
				e.preventDefault();
				e.stopPropagation();
				editor.hide();
				active.focus();
			} else if (e.which === TAB) {
				active.focus();
			} else if (this.selectionEnd - this.selectionStart === this.value.length) {
				var possibleMove = movement(active, e.which);
				if (possibleMove.length > 0) {
					possibleMove.focus();
					e.preventDefault();
					e.stopPropagation();
				}
			}
		})
		.on('input paste', function () {
			var evt = $.Event('validate');
			active.trigger(evt, editor.val());
			if (evt.result === false) {
				editor.addClass('error');
			} else {
				editor.removeClass('error');
			}
		});
		element.on('click keypress dblclick', showEditor)
		.css('cursor', 'pointer')
		.keydown(function (e) {
			var prevent = true,
				possibleMove = movement($(e.target), e.which);
			if (possibleMove.length > 0) {
				possibleMove.focus();
			} else if (e.which === ENTER) {
				showEditor(false);
			} else if (e.which === 17 || e.which === 91 || e.which === 93) {
				showEditor(true);
				prevent = false;
			} else {
				prevent = false;
			}
			if (prevent) {
				e.stopPropagation();
				e.preventDefault();
			}
		});

		element.find('td').prop('tabindex', 1);

		$(window).on('resize', function () {
			if (editor.is(':visible')) {
				editor.offset(active.offset())
				.width(active.width())
				.height(active.height());
			}
		});
	});

};

$.fn.takenCourses = function () {
	'use strict';
	var element = $(this),
		dataRows = element.find('tbody tr'),
		calculate = function () {
			var column;
			courses = [];
			for (column = 0; column < 15; column++) {
				dataRows.each(function () {
					var row = $(this);
					courses[courses.length] = row.children().eq(column).text().toUpperCase();
				});
			};	
		};
	element.find('td').on('change', function (evt) {
		var cell = $(this), column = cell.index(); var row = cell.closest('tr');
		courses[7*column + row.index()] = row.children().eq(column).text().toUpperCase();

		displayCourse(cell.text().toUpperCase(), !whichside, 1);
		ColorRequirements(0);
		ColorRequirements(1);
		ColorRequirements(2);
		ColorRequirements(3);
		ColorRequirements(4);
	}).on('validate', function (evt, value) {
		var cell = $(this),
			column = cell.index();
			return value;
	});
	element.find('td').on('click', function (evt) {
		var cell = $(this);
		displayCourse(cell.text().toUpperCase(), !whichside, 0);
	});
	calculate();
	return this;
};

$.fn.editableTableWidget.defaultOptions = {
	cloneProperties: ['padding', 'padding-top', 'padding-bottom', 'padding-left', 'padding-right',
					  'text-align', 'font', 'font-size', 'font-family', 'font-weight',
					  'border', 'border-top', 'border-bottom', 'border-left', 'border-right'],
	editor: $('<input>')
};

function loadTableHeader(year) {
	var year = parseInt(year);
	var content;
	for (var i = 1; i <= 15; i++) {
		yr = year + Math.floor((i+1)/3);
		if (i % 3 == 1) {
			content += '<th>' + 'F' + yr.toString() + '</th>'
		} else if (i % 3 == 2) {
			content += '<th>' + 'W' + yr.toString() + '</th>'
		} else {
			content += '<th>' + 'S' + yr.toString() + '</th>'
		}
	}
	$('#mainTable thead tr').html(content);
}

function loadTableScheme(scheme) {
	$.ajax({
		type: "POST",
		data: "id="+scheme,
		datatype: "json",
		url: "assets/php/load_table.php",
		success: function(data) {
			var data = JSON.parse(data);
			var content;
			for (var i = 0; i < 7; i++) {
				content += '<tr>';
				for (var j = 0; j < 15; j ++) {
					content += '<td>' + data[i*15+j] + '</td>'
				}
				content += '</tr>'
			}
			$('#mainTable tbody').html(content);
			$('#mainTable').editableTableWidget().takenCourses().find('td:first').focus();
			$('#mainTable').editableTableWidget(); 
			ColorRequirements(0);
			ColorRequirements(1);
			ColorRequirements(2);
			ColorRequirements(3);
			ColorRequirements(4);
		}
	});
}