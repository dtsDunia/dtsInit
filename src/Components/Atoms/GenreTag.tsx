import React from 'react'
import { View, FlatList, Text } from 'react-native'
import { useTheme } from '@/Hooks'

interface Props {
  tags:string[]
}
interface TagProps {
    label : string
}
const GenreTag = ({ tags }: Props) => {
  const { Layout, Images, Fonts, Colors } = useTheme()
  const Tag = ({label}:TagProps)  =>{
    return(
        <View style={{ backgroundColor : Colors.primary, padding: 5, marginRight:5 }}>
            <Text>{label}</Text>
        </View>
    )
  }
  return (
    <View style={{ marginLeft:10, marginBottom:5 }}>
      <FlatList
        data={tags}
        contentContainerStyle={{ }}
        horizontal={true}
        renderItem={({item,index}) => (
            <Tag label={item} key={index}/>
        )}
      />
    </View>
  )
}

GenreTag.defaultProps = {
  tags : []
}

export default GenreTag
