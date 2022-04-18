
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  //xoay
   'uniform vec2 u_Scale;\n' + 
  // và tịnh tiến
  'uniform vec2 u_tran;\n' + 

  'void main() {\n' +
  // '  gl_Position = a_Position;\n' +
    '  gl_Position.x = a_Position.x * u_Scale.x + u_tran.x ;\n' +
    '  gl_Position.y = a_Position.y * u_Scale.y + u_tran.y ;\n' +
    '  gl_Position.z = 0.0 ;\n' +
    '  gl_Position.w = 1.0;\n' +
    
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0,1.0, 0.0, 1.0);\n' +
  '}\n';

function main() {
  // Retrieve <canvas> element

  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Write the positions of vertices to a vertex shader
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to set the positions of the vertices');
    return;
  }

  var u_Scale = gl.getUniformLocation(gl.program ,'u_Scale');
  gl.uniform2f(u_Scale,0.5,0.5);
  var u_tran =  gl.getUniformLocation(gl.program,'u_tran');
  gl.uniform2f(u_tran,0.0,0.5,0.0);

  // Specify the color for clearing <canvas>
  gl.clearColor(0, 0.5, 0, 1);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw the rectangle
  // gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  // gl.drawArrays(gl.LINE_LOOP  , 0, 5);
  // gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  gl.drawArrays(gl.TRIANGLES, 0, 9);


}

function initVertexBuffers(gl) {
  var vertices = new Float32Array([
   //    0.5 , 0.5 , -0.5 , 0.5 ,-0.5 ,-0.5,
   // 0.5 , -0.5
   // -0.5,0.5,-0.5,-0.5,0.5,0.5,0.5,-0.5
   -0.8,-0.8, -0.4,0.0, 0.0,-0.8,
    0.0,0.8 , 0.4,0.0, -0.4,0.0,
   0.0,-0.8, 0.4,0.0, 0.8,-0.8

  //  0.7,0.7,0.0,0.0,
  // -0.7,0.7,0.0,0.0
  //  0.0,0.0,1.0,0.0
  //  0.0,0.0,0.0,1.0
  ]);
  var n = 3; // The number of vertices

  var vertexBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  return n;
}
