import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ExampleContainer, HomePage } from '@/Containers'

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage} />
    </Tab.Navigator>
  )
}

export default MainNavigator
