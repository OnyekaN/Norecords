var express = require('express');
var router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/norecordsdb'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'N O R E C O R D S' });
});

/* GET songs */
router.get('/api/songs', (req, res, next) => {
	const results = [];

	pg.connect(connectionString, (err, client, done) => {
		if (err) {
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}
		
		const query = client.query('SELECT * FROM songs ORDER BY album DESC;')

		query.on('row', (row) => {
			results.push(row);
		});

		query.on('end', () => {
			done();
			return res.json(results);
		});	
	});
});

/* GET albums */
router.get('/api/albums', (req, res, next) => {
	const results = [];

	pg.connect(connectionString, (err, client, done) => {
		if (err) {
			done();
			console.log(err);
			return res.status.json(500).json({success: false, data: err});
		}
		
		querySQL = `SELECT album FROM songs
								GROUP BY album
								ORDER BY album DESC; `
			
		const query = client.query(querySQL);

		query.on('row', (row) => {
			results.push(row);
		});

		query.on('end', () => {
			done();
			return res.json(results);
		});
	});
	
});		

/* param for one album */
router.param('album', (req, res, next, id) => {
	const results = [];

	pg.connect(connectionString, (err, client, done) => {
		if (err) {
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}

		querySQL = `SELECT * from songs
								WHERE album='${id}'`

		const query = client.query(querySQL);

		query.on('row', (row) => {
			results.push(row);
		});

		query.on('end', () => {
			done();
			req.album = results;
			return next();
		});
	});

});

/* GET single album */
router.get('/api/albums/:album', (req, res, next) => {
	res.json(req.album);
});

router.get('/api/sorted_albums', (req, res, next) => {
	const results = [];	
	
	pg.connect(connectionString, (err, client, done) => {
		if (err) {
			done();
			console.log(err);
			return res.status(500).json({success: false, data: err});
		}
		
		const query = client.query('SELECT * FROM songs ORDER BY album DESC;')

		query.on('row', (row) => {
			results.push(row);
		});

		query.on('end', () => {
			done();
			const songs = results;
			const albums = {};
			let album = [];
			let albumName = "";
			songs.map(obj => {
				if ( albumName == "" ) { albumName = obj.album };
				if ( albumName == obj.album ) { album.push(obj) };
				if ( obj.artwork_path == "N/A" ) { return }
				if ( albumName != obj.album ) {
					albums[albumName] = {};
					albums[albumName].name = albumName;
					albums[albumName].artist = album[0].artist;
					albums[albumName].songs = album;
					if ( album[0].artwork_path == "N/A") {
						albums[albumName].art = "/images/not_available.png";
					} else { 
						albums[albumName].art = album[0].artwork_path + '.jpg';
					}
					albumName = obj.album;
					album = []
					album.push(obj);
				}
			});
			return res.json(albums);

		})
	})

});


module.exports = router;
