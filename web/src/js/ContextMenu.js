//这个构造器能获取此对象到地图盒子的绝对距离
function ContextMenu(map, options){
    var obj = {}
	this.setMap(map);
	this.map_=map;
	this.mapDiv_=map.getDiv();
	
}

ContextMenu.prototype=new google.maps.OverlayView();

ContextMenu.prototype.draw=function(){
	if(this.isVisible_){
		var mapSize=new google.maps.Size(this.mapDiv_.offsetWidth, this.mapDiv_.offsetHeight);
		var menuSize=new google.maps.Size(this.menu_.offsetWidth, this.menu_.offsetHeight);
		var mousePosition=this.getProjection().fromLatLngToDivPixel(this.position_);
		
		var left=mousePosition.x;
		var top=mousePosition.y;
		
		if(mousePosition.x>mapSize.width-menuSize.width-this.pixelOffset.x){
			left=left-menuSize.width-this.pixelOffset.x;
		} else {
			left+=this.pixelOffset.x;
		}
		
		if(mousePosition.y>mapSize.height-menuSize.height-this.pixelOffset.y){
			top=top-menuSize.height-this.pixelOffset.y;
		} else {
			top+=this.pixelOffset.y;
		}
		
		this.menu_.style.left=left+'px';
		this.menu_.style.top=top+'px';
	}/* 
	this.map_.addListener('bounds_changed',function(e){

	}); */
};

//将谷歌地图的经纬度转为对象像素
var fromLatLngToPixel=function(position,map){
	var scale = Math.pow(2, map.getZoom());
	var proj = map.getProjection();
	var bounds = map.getBounds();
	var nw = proj.fromLatLngToPoint(
		new google.maps.LatLng(
			bounds.getNorthEast().lat(),
			bounds.getSouthWest().lng()
		)
	);
	var point = proj.fromLatLngToPoint(position);
	return new google.maps.Point(
			Math.floor((point.x - nw.x) * scale),
			Math.floor((point.y - nw.y) * scale)
		);
	//{x: 17, y: 38}
}

//将谷歌地图的对象像素转为经纬度
var fromPixelToLatLng=function(pixel,map){
	var scale = Math.pow(2, Map.getZoom());
	var proj = Map.getProjection();
	var bounds = Map.getBounds();
	var nw = proj.fromLatLngToPoint(
		new google.maps.LatLng(
			bounds.getNorthEast().lat(),
			bounds.getSouthWest().lng()
		)
	);
	var point = new google.maps.Point();
	point.x = pixel.x / scale + nw.x;
	point.y = pixel.y / scale + nw.y;
	return proj.fromPointToLatLng(point);
}

module.exports={
	ContextMenu,
	fromLatLngToPixel
}