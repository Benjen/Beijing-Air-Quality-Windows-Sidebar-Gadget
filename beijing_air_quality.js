
// Create AQI object to hold AQI properties.
var Aqi = new Object();
Aqi.value = null;
Aqi.color = null;
Aqi.textColor = null;
Aqi.category = null;
Aqi.advisory = 'Advisory not avaiable';
Aqi.category_cn = null;
Aqi.advisory_cn = '找不到相关信息';

// Create page properties object.
var PageElements = new Object();
PageElements.language = 'en';
PageElements.title = 'Beijing Air Quality';
PageElements.title_cn = '北京空气质量';

// Assign callback functions to flyout onShow and onHide events.
System.Gadget.Flyout.onShow = showFlyout;
System.Gadget.Flyout.onHide = hideFlyout;

//Delegate for when the Settings dialog is closed.
System.Gadget.onSettingsClosed = SettingsClosed;

/**
 * Init function.
 */
function baq_init() {
	// Specify the Flyout root.
    System.Gadget.Flyout.file = "flyout.html";
    System.Gadget.settingsUI = "settings.html";

 	refreshGadget();
	// Set refresh rate.
	setInterval("refreshGadget()", 60000);
}

/**
 * Display the Flyout state in the gadget.
 */
function showFlyout() {
	if (System.Gadget.Flyout.document) {
		if (PageElements.language == 'en') {
			System.Gadget.Flyout.document.getElementById("advisory").innerText = Aqi.advisory;
		}
		else {
			$(System.Gadget.Flyout.document.getElementById("advisory")).addClass('chinese').html(Aqi.advisory_cn);
			$(System.Gadget.Flyout.document.getElementById("title")).addClass('chinese').html('提示');
		}
		$(System.Gadget.Flyout.document.getElementById("wrapper")).css({'borderLeft' : '5px solid ' + Aqi.color});
		$(System.Gadget.Flyout.document.getElementById("title")).css({'backgroundColor' : Aqi.color, 'color' : Aqi.textColor});
	}
}

/**
 * Hide the flyout and display the Flyout state in the gadget.
 */
function hideFlyout() {
}

/**
 * Extend String object to include trim function which removes whitespace from a string
 */
String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
};

/**
 * Sanitize string to prevent XSS attacks.
 */ 
function sanitizeString(str) {
	str = str.replace('&', '&amp;');
	str = str.replace('<', '&lt;');
	str = str.replace('>', '&gt;');
	str = str.replace('"', '&quot;');
	str = str.replace('\'', '&#x27;');
	str = str.replace('/', '&#x2F;');
	return str;
}

function switchLanguage(lang) {
	if (lang == 'en') {
		// Set title.
    	$('#title').html(PageElements.title);
    	// Set category.
    	$('#aq-summary-link').html(Aqi.category);
    }
    else {
    	// Set title.
    	$('#title').addClass('chinese').html(PageElements.title_cn);
    	// Set category.
    	$('#aq-summary-link').addClass('chinese').html(Aqi.category_cn);
    }

}



/**
 * Set message properties
 */
