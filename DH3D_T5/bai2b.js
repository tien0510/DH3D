var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_projMatrix;\n' +  //Thông tin người quan sát và đối tượng 3D
  'attribute vec4 a_color;\n' +
  'varying vec4 v_color;\n' +

  'void main() {\n' +
  '  gl_Position = u_projMatrix*a_Position;\n' + //
  ' v_color = a_color ;\n'+
  '}\n';

var FSHADER_SOURCE =
  'precision mediump float ;\n'+
  'varying vec4 v_color ;\n'+
  'void main() {\n' +
  '  gl_FragColor = v_color;\n' +
  '}\n';


function main() {
  var canvas = document.getElementById('webgl');

  var gl = getWebGLContext(canvas);

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)

  var n = initVertexBuffers(gl);

  //
  var u_projMatrix = gl.getUniformLocation(gl.program, 'u_projMatrix');
  //Tạo matrix4
  var projMatrix = new Matrix4();
  //Đứng ở vị trí 0,0,1
  //Nhìn về gốc tọa độ 0,0,0
  //Hướng đỉnh đầu : 0,10,0
  //Chiều dương trục oy : 0,-10,0 => vị trí đỉnh đầu lộn lại chiều âm Oy
  //projMatrix.setLookAt(0,0,1,0,0,0,10,10,10); 

  //setOrtho(left, right, bottom, top, near, far)
  //trái -> phải, dưới -> trên, gần ,xa
  //projMatrix.setOrtho(-0.6,0.6,-0.6,0.6, 0.0,0.6);
// 
  projMatrix.setOrtho(-1.0,1.0,-1.0,1.0,0.0,0.2); //0.7 vì vị trí đứng của nó so với vị trí hình
  //projMatrix.lookAt(0,0,1,0,0,0,0,1,0);
//
  projMatrix.lookAt(0, 0, -0.3, 0, 0, 0, 0, 1, 0);
  //projMatrix.lookAt(0, 0, -0.3, 0, 0, 0, 0, -1, 0); //Thay oy = -1 để tam giác không lộn
 
 
  //Truyền u_projMatrix dữ liệu
  gl.uniformMatrix4fv(u_projMatrix, false, projMatrix.elements);

//Khử mặt khuất
  gl.enable(gl.DEPTH_TEST);//Kích hoạt chiều sâu


  gl.clearColor(0.0, 0.0, 0.0, 1.0);

//
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);//Gọi bộ đệm chiều sâu

  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
  var vertices = new Float32Array([
    0.0,  0.6,  -0.4,  0.4,  1.0,  0.4, // The back green one
    -0.5, -0.4,  -0.4,  0.4,  1.0,  0.4,
     0.5, -0.4,  -0.4,  1.0,  0.4,  0.4, 
   
     0.5,  0.4,  -0.2,  1.0,  0.4,  0.4, // The middle yellow one
    -0.5,  0.4,  -0.2,  1.0,  1.0,  0.4,
     0.0, -0.6,  -0.2,  1.0,  1.0,  0.4, 

     0.0,  0.5,   0.0,  0.4,  0.4,  1.0,  // The front blue one 
    -0.5, -0.5,   0.0,  0.4,  0.4,  1.0,
     0.5, -0.5,   0.0,  1.0,  0.4,  0.4, 
  ]);
  var n = 9; // The number of vertices


  var vertexColorBuffer = gl.createBuffer();  

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var FSIZE = vertices.BYTES_PER_ELEMENT;
 
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
  gl.enableVertexAttribArray(a_Position);  // Enable the assignment of the buffer object

  var a_color = gl.getAttribLocation(gl.program, 'a_color');
  gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, FSIZE*6, FSIZE*3);
  gl.enableVertexAttribArray(a_color);


  return n;
}
