// HelloPint2.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = 
  'attribute vec4 a_Position;\n' + 
  'uniform vec2 u_Scale;\n' + 
  'void main() {\n' +
  '  gl_Position.x = a_Position.x * u_Scale.x;\n' +
  '  gl_Position.y = a_Position.y * u_Scale.y;\n' +
  '  gl_Position.z = 0.0;\n' +
  '  gl_Position.w = 1.0;\n' +
  '}\n'; 
// Fragment shader program
var FSHADER_SOURCE = 
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';

function main() {
  var Hoimon = new Float32Array([
 	 0.0, 0.5,   //V0
	-0.5, -0.5,  //V1
	 0.5, -0.5	 //V2
	]);
  var canvas = document.getElementById('webgl');
  var gl = getWebGLContext(canvas);  
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  var Bom = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, Bom);
gl.bufferData(gl.ARRAY_BUFFER, Hoimon, gl.STATIC_DRAW);
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(a_Position);
var u_Scale = gl.getUniformLocation(gl.program, 'u_Scale');
gl.uniform2f(u_Scale, 0.5, 0.5);
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}
