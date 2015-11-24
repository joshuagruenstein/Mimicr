var outdiv = document.getElementById("outdiv")
var indiv = document.getElementById("indiv")

function createThread(input) {
	return 5;
}

function endThread(index) {

}

document.getElementById('begin').onclick = function() {
	var sample = document.getElementById("sample").value
	var index = createThread(sample)
	Cookies.set('mimicr',index,{ expires: 2 })

	outdiv.style.display = "block"
	indiv.style.display = "none"
};

document.getElementById('stop').onclick = function() {
	endThread(Cookies.get('mimicr'))
	Cookies.remove('mimicr')

	outdiv.style.display = "none"
	indiv.style.display = "block"
}

if (! Cookies.get('mimicr')) {
	outdiv.style.display = "none"
	indiv.style.display = "block"
} else {
	outdiv.style.display = "block"
	indiv.style.display = "none"
}