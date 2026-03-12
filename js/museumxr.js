const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = async function () {
    const scene = new BABYLON.Scene(engine);

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
    // add four boxes to represent the museum exhibits
    // exhibit 1
    const box1 = BABYLON.MeshBuilder.CreateBox("box1", {}, scene);
    box1.position = new BABYLON.Vector3(-3.50, 0.50, 3.00);

    // exhibit 2
    const box2 = BABYLON.MeshBuilder.CreateBox("box2", {}, scene);
    box2.position = new BABYLON.Vector3(4.00, 0.50, -4.00);

    // exhibit 3
    const box3 = BABYLON.MeshBuilder.CreateBox("box3", {}, scene);
    box3.position = new BABYLON.Vector3(4.00, 0.50, 3.00);
    
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