var camera, controls, scene, renderer, group;
var mouse = new THREE.Vector2();
var INTERSECTED;

init();
animate();

function init(){	
	//world
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0x3b6d42 );

	//camera
	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100000 );
	camera.position.z = 500;

	//renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	controls = new THREE.OrbitControls( camera, renderer.domElement );

	//background?
	var loader = new THREE.TextureLoader();
	loader.load('https://raw.githubusercontent.com/anisa-matthews/crystal-garden/master/forest-pan.jpeg', function( texture ) {
	    var boxGeometry = new THREE.SphereGeometry( 10000, 600, 400 )
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

		octa.scale.x = Math.random() + 1.5;
		octa.scale.y = Math.random() + 1.5;
		octa.scale.z = Math.random() + 1.0;

		octa.updateMatrix();
		group.add(octa);
	}
	scene.add( group );

	//lights
	var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 1, 1, 1 );
	scene.add( light );

	var ambient = new THREE.AmbientLight( 0xfde558 );
	scene.add( ambient );

	// when the mouse moves, call the given function
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
}

function onDocumentMouseMove( event ) 
{
	// the following line would stop any other event handler from firing
	// (such as the mouse's TrackballControls)
	// event.preventDefault();
	
	// update the mouse variable
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

//animate (update and render)

function animate() {
	requestAnimationFrame( animate );
	render();
	update();
}

function update() {

	//rotate each crystal
	group.children.forEach(e => {
		//console.log('rotate');
		e.rotation.x += 0.01;
		e.rotation.y += 0.01;
	});

	// find intersections

	// create a Ray with origin at the mouse position
	//   and direction into the scene (camera direction)
	var vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
	vector.unproject(camera);
	var ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

	// create an array containing all objects in the scene with which the ray intersects
	var intersects = ray.intersectObjects( group.children );
	
	// if there is one (or more) intersections
	if ( intersects.length > 0 )
	{
		// if the closest object intersected is not the currently stored intersection object
		if ( intersects[ 0 ].object != INTERSECTED ) 
		{
		    // restore previous intersection object (if it exists) to its original color
			if ( INTERSECTED ) 
				INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
			// store reference to closest object as current intersection object
			INTERSECTED = intersects[ 0 ].object;
			// store color of closest object (for later restoration)
			INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
			// set a new color for closest object
			INTERSECTED.material.color.setHex( 0xffff00 );
		}
	} 
	else // there are no intersections
	{
		// restore previous intersection object (if it exists) to its original color
		if ( INTERSECTED ) 
			INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
		// remove previous intersection object reference
		//     by setting current intersection object to "nothing"
		INTERSECTED = null;
	}
	
	controls.update();
}

function render() {
	renderer.render( scene, camera );
}