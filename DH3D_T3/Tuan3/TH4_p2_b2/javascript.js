var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_color;\n' +
  ' uniform  mat4 u_ModelMatrix ;\n'+
  'varying vec4 v_color;\n' +
  'void main() {\n' +
  '  gl_Position = u_ModelMatrix * a_Position;\n' +
  '  v_color = a_color;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
'precision mediump float;\n' +
'varying vec4 v_color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_color;\n' +
  '}\n';
var ANGLE_STEP = 45.0;
function main() {
  var ModelMatrix = new Float32Array([
    0.7 , -0.7 ,0.0 ,0.0,
    0.7 ,0.7 ,0.0 ,0.0,
    0.0 ,0.0 ,1.0,0.0,
    0.0,0.0,0.0,1.0// tinh tiến 0.5,0.4,0.0,1.0 
    ])
  var canvas = document.getElementById('webgl');
  var gl = getWebGLContext(canvas);
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  var n = initVertexBuffers(gl);
  var u_ModelMatrix = gl.getUniformLocation(gl.program,'u_ModelMatrix');
  gl.uniformMatrix4fv(u_ModelMatrix,false,ModelMatrix);
  gl.clearColor(0, 0.5, 0, 1);
  // Get storage location of u_ModelMatrix
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');

  // Current rotation angle
  var currentAngle = 0.0;
  // Model matrix
  var modelMatrix = new Matrix4();

  // Start drawing
  var tick = function() {
    currentAngle = animate(currentAngle);  // Update the rotation angle
    draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix);   // Draw the triangle
    requestAnimationFrame(tick, canvas); // Request that the browser calls tick
  };
  tick();
}

function initVertexBuffers(gl) {
  var vertices = [];
  var step = 3.14/6.0;
  var i, angle, r;
  for (i=0; i<12; ++i){
    r = (i%2==0? 0.3:0.6);
    angle = i*step;
    vertices.push(r* Math.cos(angle));
    vertices.push(r* Math.sin(angle));
  }

  var n = 12; // The number of vertices
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  
   var verticess = new Float32Array([
    1.0, 0.0,0.0,// mỗi phần tử chiếm 4 byte, chứa khoảng 20 byte, 8 byte cho positon , 12 cuối cho a_size
    0.0, 1.0,0.0,
    0.0, 0.0,1.0,
    1.0, 0.0,1.0,
    1.0, 1.0,1.0,
    0.0, 1.0,1.0,
    1.0, 1.0,0.0,
  ]);
  var FSIZE = verticess.BYTES_PER_ELEMENT;// 4
  // Create a buffer object
  var vertexBuffer = gl.createBuffer();//buowsc 1
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);//buov 2
  gl.bufferData(gl.ARRAY_BUFFER, verticess, gl.STATIC_DRAW);//buov 3

  var a_color = gl.getAttribLocation(gl.program,'a_color');


  //======
 //buoc 4
  gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, FSIZE*3, 0)

  // location, size,tyoe,normalized,stride(số byte giữa mỗi đỉnh),offset(vị trí byte bắt đầu)
  //==========
  //buoc 5
  gl.enableVertexAttribArray(a_color);

  return n;
}
function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
  // Set the rotation matrix
  modelMatrix.translate(0.0,-0.6,0.0);
  modelMatrix.setRotate(currentAngle, 0.0, 0.0, 1.0); // Rotation angle, rotation axis (0, 0, 1)
  modelMatrix.translate(0.0,0.6,0.0);
 
  // Pass the rotation matrix to the vertex shader
  gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw the rectangle
  gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}

// Last time that this function was called
var g_last = Date.now();
function animate(angle) {
  // Calculate the elapsed time
  var now = Date.now();
  var elapsed = now - g_last;
  g_last = now;
  // Update the current rotation angle (adjusted by the elapsed time)
  var newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0;
  return newAngle %= 360;
}
function up(){
  ANGLE_STEP = 45.0;
}
function down(){
  ANGLE_STEP = -45.0;
}