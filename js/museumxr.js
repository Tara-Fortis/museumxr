const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = async function () {
    const scene = new BABYLON.Scene(engine);

    /*------------------------------------- CAMERA -------------------------------------*/
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        -Math.PI / 2,
        Math.PI / 2.5,
        10,
        new BABYLON.Vector3(0, 0, 0),
        scene
    );
    camera.attachControl(canvas, true);

    /*------------------------------------- LIGHTING -------------------------------------*/
    const light = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    light.intensity = 0.7;

    /*------------------------------------- GROUND -------------------------------------*/
    const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 20, height: 20 }, scene);
    const woodFloor = new BABYLON.StandardMaterial("woodFloor");
    woodFloor.diffuseTexture = new BABYLON.Texture("./textures/albedo.png");
    woodFloor.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.material = woodFloor;

    /*------------------------------------- ROOM -------------------------------------*/
    const room = BABYLON.MeshBuilder.CreateBox("room", { width: 20, height: 10.1, depth: 20, sideOrientation: BABYLON.Mesh.BACKSIDE }, scene);
    const wallPaint = new BABYLON.StandardMaterial("wallPaint");
    wallPaint.diffuseColor = new BABYLON.Color3(0.96, 0.78, 0.62);
    room.material = wallPaint;
    room.position.y = 4.9;

    /*------------------------------------- PODIUMS -------------------------------------*/
    const box2 = BABYLON.MeshBuilder.CreateBox("box2", {}, scene);
    box2.position = new BABYLON.Vector3(4.0, 0.5, -4.0);

    const box3 = BABYLON.MeshBuilder.CreateBox("box3", {}, scene);
    box3.position = new BABYLON.Vector3(4.0, 0.5, 3.0);
    box3.scaling = new BABYLON.Vector3(2, 1, 2);

    /*------------------------------------- MODELS -------------------------------------*/
    const aphrodite = await BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "aphrodite_crouching_british_museum.glb");
    aphrodite.meshes[0].position = new BABYLON.Vector3(-3.5, 1.0, 3.0);
    aphrodite.meshes[0].scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);

    const zeus = await BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "colossal_marble_bust_of_zeus.glb");
    zeus.meshes[0].position = new BABYLON.Vector3(4.0, 1.0, -4.0);
    zeus.meshes[0].scaling = new BABYLON.Vector3(0.15, 0.15, 0.15);

    const nike = await BABYLON.SceneLoader.ImportMeshAsync("", "./meshes/", "nike_of_samothrace.glb");
    nike.meshes[0].position = new BABYLON.Vector3(4.0, 1.0, 3.0);
    nike.meshes[0].scaling = new BABYLON.Vector3(1.5, 1.5, 1.5);

    /*------------------------------------- MESHES -------------------------------------*/
    // button 1 for The bust of Zeus
    const zeusPlane = BABYLON.MeshBuilder.CreatePlane("zeusPlane", { width: 1 });
    zeusPlane.parent = box2;
    zeusPlane.position.z = -0.51;

    const zeusTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(zeusPlane);

    const zeusButton = BABYLON.GUI.Button.CreateSimpleButton("zeusButton", "play audio");
    zeusButton.width = 0.7;
    zeusButton.height = "90px";
    zeusButton.color = "white";
    zeusButton.fontSize = "70px"
    zeusButton.background = "black";
    zeusButton.cornerRadius = 40;
    zeusButton.thickness = 4;
    zeusTexture.addControl(zeusButton);

    // Add audio to button

    const audioEngine = await BABYLON.CreateAudioEngineAsync();

    const zeusMouseClick = await BABYLON.CreateSoundAsync(
        "zeusMouseClick",
        "audio/Bust-of-zeus.mp3"
    );

    // PLAY SOUND
    zeusButton.onPointerClickObservable.add(async () => {
        if (audioEngine) {
            await audioEngine.unlockAsync();
        }
        zeusMouseClick?.play();
    });

    return scene;
};

createScene().then((scene) => {
    engine.runRenderLoop(() => scene.render());
    window.addEventListener("resize", () => engine.resize());
});