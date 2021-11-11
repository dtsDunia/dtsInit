/**
 * @format
 */
import 'react-native'
import React from 'react'
import App from '../src/App'
import useImage from '@/Hooks/useImage'
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'


const { imgFor } = useImage()
it('renders correctly', () => {
  renderer.create(<App />)
})

test('image ori',()=>{
  expect(imgFor("asd",true)).toBe('https://image.tmdb.org/t/p/original/asd')
})
test('img 500', ()=> {
  expect(imgFor("asd",false)).toBe('https://image.tmdb.org/t/p/w500/asd')
})