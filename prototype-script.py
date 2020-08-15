"""


 ____                                                   __       __      ____                     
/\  _`\                                               /'__`\    /\ \    /\  _`\                   
\ \ \/\ \  _ __    __     __  __  __         __      /\_\L\ \   \_\ \   \ \ \L\ \    ___   __  _  
 \ \ \ \ \/\`'__\/'__`\  /\ \/\ \/\ \      /'__`\    \/_/_\_<_  /'_` \   \ \  _ <'  / __`\/\ \/'\ 
  \ \ \_\ \ \ \//\ \L\.\_\ \ \_/ \_/ \    /\ \L\.\_    /\ \L\ \/\ \L\ \   \ \ \L\ \/\ \L\ \/>  </ 
   \ \____/\ \_\\ \__/.\_\\ \___x___/'    \ \__/.\_\   \ \____/\ \___,_\   \ \____/\ \____//\_/\_\
    \/___/  \/_/ \/__/\/_/ \/__//__/       \/__/\/_/    \/___/  \/__,_ /    \/___/  \/___/ \//\/_/
                                                                                                  
                                                                                                  

   .+------+     +------+     +------+     +------+     +------+.
 .' |    .'|    /|     /|     |      |     |\     |\    |`.    | `.
+---+--+'  |   +-+----+ |     +------+     | +----+-+   |  `+--+---+
|   |  |   |   | |    | |     |      |     | |    | |   |   |  |   |
|  ,+--+---+   | +----+-+     +------+     +-+----+ |   +---+--+   |
|.'    | .'    |/     |/      |      |      \|     \|    `. |   `. |
+------+'      +------+       +------+       +------+      `+------+

+------+.      +------+       +------+       +------+      .+------+
|`.    | `.    |\     |\      |      |      /|     /|    .' |    .'|
|  `+--+---+   | +----+-+     +------+     +-+----+ |   +---+--+'  |
|   |  |   |   | |    | |     |      |     | |    | |   |   |  |   |
+---+--+.  |   +-+----+ |     +------+     | +----+-+   |  .+--+---+
 `. |    `.|    \|     \|     |      |     |/     |/    |.'    | .'
   `+------+     +------+     +------+     +------+     +------+
"""


import numpy as np
import matplotlib.pyplot as plt

def _return_sin_and_cos(theta):
    d = np.radians(theta)
    c = np.cos(d)
    s = np.sin(d)
    return c, s


def rotx(theta):
    c, s = _return_sin_and_cos(theta)
    return np.array([
      [1, 0, 0], 
      [0, c, -s], 
      [0, s, c]]
    )


def roty(theta):
    c, s = _return_sin_and_cos(theta)
    return np.array([
      [c, 0, s],
      [0, 1, 0],
      [-s, 0, c],
    ])


def rotz(theta):
    c, s = _return_sin_and_cos(theta)
    return np.array([
      [c, -s, 0],
      [s, c, 0],
      [0, 0, 1],
    ])


def rotxyz(euler_vec):
    rx = rotx(euler_vec.x)
    ry = roty(euler_vec.y)
    rz = rotz(euler_vec.z)
    rxy = np.matmul(rx, ry)
    rxyz = np.matmul(rxy, rz)
    return rxyz


class Vector:
  def __init__(self, x, y, z, name=None, alias=None):
    self.x, self.y, self.z = x, y, z
    self.name = name
    self.alias = alias
  
  def get_transformed_point(self, transform_matrix):
    p = np.array([self.x, self.y, self.z, 1])
    p = np.matmul(transform_matrix, p)
    return Vector(p[0], p[1], p[2], self.name, self.alias)

  def __repr__(self):
    return f"Vector(x={self.x}, y={self.y}, z={self.z}, {self.name})"
    
def t_matrix(translation):
  return [[1, 0, 0, translation.x],
          [0, 1, 0, translation.y],
          [0, 0, 1, translation.z],
          [0, 0, 0,             1]]

def s_matrix(scale):
  return [[scale,     0,     0, 0],
          [    0, scale,     0, 0],
          [    0,     0, scale, 0],
          [    0,     0,     0, 1]]


"""
   E------F        y
   |`.    | `.     |
   |  `A--+---B    *----- x
   |   |  |   |     \
   G---+--H   |      \
    `. |   `. |       z
      `C------D

"""
class NormalUnitCube:
    CENTER = Vector(0, 0, 0, "cube-center")
    POINTS = [
      Vector(-1, +1, +1, "front-top-left", "A"),
      Vector(+1, +1, +1, "front-top-right", "B"),
      Vector(-1, -1, +1, "front-bottom-left", "C"),
      Vector(+1, -1, +1, "front-bottom-right", "D"),
      Vector(-1, +1, -1, "back-top-left", "E"),
      Vector(+1, +1, -1, "back-top-right", "F"),
      Vector(-1, -1, -1, "back-bottom-left", "G"),
      Vector(+1, -1, -1, "back-bottom-right", "H"),
    ]

    def __init__(self):
      pass
      
