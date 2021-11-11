import React, { useState, useEffect } from 'react'
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView, 
  Image,
  FlatList
} from 'react-native'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Brand, MovieCard } from '@/Components'
import { useTheme } from '@/Hooks'
import { useLazyFetchOneQuery } from '@/Services/modules/users'
import { useLazyLatestQuery } from '@/Services/modules/latest'
import { useLazyNowQuery, useLazySimiliarQuery, useLazyGenresQuery } from '@/Services/modules/movies'
import { changeTheme, ThemeState } from '@/Store/Theme'
import useImage from '@/Hooks/useImage'

const ExampleContainer = () => {
  const { imgFor } = useImage()
  const { t } = useTranslation()
  const { Common, Fonts, Gutters, Layout } = useTheme()
  const dispatch = useDispatch()
  const [userId, setUserId] = useState('9')
  const [fetchOne, { data, isSuccess, isLoading, isFetching, error }] =
    useLazyFetchOneQuery()
  const [latest, latestAction] = useLazyLatestQuery()
  const [now, nowAction] = useLazyNowQuery()
  const [similiar, similiarAction] = useLazySimiliarQuery()
  const [genres, genresAction] = useLazyGenresQuery()

  // useEffect(() => {
  //   fetchOne(userId)
  // }, [fetchOne, userId])
useEffect(() => {
  genres('init')
  latest('init')
  now("init")
}, [])

  const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
    dispatch(changeTheme({ theme, darkMode }))
  }
  console.log('data', nowAction.data)

  console.log('error', genresAction)
  if(nowAction.data){
    return(
      <SafeAreaView>
        <FlatList 
          data = {nowAction.data.results}
          contentContainerStyle={[Layout.column,{ marginHorizontal:20}]}
          renderItem={({item,index})=> {
            return (
              <MovieCard 
                url={item.poster_path} 
                mode="500px"
                title={item.title}
                releaseDate={item.release_date}
                voteAverage={item.vote_average}
                overview={item.overview}
                key={index+''}
                />
              )
          }}
        />
      </SafeAreaView>
    )
  }else{
  return (
    <ScrollView
      style={Layout.fill}
      contentContainerStyle={[
        Layout.fill,
        Layout.colCenter,
        Gutters.smallHPadding,
      ]}
    >
      <View style={[[Layout.colCenter, Gutters.smallHPadding]]}>
        <Brand />
        {(latestAction.isLoading || latestAction.isFetching) && <ActivityIndicator />}
        {!latestAction.isSuccess ? (
          <Text style={Fonts.textRegular}>{latestAction.error}</Text>
        ) : (
          <Text style={Fonts.textRegular}>
            {t('example.helloUser', { name: "nama"})}
          </Text>
        )}
      </View>
      <View
        style={[
          Layout.row,
          Layout.rowHCenter,
          Gutters.smallHPadding,
          Gutters.largeVMargin,
          Common.backgroundPrimary,
        ]}
      >
        <Text style={[Layout.fill, Fonts.textCenter, Fonts.textSmall]}>
          {t('example.labels.userId')}
        </Text>
        <TextInput
          onChangeText={setUserId}
          editable={!latestAction.isLoading}
          keyboardType={'number-pad'}
          maxLength={1}
          value={userId}
          selectTextOnFocus
          style={[Layout.fill, Common.textInput]}
        />
      </View>
      <Text style={[Fonts.textRegular, Gutters.smallBMargin]}>DarkMode :</Text>

      <TouchableOpacity
        style={[Common.button.rounded, Gutters.regularBMargin]}
        onPress={() => onChangeTheme({ darkMode: null })}
      >
        <Text style={Fonts.textRegular}>Auto</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[Common.button.outlineRounded, Gutters.regularBMargin]}
        onPress={() => onChangeTheme({ darkMode: true })}
      >
        <Text style={Fonts.textRegular}>Dark</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[Common.button.outline, Gutters.regularBMargin]}
        onPress={() => onChangeTheme({ darkMode: false })}
      >
        <Text style={Fonts.textRegular}>Light</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
}

export default ExampleContainer
