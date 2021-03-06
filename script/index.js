var holder = document.getElementById('holder'),
tests = {
	filereader: typeof FileReader != 'undefined',
	dnd: 'draggable' in document.createElement('span'),
}, 
acceptedTypes = {
	'text/plain': true
},
fileupload = document.getElementById('upload');

function previewfile(file) {
	if (tests.filereader === true && acceptedTypes[file.type] === true) {
		var reader = new FileReader();
		reader.onload = function (event) {
			holder.innerHTML = '<p id="innerLiner">' + file.name + ' (' + (file.size ? (file.size/1024|0) + 'K' : '') +')</p>';
		};
		reader.readAsDataURL(file);
	}  else {
		holder.innerHTML = '<p id="innerLiner">File unsupported</p>';
	}
}

if (tests.dnd) { 
	holder.ondragover = function () { this.className = 'hover'; return false; };
	holder.ondragend = function () { this.className = ''; return false; };
	holder.ondrop = function (e) {
		this.className = '';
		e.preventDefault();
		previewfile(e.dataTransfer.files[0]);
		readfiles(e.dataTransfer.files[0]);
	}
} else {
	fileupload.className = 'hidden';
	fileupload.querySelector('input').onchange = function () {
		previewfile(this.files[0])
		readfiles(this.files[0]);
	};
}

var fileContents = null;
function readfiles(file) {
	var fr = new FileReader();
	fr.onload = function() {
		fileContents = fr.result;
	};
	fr.readAsText(file);
}

$(document).ready(function() {	
	var outdiv = $("#outdiv")
	var indiv = $("#indiv")

	$('#begin').click(function() {
		var errorBox = $("#errorbox")
		var sample = fileContents

		if (!sample) {
			errorBox.text("must upload input file")
			errorBox.css("display", "block")
		} else if (sample.length >= 500 && sample.length <= 5000000) {
			errorBox.css("display", "none")
			indiv.css("display", "none")

			$('#outbox').text('Loading...');
			beginRNN(sample)

			outdiv.css("display", "block")
			indiv.css("display", "none")
		} else {
			errorBox.text("input must be 500-5000000 chars")
			errorBox.css("display", "block")
		}
	})

	$('#stop').click(function() {
		stopRNN()
		window.location.href="#output"
	})

	$('#resume').click(function() {
		resumeRNN()
		window.location.href="#close"
	})

	$('#quit').click(function() {
		outdiv.css("display", "none")
		indiv.css("display", "block")
		window.location.href="#close"
	})

	outdiv.css("display", "none")
	indiv.css("display", "block")
})