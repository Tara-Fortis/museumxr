const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = async function () {
    const scene = new BABYLON.Scene(engine);

    /*--  CAMERA --*/
    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);

    /*--  LIGHTING --*/
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    /*--  GROUND --*/
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);

    /*--  ROOM  --*/
    const room = BABYLON.MeshBuilder.CreateBox("room", { width: 20, height: 20, depth: 20 }, scene);
    

    /*--  MESHES --*/
    // add four boxes to represent the museum exhibits
    // exhibit 1
    const box1 = BABYLON.MeshBuilder.CreateBox("box1", {}, scene);
    box1.position = new BABYLON.Vector3(-2.50, 0.50, 2.00);

    // exhibit 2
    const box2 = BABYLON.MeshBuilder.CreateBox("box2", {}, scene);
    box2.position = new BABYLON.Vector3(3.00, 0.50, -3.00);

    // exhibit 3
    const box3 = BABYLON.MeshBuilder.CreateBox("box3", {}, scene);
    box3.position = new BABYLON.Vector3(3.00, 0.50, 2.00);

    // exhibit 4
    const box4 = BABYLON.MeshBuilder.CreateBox("box4", {}, scene);
    box4.position = new BABYLON.Vector3(-2.50, 0.50, -3.00);

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