$(function(){
  
    var scene, camera, renderer;
    var controls;
    var stats;
    var spotLight, cube;
	var earth;
	var moon;
	var venus;
	var mars;
	var box1;
    var SCREEN_WIDTH, SCREEN_HEIGHT;
	var t=0;

    function init(){
      
        scene = new THREE.Scene();
        camera =  new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 15000);
        renderer = new THREE.WebGLRenderer({antialias:true});
		

        renderer.setClearColor(0x000000);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMapSoft = true;

        /*управление камерой*/
        controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.addEventListener( 'change', render );

       
        /*Положение камеры*/
        camera.position.x = 150;
        camera.position.y = 120;
        camera.position.z = 700;
        camera.lookAt(scene.position);
		//
		var starsGeometry = new THREE.Geometry();
		var starsMaterial = new THREE.ParticleBasicMaterial({color:0xe6e6fa,sice:3,
		sizeAttenuation:true});
		var stars;
		for (var i=0;i<200;i++){
			var vertex = new THREE.Vector3();
			vertex.x = Math.random()*2-1;
			vertex.y = Math.random()*2-1;
			vertex.z = Math.random()*2-1;
			vertex.multiplyScalar(200);
	
			starsGeometry.vertices.push(vertex);
		}
		stars = new THREE.ParticleSystem(starsGeometry,starsMaterial);
		stars.scale.set(30,30,30);
		scene.add(stars);

        /*Солнце*/		
        var Box_material = new THREE.MeshBasicMaterial( {wireframe: true,
            
        } );
		
        var Box_geometry = new THREE.SphereGeometry( 80, 40, 40 );
		var load = new THREE.TextureLoader().load('suncyl1.jpg');
        load.anisotropy = 8;
        var Box_material = new THREE.MeshBasicMaterial({
            map: load,
            overdraw: true
        });
        cube = new THREE.Mesh( Box_geometry, Box_material );
        cube.position.set( 0, 1.6, 0 );
        scene.add( cube );
		
	//Земля
		var  earth_material = new THREE.MeshPhongMaterial( {wireframe: true,
        } );
        var  earth_geometry = new THREE.SphereGeometry( 20, 20, 20 );
		var load = new THREE.TextureLoader().load('texture_earth (2).jpg');
       load.anisotropy = 8;
        var earth_material = new THREE.MeshBasicMaterial({
            map: load,
          overdraw: true
        });
		
         earth = new THREE.Mesh(  earth_geometry,  earth_material );
		
         earth.position.x = 400;
       
        scene.add(earth);
		
		// Венера
		var  venus_material = new THREE.MeshPhongMaterial( {wireframe: true,
          
        } );
		
        var  venus_geometry = new THREE.SphereGeometry( 20, 15, 15 );
		var load = new THREE.TextureLoader().load('venus_texture.jpg');
        load.anisotropy = 8;
        var venus_material = new THREE.MeshBasicMaterial({
            map: load,
            overdraw: true
        });
		
         venus = new THREE.Mesh(  venus_geometry,  venus_material );
		
         venus.position.x = 250;
        
        scene.add(venus);
		
		// Меркурий
		var  moon_material = new THREE.MeshPhongMaterial( {wireframe: true,
            
        } );
		
        var  moon_geometry = new THREE.SphereGeometry( 20, 15, 15 );
		var load = new THREE.TextureLoader().load('Mercury_Map.jpg');
        load.anisotropy = 8;
        var moon_material = new THREE.MeshBasicMaterial({
            map: load,
            overdraw: true
        });
         moon = new THREE.Mesh(  moon_geometry,  moon_material );
         moon.position.x = 150;
        scene.add(moon);
		
		var  mars_geometry = new THREE.SphereGeometry( 20, 15, 15 );
		var load = new THREE.TextureLoader().load('2k_mars.jpg');
        load.anisotropy = 8;
        var mars_material = new THREE.MeshBasicMaterial({
		 map: load,
            overdraw: true
        });
       
         mars = new THREE.Mesh(  mars_geometry,  mars_material );
         mars.position.x = 500;
        scene.add(mars);
		
        $("#webGL-container").append(renderer.domElement);

    }

    function render() {}

    function animate(){
        requestAnimationFrame(animate);
		cube.rotation.y+=0.004;
		earth.rotation.y+= 0.04;
		moon.rotation.y+=0.04;
		venus.rotation.y+=0.04;
		mars.rotation.y+=0.04;
		
		mars.position.x = 550* Math.sin(t*0.04);
		mars.position.z = 550* Math.cos(t*0.04);
		moon.position.x = 150* Math.sin(t*0.12);
		moon.position.z = 150* Math.cos(t*0.12);
		earth.position.x = 450* Math.sin(t*0.09);
		earth.position.z = 440* Math.cos(t*0.09);
		venus.position.x = 250* Math.sin(t*0.1);
		venus.position.z = 250* Math.cos(t*0.1);
		t+=Math.PI/180*2;
        render();

        renderer.render(scene, camera);
    }

    init();
    animate();

    $(window).resize(function(){
        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;
        camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        camera.updateProjectionMatrix();
        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
    });

});	
