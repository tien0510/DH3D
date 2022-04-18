var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform mat4 u_viewMatrix;\n' +  //Thông tin người quan sát và đối tượng 3D
  'attribute vec4 a_color;\n' +
  'varying vec4 v_color;\n' +

  'void main() {\n' +
  '  gl_Position = u_viewMatrix*a_Position;\n' + //
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
  var u_viewMatrix = gl.getUniformLocation(gl.program, 'u_viewMatrix');
  //Tạo matrix4
  var viewMatrix = new Matrix4();
  //Đứng ở vị trí 0,0,1
  //Nhìn về gốc tọa độ 0,0,0
  //Hướng đỉnh đầu : 0,10,0
  //Chiều dương trục oy : 0,-10,0 => vị trí đỉnh đầu lộn lại chiều âm Oy
//  
  viewMatrix.setLookAt(0,0,1,0,0,0,0,-1,0); //Tam giác quay ngược đầu do vị trí nhìn
  //Truyền u_viewMatrix dữ liệu
  gl.uniformMatrix4fv(u_viewMatrix, false, viewMatrix.elements);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);


  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
  var verticesColors = new Float32Array([
    // Vertex coordinates and color
     0.0,  0.5,  1.0,  0.0,  0.0, 
    -0.5, -0.5,  0.0,  1.0,  0.0, 
     0.5, -0.5,  0.0,  0.0,  1.0, 
  ]);
  var n = 3;

  var vertexColorBuffer = gl.createBuffer();  

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  var FSIZE = verticesColors.BYTES_PER_ELEMENT;
 
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
  gl.enableVertexAttribArray(a_Position);  // Enable the assignment of the buffer object

  // Get the storage location of a_Position, assign buffer and enable
  var a_color = gl.getAttribLocation(gl.program, 'a_color');
  gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, FSIZE*5, FSIZE*2);
  gl.enableVertexAttribArray(a_color);


  return n;
}
