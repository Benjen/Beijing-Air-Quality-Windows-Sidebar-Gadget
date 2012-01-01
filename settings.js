var lang;
System.Gadget.onSettingsClosing = settingsClosing;

var SettingsPageElements = new Object();
SettingsPageElements.label = 'Language';
SettingsPageElements.label_cn = "语言";

function init() {
	if (System.Gadget.Settings.read('settingsExist') == true) {
		lang = System.Gadget.Settings.readString('settingsLanguage');
	}
	else {
		lang = 'en';
	}
	
	if (lang == 'en') {
		//document.getElementById('label').innerText = SettingsPageElements.label;
		document.getElementById('language').options[0].selected = true;
		document.getElementById('more-info').innerHTML = 'Data is sourced from the U.S. Embassy Beijing <a href="http://beijing.usembassy-china.org.cn/070109air.html">website</a>, which contains information on the interprutation and limitations of this data. The gadget author is not affiliated with the U.S. Embassy in any form and takes no responsibility for data presented.';
	}
	else {
		//document.getElementById('label').innerText = SettingsPageElements.label_cn;
		document.getElementById('language').options[1].selected = true;
		document.getElementById('more-info').innerHTML = convertToEntities('此信息来自驻北京美国大使馆网站。请采访此网站为了得到更多信息分析。');
//		document.getElementById('more-info').innerHTML = '&#27492;&#20449;&#24687;&#26469;&#33258;&#39547;&#21271;&#20140;&#32654;&#22269;&#22823;&#20351;&#39302;&#32593;&#31449;&#12290;&#35831;&#37319;';
	}
}

function settingsClosing(event) {
	if (event.closeAction == event.Action.commit) {
		var ele = document.getElementById('language');
		lang = ele.options[ele.selectedIndex].value;
		System.Gadget.Settings.writeString('settingsLanguage', lang);
		System.Gadget.Settings.write('settingsExist', true);
		event.cancel = false;
	}
};

// Convert string of characters to unicode equivalent. Needed to display Chinese characters using javascript. 
function convertToEntities(str) {
	var tstr = str;
	var bstr = '';
	for(i=0; i < tstr.length; i++) {
		if(tstr.charCodeAt(i) > 127) {
			bstr += '&#' + tstr.charCodeAt(i) + ';';
		}
		else {
			bstr += tstr.charAt(i);
		}
	}
	return bstr; 
}
