import React from 'react';
import Expo, { SQLite } from 'expo';
// import Database from '../assets/database/model';
import { StyleSheet, Text, ScrollView, Button, StatusBar, View, ListView, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

// var conn = Database.getConnection(true);
const conn = SQLite.openDatabase({ name: "db_trackr.db", location: "Library" }, this.openCB, this.errorCB);
export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: {
				'2017-10-17': [{ startingDay: true }, { endingDay: true, color: 'orange' }],
				'2017-10-24': [{ startingDay: true }, { endingDay: true, color: 'orange' }],
			}
		};
		// this.setState({ users: conn.getPeople() });
		// console.log(Database.getPeople());
		// this.setState({ users: Database.getPeople() });
		this.onDayPress = this.onDayPress.bind(this);
	}

	render() {
		this.setState({
			users: {name: "Abhinav Mathur", role: "Student"},
		});
		return (
			<ScrollView>

				<ScrollView style={styles.container}>
					<Text style={styles.text}>Select a Date to view its events</Text>
					<Calendar
						onDayPress={(day) => this.onDayPress(day)}
						style={styles.calendar}
						markedDates={this.state.selected}
						markingType={'interactive'}
					/>
				</ScrollView>

				<SwipeRow leftOpenValue={150} rightOpenValue={-150}>

					<View style={styles.standaloneRowBack}>
						<TouchableOpacity style={[styles.backLeftBtn, styles.backLeftBtnLeft]} onPress={_ => alert('You did it')}>
							<Text style={styles.backTextWhite}>You</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.backLeftBtn, styles.backLeftBtnRight]} onPress={_ => alert('Someone else did it')}>
							<Text style={styles.backTextWhite}>Other</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={_ => alert('Edit')}>
							<Text style={styles.backTextWhite}>Edit</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={_ => alert('Delete')}>
							<Text style={styles.backTextWhite}>Delete</Text>
						</TouchableOpacity>
					</View>

					<View style={styles.standaloneRowFront}>
						<Text style={{ padding: 10, fontSize: 15 }}>{this.state.users.name}</Text>
					</View>

				</SwipeRow>

			</ScrollView>
		);
	}

	onDayPress(day) {
		this.setState({
			selected: day.dateString
		});
		console.warn(day);
	}
}

const styles = StyleSheet.create({
	calendar: {
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#eee',
	},
	text: {
		textAlign: 'center',
		borderColor: '#bbb',
		padding: 10,
		backgroundColor: '#eee'
	},
	container: {
		flex: 1,
		backgroundColor: 'gray',
		paddingTop: isNaN(StatusBar.currentHeight) ? 24 : StatusBar.currentHeight,
	},
	eventPane: {
		padding: 10,
		paddingBottom: isNaN(StatusBar.currentHeight) ? 64 : 54
	},
	standalone: {
		marginTop: 30,
		marginBottom: 30,
	},
	standaloneRowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		justifyContent: 'center',
		height: 70,
	},
	standaloneRowBack: {
		alignItems: 'center',
		backgroundColor: '#8BC645',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15
	},
	backTextWhite: {
		color: '#FFF'
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0
	},
	backLeftBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backLeftBtnLeft: {
		backgroundColor: 'blue',
		left: 0
	},
	backLeftBtnRight: {
		backgroundColor: 'red',
		left: 75
	},
});