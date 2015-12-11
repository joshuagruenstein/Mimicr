<?php
	if(isset($_GET['samplingIndex'])) {
		echo file_get_contents("http://192.241.160.197:3000/?samplingIndex=".$_GET['samplingIndex']);
	} else if(isset($_GET['input'])) {
		echo file_get_contents("http://192.241.160.197:3000/?input".$_GET['input']);
	}

?>