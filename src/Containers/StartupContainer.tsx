import React, { useEffect } from 'react'
import { ActivityIndicator, View, Text } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/Hooks'
import { Brand } from '@/Components'
import { setDefaultTheme } from '@/Store/Theme'
import { navigateAndSimpleReset } from '@/Navigators/utils'
import { useLazyNowQuery, useLazySimiliarQuery, useLazyGenresQuery } from '@/Services/modules/movies'

const StartupContainer = () => {
  const { Layout, Gutters, Fonts } = useTheme()
  const [now, nowAction] = useLazyNowQuery()

  const { t } = useTranslation()

  const init = async () => {
    await new Promise(resolve =>
      setTimeout(() => {
        resolve(true)
      }, 2000),
    )

    await setDefaultTheme({ theme: 'default', darkMode: null })
    navigateAndSimpleReset('Main')
  }

  useEffect(() => {
    init()

  })
  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand width={800} height={500} />
    <ActivityIndicator size={'large'} style={[Gutters.largeVMargin]} />
      <Text style={[Fonts.textRegular,{textAlign:'center'}]}>13 Desember 2021 on NETFLIX</Text>
    </View>
  )
}

export default StartupContainer
