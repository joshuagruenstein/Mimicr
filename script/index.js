function createThread(input) {
	// @truell20 you can add this stuff

	return 5
}

function endThread(index) {
	// @truell20 this as well
}

$(document).ready(function() {
	var outdiv = $("#outdiv")
	var indiv = $("#indiv")

	$('#begin').click(function() {
		var errorBox = $("#errorbox")
		var sample = $("#sample").val()
		if (sample.length >= 100000) {
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