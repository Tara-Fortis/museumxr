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

    /*------------------------------------- MESH ARRAY -------------------------------------*/
    const exhibits = [
        {
            name: "Bust of Zeus",
            mesh: box2,
            sound: "audio/Bust-of-zeus.mp3"
        },
        {
            name: "Nike of Samothrace",
            mesh: box3,
            sound: "audio/Nike-of-samothrace.mp3"
        },
        {
            name: "Aphrodite",
            mesh: aphrodite.meshes[0],
            sound: "audio/Crouching-aphrodite.mp3"
        }
    ];

    for (const exhibit of exhibits) {
        const audioEngine = await BABYLON.CreateAudioEngineAsync();
        const sound = await BABYLON.CreateSoundAsync(
            exhibit.name,
            exhibit.sound
        );

        const plane = BABYLON.MeshBuilder.CreatePlane(exhibit.name + "_plane", { width: 1 });
        plane.parent = exhibit.mesh;
        plane.position.z = -0.51;

        const texture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(plane);

        const button = BABYLON.GUI.Button.CreateSimpleButton(exhibit.name + "_button", "play audio");
        button.width = 0.7;
        button.height = "90px";
        button.color = "white";
        button.background = "black";
        button.fontSize = "70px";

        texture.addControl(button);

        button.onPointerClickObservable.add(async () => {
            if (sound) {
                sound.stop();
                sound.play();
            }
        });
    }

    const xr = await scene.createDefaultXRExperienceAsync({
        uiOptions: {
            sessionMode: "immersive-ar",
            referenceSpaceType: "local" 
        },
        optionalFeatures: true
    });

    return scene;
};

createScene().then((scene) => {
    engine.runRenderLoop(() => scene.render());
    window.addEventListener("resize", () => engine.resize());
});