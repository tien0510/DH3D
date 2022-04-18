var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform vec4 u_tran;\n' +
  'uniform mat4 u_ModelMatrix;\n' +
  'void main() {\n' +
  '  gl_Position = u_ModelMatrix * a_Position;\n' +
  '}\n';


var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' +
  '}\n';

var ANGLE_STEP = 45.0;
var xtt = 0.0;
function main() {
	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
	var n = initVertexBuffers(gl);
	var u_tran = gl.getUniformLocation(gl.program, 'u_tran');
	gl.uniform4f(u_tran,0.0,0.0,0.0,0.0);

	gl.clearColor(0.0, 0.0, 0.0, 1.0);



	var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	var currentAngle = 30.0;

	var modelMatrix = new Matrix4();

	
	modelMatrix.setRotate(currentAngle, 1, 1, 1); 
	modelMatrix.scale(0.5, 0.5, 0.5); 

	gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements);
	gl.clear(gl.COLOR_BUFFER_BIT);
	  
	  // vẽ hình lập phương
	for(var i = 0; i < 4; i++){
	   gl.drawArrays(gl.LINE_LOOP, i*3, 3);
	}
	 
	
}



function initVertexBuffers(gl){
  var n=12;
  var vertices = new Float32Array([
   //đáy
       0.0, 1.0, 0.0,    //v0
      1.0, 0.0, 0.0,    //v1 truc x
      0.0, 0.0 , -1.0, //v2 truc z

      0.0,1.0,0.0, //v3
      0.0, 0.0, -1.0, //v4 truc z
      -1.0, 0.0, 0.0, //v5

      0.0, 1.0, 0.0,
      -1.0, 0.0, 0.0,
      0.0, 0.0, 1.0,

      0.0, 1.0, 0.0, //v9
      0.0,0.0,1.0,
      1.0,0.0,0.0

   
  ]);
  
  
  //b1.tạo một bộ đệm đối tượng
  var vertexBuffer = gl.createBuffer();
  //b2.gắn bộ đệm đối tượng với 1 target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  //b3.ghi dữ liệu vào bộ đệm đối tượng
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  //b4.gán dữ liệu của bộ đệm đối tượng với biến thuộc tính
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position'); 
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0); //luôn luôn là false do tọa độ canvas từ (-1;1)
  //b5.kích hoạt biến thuộc tính
  gl.enableVertexAttribArray(a_Position);
  return n;
}


