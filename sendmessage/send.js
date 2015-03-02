/* 
 * @Author: haoyang.li
 * @Date:   2015-03-02 14:38:07
 * @Last Modified by:   haoyang.li
 * @Last Modified time: 2015-03-02 14:39:15
 */
var activityID = window.activityId;
$('.J_prize').on('click', function() {
	var phone = $('.phone').val();
	if (!/0?(13|14|15|17|18)[0-9]{9}/.test(phone)) {
		$.pop.popAlert({
			tips: '您输入的手机号哪里不对哦~',
			subName: '确定',
			btnFn: function(thisPop) {
				thisPop.fadeOut(100, function() {
					$('.phone').val("");
				});
			}
		});
	} else {
		$.ajax({
			url: '/activityvip/oly/esteeLauderSendMsg?' + activityID + '&mobile=' + phone,
			success: function(_data) {
				switch (_data.code) {
					case 200:
						$('.tan-area').show();
						break;
					case 400:
						$.pop.popAlert({
							icon: 'smile',
							tips: '您输出的手机号哪里有误哦~',
							subtitle: '确定'
						});
						break;
					case 500:
						$.pop.popAlert({
							icon: 'smile',
							tips: '服务器错误',
							subtitle: '请稍后重试'
						});
						break;
					case 600:
						$.pop.popAlert({
							icon: 'smile',
							tips: '您已发输入过手机号',
							subtitle: '期待与您在柜台相遇~'
						});
						break;
					default:
						$.pop.popAlert({
							icon: 'smile',
							tips: '服务器错误',
							subtitle: '请稍后重试'
						});
						break;
				}
			},
			error: function() {
				$.pop.popAlert({
					icon: 'smile',
					tips: '服务器错误',
					subtitle: '请稍后重试'
				});
			}
		});

	}
});