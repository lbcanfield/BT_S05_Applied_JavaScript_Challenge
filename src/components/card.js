
import axios from 'axios';

const Card = (article) => {
     // console.log(article);
     const cardContainer = document.createElement('div');
     const headlineElement = document.createElement('div');
     const authorElement = document.createElement('div');
     const imageElement = document.createElement('div');
     const image = document.createElement('img');
     const author = document.createElement('span');
     cardContainer.classList.add('card');
     headlineElement.classList.add('headline');
     authorElement.classList.add('author');
     imageElement.classList.add('img-container');

     headlineElement.textContent = article.headline;
     image.src = article.authorPhoto;
     author.textContent = `By ${article.authorName}`;

     cardContainer.appendChild(headlineElement);
     cardContainer.appendChild(authorElement);
     authorElement.appendChild(imageElement);
     imageElement.appendChild(image);
     authorElement.appendChild(author);

     cardContainer.addEventListener('click', () => {
          console.log(article.headline);
     })

     return cardContainer;
     // TASK 5
     // ---------------------
     // Implement this function, which should return the markup you see below.
     // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
     // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
     // The text inside elements will be set using their `textContent` property (NOT `innerText`).
     // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
     //
     // <div class="card">
     //   <div class="headline">{ headline }</div>
     //   <div class="author">
     //     <div class="img-container">
     //       <img src={ authorPhoto }>
     //     </div>
     //     <span>By { authorName }</span>
     //   </div>
     // </div>
     //
}

const cardAppender = (selector) => {
     // TASK 6
     // ---------------------
     // Implement this function that takes a css selector as its only argument.
     // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
     // However, the articles do not come organized in a single, neat array. Inspect the response closely!
     // Create a card from each and every article object in the response, using the Card component.
     // Append each card to the element in the DOM that matches the selector passed to the function.
     //
     axios.get('http://localhost:5001/api/topics')
          .then(topics => {
               for (let topic of topics.data.topics) {
                    axios.get('http://localhost:5001/api/articles')
                         .then(articles => {
                              if (topic === 'node.js') {
                                   topic = 'node';
                              }
                              for (const article of articles['data']['articles'][topic]) {
                                   // console.log(article);
                                   document.querySelector(selector).appendChild(Card(article));
                              }
                         })
                         .catch(error => {
                              console.log(error);
                         })
                    // console.log(topic);
               }
          })
}

export { Card, cardAppender }
