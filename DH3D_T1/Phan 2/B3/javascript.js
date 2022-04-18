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
function main() {
	var canvas =  document.getElementById('webgl');
	var gl 	   = getWebGLContext(canvas);
	initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE);
	//vẽ điểm ảnh
	var a_PointSize = gl.getAttribLocation(gl.program,'a_PointSize');
	gl.vertexAttrib1f(a_PointSize,20);
	var a_Position  = gl.getAttribLocation(gl.program,'a_Position');
	gl.vertexAttrib3f(a_Position,-0.97,-0.97, 0.0);
	var u_Color    = gl.getUniformLocation(gl.program,'u_Color');
	gl.uniform4f(u_Color,1.0,0.0,0.0,1.0);
	
	gl.clearColor(1.0,1.0,0.0,1);
	gl.clear (gl.COLOR_BUFFER_BIT);;
	//draw
	gl.drawArrays(gl.POINTS,0,1);

}