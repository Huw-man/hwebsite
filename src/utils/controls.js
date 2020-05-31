/*
    Custom controls class to manipulate the camera and control the boat
*/
export default class FollowControls {

    keys = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40 };

    constructor(target, camera, domElement) {
        this.target = target;
        this.camera = camera;
        this.domElement = domElement;

        this.speed = 1.0;
        this.boostSpeed = 2.0;

        this.actions = {
            up: false,
            down: false,
            left: false,
            right: false,
            stop: false,
            turbo: false
        }
        this.initKeyboard();
    }

    initKeyboard() {
        this.keyboard = {}
        this.keyboard.handleKeyDown = ( event ) => {
            switch (event.key) {
                case "w":
                    // move forward
                    this.actions.up = true;
                    break;
                case "s":
                    // move backward
                    this.actions.down = true;
                    break;
                case "a":
                    // move left
                    this.actions.left = true;
                    break;
                case "d":
                    // move right
                    this.actions.right = true;
                    break;
                default:
                    // do nothing
                    console.log(event.key)
            }
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
}