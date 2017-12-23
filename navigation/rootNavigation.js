import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

export const Tabs = TabNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: {
			tabBarLabel: 'Home',
		},
	},
	Settings: {
		screen: SettingsScreen,
		navigationOptions: {
			tabBarLabel: 'Settings',
		},
	},
}, {
	tabBarPosition: 'bottom',
	swipeEnabled: false,
});