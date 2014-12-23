Scrape ONS Labour Market Statistics
===================================

The [Office for National Statistics (ONS)] (https://www.ons.gov.uk/) publish [statistics on the labour market] (http://www.ons.gov.uk/ons/rel/lms/labour-market-statistics/), including employment, unemployment, and economic activity. This scrapes those records into a CSV.

Requires a recent version of [Node JS] (http://nodejs.org/).

Install the dependencies with `npm install`, then run `node ons-labour`.

Not really a scraper in the typical sense -- simply converts the CSV published by the ONS to one that only include the statistics we want.
