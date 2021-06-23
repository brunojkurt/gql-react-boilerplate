import React, { useState } from 'react'
import I18nContext from './context'
import locales from './locales'

const I18nProvider = ({ children }) => {
  const [currlanguage, setCurrLanguage] = useState(() => {
    const language = window.localStorage.getItem('language')
    const navigatorLanguage = window.navigator.language.split('-')[0]
    return language || navigatorLanguage
  })

  const translation = (translation) => {
    return locales[currlanguage] ? locales[currlanguage][translation] : locales.en[translation]
  }

  const changeLanguage = (language) => {
    window.localStorage.setItem('language', language)
    setCurrLanguage(language.split('-')[0])
  }

  const contextData = {
    currlanguage,
    changeLanguage,
    t: translation
  }

  return (
    <I18nContext.Provider value={contextData}>
      {children}
    </I18nContext.Provider>
  )
}

export default I18nProvider
