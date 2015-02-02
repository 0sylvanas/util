//创建矩阵数组
Array.matrix = function(x,y,z){
	var a,i,j,mat = [];
	for(i = 0; i < x; i++){
		a = [];
		for(j = 0; j < y; j++){
			a[j] = z;
		}
		mat[i] = a;
	}
	return mat;
};
/**
 * [将图片变为焦点图]--无自动，简单动画，支持IE7，hover to show and hide toggle button
 * 根据页面上的  img-cnt（必填） 字段判断为几张图
 * 根据 pic_width（必填） 属性初始化 默认宽为440
 * 默认父类为  coursel
 */
function picmove(){
	var coursels = $('.coursel'),
		pic_width = window.pic_width || 440;
	coursels.mouseover(function() {
		var prev = $(this).find('.prev')[0], next = $(this).find('.next')[0], cnt = parseInt($(this).attr('img-cnt'), 10);
		if (cnt > 1) {
			prev.style.display = 'block';
			next.style.display = 'block';
		}
	});
	coursels.mouseout(function() {
		var prev = $(this).find('.prev')[0], next = $(this).find('.next')[0];
		prev.style.display = 'none';
		next.style.display = 'none';
	});
	coursels.on('click', function(e) {
		var left, target = e.target, courselMain = $(this).find('.coursel-main')[0], cnt = parseInt($(this).attr('img-cnt'), 10);
		if ($(target).hasClass('prev')) {
			left = parseInt(courselMain.style.left) || 0;
			left = left == 0 ? -((cnt - 1) * pic_width) : left + pic_width;
			courselMain.style.left = left + 'px';
		} else if ($(target).hasClass('next')) {
			left = parseInt(courselMain.style.left) || 0;
			left = left < -((cnt - 2) * pic_width) ? 0 : left - pic_width;
			courselMain.style.left = left + 'px';
		}
	});
}
function lee_data(type, activityID, success_function, fail_function){
	var icon,	//图标初始化
		index = [],
		max_index,	//最大index值
		shopArray = Array.matrix(type, 0),	//存放所有数据
		temptype = [],	//临时存放无type的数据
		tempindex = Array.matrix(type, 0);	//临时存放有type的数据
	$.ajax({
		url: '/activities/activity/getLaunchInfoByActivityId?activityID=' + activityID,
		// url: '/activities/activity/newarray',
		success: function(_data) {
			var data = JSON.parse(_data);
			/**
			 * 取到最大的index
			 */
			for(var i = 0, len = data.msg.length; i < len; i++){
				index.push(data.msg[i].index);
			}
			index.sort(function(a, b){
				return a - b;
			});
			max_index = index.pop();
				/**
				 * 将所有数据按type和index排成type*index.length的数组
				 */
			for(var i = 0, len = data.msg.length; i < len; i++){
				for(var j = 0; j < len; j++){
					if ( data.msg[j].index == (i+1) ){
						if( data.msg[j].type > 0 && data.msg[j].type <= type ){ //有type有index
							shopArray[ (data.msg[j].type-1) ].push(data.msg[j]);
						}
					}
				}
				if( data.msg[i].type > 0 && data.msg[i].type <= type ){
					if( data.msg[i].index == "" ){ //有type无index
						tempindex[ (data.msg[i].type-1) ].push( data.msg[i] ); //放到相应type末尾
					}
				}
				else{
					tempindex[0].push( data.msg[i] );	//type错误type1末尾
				}
			}
			//根据type 将无index的数据添加到对应位置
			for(var i = 0, len = tempindex.length; i < len; i++){
				for(var j = 0, len2 = tempindex[i].length; j < len2; j++){
					if( tempindex[i][j] !== "" && typeof(tempindex[i][j]) !== "undefined" ){ //无type
						if( tempindex[i][j].index == "" ){ //有type 无index  添加到对应type的末尾
							shopArray[i].push( tempindex[i][j] );
						}
						else{ //有type index  如果shopArray中有相同的index，那么添加到该对象后面，反之添加到前一个对象的后面
							tempindex[i][j].index == (shopArray[i][ (tempindex[i][j].index-1) ].index) ?
							shopArray[0].splice( (tempindex[i][j].index), 0, tempindex[i][j] ) :
							shopArray[0].splice( (tempindex[i][j].index-1), 0, tempindex[i][j] );
						}
					}
				}
			}
			success_function(shopArray);
		},
		error: function() {
			alert("系统打了个盹~~~");
		}
	});
}