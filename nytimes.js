

    
    const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    const key = 'iviXG4pidl0IxDxtG70CkWk09nxYmGyX';
    let url;
  
    const searchTerm = document.querySelector('.search');
    const searchForm = document.querySelector('form');
  
  
    const section = document.querySelector('section');

    let pageNumber = 0;
    // Event listeners to control the functionality
    searchForm.addEventListener('submit', submitSearch);
  
    function submitSearch(e){
      pageNumber = 0; 
      fetchResults(e);
    }
  
    function fetchResults(e) {
      // Use preventDefault() to stop the form submitting
      e.preventDefault();
  
      // Assemble the full URL
      url = baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value + '&fq=document_type:("article")';
  
      // Use fetch() to make the request to the API
      fetch(url).then(function(result) {
        return result.json();
      }).then(function(json) {
        displayResults(json);
      });
    }
  
    function displayResults(json) {
      while (section.firstChild) {
        section.removeChild(section.firstChild);
      }
  
      const articles = json.response.docs;
  
  
      if(articles.length === 0) {
        const para = document.createElement('p');
        para.textContent = 'No results returned.'
        section.appendChild(para);
      } else {
        for(let i = 0; i < articles.length; i++) {
          const article = document.createElement('article');
          const heading = document.createElement('h2');
          const link = document.createElement('a');
          const img = document.createElement('img');
          const para1 = document.createElement('p');
          const para2 = document.createElement('p');
          const clearfix = document.createElement('div');
  
          const current = articles[i];
          console.log(current);
  
          link.href = current.web_url;
          link.textContent = current.headline.main;
          para1.textContent = current.snippet;
  
          if(current.multimedia.length > 0) {
            img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
            img.alt = current.headline.main;
          }
  
          clearfix.setAttribute('class','clearfix');
  
          article.appendChild(heading);
          heading.appendChild(link);
          article.appendChild(img);
          article.appendChild(para1);
          article.appendChild(clearfix);
          section.appendChild(article);
        }
      }
    };
  
// part of my code for nytimes part is from https://github.com/mdn/learning-area/blob/master/javascript/apis/third-party-apis/nytimes/index.html