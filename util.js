/* 
* @Author: haoyang.li
* @Date:   2015-01-29 16:10:24
* @Last Modified by:   haoyang.li
* @Last Modified time: 2015-03-03 20:35:40
*/
/**
 * 判断是否为数组
 */
var is_array = function(value) {
    return Object.prototype.toString.apply(value) === '[object Array]';
};

/**
 * 去空格方法
 */
String.prototype.trim = function() {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

/**
 * 替换被{}包含的字符串
 */
function substitute(str, sub) {
    return str.replace(/\{(.+?)\}/g, function($0, $1) {
        return $1 in sub ? sub[$1] : $0;
    });
}

/**
 * 懒加载
 */
function imgLazyLoad() {
    var imgs = $('.J_shop-list img'),
        WIN = $(window);
    WIN.on('scroll', function() {
        imgs.each(function() {
            var self = $(this),
                imgSrc = self.attr('data-src');
            if (self.offset().top < WIN.height() + WIN.scrollTop() && imgSrc) {
                self.removeAttr('data-src');
            }
        });
    }).trigger('scroll');
}

/**
 * 获取cookie
 */
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

/**
 * 获取地址栏参数
 */
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == Null || result.length < 1) {
        return "";
    }
    return result[1];
}

/**
 * 数组篇
 */

/**
 * 字符串处理
 */
function StringBuffer() {
    var arr = new Array;
    this.append = function(str) {
        arr[arr.length] = str;
    };
    this.toString = function() {
        return arr.join("");
    };
}

/**
 * 把数组转换成特定符号分割的字符串
 */
function arrayToString(arr, separator) {
    if (!separator)
        separator = "";
    return arr.join(separator);
}

/**
 * 查找数组包含的字符串
 */
function arrayFindString(arr, string) {
    var str = arr.join("");
    return str.indexOf(string);
}

/**
 * 构造一个单位矩阵
 */
Array.identity = function(n) {
    var i, mat = Array.matrix(n, n, 0);
    for (i = 0; i < n; i++) {
        mat[i][i] = 1;
    }
    return mat;
};

/**
 * 构造一个 x*y 默认值为z的矩阵数组
 */
Array.matrix = function(x, y, z) {
    var a, i, j, mat = [];
    for (i = 0; i < x; i++) {
        a = [];
        for (j = 0; j < y; j++) {
            a[j] = z;
        }
        mat[i] = a;
    }
    return mat;
};

/**
 * 去除相邻的重复字符串
 */
Array.prototype.unique = function() {
    var res = [],
        json = {};
    for (var i = 0; i < this.length; i++) {
        if (!json[this[i]]) {
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
};


/**
 * [Clock]
 * @param  clockDiv [传入的div对象]
 */
function Clock(clockDiv) {
    this.clockDiv = clockDiv;
    this.getCurrentDate = function() {
        //获取当前日期
        var currDate = new Date();
        //分别获取 年、月、日、时、分、秒
        var currDateTime = currDate.getFullYear();
        //getYear();在chrome和IE9以上的版本输出的是距离1900多少年而非实际年数
        //改为用getFullYear();

        currDateTime += "-";
        currDateTime += (currDate.getMonth() + 1);
        currDateTime += "-";
        currDateTime += currdate.getDate();
        currDateTime += " ";
        currDateTime += currDate.getHours();
        currdateTime += ":";
        currDateTime += currDate.getMinutes();
        currDateTime += ":";
        currDateTime += currDate.getSeconds();
        //将当前时间赋值到div对象中
        this.clockDiv.innerHTML = currDateTime;
    };
}