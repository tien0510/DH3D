var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n'+
	'attribute float a_PointSize;\n'+
	'void main() {\n' +
		' gl_Position  = a_Position;\n' +
		' gl_PointSize = a_PointSize;\n' +
	'}\n';
var FSHADER_SOURCE =
	'precision mediump float;\n'+
	'uniform vec4 u_Color;\n'+
	'void main() {\n' +
		' gl_FragColor = u_Color;\n' +
	'}\n';
function main(){
	var HoiMon = new Float32Array([
		0,0.5,
		-0.5,-0.5,
		0.5,-0.5
		]);

var canvas = document.getElementById ('webgl');
var gl = getWebGLContext(canvas);
initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
gl.vertexAttrib1f(a_PointSize, 20.0);
var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
var u_Color = gl.getUniformLocation(gl.program, 'u_Color');
gl.uniform4f(u_Color, 1.0, 1.0, 0.0, 1.0);
var Bom = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,Bom);
gl.bufferData(gl.ARRAY_BUFFER,HoiMon,gl.STATIC_DRAW);
gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
gl.enableVertexAttribArray(a_Position);	
// canvas.onmousedown = function(ev) { // đọc tài liệu hàm ẩn danh trong ebook
// click(ev, gl, canvas, a_Position);
//  };
gl.clearColor(0.0, 0.0, 1.0, 1.0);
gl.clear (gl.COLOR_BUFFER_BIT);
// draw?
gl.drawArrays(gl.TRIANGLES, 0, 3);
}