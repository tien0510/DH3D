

// thu nhỏ 1 nửa tam giác vuông, điểm cố định gốc toạ độ
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_ModelMatrix;\n' + 
  'void main() {\n' +
  '  gl_Position = u_ModelMatrix * a_Position;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';

function main(){
  var ModelMatrix = new Matrix4();
  ModelMatrix.setIdentity();
  
  // phần a: điểm cố định là gốc tọa độ.
  
  //ModelMatrix.scale(0.5,0.5,0.0);
  
  // phần b: điểm cố định là gốc tọa độ.
  ModelMatrix.translate(-0.25,-0.25,0.0);
  ModelMatrix.scale(0.5,0.5,0.0);
  ModelMatrix.translate(0.25,0.25,0.0);
  

  var canvas = document.getElementById ('webgl');
  var gl = getWebGLContext(canvas);
  initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
  var n = initVertexBuffers(gl);
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  gl.uniformMatrix4fv(u_ModelMatrix, false ,ModelMatrix.elements);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  //draw
  gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}  

function initVertexBuffers(gl){
  var vertices = new Float32Array([
   0.0 ,0.25,
   -0.25, -0.25,
   0.25, -0.25
  ]);
  var n = 3;
  var VertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, VertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  //gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(a_Position);
  return n;
}