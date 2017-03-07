// ==================================================================
// ==================================================================

var grabData = (link, numArticle) => {
	$("#well-section").empty();

	$.ajax({url: link, method: "GET"})

	.done((data) => {

		for(var i = 0; i < numArticle; i++){
			var container = $("<div>"),
				headline = $("<h5>"),
				byline = $("<p>"),
				url = $("<a>"),
				snippet = $("<p>");

				container.addClass("well");
				snippet.html(data.response.docs[i].snippet);
				headline.html(data.response.docs[i].headline.main);
				byline.html(data.response.docs[i].byline.original);
				url.attr('href', data.response.docs[i].web_url);
				url.html(data.response.docs[i].web_url);

				container.append(headline, snippet, byline, url);

			$("#well-section").append(container);
		}

	})
	.fail((error) => {
		console.log("Hey sorry, my friend didn't come:");
	});
}






// ==================================================================
// ==================================================================



$('#search-btn').on('click', function(){

	var userVal = $("#search").val(),
		numArticle = $("#num-records").val(),
		beginDate = $("#start-year").val(),
		endDate = $("#end-year").val(),
		authKey = "api_key=58b7b729a8f74a0b86326c33a5c81568&q";

		var beginDateUrl = "&begin_date=" + beginDate + "1231";
		var endDateUrl = "&end_date=" + endDate + "1231";

		var link;

		try {
			if(userVal === ''){
				throw alert("Please fill out the search input...!!!");

			}

			if(beginDate !== ''){
				if(beginDate.length < 4 || beginDate.length > 4){
					throw alert("Please make sure that you use 4 digits in the Start Date");
				}
			}

			if(endDate !== ''){
				if(endDate.length < 4 || endDate.length > 4){
					throw alert("Please make sure that you use 4 digits in the Start Date");
				}
			}
			
		}

		catch(err){
			console.log(err);
		}

		if(beginDate === '' && endDate === ''){
			link = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + authKey + userVal;
		}

		else if(beginDate !== '' && endDate !== ''){
			link = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + authKey + userVal + beginDateUrl + endDateUrl;
		}

		else if(beginDate === '' && endDate !== ''){
			link = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + authKey + userVal + endDateUrl ;
		}

		else if(beginDate !== '' && endDate === ''){
			link = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + authKey + userVal + beginDateUrl ;
		}

		console.log(link);

	grabData(link, numArticle);

	$("#search").val('')
	$("#start-year").val('')
	$("#end-year").val('')

	return false;
});


// ==================================================================
// ==================================================================
























