import React from 'react'
import { View, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useTheme } from '@/Hooks'

interface Props {
  isLoading?:boolean,
  title?:string,
  darkmode?:boolean|null,
  changeTheme:(activated:boolean) => void
}

interface StarProps {
    isWhite : boolean
}
const HeaderHome = ({ isLoading, title, darkmode, changeTheme }: Props) => {
  const { Layout, Images, Colors, Fonts } = useTheme()
  return (
    <View style={{ flexDirection:'row', backgroundColor: Colors.inputBackground, alignItems:'center' , justifyContent:'space-between'}}>
      
        <View style={{ paddingVertical:15}}>
            {title &&
                <Text style={[Fonts.textRegular,{ marginLeft:20}]}>{title}</Text>
            }
        </View>

        <TouchableOpacity style={{ flexDirection:'row', alignItems:'center'}} onPress={():void=> changeTheme(darkmode?false:true)}>
          <Text style={[ Fonts.textSmall,{ 
            borderWidth:1,
            borderColor:Colors.grey,
            paddingLeft:10,
            paddingRight:15,
            paddingVertical:5,
            borderRadius:5,
            borderRightWidth:0,
            marginRight:-10
            }]}>{ !darkmode ? 'Dark Mode':'Light Mode'}</Text>
          {isLoading &&
            <ActivityIndicator size={'large'} color="#4343FF"/>
          }
          {!isLoading &&
            <Image source={!darkmode? Images.dark:Images.light} style={{ height:30, width:30, marginRight:20 }}/>
          }
        </TouchableOpacity>
        
      
    </View>
  )
}

HeaderHome.defaultProps = {
  isLoading : false,
  title: null,
  darkmode : false
}

export default HeaderHome
