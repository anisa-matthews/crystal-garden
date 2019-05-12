var initScene = function(){
	var canvas = document.getElementById('canvas1');
	var gl = canvas.getContext('webgl');
	if (!gl){
		gl = canvas.getContext('experimental-webgl');
	}
	if (!gl){
		alert('Your browser does not support WebGl :(');
	}

	canvas.width = window.innerWidth -50;
	canvas.height = window.innerHeight - 50;
	gl.viewport(0, 0, window.innerWidth, window.innerHeight);

	gl.clearColor(0.75, 0.85, 0.8, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
}