var highland = require('highland')
var request = require('request')
var fs = require('fs')
var moment = require('moment')
var csvParser = require('csv-parser')
var csvWriter = require('csv-write-stream')

console.log('Retrieving statistics...')

highland(request('http://www.ons.gov.uk/ons/datasets-and-tables/downloads/csv.csv?dataset=lms'))
    .through(csvParser())
    .filter(function (record) {
    	return /20[0-9][0-9] [JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC]/.test(record[''])
    })
    .map(function (record) {
	return {
	    'date': moment(record[''], 'YYYY MMM').format(),
	    'claimantCount': record['AGLX'], // UK Claimant Count - total computerised claims - People - SA (000s)
	    'unemploymentRate': record['MGSX'], // LFS: Unemployment rate: UK: All: Aged 16 and over: %: SA
	    'workHours': record['YBUV'] // LFS: Avg actual weekly hours of work: UK: All workers in main & 2nd job: SA
	}
    })
    .through(csvWriter())
    .pipe(fs.createWriteStream('ons-labour.csv'))

console.log('done')
