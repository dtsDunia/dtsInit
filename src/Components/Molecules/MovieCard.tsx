import React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native'
import { useTheme } from '@/Hooks'
import useImage from '@/Hooks/useImage'
import RateStar from '../Atoms/RateStar'
import moment from 'moment'
import { NowPlayingResult } from '@/Services/modules/movies'
import { useNavigation } from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { RootStackParamList } from '@/Navigators/utils'
interface Props {
  url?: null | string
  title?: null | string
  releaseDate?: null | string
  voteAverage?: null | number
  overview?:string | null
  mode?: 'original' | '500px' 
  data: NowPlayingResult
}

type GeneralStack = StackNavigationProp<RootStackParamList,'Detail'>

const MovieCard = ({ url, mode, title, releaseDate, voteAverage, overview,data }: Props) => {
  const { Layout, Images, Fonts, Colors } = useTheme()
  const { imgFor } = useImage()
  const navigation = useNavigation<GeneralStack>()
  return(
    <TouchableOpacity style={{ flexDirection:'row', marginBottom:10}} onPress={() => navigation.navigate('Detail',data)}>
      <Image source={{uri:imgFor(url,mode == 'original'?true:false)}} style={{ height:150, width:100, borderTopLeftRadius:15, borderBottomLeftRadius:15 }}/>
      <View style={{ borderTopWidth:1, borderColor: Colors.grey, borderTopRightRadius:15}}>
        <Text style={[Fonts.textRegular,{ marginLeft:10, marginRight:100, flex:1}]}>{title}</Text>
        <Text style={{ marginLeft:10, color: Colors.grey, marginRight:100}}  numberOfLines={3} >{overview}</Text>
        <RateStar value={voteAverage}/>
        <Text style={[Fonts.textSmall,{ marginLeft:10 }]}>{moment(releaseDate,'YYYY-MM-DD').fromNow()+' released'}</Text>
      </View>
    </TouchableOpacity>
  )
}

MovieCard.defaultProps = {
  url: null,
  mode: 'original',
  title: null,
  releaseDate: null,
  voteAverage: null,
  overview: null,

}

export default MovieCard
