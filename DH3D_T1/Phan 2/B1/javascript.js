function main(){
	
 var canvas = document.getElementById('webgl');  

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');

  // Draw a blue rectangle
  ctx.fillStyle = 'rgba(0, 255, 255, 1.0)'; // Set color to blue
  ctx.fillRect(250, 0, 150, 150);        // Fill a rectangle with the color

}
main();