const en_gb_labels = require('../labels/en-GB.json');
const de_de_labels = require('../labels/de-DE.json');
const fr_fr_labels = require('../labels/fr-FR.json');

export const validLocale = (locale) => {
	const valid = new Set(['en-gb', 'de-de', 'fr-fr']);
	return locale && valid.has(locale.toLowerCase());
}

export const getLabels = (locale) => {
	switch (locale.toLowerCase()) {
		case 'en-gb':
			return en_gb_labels;
		case 'de-de':
			return de_de_labels;
		case 'fr-fr':
			return fr_fr_labels;
		default:
			return en_gb_labels;
	}
}