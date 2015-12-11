var backendURL = "route.php"

function createThread(input, callback) {
	$.ajax({
		url: backendURL, 
		async: true,
		method: "GET",
		data: {input: input},
		success: function(result) {
			callback(result)
		}
	});
}

function sampleThread(index, callback) {
	$.ajax({
		url: backendURL, 
		async: true,
		method: "GET",
		data: {samplingIndex: index},
		success: function(result) {
			callback(result)
		}
	});
}

function endThread(index, callback) {
	$.ajax({
		url: backendURL, 
		async: true,
		method: "GET",
		data: {endingIndex: index},
		success: function(result) {
			callback(result)
		}
	});
}

$(document).ready(function() {
	var outdiv = $("#outdiv")
	var indiv = $("#indiv")
	var timer = null
	var index = -1
	console.log("start")

	$('#begin').click(function() {
		var errorBox = $("#errorbox")
		var sample = $("#sample").val()
		if (sample.length >= 10) {
			errorBox.css("display", "none")

			$("#compdiv").css("display", "inline")
			$("#outdiv").css("display", "none")
			$("#indiv").css("display", "none")	

			createThread(sample, function(result) {
				index = parseInt(result)

				timer = setTimeout(function() {
					sampleThread(index, function(result) {
						if(result !== "") {
							if($("#compdiv").css("display") === "inline") {
								$("#compdiv").css("display", "none")
								$("#outdiv").css("display", "inline")
								$("#indiv").css("display", "none")
							} $("#inneroutbox").text(result)
						}
					})
				}, 5000)
			})

			if ($('#cookiecheck').attr("checked")) {
				Cookies.set('mimicr',index,{ expires: 2 })
			} else gIndex = index;

			outdiv.css("display", "block")
			indiv.css("display", "none")
		} else errorBox.css("display", "block")
	})

	$('#stop').click(function() {
		if(timer != null) clearTimeout(timer)

		endThread(Cookies.get('mimicr'), null)
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