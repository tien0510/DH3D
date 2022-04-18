// biến thuộc tính (attribute ) chỉ làm việc trong V_shader
var VSHADER_SOURCE = // biến thuộc tính
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_color;\n' +
  'attribute float a_size;\n' +
  'varying vec4 v_color;\n' + // varying variablephải có v_color vì fshader k làm việc với a_color

  'void main() {\n' +
  '  gl_Position = a_Position;\n' +
  '  gl_PointSize = a_size;\n' +
  '  v_color = a_color;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
'precision mediump float;\n' +
'varying vec4 v_color;\n' +
  'void main() {\n' +
    ' gl_FragColor = v_color;\n' +
  
  '}\n';

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);

  // Initialize shaders
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE) ;


  // Write the positions of vertices to a vertex shader
  var n = initVertexBuffers(gl);
  // Specify the color for clearing <canvas>
  gl.clearColor(0, 0, 0, 1);
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
  // Draw the rectangle
  gl.drawArrays(gl.POINTS, 0, n);
}

function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    0.0, 0.5, 1.0, 0.0,0.0, 10.0,
   -0.5,-0.5 ,0.0, 1.0,0.0, 20.0  , 
    0.5,-0.5, 0.0, 0.0,1.0, 30.0
  ]);
  var FSIZE = vertices.BYTES_PER_ELEMENT;// 4số byte dành cho 1 phần tử
  var n = 3; // The number of vertices
  // Create a buffer object
  var vertexBuffer = gl.createBuffer();//buowsc 1
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);//buov 2
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);//buov 3
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  var a_color = gl.getAttribLocation(gl.program,'a_color');
  var a_size = gl.getAttribLocation(gl.program,'a_size');

  //======
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE*6, 0);//buoc 4
  gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, FSIZE*6, FSIZE*2)
  gl.vertexAttribPointer(a_size, 1, gl.FLOAT, false, FSIZE*6, FSIZE*5)
  // location, size,tyoe,normalized,stride(số byte giữa mỗi đỉnh),offset(vị trí byte bắt đầu)
  //==========
  gl.enableVertexAttribArray(a_Position);//buoc 5
  gl.enableVertexAttribArray(a_color);
  gl.enableVertexAttribArray(a_size);





  return n;
}
