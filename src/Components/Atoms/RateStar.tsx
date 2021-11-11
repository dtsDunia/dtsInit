import React from 'react'
import { View, Image, Text } from 'react-native'
import { useTheme } from '@/Hooks'

interface Props {
  value?:number|null
}
interface StarProps {
    isWhite : boolean
}
const RateStar = ({ value }: Props) => {
  const { Layout, Images, Fonts } = useTheme()
  const Star = ({isWhite}:StarProps)  =>{
    
    return(
        <Image source={isWhite?Images.unstar:Images.star} 
        style={{ height:18, width:18, marginRight:5 }}/>
    )
  }
  return (
    <View style={{ marginLeft:10,flexDirection:'row' }}>
      <Star isWhite ={value ?value >= 1 ? false:true:false} />
      <Star isWhite ={value ?value >= 5.5 ? false:true:false} />
      <Star isWhite ={value ?value >= 6.5 ? false:true:false} />
      <Star isWhite ={value ?value >= 7.5 ? false:true:false} />
      <Star isWhite ={value ?value >= 8.5 ? false:true:false} />
      <Text style={[Fonts.textSmall,{ marginLeft:10}]}>{value}</Text>
    </View>
  )
}

RateStar.defaultProps = {
  value : null
}

export default RateStar
