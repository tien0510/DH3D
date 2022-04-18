
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

var currentAngle = 0.0;
function main(){
  var ModelMatrix = new Matrix4();
  // ModelMatrix.setTranslate(0.5,-0.5,0.0);
  // ModelMatrix.setIdentity();
 // // dịch lên sau
  // // ModelMatrix.rotate(45,0.0,0.0,1.0);//quay trước
  // ModelMatrix.scale(0.5,0.5,0.0);
  // ModelMatrix.translate(0.35,0.0,0.0);
	
  var canvas = document.getElementById ('webgl');
  var gl = getWebGLContext(canvas);
  initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
  var n = initVertexBuffers(gl);
  
  // B3: vị trí lưu trữ
  var u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  
	var tick = function(time){
		// B2 Cập nhật góc quay
		currentAngle =45/1000*time%360;
		
		// bài 1
		ModelMatrix.setIdentity();
		ModelMatrix.translate(0.35,0.0,0.0);
		ModelMatrix.rotate(currentAngle, 0, 0, 1);
		
		// bai 2
		// ModelMatrix.setIdentity();
		// ModelMatrix.translate(-0.25,-0.25,0.0);
		// ModelMatrix.rotate(currentAngle, 0, 0, 1);
		// ModelMatrix.translate(0.25,0.25,0.0);
		 

		//B4: truyền phần tử
		gl.uniformMatrix4fv(u_ModelMatrix, false ,ModelMatrix.elements);

		// thiết lại màu nền
		gl.clear(gl.COLOR_BUFFER_BIT);

		// vẽ hình mới
		gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
		
		// tạo độ mượt khi biến đổi
		requestAnimationFrame(tick);
	}
	requestAnimationFrame(tick);
  
  
  

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  
 
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