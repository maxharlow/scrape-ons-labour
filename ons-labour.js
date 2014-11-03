var highland = require('highland')
var request = require('request')
var fs = require('fs')
var moment = require('moment')
var csvParser = require('csv-parser')
var csvWriter = require('csv-write-stream')

console.log('Retrieving statistics...')

var dataset = 'http://www.ons.gov.uk/ons/datasets-and-tables/downloads/csv.csv?dataset=lms'
var data = highland(request(dataset)).through(csvParser())

var dataByMonth = data.filter(function (record) {
    return /^(199[8-9]|200[0-9]|201[0-4]) [JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC]/.test(record[''])
})

var dataSelected = dataByMonth.map(function (record) {
    return {
	'date': moment(record[''], 'YYYY MMM').format(),
	'claimantCount': record['AGLX'] * 1000, // UK Claimant Count - total computerised claims - People - SA (000s)
	'unemploymentRate': record['MGSX'], // LFS: Unemployment rate: UK: All: Aged 16 and over: %: SA
	'workHours': record['YBUV'] // LFS: Avg actual weekly hours of work: UK: All workers in main & 2nd job: SA
    }
})

dataSelected.through(csvWriter()).pipe(fs.createWriteStream('ons-labour.csv'))
