
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
  var g_point = [];
  var step = 3.14/5.0;
  var i, angle, r;
  for (i=0; i<10; ++i){
    r = (i%2==0? 0.3:0.6);
    angle = i*step;
    g_point.push(r* Math.cos(angle));
    g_point.push(r* Math.sin(angle));
  }

  var vertices = new Float32Array([
  0.0,0.0, 1.0, 1.0, 1.0,
  g_point[0],g_point[1], 1.0, 1.0, 1.0,
  g_point[2],g_point[3], 0.0, 1.0, 0.0,//v1
  g_point[4],g_point[5], 1.0, 1.0, 1.0,
  g_point[6],g_point[7], 1.0, 0.0, 0.0,//v3
  g_point[8],g_point[9], 1.0, 1.0, 1.0,
  g_point[10],g_point[11], 0.0, 0.0, 1.0,//v5
  g_point[12],g_point[13], 1.0, 1.0, 1.0,
  g_point[14],g_point[15], 1.0, 1.0, 0.0,//v7
  g_point[16],g_point[17], 1.0, 1.0, 1.0,
  g_point[18],g_point[19], 0.0, 1.0, 1.0,//v9
   g_point[0],g_point[1], 1.0, 1.0, 1.0,
  
  ]);
  var FSIZE = vertices.BYTES_PER_ELEMENT;
  var n = 12; // The number of vertices
  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  var a_color = gl.getAttribLocation(gl.program, 'a_color');

  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE*5, 0);
  gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, FSIZE*5, FSIZE*2);
  gl.enableVertexAttribArray(a_Position);
  gl.enableVertexAttribArray(a_color);

  return n;
}
function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
  // Set the rotation matrix
  modelMatrix.setTranslate(-0.6,-0.0,0.0);
  modelMatrix.rotate(currentAngle, 0.0, 0.0, 1.0); // Rotation angle, rotation axis (0, 0, 1)
  modelMatrix.translate(0.6,0.0,0.0);
 
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