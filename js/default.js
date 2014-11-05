 var windowWidth = window.innerWidth, windowHeight = window.innerHeight;
 var camera,renderer,scene;
 Init();
 LEIA_setBackgroundPlane('resource/vanishingpt5.png');
 LEIA_setCenterPlane('resource/oval2.png');
 readSTLs('resource/cubes.stl');
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
      var graph = new THREE.Mesh(new THREE.SphereGeometry(8, 30, 10), new THREE.MeshLambertMaterial({color:0xffffff}));
	  scene.add(graph);
  
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
