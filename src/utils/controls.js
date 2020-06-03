import { OrbitControls, MapControls } from "three/examples/jsm/controls/OrbitControls";
import { Vector3 } from "three";

/*
 Custom controls class to manipulate the camera and control the boat
*/
export default class FollowControls {

    keys = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };

    constructor(target, camera, domElement) {
        // super(camera, domElement);
        // this.enableRotate = false;
        // this.enableZoom = false;
        // this.enableKeys = false;


        this.target = target;
        this.camera = camera;
        this.domElement = domElement;
        this.cameraOffset = new Vector3(10,20,10);

        // control parameters
        this.params = {
            speed: 1.0,
            rotateSpeed: 1.0,
            boostSpeed: 2.0
        }

        this.actions = {
            up: false,
            down: false,
            left: false,
            right: false,
            stop: false,
            turbo: false
        }

        this.initMapControls();
        this.initKeyboard();
        
    }

    initKeyboard() {
        this.keyboard = {}
        this.keyboard.handleKeyDown = ( event ) => {
            switch (event.key) {
                case "w":
                    // move forward
                    this.actions.up = true;
                    this.target.translateZ(this.params.speed);
                    break;
                case "s":
                    // move backward
                    this.actions.down = true;
                    this.target.translateZ(-this.params.speed);
                    break;
                case "a":
                    // move left
                    this.actions.left = true;
                    this.target.rotateY(Math.PI / 60);
                    break;
                case "d":
                    // move right
                    this.actions.right = true;
                    this.target.rotateY(-Math.PI / 60);
                    break;
                default:
                    // do nothing
                    console.log(event.key)
            }
            if (this.target) {
                this.target.getWorldPosition(this.oc.target);
                let newPos = new Vector3();
                newPos.add(this.target.position)
                newPos.add(this.cameraOffset);
                this.camera.position.set(newPos.x, newPos.y, newPos.z);
            }
            // this.update();
        }

        this.keyboard.handleKeyUp = ( event ) => {
            switch (event.key) {
                case "w":
                    // move forward
                    this.actions.up = false;
                    break;
                case "s":
                    // move backward
                    this.actions.down = false;
                    break;
                case "a":
                    // move left
                    this.actions.left = false;
                    break;
                case "d":
                    this.update();
                    // move right
                    this.actions.right = false;
                    break;
                default:
                    // do nothing
            }
        }
        // console.log("initControls");
        this.domElement.addEventListener("keydown", this.keyboard.handleKeyDown);
        this.domElement.addEventListener('keyUp', this.keyboard.handleKeyUp);
    }

    initMapControls() {
        this.oc = new MapControls(this.camera, this.domElement);
        this.oc.enableRotate = false;
        this.oc.enableZoom = false;
        this.oc.enableDamping = true;
    }

    update() {
        this.oc.update()
    }
}