// biến đồng nhất: b1 khai báo , b2 gán giá trị, b3 lấy vị trí lưu trữ,b4
// Vertex shader program
var VSHADER_SOURCE = 
  'attribute vec4 a_Position;\n' + 
  
  'void main() {\n' +
  '  gl_PointSize = a_Position;\n' +
  '}\n'; 

// Fragment shader program
var FSHADER_SOURCE = 
  'precision mediump float;\n'+
  'uniform vec4 u_Color;\n'+
  'void main() {\n' +
  '  gl_FragColor = u_Color;\n' +
  '}\n';

function main() {
  var Hoimon = new Float32Array([
 	// -0.5, 0.5, -0.5, -0.5, 0.5, 0.5,
  // 0.5 , 0.5 ,-0.5 ,-0.5 , 0.5 ,-0.5

  // 0.5 , 0.5 , -0.5 , 0.5 ,-0.5 ,-0.5,
  // 0.5 , -0.5

  // -0.5 , 0.5 , -0.5 , -0.5 , 0.5 ,0.5 ,0.5 ,-0.5

  0 , 0.5 ,-0.5 ,-0.5, 0.5 , -0.5
  ]);
  var canvas = document.getElementById('webgl');
  var gl = getWebGLContext(canvas);  
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  var u_Color    = gl.getUniformLocation(gl.program,'u_Color');
  gl.uniform4f(u_Color,1.0,1.0,0.0,1.0);
  
  var Bom = gl.createBuffer();
  // b3 lấy vị trí lưu trữ
  

gl.bindBuffer(gl.ARRAY_BUFFER, Bom);
gl.bufferData(gl.ARRAY_BUFFER, Hoimon, gl.STATIC_DRAW);
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(a_Position);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);
//2 tam giác
// gl.drawArrays(gl.TRIANGLES, 0, 6);
// 1 tứ giác
// gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
// nối đoạn thẳng (đầu cuối)
// gl.drawArrays(gl.LINE_LOOP  , 0, 5);

gl.drawArrays(gl.TRIANGLES  , 0, 3);



}
