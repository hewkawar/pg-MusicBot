const en_us = require('./langs/en-us.json');
const th = require('./langs/th.json');

function main(locale, path) {
    const Lang = {
        default: en_us,
        th: th
    };

    let localeText = path;

    try {
        if (Lang[locale] && Lang[locale][path]) {
            localeText = Lang[locale][path];
        } else if (Lang.default[path]) {
            localeText = Lang.default[path];
        } else {
            console.log(localeText);
        }
    } catch (error) {
        console.error(error);
    }


    return localeText;
}

module.exports = main;
