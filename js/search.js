/**
 * 블로그 검색 처리 
 */
function getQuery()
{
  // 
  var query = { 'tags': [], 'keywords': [] };

  // url에서 검색할 파라미터 추출
  var parameters = window.location.search.substring(1).split('&');

  $.each(parameters, function(index, parameterString) {
    var parameter = parameterString.split('=');
    var parameterName = parameter[0];
    var parameterValue = parameter[1];
    // 파라미터 이름이 q가 아니면 리턴 
    if(parameterName != 'q') return true;

    // 디코딩및 공백처리
    var decodedParameterValue = decodeURIComponent(parameterValue).replace(/　/g, '+').replace(/\++/g, '+');
    var words = decodedParameterValue.split('+');
    words.forEach(function(word) {
      var tag = word.match(/^\[(.*)\]$/);
      if(tag) query.tags.push(tag[1]);
      else query.keywords.push(word);
    });
  });

  return query;
}

$(function() {
  var query = getQuery();
  
  var queryString = ''; 
  
  query.tags.forEach(function(tagName) {
    queryString +=  tagName;
  });
  queryString += query.keywords.join(' ');
 
  $('#navigation form input[type="search"]').val(queryString);
 
  var matchedPosts = [];
  $.getJSON('/search.json', function(posts) {
    
	
	
	posts.forEach(function(postInfo) {
      
	  if(!postInfo.tags) postInfo.tags = [];
	  var postTagNames = [];
	  postInfo.tags.forEach(function(tag) {
		postTagNames.push(tag);
	  });

	  // 쿼리 태그 포함여부 판단 변수 선언
	  var isContainingAllQueriedTags = false;
	  $.each( query.tags, function(index, tagName) {
		isContainingAllQueriedTags = (postTagNames.indexOf(tagName) != -1);
		
		if(!isContainingAllQueriedTags) return false;
	  });
	  
	  if(isContainingAllQueriedTags && !query.keywords.length){
		
		matchedPosts.push(postInfo);
		
	  } else if( isContainingAllQueriedTags || !query.tags.length ) {
		
		var regexpString = '';
		
		if(query.keywords.length == 1) {
			
			regexpString = query.keywords[0];
			
		} else {
		
			query.keywords.forEach(function(keyword) {
				regexpString += '(?=.*' + keyword + ')';
			});
		  
		}
		
		var regExp = new RegExp(regexpString, 'i');
		var regTags = postInfo.tags.join();
		if(postInfo.title.match(regExp) != null || regTags.match( regExp ) != null) {
		  matchedPosts.push(postInfo);
		}
		
	}
	  
	
    });

    // 결과 표시 
    if(matchedPosts.length) {
      var dl = $('<dl>');
      matchedPosts.forEach(function(postInfo) {
        if(!postInfo.title.length) postInfo.title = 'untitled';
        dl.append('<dt><a href="' + postInfo.href + '">' + postInfo.title + '</a></dt>');
        if(postInfo.date) {
          dl.append('<dd>' + postInfo.date.year + '년 ' + postInfo.date.month + '월 ' + postInfo.date.day + '일' + '</dd>');
        }
        if(postInfo.tags.length) {
          var dd = '<dd>tags: ';
          var tagList = '';
          postInfo.tags.forEach(function(tag, tagIndex, tags) {
            tagList += '<a href="/search/?q=%5B' + tag + '%5D">' + tag + '</a>';
            if(tagIndex < tags.length - 1) tagList += ', ';
          });
          dd += tagList;
          dd += '</dd>';
          dl.append(dd);
        }
      });
      $('#results-container').append(dl);
    }
    else $('#results-container').append('<p>no search result.</p>');
  });
  
});