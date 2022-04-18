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
  projMatrix.setOrtho(-2.0,2.0,-2.0,2.0,0.0,2.0);
  //projMatrix.lookAt(0,0,1,0,0,0,0,1,0);
  projMatrix.lookAt(0, 0, -1, 0, 0, 0, 0, 1, 0);
  projMatrix.rotate(45,1,1,1);
  //Truyền u_projMatrix dữ liệu
  gl.uniformMatrix4fv(u_projMatrix, false, projMatrix.elements);

  //gl.enable(gl.DEPTH_TEST);//Kích hoạt chiều sâu

  gl.clearColor(0.0, 0.0, 0.0, 1.0);


  //gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);//Gọi bộ đệm chiều sâu
gl.clear(gl.COLOR_BUFFER_BIT);
  for(var i=0;i<=24;i=i+4){
        gl.drawArrays(gl.TRIANGLE_FAN, i, 4);
    }
}

function initVertexBuffers(gl) {
  var n = 24;
    var vertices = new Float32Array([
        -1.0, -1.0, 1.0, 0.0,0.0,
        1.0, -1.0, 1.0, 1.0,0.0,
        1.0, 1.0, 1.0, 1.0,1.0,
        -1.0, 1.0, 1.0, 0.0,1.0,

        // Back face
        -1.0, -1.0, -1.0, 0.0,0.0,
         -1.0, 1.0, -1.0, 0.0,1.0,
        1.0, 1.0, -1.0, 1.0,1.0,
        1.0, -1.0, -1.0, 1.0,0.0,

        // Top face
        -1.0, 1.0, -1.0, 0.0,1.0,
        -1.0, 1.0, 1.0, 1.0,0.0,
        1.0, 1.0, 1.0, 0.0,0.0,
        1.0, 1.0, -1.0, 1.0,1.0,

        //Bottom face
        -1.0, -1.0, -1.0, 0.0,0.0,
        1.0, -1.0, -1.0, 1.0,0.0,
        1.0, -1.0, 1.0, 0.0,1.0,
         -1.0, -1.0, 1.0, 1.0,1.0,

        // Right face
        1.0, -1.0, -1.0, 1.0,0.0,
        1.0, 1.0, -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0, 0.0,1.0,
        1.0, -1.0, 1.0, 0.0,0.0,

        //Left face
        -1.0, -1.0, -1.0, 0.0,0.0,
        -1.0, -1.0, 1.0, 1.0,1.0,
        -1.0, 1.0, 1.0, 0.0,1.0,
        -1.0, 1.0, -1.0, 1.0,0.0
   

  ]);
  var vertexColorBuffer = gl.createBuffer();  

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  var FSIZE = vertices.BYTES_PER_ELEMENT;
 
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 5, 0);
  gl.enableVertexAttribArray(a_Position);  // Enable the assignment of the buffer object

  var a_color = gl.getAttribLocation(gl.program, 'a_color');
  gl.vertexAttribPointer(a_color, 2, gl.FLOAT, false, FSIZE*5, FSIZE*3);
  gl.enableVertexAttribArray(a_color);


  return n;
}
