import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const Languages = {
    zh: { displayName: '香港(繁體中文)' },
    en: { displayName: 'English' }
}

export const resources = Object.keys(Languages).reduce((accumulator, currentValue) => {
    return {
        ...accumulator,
        [currentValue]: {
            translation: require(`./sources/${currentValue}.json`)
        }
    }
}, {});

i18n
    .use(initReactI18next)

    .init({
        fallbackLng: 'en',
        resources,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        }
    })



export default i18n;