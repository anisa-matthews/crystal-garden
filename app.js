var camera, controls, scene, renderer, group;

init();
animate();

function init(){	
	//world
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x3b6d42 );

	//camera
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 10000 );
	camera.position.z = 500;
	controls = new THREE.OrbitControls( camera );

	//shapes!!
	group = new THREE.Group();
	for (var i = 0; i< 100; i++){
		var geometry = new THREE.OctahedronGeometry(Math.random()*50, 0);
		var material = new THREE.MeshToonMaterial( { color: Math.random() * 0xffffff, shininess: 80 } );
		var octa = new THREE.Mesh( geometry, material );

		octa.position.x = ( Math.random() - 0.5 ) * 1000;
		octa.position.y = ( Math.random() - 0.5 ) * 1000;
		octa.position.z = ( Math.random() - 0.5 ) * 1000;

		octa.rotation.x = Math.random() * 2 * Math.PI;
		octa.rotation.y = Math.random() * 2 * Math.PI;
		octa.rotation.z = Math.random() * 2 * Math.PI;

		octa.updateMatrix();
		group.add(octa);
	}
	scene.add( group );

	//lights
	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 1, 1, 1 );
	scene.add( light );
	// var light = new THREE.DirectionalLight( 0x002288 );
	// light.position.set( - 1, - 1, - 1 );
	// scene.add( light );
	// var light = new THREE.AmbientLight( 0x222222 );
	// scene.add( light );


	//renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	// // Load the background texture
 //    var texture = THREE.ImageUtils.loadTexture( 'green2.jpg' );
 //    var backgroundMesh = new THREE.Mesh(
 //        new THREE.PlaneGeometry(2, 2, 0),
 //        new THREE.MeshBasicMaterial({
 //            map: texture
 //        })
 //     );

 //    backgroundMesh.material.depthTest = false;
 //    backgroundMesh.material.depthWrite = false;

 //    // Create your background scene
 //    var backgroundScene = new THREE.Scene();
 //    var backgroundCamera = new THREE.Camera();
 //    backgroundScene .add(backgroundCamera);
 //    backgroundScene .add(backgroundMesh);
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