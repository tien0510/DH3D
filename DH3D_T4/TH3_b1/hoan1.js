// HelloPint2.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = 
  'attribute vec4 a_Position;\n' + 
  // tịnh tiến
  // 'uniform vec4 u_Tran;\n' + 

  // co giãn 
  // 'uniform vec2 u_Scale;\n' + 

  //xoay
  'uniform float u_CosB,u_SinB ;\n' +
  'void main() {\n' +
  // tịnh tiến 
  // '  gl_Position = a_Position + u_Tran ;\n' + 

  // co giãn
    // '  gl_Position.x = a_Position.x * u_Scale.x ;\n' +
    // '  gl_Position.y = a_Position.y * u_Scale.y ;\n' +
    // '  gl_Position.z = 0.0 ;\n' +
    // '  gl_Position.w = 1.0;\n' +

    // xoay
    'gl_Position.x = a_Position.x * u_CosB - a_Position.y * u_SinB; \n'+
    'gl_Position.y = a_Position.x * u_SinB - a_Position.y * u_CosB; \n'+
    'gl_Position.z = 0.0 ;\n' +
    'gl_Position.w = 1.0;\n' +

  // '  gl_PointSize = 10.0;\n' +
  '}\n'; 

// Fragment shader program
var FSHADER_SOURCE = 
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
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
  var Bom = gl.createBuffer();
  // b3 lấy vị trí lưu trữ
  // phép tịnh tiến
  // var u_Tran = gl.getUniformLocation(gl.program ,'u_Tran');//biến đồng nhất,abtrib thuôjc tính
  // gl.uniform4f(u_Tran,0.5,0.5,0.0,0.0);// trueyfen 4 giấ trị, cuối cùng là  w(đồng nhất các phép biến đổi)
  //phép co giãn
  // var u_Scale = gl.getUniformLocation(gl.program ,'u_Scale');
  // gl.uniform2f(u_Scale,0.5,0.5);
  // phép xoay
  var ANGLE = 90.0;
  var radian = Math.PI * ANGLE / 180.0;
  var cosB = Math.cos(radian);
  var sinB = Math.sin(radian);
  var u_CosB = gl.getUniformLocation(gl.program,'u_CosB');
  gl.uniform1f(u_CosB, cosB);
  var u_SinB = gl.getUniformLocation(gl.program,'u_SinB');
  gl.uniform1f(u_SinB, sinB);

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
// đường thăgnr
// gl.drawArrays(gl.LINE_LOOP  , 0, 5);

gl.drawArrays(gl.TRIANGLES  , 0, 3);



}