function setAqiParams(aqi) {
	Aqi.value = aqi;
	if (aqi > 300) {
	    Aqi.category = 'Hazardous';	
	    Aqi.category_cn = '危险';
	    Aqi.advisory = 'Everyone should avoid all physical activity outdoors; people with heart or lung disease, older adults, and children should remain indoors and keep activity levels low.';
	    Aqi.advisory_cn = '所有人都应该避免户外活动。有心脏或肺病的人、老人和小孩应该保持在室内，减少活动。';
	    Aqi.color ='#7E0023';
	    Aqi.textColor = '#F0F0F0';
	}
	else if (aqi > 200 && aqi <= 300) {
		Aqi.category = 'Very Unhealthy';	
	    Aqi.category_cn = '非常不健康';
		Aqi.advisory = 'People with heart or lung disease, older adults, and children should avoid all physical activity outdoors. Everyone else should avoid prolonged or heavy exertion.';
	    Aqi.advisory_cn = '有心脏或肺部疾病的人、老人和小孩应该避免所有户外活动。其他人也应该避免长期或沉重的负荷。';
		Aqi.color ='#99004C';
	    Aqi.textColor = '#F0F0F0';
	}
	else if (aqi > 150 && aqi <= 200) {
		Aqi.category = 'Unhealthy';	
	    Aqi.category_cn = '不健康';
		Aqi.advisory = 'People with heart or lung disease, older adults, and children should avoid prolonged or heavy exertion; everyone else should reduce prolonged or heavy exertion.';
	    Aqi.advisory_cn = '有心脏或肺部疾病的人、老人和小孩应该避免长期或沉重的负荷。其他人也应该减少长期或沉重的负荷。';
		Aqi.color ='#FF0000';
	    Aqi.textColor = '#F0F0F0';
	}
	else if (aqi > 100 && aqi <= 150) {
		Aqi.category = 'Unhealthy (Sensitive groups)';	
	    Aqi.category_cn = '对敏感人群不健康';
		Aqi.advisory = 'People with heart or lung disease, older adults, and children should reduce prolonged or heavy exertion.';
	    Aqi.advisory_cn = '有心脏或肺部疾病的人、老人和小孩应该减少长期或沉重的负荷。';
	    Aqi.color ='#FF7E00';
	    Aqi.textColor = '#3F3F3F';
	}
	else if (aqi > 50 && aqi <= 100) {
		Aqi.category = 'Moderate';	
	    Aqi.category_cn = '中等';
		Aqi.advisory = 'Unusually sensitive people should consider reducing prolonged or heavy exertion.';
	    Aqi.advisory_cn = '特别敏感的人群应该考虑减少长期或沉重的负荷。';
	    Aqi.color ='#FFFF00';
	    Aqi.textColor = '#3F3F3F';
	}
	else {
		Aqi.category = 'Good';	
	    Aqi.category_cn = '健康';
		Aqi.advisory = 'None';
	    Aqi.advisory_cn = '无';
	    Aqi.color ='#00E400';
	    Aqi.textColor = '#3F3F3F';
	}
}

/**
 * Refresh the gadget
 */
function refreshGadget() {
	var feedStr = $('#source-data').html();
	
	// Clear existing data.
	$('#source-data').html('');
	// Get new data.
	$('#source-data').html(feedStr);
	
	// Extract and process data.
	var feedData = $('.rss-item:first', '#source-data').html();
	var rawData = feedData.slice(feedData.search(/<br>/i));
	var feedConstant = new Object();
	feedConstant.DATE = 0;
	feedConstant.TIME = 1;
	feedConstant.PPM25_VALUE = 3;
	feedConstant.PPM25_AQI_VALUE = 4;
	feedConstant.MESSAGE = 5;
	feedConstant.OZONE_VALUE = 6;
	rawData = rawData.split(';');
	
	// Process data message.
	rawData[feedConstant.MESSAGE] = rawData[feedConstant.MESSAGE].slice(0, rawData[feedConstant.MESSAGE].indexOf('(')).trim();
    setAqiParams(parseInt(rawData[feedConstant.PPM25_AQI_VALUE].trim()));
    
    // Configure UI for given language.
    if (System.Gadget.Settings.read('settingsExist')) {
    	PageElements.language = System.Gadget.Settings.read('settingsLanguage');
    }
    else {
    	PageElements.language = 'en';
    }    
    switchLanguage(PageElements.language);
	
	$('#aq-summary-link').css({'backgroundColor' : Aqi.color, 'color' : Aqi.textColor}).fadeOut().fadeIn();
	
	// Set click event.
	$('#aq-summary-link').click(function() {
        // Toggle on or off based on current show state. 
		if (!System.Gadget.Flyout.show) {
        	System.Gadget.Flyout.show = true;
        }
        else {
        	System.Gadget.Flyout.show = false;
        }
    });
    
//	For testing purposes.
//	setAqiParams(140);
	$('#ppm25-value').html(sanitizeString(rawData[feedConstant.PPM25_VALUE]));
	$('#ozone-value').html(sanitizeString(rawData[feedConstant.OZONE_VALUE]));
}

function SettingsClosed(event) {
    // User hit OK on the settings page.
    if (event.closeAction == event.Action.commit) {
    	PageElements.language = System.Gadget.Settings.readString("settingsLanguage");
    	// Configure UI for given language.
        switchLanguage(PageElements.language);
        refreshGadget();
    } 
    // User hit Cancel on the settings page.
    else if (event.closeAction == event.Action.cancel) {
        SetContentText("Cancelled");
    }
}