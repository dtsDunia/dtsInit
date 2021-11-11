import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, SafeAreaView, FlatList, Image } from 'react-native'
import { useTheme } from '@/Hooks'
import { useTranslation } from 'react-i18next'
import { MovieCard, Header } from '@/Components'
import { useLazyNowQuery, useLazySimiliarQuery, useLazyGenresQuery } from '@/Services/modules/movies'
import { setGenres, setMovies } from '@/Store/Movies'
import { GeneralState } from '@/Model'
import { changeTheme, ThemeState } from '@/Store/Theme'

const Home = () => {
    const [now, nowAction] = useLazyNowQuery()
    const [genres, genresAction] = useLazyGenresQuery()
    const { t } = useTranslation()
    const { Images, Fonts, Gutters, Layout } = useTheme()
    const monitor = useSelector((state:GeneralState) => state)
    const darkmode = useSelector((state:GeneralState) => state.theme.darkMode)
    const nowPlaying = useSelector((state:GeneralState) => state.movies.nowPlaying)
    const dispatch = useDispatch()
    const storingData = () => {
         if(genresAction.data){
            dispatch(setGenres({genres : genresAction.data}))
        }
        if(nowAction.data){
            dispatch(setMovies({movies : nowAction.data, page:1}))
        }
    }
    const initFirst = async () => {
        await genres('init')
        await now('1')
    }
    useEffect(() => {
        initFirst()
    }, [])
    useEffect(() => {
        
        if(!nowPlaying){
            storingData()
        }
        
    }, [nowAction.isSuccess])
    const onChangeTheme = ({ theme, darkMode }: Partial<ThemeState>) => {
        dispatch(changeTheme({ theme, darkMode }))
      }
    const loadMore = async() => {
        
        let currentPage : number = 0
        if(nowPlaying){
            currentPage = nowPlaying.page
        }
        const getPage : number = currentPage+1
        await now(getPage+'')
        if(nowAction.data){
            dispatch(setMovies({movies : nowAction.data, page:getPage}))
        }
    }
    if(monitor.movies.nowPlaying){
        return(
            <SafeAreaView>
                <Header title="Now Playing" 
                isLoading={nowAction.isFetching}
                darkmode = {darkmode}
                changeTheme ={(activated):void => onChangeTheme({ darkMode: activated })}
                />
                <FlatList 
                        data = {monitor.movies.nowPlaying.results}
                        contentContainerStyle={[Layout.column,{ marginHorizontal:20, marginTop:20}]}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item,index})=> {
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
                        }}
                        onEndReachedThreshold={0.1}
                        onEndReached={()=>loadMore()}
                        />
            </SafeAreaView>
            
        )

    }else{
        return (
            <SafeAreaView style={[Layout.fill, Layout.colCenter]}>
              
                   <View style={{ height: 500, width:338}}>
                    <Image source={Images.army} style={Layout.fullSize} resizeMode='contain' />
                    </View>
                
            </SafeAreaView>
        )
    }
}

export default Home
