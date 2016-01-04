<?php
	if(isset($_GET['samplingIndex'])) {
		echo file_get_contents("http://localhost:3000/?samplingIndex=".$_GET['samplingIndex']);
	} else if(isset($_GET['endingIndex'])) {
		echo file_get_contents("http://localhost:3000/?endingIndex=".$_GET['endingIndex']);
	} else if(isset($_POST['input'])) {
		$url = 'http://localhost:3000';
		$data = array('input' => $_POST['input']);

		// use key 'http' even if you send the request to https://...
		$options = array(
		    'http' => array(
		        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
		        'method'  => 'POST',
		        'content' => http_build_query($data),
		    ),
		);

		$context  = stream_context_create($options);
		echo file_get_contents($url, false, $context);
	}

?>