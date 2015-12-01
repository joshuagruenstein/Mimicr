var backendURL = "http://localhost:3000/"

function createThread(input) {
	var result = $.ajax({
		url: backendURL, 
		async: false,
		method: "GET",
		data: {input: input}
    });
}

function sampleThread(index) {
	var result = $.ajax({
		url: backendURL, 
		async: false,
		method: "GET",
		data: {samplingIndex: index}
    });

    return result.responseText
}

function endThread(index) {
	var result = $.ajax({
		url: backendURL, 
		async: false,
		method: "GET",
		data: {endingIndex: index}
    });
}

$(document).ready(function() {
	var outdiv = $("#outdiv")
	var indiv = $("#indiv")
	console.log("start")

	$('#begin').click(function() {
		var errorBox = $("#errorbox")
		var sample = $("#sample").val()
		if (sample.length >= 10) {
			errorBox.css("display", "none")
			var index = createThread(sample)

			if ($('#cookiecheck').attr("checked")) {
				Cookies.set('mimicr',index,{ expires: 2 })
			} else gIndex = index;

			outdiv.css("display", "block")
			indiv.css("display", "none")
		} else errorBox.css("display", "block")
	})

	$('#stop').click(function() {
		endThread(Cookies.get('mimicr'))
		Cookies.remove('mimicr')

		outdiv.css("display", "none")
		indiv.css("display", "block")
	})

	window.onbeforeunload = function(e) {
		if (outdiv.css("display") === "block") {
			if (! Cookies.get('mimicr')) {
				endThread(gIndex)
			}
		} 
	}

	if (! Cookies.get('mimicr')) {
		outdiv.css("display", "none")
		indiv.css("display", "block")
	} else {
		outdiv.css("display", "block")
		indiv.css("display", "none")
	}
})