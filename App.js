import Expo from 'expo';
import React from 'react';
// import Database from './assets/database/model';
import { StyleSheet, Text, View } from 'react-native';
import { Tabs } from './navigation/rootNavigation';

export default class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		// var conn = Database.getConnection(true);
		return (
			<Tabs />
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20,
	},
});
