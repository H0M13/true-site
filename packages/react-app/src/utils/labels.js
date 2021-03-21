const en_gb_labels = require('../../src/labels/en-GB.json');

export const validLocale = (locale) => {
	const valid = new Set(['en-gb']);
	return locale && valid.has(locale.toLowerCase());
}

export const getLabels = (locale) => {
	switch (locale.toLowerCase()) {
		case 'en-gb':
			return en_gb_labels;
		default:
			return en_gb_labels;
	}
}