const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = async function () {

    const scene = new BABYLON.Scene(engine);
    scene.debugLayer.show();
    /*--  CAMERA --*/
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 10, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);

    /*--  LIGHTING --*/
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    /*--  GROUND --*/
    // create ground and add a wooden texture
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);
    // add wooden floor texture
    const woodFloor = new BABYLON.StandardMaterial("woodFloor");
    woodFloor.diffuseTexture = new BABYLON.Texture("./textures/albedo.png");
    // remove shine
    woodFloor.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.material = woodFloor;

    /*--  ROOM  --*/
    // create a room and add interior color
    const room = BABYLON.MeshBuilder.CreateBox("room", { width: 20, height: 10.1, depth: 20, sideOrientation: BABYLON.Mesh.BACKSIDE }, scene);
    // add color to the room mesh
    const wallPaint = new BABYLON.StandardMaterial("wallPaint");
    wallPaint.diffuseColor = new BABYLON.Color3(0.96, 0.78, 0.62);
    room.material = wallPaint;
    // move the room up
    room.position.y = 4.9;

    /*--  PODIUMS (mesh boxes) --*/
    // podium 1 (Crouching Aphrodite)
    const box1 = BABYLON.MeshBuilder.CreateBox("box1", {}, scene);
    box1.position = new BABYLON.Vector3(-3.50, 0.50, 3.00);
    

    // podium 2 (Zeus)
    const box2 = BABYLON.MeshBuilder.CreateBox("box2", {}, scene);
    box2.position = new BABYLON.Vector3(4.00, 0.50, -4.00);

    // podium 3
    const box3 = BABYLON.MeshBuilder.CreateBox("box3", {}, scene);
    box3.position = new BABYLON.Vector3(4.00, 0.50, 3.00);
    box3.scaling = new BABYLON.Vector3(2, 1, 2);

    /*-- CROUCHING APHRODITE --*/
    const aphrodite = await BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "aphrodite_crouching_british_museum.glb")
    let aphroditeMesh = aphrodite.meshes[0];
    console.log(aphroditeMesh);
    // position
    aphroditeMesh.position = new BABYLON.Vector3(-3.50, 1.00, 3.00);
    // scale aphrodite up
    aphroditeMesh.scaling = new BABYLON.Vector3(1.50, 1.50, 1.50);
    // shadow

    /*-- BUST OF ZEUS --*/
    const zeus = await BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "colossal_marble_bust_of_zeus.glb")
    let zeusMesh = zeus.meshes[0];
    // position
    zeusMesh.position = new BABYLON.Vector3(4.00, 1.00, -4.00);
    // scale zeus down
    zeusMesh.scaling = new BABYLON.Vector3(0.15, 0.15, 0.15);
    // shadow

    /*-- NIKE STATUE --*/
    const nike = await BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "nike_of_samothrace.glb");
    let nikeMesh = nike.meshes[0];
    // position
    nikeMesh.position = new BABYLON.Vector3(4.00, 1.00, 3.00);

    // shadow


    /*--  GUI --*/
    // button 1
    const plane1 = BABYLON.MeshBuilder.CreatePlane("plane1", {width: 1});
    plane1.parent = box1;
    plane1.position.z = -0.51;

    const advancedTexture1 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane1);

    const button1 = BABYLON.GUI.Button.CreateSimpleButton("buttton1", "Audio Description");
    button1.width = 0.7;
    button1.height = "60px";
    button1.color = "white";
    button1.fontSize = "50px"
    button1.background = "black";
    button1.cornerRadius = 40;
    button1.thickness = 4;
    advancedTexture1.addControl(button1);
    return scene;
};
createScene().then((scene) => {
    engine.runRenderLoop(function () {
        scene.render();
    });
    window.addEventListener("resize", function () {
        engine.resize();
    });
});