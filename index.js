var Crawler = {
	request : null,
	cheerio : null,
	fs      : null,
	init : function(){
		Crawler.request = require('request');
		Crawler.cheerio = require('cheerio');
		Crawler.fs      = require('fs');
		Crawler.getJobs();
	},
	getJobs: function(){
		Crawler.request('https://programathor.com.br/jobs', function(err, res, body){
			if(err){
        console.log('Error: ' + err);
      }
			var $ = Crawler.cheerio.load(body);
			$('.cell-list-content').each(function(){
				var jobTitle  = $(this).find('h3').text().trim();
				var tag = $(this).find('.tag-list').text() ;
				console.log(jobTitle + ' - ' + tag);

				Crawler.fs.appendFileSync('jobs.txt', jobTitle + ' - ' + tag + '\n');
			});
		});
	}
};
Crawler.init();
