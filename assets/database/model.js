import React from "react";
import { SQLite } from 'expo';

var database_name = "db_trackr.db";
var location = "Library";

let conn = SQLite.openDatabase({ name: database_name, location: location }, this.openCB, this.errorCB);

class Database {
	async getConnection(fresh = false) {
		if (fresh) {
			await this.init(true);
		}
		return conn;
	}

	async init(fresh = false) {
		if (fresh == true) {
			conn.transaction(tx => {
				tx.executeSql('DROP TABLE IF EXISTS people', [], (tx, rs) => { }, (tx, err) => {
					console.warn(err);
				})
			});

			conn.transaction(tx => {
				tx.executeSql('DROP TABLE IF EXISTS classes', [], (tx, rs) => { }, (tx, err) => {
					console.warn(err);
				})
			});

			conn.transaction(tx => {
				tx.executeSql('DROP TABLE IF EXISTS schedule', [], (tx, rs) => { }, (tx, err) => {
					console.warn(err);
				})
			});

			conn.transaction(tx => {
				tx.executeSql('DROP TABLE IF EXISTS attendance', [], (tx, rs) => { }, (tx, err) => {
					console.warn(err);
				})
			});

			conn.transaction(tx => {
				// Do the actual transaction here
				tx.executeSql(
					`CREATE TABLE people (
						id INTEGER PRIMARY KEY NOT NULL,
						firstname TEXT NOT NULL,
						lastname TEXT
					)`,
					[],
					(tx, rs) => {
						// Query successfully completed. Access resultset here
						console.log('SQL query for people table done');
						// console.log(rs);
						tx.executeSql(
							`INSERT INTO people (firstname, lastname) VALUES 
							('Abhinav', 'Mathur'),
							('Pranav', 'Mathur'),
							('Archana', 'Mathur'),
							('Neeraj', 'Mathur'),
							('Shilpi', 'Mohan')`,
							[],
							(tx, rs) => { },
							(tx, err) => {
								console.warn(err);
							}
						)
					},
					(tx, err) => {
						// Error in query execution
						console.log('Unable to execute SQL query for people table');
						console.warn(err);
					}
				)
			}, err_msg => {
				// Error on conn.transaction object
				console.log('Can\'t connect to database (people)');
				console.warn(err_msg);
			}, () => {
				// conn.transaction object success
				console.log('Connected to people database (people)');
			});

			conn.transaction(tx => {
				// Do the actual transaction here
				tx.executeSql(
					`CREATE TABLE classes (
						id INTEGER PRIMARY KEY NOT NULL,
						name TEXT NOT NULL,
						location TEXT
					)`,
					[],
					(tx, rs) => {
						// Query successfully completed. Access resultset here
						console.log('SQL query for classes table done');
						// console.log(rs);
						tx.executeSql(
							`INSERT INTO classes (name, location) VALUES 
							('Grande Mixed Batch', null),
							('Grande', null),
							('PT Ginni', null),
							('Cyber Commune', null),
							('Bloomfield', null),
							('Sarovar', null),
							('Grande Evening', null),
							('Cyber Zone', null)`,
							[],
							(tx, rs) => { },
							(tx, err) => {
								console.warn(err);
							}
						)
					},
					(tx, err) => {
						// Error in query execution
						console.log('Unable to execute SQL query for classes table');
						console.warn(err);
					}
				)
			}, err_msg => {
				// Error on conn.transaction object
				console.log('Can\'t connect to database (classes)');
				console.warn(err_msg);
			}, () => {
				// conn.transaction object success
				console.log('Connected to people database (classes)');
			});

			conn.transaction(tx => {
				// Do the actual transaction here
				tx.executeSql(
					`CREATE TABLE schedule (
						id INTEGER PRIMARY KEY NOT NULL,
						cls_id INT NOT NULL,
						starttime TEXT,
						endtime TEXT,
						day INT,
						month INT,
						year INT,
						allday INT NOT NULL,
						FOREIGN KEY (cls_id) REFERENCES classes(id)
					)`,
					[],
					(tx, rs) => {
						// Query successfully completed. Access resultset here
						console.log('SQL query for schedule table done');
						// console.log(rs);
						tx.executeSql(
							//new Date(new Date().toISOString())
							//new Date(new Date().toISOString()).getMonth()
							`INSERT INTO schedule (cls_id, starttime, endtime, day, month, year, allday) VALUES 
							(1, 'Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 06:30:00 GMT+0530 (India Standard Time)', 1, null, null, 0),
							(2, 'Thu Jan 01 1970 09:00:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 10:00:00 GMT+0530 (India Standard Time)', 1, null, null, 0),
							(3, 'Thu Jan 01 1970 10:00:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 11:00:00 GMT+0530 (India Standard Time)', 1, null, null, 0),
							(3, 'Thu Jan 01 1970 09:00:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 10:00:00 GMT+0530 (India Standard Time)', 2, null, null, 0),
							(8, 'Thu Jan 01 1970 10:00:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 11:00:00 GMT+0530 (India Standard Time)', 2, null, null, 0),
							(7, 'Thu Jan 01 1970 18:00:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 19:00:00 GMT+0530 (India Standard Time)', 2, null, null, 0),
							(1, 'Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 06:30:00 GMT+0530 (India Standard Time)', 3, null, null, 0),
							(4, 'Thu Jan 01 1970 09:00:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 10:00:00 GMT+0530 (India Standard Time)', 3, null, null, 0),
							(3, 'Thu Jan 01 1970 10:00:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 11:00:00 GMT+0530 (India Standard Time)', 3, null, null, 0),
							(3, 'Thu Jan 01 1970 09:00:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 10:00:00 GMT+0530 (India Standard Time)', 4, null, null, 0),
							(5, 'Thu Jan 01 1970 05:30:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 06:30:00 GMT+0530 (India Standard Time)', 5, null, null, 0),
							(3, 'Thu Jan 01 1970 09:00:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 10:00:00 GMT+0530 (India Standard Time)', 5, null, null, 0),
							(6, 'Thu Jan 01 1970 10:00:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 11:00:00 GMT+0530 (India Standard Time)', 5, null, null, 0),
							(2, 'Thu Jan 01 1970 07:00:00 GMT+0530 (India Standard Time)', 'Thu Jan 01 1970 08:00:00 GMT+0530 (India Standard Time)', 6, null, null, 0)`,
							[],
							(tx, rs) => { },
							(tx, err) => {
								console.warn(err);
							}
						)
					},
					(tx, err) => {
						// Error in query execution
						console.log('Unable to execute SQL query for schedule table');
						console.warn(err);
					}
				)
			}, err_msg => {
				// Error on conn.transaction object
				console.log('Can\'t connect to database (schedule)');
				console.warn(err_msg);
			}, () => {
				// conn.transaction object success
				console.log('Connected to people database (schedule)');
			});

			conn.transaction(tx => {
				// Do the actual transaction here
				tx.executeSql(
					`CREATE TABLE attendance (
						id INTEGER PRIMARY KEY NOT NULL,
						per_id TEXT NOT NULL,
						sch_id NOT NULL,
						date NOT NULL,
						FOREIGN KEY (per_id) REFERENCES people(id),
						FOREIGN KEY (sch_id) REFERENCES schedule(id)
					)`,
					[],
					(tx, rs) => {
						// Query successfully completed. Access resultset here
						console.log('SQL query for attendance table done');
						// console.log(rs);
						tx.executeSql(
							`INSERT INTO people (firstname, lastname) VALUES
							('Abhinav', 'Mathur'),
							('Pranav', 'Mathur'),
							('Archana', 'Mathur'),
							('Neeraj', 'Mathur'),
							('Shilpi', 'Mohan')`,
							[],
							(tx, rs) => { },
							(tx, err) => {
								console.warn(err);
							}
						)
					},
					(tx, err) => {
						// Error in query execution
						console.log('Unable to execute SQL query for attendance table');
						console.warn(err);
					}
				)
			}, err_msg => {
				// Error on conn.transaction object
				console.log('Can\'t connect to database (attendance)');
				console.warn(err_msg);
			}, () => {
				// conn.transaction object success
				console.log('Connected to people database (attendance)');
			});
		}
	}

	errorCB() {
		console.warn('error opening db');
	}

	openCB() {
		console.log('db opened successfully');
	}

	async getPeople() {
		conn.transaction(tx => {
			console.warn('running getPeople');
			tx.executeSql('SELECT * FROM people', [], (tx, rs) => {
				console.log(rs);
				// this.setState({ users: rs.rows.array });
				return rs.rows.array;
			}, (tx, err) => {
				console.log('From people select *');
				console.warn(err);
			})
		});
	}
}

module.exports = new Database();