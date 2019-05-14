var camera, controls, scene, renderer, group;

init();
animate();

function init(){	
	//world
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x3b6d42 );

	//camera
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100000 );
	camera.position.z = 500;
	controls = new THREE.OrbitControls( camera );

	//background?
	var loader = new THREE.TextureLoader();
	loader.load('https://raw.githubusercontent.com/anisa-matthews/crystal-garden/master/forest-pan.jpeg', function( texture ) {
	    var boxGeometry = new THREE.BoxGeometry( 10000, 10000, 10000 )
	    var boxMaterial = new THREE.MeshBasicMaterial({
	          map: texture,
	          side: THREE.DoubleSide
	    })
		boxGeometry.scale( -1, 1, 1 );
		var mesh = new THREE.Mesh( boxGeometry, boxMaterial );
		scene.add( mesh );
		mesh.position.set( 0, 0, 0 )
	})

	//shapes!!
	group = new THREE.Group();
	for (var i = 0; i< 1000; i++){
		var geometry = new THREE.OctahedronGeometry(Math.random()*50, 0);
		var material = new THREE.MeshToonMaterial( { color: Math.random() * 0xffffff, shininess: 80 } );
		var octa = new THREE.Mesh( geometry, material );

		octa.position.x = ( Math.random() - 0.5 ) * 8000;
		octa.position.y = ( Math.random() - 0.5 ) * 8000;
		octa.position.z = ( Math.random() - 0.5 ) * 8000;

		octa.rotation.x = Math.random() * 2 * Math.PI;
		octa.rotation.y = Math.random() * 2 * Math.PI;
		octa.rotation.z = Math.random() * 2 * Math.PI;

		octa.scale.x = Math.random() + 1.0;
		octa.scale.y = Math.random() + 1.0;
		octa.scale.z = Math.random() + 1.0;

		octa.updateMatrix();
		group.add(octa);
	}
	scene.add( group );

	//lights
	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 1, 1, 1 );
	scene.add( light );


	//renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
}

//animate (update and render)

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	group.children.forEach(e => {
		//console.log('rotate');
		e.rotation.x += 0.01;
		e.rotation.y += 0.01;
	});
	// renderer.render(backgroundScene , backgroundCamera );
	renderer.render( scene, camera );
}
animate();