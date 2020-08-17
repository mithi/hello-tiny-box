# Hello Tiny Box

Manipulate a three dimensional box. Algorithm code: [Python script](./prototype-script.py)

![User Interface Screenshot](https://user-images.githubusercontent.com/1670421/90424712-258d9f80-e0f1-11ea-972d-01f738102517.png)

## High Level Pseudocode

The pseudocode is taken from [Gabriel Gambetta's Computer Graphics from Scratch online book (Scene Setup)](https://www.gabrielgambetta.com/computer-graphics-from-scratch/scene-setup.html)

We manipulate vertex V in model space until it’s projected into the canvas point (cx,cy)

1. We first apply the model transform, to go from model space to world space (rotate, scale, translate)
2. Then we apply the camera transform, to go from world space to camera space (rotate and translate)
3. Next we apply the perspective equations and we finally map the viewport coordinates to canvas coordinates

You can inspect the algorithm I first wrote in python here: Algorithm code: [Python script](./prototype-script.py)

```python
# High level pseudo code only

def get_projected_point(point):
  return {
    "x": point.x / point.z * projection_constant,
    "y": point.y / point.z * projection_constant,
    "z" projection_constant
  }

def render_model(model_instance, model_to_camera_matrix):
    transformed_points = [] # x, y, z wrt camera (3d)
    projected_points = [] # x, y wrt canvas of camera (2d)

    for point in model_instance.points:
        transformed_points.append(model_to_camera_matrix * point)
        projected_points.append(get_projected_point(point))

    # figure out which places are on the back or front
    # modified_back_face_culling algorithm
    information = which_planes_front_facing(transformed_points)
    plot_points_in_image(projected_points, information)



def render_scene():
    camera_to_world_matrix = build_camera_matrix(camera_position, camera_orientation)
    for each model_instance in scene:
        model_to_camera_matrix = world_to_camera_matrix * model_instance.model_to_world_matrix
        render_model(model_instance, model_to_camera_matrix)
```

## References

- [x] [Scratch a Pixel 2.0: Finding the 2D pixel coordinates of a 3D Point Explained from Beginning to End](https://www.scratchapixel.com/lessons/3d-basic-rendering/computing-pixel-coordinates-of-3d-point/mathematics-computing-2d-coordinates-of-3d-points)

- [x] [Gabriel Gambeta: Computer Graphics from scratch (Perspective Projection)](https://www.gabrielgambetta.com/computer-graphics-from-scratch/perspective-projection.html)

- [x] [David J. Eck: Introduction to Computer Graphics (Projection and Viewing), Hobart and William Smith Colleges](http://math.hws.edu/graphicsbook/c3/s3.html)

- [x] [Jeremiah: 3D Game Engine Programming (Understanding the View Matrix)](https://www.3dgep.com/understanding-the-view-matrix/)

- [x] [Etay Meiri: OLDEV Model OpenGL Tutorial (Camera Space)](http://ogldev.org/www/tutorial13/tutorial13.html)

- [x] [Plotly: 3D Camera Controls in Python](https://plotly.com/python/3d-camera-controls/)
