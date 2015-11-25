var outdiv = document.getElementById("outdiv")
var indiv = document.getElementById("indiv")

function createThread(input) {
	// @truell20 you can add this stuff

	return 5
}

function endThread(index) {
	// @truell20 this as well
}

document.getElementById('begin').onclick = function() {
	var errorBox = document.getElementById("errorbox")
	var sample = document.getElementById("sample").value
	if (sample.length >= 100000) {
		errorBox.style.display = "none"
		var index = createThread(sample)

		if (document.getElementById('cookiecheck').checked) {
			Cookies.set('mimicr',index,{ expires: 2 })
		} else gIndex = index;

		outdiv.style.display = "block"
		indiv.style.display = "none"
	} else errorBox.style.display = "block"
}

document.getElementById('stop').onclick = function() {
	endThread(Cookies.get('mimicr'))
	Cookies.remove('mimicr')

	outdiv.style.display = "none"
	indiv.style.display = "block"
}

window.onbeforeunload = function(e) {
	if (outdiv.style.display === "block") {
		if (! Cookies.get('mimicr')) {
			endThread(gIndex)
		}
	} 
}

if (! Cookies.get('mimicr')) {
	outdiv.style.display = "none"
	indiv.style.display = "block"
} else {
	outdiv.style.display = "block"
	indiv.style.display = "none"
}