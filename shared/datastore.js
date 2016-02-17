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

if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

export function getNewsList() {

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

export function getArticleById(params) {

  return new Promise(
    function(resolve, reject) {

      const newsArticle = articlesData.find(function(article, index) {
        return article.id === params.articleId;
      });

      if (typeof newsArticle !== 'undefined')
        setTimeout(resolve, 500, newsArticle);
      else
        setTimeout(reject, 500, new Error('article not found'));
    }
  );

}
