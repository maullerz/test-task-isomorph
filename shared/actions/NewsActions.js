export const GET_NEWS_FEED = 'GET_NEWS_FEED';
export const GET_ARTICLE_BY_ID = 'GET_ARTICLE_BY_ID';

export function getNewsFeed() {
  return {
    type:    GET_NEWS_FEED,
    promise: loadNewsList()
  }
}

export function getArticleById(id) {
  return {
    type:    GET_ARTICLE_BY_ID,
    promise: loadArticleById(id)
  };
}


const articlesData = [
  {
    id:   'lada_xray',
    head: 'В России начались продажи нового кроссовера Lada Xray',
    body: 'В России начались продажи нового кроссовера Lada Xray. Сейчас автомобиль доступен в 124 дилерских центрах 57 городах страны. В Самарской области, где и находится производитель машины «АвтоВАЗ», первым покупателем новинки стал глава субъекта Николай Меркушкин.'
  }, 
  {
    id:   'lamborghini',
    head: 'Кризис в России: распроданы все Lamborghini',
    body: 'Российские покупатели активно приобретают суперкары, несмотря на тяжелую ситуацию в экономике. Как рассказал генеральный директор «Lamborghini Москва» Сергей Мордовин, в России уже раскупили всю квоту на 25 машин, выделенную на 2016 год. Об этом сообщает «Лента.ру».'
  }
]

function loadNewsList() {

  return new Promise(
    function(resolve, reject) {

      setTimeout(function() {
        resolve(articlesData.map(function(article) {
          return {
            id: article.id,
            head: article.head
          }
        }));
      }, 500);

    }
  );

}

function loadArticleById(id) {

  return new Promise(
    function(resolve, reject) {

      const newsArticle = articlesData.find(function(article, index) {
        return article.id === id;
      });

      if (typeof newsArticle !== 'undefined')
        setTimeout(resolve, 500, newsArticle);
      else
        setTimeout(reject, 500, new Error('article not found'));
    }
  );

}
