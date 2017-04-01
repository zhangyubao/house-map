/**
 * 房源数据类
 * @param {Object} address  房源地址
 * @param {Object} areas  房源面积 厅室
 * @param {Object} housetype  房源类型
 * @param {Object} detail 房源详情url
 * @param {Object} icon 房源图片
 */
function House(listingname, square, village, detail_1, detail_2, icon, price) {
	this.listingname = listingname;
	this.square = square;
	this.village = village;
	this.detail_1 = detail_1;
	this.detail_2 = detail_2;
	this.icon = icon;
	this.price = price;
}