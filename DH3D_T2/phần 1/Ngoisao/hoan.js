// HelloTriangle.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  ' uniform  mat4 u_ModelMatrix ;\n'+
  'void main() {\n' +
  '  gl_Position = u_ModelMatrix * a_Position;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);\n' +
  '}\n';

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
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
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
  return n;
}
