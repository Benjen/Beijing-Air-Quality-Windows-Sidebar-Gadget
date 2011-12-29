var lang;
System.Gadget.onSettingsClosing = settingsClosing;

var SettingsPageElements = new Object();
SettingsPageElements.label = 'Language';
SettingsPageElements.label_cn = '”Ô—‘';

function init() {
	if (System.Gadget.Settings.read('settingsExist') == true) {
		lang = System.Gadget.Settings.readString('settingsLanguage');
	}
	else {
		lang = 'en';
	}
	
	if (lang == 'en') {
		document.getElementById('label').innerText = SettingsPageElements.label;
		document.getElementById('language').options[0].selected = true;
	}
	else {
		document.getElementById('label').innerText = SettingsPageElements.label_cn;
		document.getElementById('language').options[1].selected = true;
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

