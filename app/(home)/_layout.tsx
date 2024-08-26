import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs } from 'expo-router'

import Colors from '@/constants/Colors'
import { useColorScheme } from '@/components/useColorScheme'
import { useClientOnlyValue } from '@/components/useClientOnlyValue'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={28} style={{ marginBottom: -2 }} {...props} />
}

export default function HomeLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabIconSelected,
        headerShown: useClientOnlyValue(false, true),
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="menu"
        options={{
          title: '메뉴',
          tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: '관심 상품',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          headerTitle: '푸디풀 FOODIFUL',
          // headerTitleStyle:
          // headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: '카트',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="cart-plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: '프로필',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  )
}
