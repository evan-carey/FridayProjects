var Renderer = (function () {
    function Renderer(width, height) {
        var _this = this;
        this.width = width;
        this.height = height;
        this.frame = 0;
        this.onWindowResize = function () {
            _this.windowHalfX = window.innerWidth / 2;
            _this.windowHalfY = window.innerHeight / 2;
            _this.camera.aspect = window.innerWidth / window.innerHeight;
            _this.camera.updateProjectionMatrix();
            _this.renderer.setSize(window.innerWidth, window.innerHeight);
        };
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x000000, 1);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.body.appendChild(this.renderer.domElement);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
        this.camera.position.set(0, 3, 5);
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        var pLight = new THREE.PointLight(0xffffff, .7);
        pLight.position.set(3, 10, 3);
        this.scene.add(pLight);
        var aLight = new THREE.AmbientLight(0xffffff, 0.1);
        this.scene.add(aLight);
        var planeGeometry = new THREE.PlaneGeometry(10, 10);
        var planeMaterial = new THREE.MeshPhongMaterial({ color: 0x444444, specular: 0x888888, shininess: 20 });
        this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
        this.plane.rotation.x = -Math.PI / 2;
        this.scene.add(this.plane);
        var geometry = new THREE.BoxGeometry(2, 2, 2);
        var material = new THREE.MeshPhongMaterial({
            color: 0x00ff00,
            specular: 0x00ff00,
            shininess: 56
        });
        this.cube = new THREE.Mesh(geometry, material);
        this.cube.translateY(1);
        this.scene.add(this.cube);
        window.addEventListener("resize", this.onWindowResize, false);
        document.addEventListener("mousemove", this.onMouseMove, false);
    }
    Renderer.prototype.onMouseMove = function (event) {
        var mouseX = (event.clientX - this.windowHalfX);
        var mouseY = (event.clientY - this.windowHalfY);
    };
    Renderer.prototype.update = function () {
        var time = Date.now() * 0.001;
        this.frame += 0.01;
        this.cube.rotateY(0.01);
    };
    Renderer.prototype.render = function () {
        var _this = this;
        this.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(function () { return _this.render(); });
    };
    return Renderer;
}());
window.onload = function () {
    new Renderer(window.innerWidth, window.innerHeight).render();
};
//# sourceMappingURL=index.js.map