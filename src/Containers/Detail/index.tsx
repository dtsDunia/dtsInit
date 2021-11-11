import { useRoute } from '@react-navigation/core'
import React,{useEffect} from 'react'
import { View, Text, Image, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import { RootStackParamList } from '@/Navigators/utils'
import { RouteProp } from '@react-navigation/native';
import useImage from '@/Hooks/useImage'
import { GenreTag, RateStar, MovieCard, Header } from '@/Components';
import { useTheme } from '@/Hooks'
import { NowPlayingResult } from '@/Services/modules/movies';
import { GeneralState } from '@/Model'
import { useSelector,useDispatch } from 'react-redux';
import { useLazyNowQuery, useLazySimiliarQuery, useLazyGenresQuery } from '@/Services/modules/movies'
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native'
import { setSimilar, clearSimilar } from '@/Store/Movies';
import { changeTheme, ThemeState } from '@/Store/Theme'
import { useSharedValue } from 'react-native-reanimated';
const Detail = () => {
    let firstData : NowPlayingResult 
    const dispatch = useDispatch()
    const darkmode = useSelector((state:GeneralState) => state.theme.darkMode)
    const genres = useSelector((state: GeneralState) => state.movies.genres)
    const similarData = useSelector((state: GeneralState) => state.movies.similar)
    const route = useRoute<RouteProp<RootStackParamList,'Detail'>>();
    firstData = route.params
    const isFocused = useIsFocused()
    const { Layout, Images, Fonts, Colors } = useTheme()
    const { imgFor } = useImage()
    const [similiar, similiarAction] = useLazySimiliarQuery()
    const currentDataId = useSelector((state: GeneralState)  => state.movies.similar.movieId)
    //show genres
    let genreListRaw : any[];
    let genreList:string[];
    if(genres){
        genreListRaw = genres.map((dt) =>{ if(firstData.genre_ids.includes(dt.id)){ return dt.name }})
        genreList = genreListRaw.filter((element)=> element !== undefined)
    }else{
        genreListRaw= []
        genreList = []
    }
    const initFetch = async () => {
        await similiar(firstData.id+'')
    }

    useEffect(() => {
        initFetch()
        return () => {
            dispatch(clearSimilar())
        }
    }, [])

    // useEffect(() => {
    //     console.log("isfouse", isFocused)
    // }, [isFocused])

    const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
        dispatch(changeTheme({ theme, darkMode }))
      }
    
    useEffect(() => {
        if(!similarData.movieId && similiarAction.data){
            
            dispatch(setSimilar({page:1, movieId:firstData.id,similar:similiarAction.data.results}))
        }
    }, [similiarAction.isFetching])
    useEffect(() => {
        if( currentDataId != firstData.id && !similiarAction.isFetching){
            
            initFetch()
        }
    }, [firstData.id])

    console.log("data", similarData)
    return (
        <SafeAreaView>
        <Header title="Detail Movie" 
                isLoading={similiarAction.isFetching}
                darkmode = {darkmode}
                changeTheme ={(activated):void => onChangeTheme({ darkMode: activated })}
                />
          {similiarAction.data &&
            <FlatList 
                        ListHeaderComponent={()=>(
                            <View>
                                <View style={{ flex:1}}>
                                    <Image source={{ uri : imgFor(firstData.backdrop_path,false)}} style={{ width:"100%", height:281, borderBottomLeftRadius:30, borderBottomRightRadius:30}}/>
                                    
                                </View>
                                <View style={{ marginLeft:20, marginTop:-75}}>  
                                    <GenreTag tags={genreList}/>
                                    <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                                        <RateStar value={firstData.vote_average}/>
                                        <Text style={{ color:'#ffffff', marginRight:30}}>{moment(firstData.release_date,'YYYY-MM-DD').format('DD/MM/YYYY')}</Text>
                                    </View>
                                    
                                </View>
                                <Text style={[Fonts.titleSmall,{marginTop:20, marginLeft:20 }]}>{firstData.title}</Text>
                                <Text style={[Fonts.textRegular,{marginLeft:20, marginBottom:20}]}>{firstData.overview}</Text>
                                        
                            </View>
                        )}
                        data = {similiarAction.data.results}
                        contentContainerStyle={[Layout.column,{ marginHorizontal:20 }]}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item,index})=> {
                            if(!similiarAction.isFetching){
                            return (
                            <MovieCard 
                                url={item.poster_path} 
                                mode="500px"
                                title={item.title}
                                releaseDate={item.release_date}
                                voteAverage={item.vote_average}
                                overview={item.overview}
                                key={index+''+item.id}
                                data={item}
                                />
                            )
                            }else{
                                return(
                                    <View>
                                        {/* <ActivityIndicator size={'large'} color="#4343FF"/> */}
                                    </View>
                                )
                            }
                        }}
                        // onEndReachedThreshold={0.1}
                        // onEndReached={()=>loadMore()}
                        ListFooterComponent={() => {
                            if(similiarAction.isFetching){
                            return(
                                    <View>
                                        <ActivityIndicator size={'large'} color="#4343FF"/>
                                    </View>
                                )
                            }else{
                                return(
                                    <View>
                                    </View>
                                )
                            }
                            }
                        }
                        />
            }
        </SafeAreaView>
    )
}

export default Detail