class Cube:
  UNIT_CUBE = NormalUnitCube()
  def __init__(
      self,
      euler_vec=Vector(0, 0, 0),
      scale=1,
      translate_vec=Vector(0, 0, 0)
  ):
    self.rotate_matrix = rotxyz(euler_vec)
    self.euler_vec = euler_vec
    self.scale = scale
    self.translate_vec = translate_vec
    r = self.rotate_matrix
    s = self.scale
    t = self.translate_vec
    r_matrix = [
      [r[0][0], r[0][1], r[0][2], 0],
      [r[1][0], r[1][1], r[1][2], 0],
      [r[2][0], r[2][1], r[2][2], 0],
      [0, 0, 0, 1],
    ]
    self.wrt_world_matrix = np.matmul(t_matrix(t), np.matmul(s_matrix(s), r_matrix))
    self.points = Cube.UNIT_CUBE.POINTS
    
def get_world_wrt_camera_matrix(
    translate_vec=Vector(0, 0, 0),
    euler_vec=Vector(0, 0, 0)
):
    Rmatrix = rotxyz(euler_vec)
    t = translate_vec
    # Inverse of rotations matrix
    r = Rmatrix.T

    # matrix[row][column]

    # inverse_matrix = rotateCameraMatrixInverse * translateCameraMatrixInverse
    # world_to_camera_matrix
    return [
      [r[0][0], r[0][1], r[0][2], -t.x],
      [r[1][0], r[1][1], r[1][2], -t.y],
      [r[2][0], r[2][1], r[2][2], -t.z],
      [0, 0, 0, 1],
    ]

def get_projected_point(point, projection_constant):
  return Vector(
    point.x / point.z * projection_constant,
    point.y / point.z * projection_constant,
    projection_constant,
    point.name,
    point.alias,
  )

def plot_2d_points(points):
  p = points
  x1 = [p[0].x, p[1].x, p[3].x, p[2].x, p[0].x]
  y1 = [p[0].y, p[1].y, p[3].y, p[2].y, p[0].y]

  x2 = [p[4].x, p[5].x, p[7].x, p[6].x, p[4].x]
  y2 = [p[4].y, p[5].y, p[7].y, p[6].y, p[4].y]

  x3 = [p[0].x, p[4].x]
  y3 = [p[0].y, p[4].y]

  x4 = [p[1].x, p[5].x]
  y4 = [p[1].y, p[5].y]

  x5 = [p[2].x, p[6].x]
  y5 = [p[2].y, p[6].y]

  x6 = [p[3].x, p[7].x]
  y6 = [p[3].y, p[7].y]


  fig = plt.figure()
  ax = fig.add_subplot(111)

  lines = plt.plot(x1, y1)
  lines2 = plt.plot(x2, y2)
  lines3 = plt.plot(x3, y3)
  lines4 = plt.plot(x4, y4)
  lines5 = plt.plot(x5, y5)
  lines6 = plt.plot(x6, y6)

  plt.setp(lines, color='r', linewidth=5.0)
  plt.setp(lines2, color='b', linewidth=5.0)
  plt.setp(lines3, color='g', linewidth=5.0)
  plt.setp(lines4, color='g', linewidth=5.0)
  plt.setp(lines5, color='g', linewidth=5.0)
  plt.setp(lines6, color='g', linewidth=5.0)
  plt.xlim(-300, 300)
  plt.ylim(-300, 300)

  ax.set_aspect('equal', adjustable='box')
  plt.show()

def render_cube(cube, cube_wrt_camera_matrix, projection_constant):
  projected_points = []
  for point in cube.points:
    transformed_point = point.get_transformed_point(cube_wrt_camera_matrix)
    projected_point = get_projected_point(transformed_point, projection_constant)
    projected_points.append(projected_point)
  
  print(projected_points)
  plot_2d_points(projected_points)

# -----------------------------------
# RENDER SCENE
# -----------------------------------

PROJECTION_CONSTANT = 1 * 600
CAMERA_POSITION = Vector(0, 0, 5)
CAMERA_ORIENTATION = Vector(0, 0, 45)
world_wrt_camera_matrix = get_world_wrt_camera_matrix(CAMERA_POSITION, CAMERA_ORIENTATION)

# euler angle vector (rot.x, rot.y, rot.z) in degrees
r = Vector(-30, 0, 0)
# translate vector
t = Vector(0, 0, 0)
# scale magnitude
s = 1.25
cube = Cube(r, s, t)
cube_wrt_camera_matrix =  np.matmul(world_wrt_camera_matrix, cube.wrt_world_matrix)

render_cube(cube, cube_wrt_camera_matrix, PROJECTION_CONSTANT)
