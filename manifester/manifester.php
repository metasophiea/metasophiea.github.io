<?php
	function gatherManifestData($address){
		$ignoredFiles = ['.','..','manifest','.DS_Store','.vscode'];
		$foundFiles = scandir($address);

		for($a = 0; $a < count($foundFiles); $a++){
			for($b = 0; $b < count($ignoredFiles); $b++){
				if($foundFiles[$a] == $ignoredFiles[$b]){
					array_splice($foundFiles,$a,1); $a--; break;
				}
			}
		}

		return $foundFiles;
	}

	function makeManifest($address,$data){
		$manifestFile = fopen($address."/manifest", "w");

		if(count($data) != 0){
			for($a = 0; $a < count($data)-1; $a++){
				if($data[$a][0] != '.'){
					$temp = '{"name":"'.$data[$a].'","type":"'.filetype($address.'/'.$data[$a]).'"}';
					fwrite($manifestFile,$temp."\n");
				}
			}
			$temp = '{"name":"'.$data[$a].'","type":"'.filetype($address.'/'.$data[$a]).'"}';
			fwrite($manifestFile,$temp);
		}
		fclose($manifestFile);
	}

	function manifestify($address){echo($address.'<br>');

		$manifest = gatherManifestData($address);
		makeManifest($address,$manifest);
	
		for($a = 0; $a < count($manifest); $a++){
			if(filetype($address.'/'.$manifest[$a]) == 'dir' && $manifest[$a][0] != '.'){
				manifestify($address.'/'.$manifest[$a]);
			}
		}
	}
?>



<!DOCTYPE html>
<html lang="en">

<head>
	<title>metasophiea</title>
	<meta charset="utf-8"></meta>
	<script>function Go(){console.log('hello');}</script>
	<style></style>
</head>

<body onLoad="Go()">
	<p><?php manifestify(getcwd()); ?></p>
</body>
</html>