import React from 'react';
import { SQLite } from 'expo';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, StatusBar, FlatList, ListView, TouchableHighlight } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import ActionButton from 'react-native-action-button';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const extractKey = ({ id }) => id;
export default class SettingsScreen extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			users: [
				{ id: 'No', firstname: 'record', lastname: 'found' },
			],
		};
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.fetchData = this.fetchData.bind(this);
	}

	fetchData() {
		let dataStore = SQLite.openDatabase({ name: 'db_trackr.db', createFromLocation: "~db_trackr.db", location: 'Library' }, this.openCB, this.errorCB);

		dataStore.transaction(tx => {
			console.warn('running');
			tx.executeSql('SELECT * FROM people', [], (tx, rs) => {
				console.log(rs);
				this.setState({ users: rs.rows.array });
			}, (tx, err) => {
				console.log('From settings screen select *');
				console.warn(err);
			})
		});
	}

	componentDidMount() {
		this.fetchData();
	}

	openCB() {
		console.log('db opened settings.js');
	}

	errorCB() {
		console.warn('db error settings.js');
	}

	render() {

		return (
			<View style={styles.container}>

				<SwipeListView
					enableEmptySections={true}
					dataSource={this.ds.cloneWithRows(this.state.users)}
					renderRow={data => (
						<TouchableHighlight
							onPress={_ => console.log('You touched me')}
							/*style={styles.row}*/
							underlayColor={'#AAA'}
						>
							<View style={styles.row}>
								<Text>{data.id}</Text>
								<Text>{data.firstname}</Text>
								<Text>{data.lastname}</Text>
							</View>
						</TouchableHighlight>
					)}
					renderHiddenRow={(data, secId, rowId, rowMap) => (
						<View style={styles.rowBack}>
							<Text>Left</Text>
							<View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
								<Text style={styles.backTextWhite}>Right</Text>
							</View>
							<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}/* onPress={_ => this.deleteRow(secId, rowId, rowMap)}*/>
								<Text style={styles.backTextWhite}>Delete</Text>
							</TouchableOpacity>
						</View>
					)}
					leftOpenValue={150}
					rightOpenValue={-150}
				/>

				<ActionButton buttonColor="rgba(231,76,60,1)" offsetX={10} offsetY={10}>
					<ActionButton.Item buttonColor='#9b59b6' title="New Class" onPress={() => console.log("notes tapped!")}>
						<MaterialIcon name="group-work" style={styles.actionButtonIcon} />
					</ActionButton.Item>
					<ActionButton.Item buttonColor='#3498db' title="New Schedule" onPress={() => { }}>
						<IonIcon name="md-calendar" style={styles.actionButtonIcon} />
					</ActionButton.Item>
					<ActionButton.Item buttonColor='#1abc9c' title="New Trainers" onPress={() => { }}>
						<IonIcon name="md-people" style={styles.actionButtonIcon} />
					</ActionButton.Item>
				</ActionButton>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#fff',
		// alignItems: 'stretch',
		justifyContent: 'center',
		paddingTop: isNaN(StatusBar.currentHeight) ? 24 : StatusBar.currentHeight,
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#CCC',
		padding: 20,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
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
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white',
	},
});
