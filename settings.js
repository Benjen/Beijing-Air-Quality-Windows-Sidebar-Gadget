var lang;
System.Gadget.onSettingsClosing = settingsClosing;

var SettingsPageElements = new Object();
SettingsPageElements.label = 'Language';
SettingsPageElements.label_cn = "����";

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
		document.getElementById('more-info').innerHTML = '����Ϣ����פ����������ʹ����վ����ɷô���վΪ�˵õ�������Ϣ������';
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

