const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = async function () {

    const scene = new BABYLON.Scene(engine);
    // add babylon inspector
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
    wallPaint.diffuseColor = new BABYLON.Color3(2.45, 1.99, 1.59);
    room.material = wallPaint;
    // move the room up
    room.position.y = 4.9;

    /*--  MESHES --*/
    // add three podiums under each statue
    // exhibit 1 (Crouching Aphrodite)
    const box1 = BABYLON.MeshBuilder.CreateBox("box1", {}, scene);
    box1.position = new BABYLON.Vector3(-3.50, 0.50, 3.00);

    // exhibit 2 (Zeus)
    const box2 = BABYLON.MeshBuilder.CreateBox("box2", {}, scene);
    box2.position = new BABYLON.Vector3(4.00, 0.50, -4.00);

    // exhibit 3
    const box3 = BABYLON.MeshBuilder.CreateBox("box3", {}, scene);
    box3.position = new BABYLON.Vector3(4.00, 0.50, 3.00);
    box3.scaling = new BABYLON.Vector3(2, 1, 2);

    /*-- CROUCHING APHRODITE --*/
    const aphrodite = await BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "aphrodite_crouching_british_museum.glb")
    let aphroditeMesh = aphrodite.meshes[0];
    // set Pivot Matrix to the statue's feet
    aphroditeMesh.setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0), false);
    // position
    aphroditeMesh.position = new BABYLON.Vector3(-3.50, 0.50, 3.00);
    // scale aphrodite up
    globalThis.debugNode.position = new BABYLON.Vector3();// (debugNode as BABYLON.Unknown)
    aphroditeMesh.scaling = new BABYLON.Vector3(0.10, 0.10, 0.10);
    // shadow
    /*-- BUST OF ZEUS --*/
    const zeus = await BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "colossal_marble_bust_of_zeus.glb")
    let zeusMesh = zeus.meshes[0];
    // set Pivot Matrix to the statue's feet
    zeusMesh.setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0), false);
    // position
    zeusMesh.position = new BABYLON.Vector3(4.00, 1.50, -4.00);
    // scale zeus down
    zeusMesh.scaling = new BABYLON.Vector3(1.30, 1.30, 1.30);
    // shadow

    /*-- NIKE STATUE --*/
    const nike = await BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "nike_of_samothrace.glb");
    let nikeMesh = nike.meshes[0];
    // set Pivot Matrix to the statue's feet
    nikeMesh.setPivotMatrix(BABYLON.Matrix.Translation(0, 0, 0), false);
    // position
    nikeMesh.position = new BABYLON.Vector3(4.00, 1.50, 3.00);
    // scale nike up
    nikeMesh.scaling = new BABYLON.Vector3(0.50, 0.50, 0.50);

    // shadow


    /*--  GUI --*/
    // button 1
    const plane1 = BABYLON.MeshBuilder.CreatePlane("plane1", {width: 1});
    plane1.parent = box1;
    plane1.position.z = -0.51;

    const advancedTexture1 = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane1);

    const button = BABYLON.GUI.Button.CreateSimpleButton("but", "Audio Description");
    button.width = 0.7;
    button.height = "60px";
    button.color = "white";
    button.fontSize = "50px"
    button.background = "black";
    button.cornerRadius = 40;
    button.thickness = 4;
    advancedTexture1.addControl(button);  
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