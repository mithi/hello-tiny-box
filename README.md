# Hello Tiny Box
Manipulate a three dimensional box. Algorithm code: [Python script](./prototype-script.py)


![](https://user-images.githubusercontent.com/1670421/90311349-9fc0f700-df2c-11ea-812e-57a395263506.png)

# High Level Pseudocode
This pseudocode is taken from [Gabriel Gambetta's Computer Graphics from Scratch online book (Scene Setup)](https://www.gabrielgambetta.com/computer-graphics-from-scratch/scene-setup.html)

What happens to a vertex V in model space until it’s projected into the canvas point (cx,cy)

We first apply the model transform, to go from model space to world space:

```
V1 = V * instance.rotation
V2 = V1 * instance.scale
V3 = V2 + instance.translation
```

Then we apply the camera transform, to go from world space to camera space:


```
V4 = V3 - camera.translation
V5 = V4 * inverse(camera.rotation)
```

Next we apply the perspective equations:
```
vx = V5.x * d / V5.z
vy = V5.y * d / V5.z
```
And we finally map the viewport coordinates to canvas coordinates:

```
cx = vx * cw / vw
cy = vy * ch / vh
```

The pseudocode below shows how we render a scene 

```
RenderModel(model, transform) {
    projected = []
    for V in model.vertexes {
        projected.append(ProjectVertex(transform * V))
    }
    for T in model.triangles {
        RenderTriangle(T, projected)
    }
}

RenderScene() {
    MCamera = MakeCameraMatrix(camera.position, camera.orientation)

    for I in scene.instances {
        M = MCamera*I.transform
        RenderModel(I.model, M)
    }
}
```

# References

- [x] [Scratch a Pixel 2.0: Finding the 2D pixel coordinates of a 3D Point Explained from Beginning to End](https://www.scratchapixel.com/lessons/3d-basic-rendering/computing-pixel-coordinates-of-3d-point/mathematics-computing-2d-coordinates-of-3d-points)

- [x] [Gabriel Gambeta: Computer Graphics from scratch (Perspective Projection)](https://www.gabrielgambetta.com/computer-graphics-from-scratch/perspective-projection.html)

- [x] [David J. Eck: Introduction to Computer Graphics (Projection and Viewing), Hobart and William Smith Colleges](http://math.hws.edu/graphicsbook/c3/s3.html)

- [x] [Jeremiah: 3D Game Engine Programming (Understanding the View Matrix)](https://www.3dgep.com/understanding-the-view-matrix/)

- [x] [Etay Meiri: OLDEV Model OpenGL Tutorial (Camera Space)](http://ogldev.org/www/tutorial13/tutorial13.html)

- [x] [Plotly: 3D Camera Controls in Python](https://plotly.com/python/3d-camera-controls/)

