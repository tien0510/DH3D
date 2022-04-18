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
	gl.vertexAttrib3f(a_Position,0.0,0.0, 0.0);
	var u_Color    = gl.getUniformLocation(gl.program,'u_Color');
	gl.uniform4f(u_Color,1.0,1.0,0.0,1.0);
	
	canvas.onmousedown = function(ev){
		click(ev,gl,canvas,a_Position);
	}
	
	gl.clearColor(0.0,0.0,1.0,1);
	gl.clear (gl.COLOR_BUFFER_BIT);

}
var g_points = [];
function click(ev,gl,canvas,a_Position){
	// convert win->webgls

		var x = ev.clientX;
		var y = ev.clientY;
		var rect = ev.target.getBoundingClientRect();
		x = ((x-rect.left) -canvas.width/2) / (canvas.width/2);
		y = ( canvas.height/2 - (y - rect.top))/(canvas.height/2);
		
		g_points.push(x);g_points.push(y);
		
		gl.clear(gl.COLOR_BUFFER_BIT);
		// với mỗi vị trí lưu trữ,vẽ từng điểm
		var len = g_points.length;
		for(var i = 0; i < len; i+=2){
			
			gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 1.0);
			gl.drawArrays(gl.POINTS,0,1);

			if (i == 8) {

					gl.clearColor(1.0,0.0,0.0,1);
					gl.clear(gl.COLOR_BUFFER_BIT);
					break;

			}
			
		}
	
}