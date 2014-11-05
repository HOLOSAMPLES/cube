 var windowWidth = window.innerWidth, windowHeight = window.innerHeight;
 var camera,renderer,scene;
 Init();


 animate();

function readSTLs(filename) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200 || xhr.status == 0) {
                        var rep = xhr.response; // || xhr.mozResponseArrayBuffer;
                        mesh1 = parseStlBinary(rep);
                        mesh1.scale.set(sizeMesh1, sizeMesh1, sizeMesh1);
                        mesh1.rotation.x = Math.PI / 8 * -1;
                        mesh1.position.z = 4;
                        scene.add(mesh1);

                        newMeshReady = true;
                    }
                }
            };
            xhr.onerror = function (e) {
                console.log(e);
            };
            xhr.open("GET", filename, true);
            xhr.responseType = "arraybuffer";
            xhr.send(null);
        }
function LEIA_setBackgroundPlane(filename, aspect){
	var LEIA_backgroundPlaneTexture = new THREE.ImageUtils.loadTexture( filename );
	LEIA_backgroundPlaneTexture.wrapS = LEIA_backgroundPlaneTexture.wrapT = THREE.RepeatWrapping; 
	LEIA_backgroundPlaneTexture.repeat.set( 1, 1 );
	var LEIA_backgroundPlaneMaterial = new THREE.MeshLambertMaterial( { map: LEIA_backgroundPlaneTexture, side: THREE.DoubleSide } );
	var LEIA_backgroundPlaneGeometry;
	if (aspect == undefined) {
		LEIA_backgroundPlaneGeometry = new THREE.PlaneGeometry(40, 30, 10, 10);
	} else {
		LEIA_backgroundPlaneGeometry = new THREE.PlaneGeometry(30*aspect, 30, 10, 10);
	}
	LEIA_backgroundPlane = new THREE.Mesh(LEIA_backgroundPlaneGeometry, LEIA_backgroundPlaneMaterial);
	LEIA_backgroundPlane.position.z = -6;
	scene.add(LEIA_backgroundPlane);
}

function LEIA_setCenterPlane(filename, aspect){
	var LEIA_centerPlaneTexture = new THREE.ImageUtils.loadTexture( filename );
	LEIA_centerPlaneTexture.wrapS = LEIA_centerPlaneTexture.wrapT = THREE.RepeatWrapping; 
	LEIA_centerPlaneTexture.repeat.set( 1, 1 );
	var LEIA_centerPlaneMaterial = new THREE.MeshPhongMaterial( { map: LEIA_centerPlaneTexture, transparent:true, side: THREE.DoubleSide } );
	var LEIA_centerPlaneGeometry;
	if (aspect == undefined) {
		LEIA_centerPlaneGeometry = new THREE.PlaneGeometry(40, 30, 10, 10);
	} else {
		LEIA_centerPlaneGeometry = new THREE.PlaneGeometry(10*aspect, 30, 10, 10);
	}
	LEIA_centerPlane = new THREE.Mesh(LEIA_centerPlaneGeometry, LEIA_centerPlaneMaterial);
	LEIA_centerPlane.position.x = 0;
	LEIA_centerPlane.position.y = 0;
	LEIA_centerPlane.position.z = 0;
	scene.add(LEIA_centerPlane);
}
function Init(){
        scene = new THREE.Scene();
  
       //setup camera
 		camera = new LeiaCamera();
        camera.position.copy(_camPosition);
        camera.lookAt(_tarPosition);
        scene.add(camera);
  
       //setup rendering parameter
 		renderer = new LeiaWebGLRenderer({
         antialias:true, 
 		renderMode: _renderMode, 
		shaderMode: _nShaderMode,
		devicePixelRatio: 1 
        } );
 		renderer.Leia_setSize( windowWidth, windowHeight );
 		document.body.appendChild( renderer.domElement );
  
       //add object to Scene
   LEIA_setBackgroundPlane('resource/vanishingpt5.png');
   LEIA_setCenterPlane('resource/oval2.png');
   readSTLs('resource/cubes.stl');
    //  var graph = new THREE.Mesh(new THREE.SphereGeometry(8, 30, 10), new THREE.MeshLambertMaterial({color:0xffffff}));
	//  scene.add(graph);
  
        //add Light
 		var xl = new THREE.DirectionalLight( 0x555555 );
 		xl.position.set( 1, 0, 2 );
 		scene.add( xl );
 		var pl = new THREE.PointLight(0x111111);
 		pl.position.set(-20, 10, 20);
 		scene.add(pl);
 		var ambientLight = new THREE.AmbientLight(0x111111);	
 		scene.add(ambientLight);
 }

 function animate() 
 {
 	requestAnimationFrame( animate );
  
    renderer.setClearColor(new THREE.Color().setRGB(1.0, 1.0, 1.0)); 
	renderer.Leia_render(scene, camera,undefined,undefined,_holoScreenScale,_camFov,_messageFlag);
 }
