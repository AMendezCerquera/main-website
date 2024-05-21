document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/articles', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(articles => {
            const container = document.getElementById('articles-container');
            const template = document.getElementById('card-template').content;

            articles.forEach(article => {
                const clone = document.importNode(template, true);
                const articleId = article.articleId;

                //Card
                clone.querySelector('.card-type').textContent = "Web Dev";
                clone.getElementById('card-title').textContent = article.articleName;
                clone.getElementById('card-description').textContent = article.articleDescription;
                clone.querySelector('.blog-author__name').innerHTML = article.authorName;
                clone.querySelector('.blog-author__alias').href = 'mailto:'+article.authorEmail;
                clone.getElementById('author-avatar').src = '/Structural Elements/Images/test.png';

                //Modal Functionalities
                clone.getElementById('openModal').id = 'openModal'+ articleId;
                clone.querySelector('.modal-content').className = 'modal-content'+ articleId;
                clone.querySelector('.close-button').className = 'close-button'+ articleId;
                clone.getElementById('article-title').id = 'article-title'+ articleId;
                clone.getElementById('article-content').id = 'article-content'+ articleId;
                clone.getElementById('articleModal').id = 'articleModal'+ articleId;

                //Full Article
                clone.getElementById('article-title'+articleId).textContent = article.articleName;
                clone.getElementById('article-content'+articleId).textContent = article.articleData;

                container.appendChild(clone);
                addModalFunctionality(articleId);
            });
        })
        .catch(error => console.error('Error fetching articles:', error));
});

function addModalFunctionality(articleId) {
    document.getElementById('openModal' + articleId).addEventListener('click', function() {
        document.getElementById('articleModal'+articleId).style.display = 'flex';
        console.log('test');
    });
    
    document.querySelector('.close-button' + articleId).addEventListener('click', function() {
        document.getElementById('articleModal'+articleId).style.display = 'none';
    });
}

document.getElementById('checkStatusButton').addEventListener('click', function() {
    fetch('http://localhost:3000/api/user/status')
        .then(response => response.json())
        .then(data => {
            if (data.loggedIn) {
                document.getElementById('specialButton').style.display = 'block';
            } else {
                document.getElementById('specialButton').style.display = 'none';
            }
        })
        .catch(error => console.error('Error:', error));
});