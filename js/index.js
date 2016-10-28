'use strict';

$(function () {
  // SEARCH BAR ANIMATION
  //------------------------------------
  $('.search-input').focus(function () {
    $('.container').addClass('container-search');
    $('.search-box').css({
      'border-bottom': '1px solid #EFFFE9',
      'border-top': 'none',
      'border-radius': '0 0 3px 3px'
    });
    $('.random-button').css({
      'border-radius': '3px 3px 0 0',
      'border-bottom': 'none'
    });
    $('.prediction-list').css('display', 'flex');
  });
  $('.background').click(function () {
    $('.container').removeClass('container-search');
    $('.search-box').css({
      'border-bottom': 'none',
      'border-top': '1px solid #EFFFE9',
      'border-radius': '3px 3px 0 0'
    });
    $('.random-button').css({
      'border-radius': '0 0 3px 3px',
      'border-bottom': '1px solid #EFFFE9'
    });
    $('.prediction-list').css('display', 'none');
  });

  // RANDOM WIKI PAGE
  //------------------------------------
  $('.random-button').click(function () {
    window.open('https://en.wikipedia.org/wiki/Special:Random');
  });

  // AUTOCOMPLETE LIST
  //------------------------------------
  var list = new Vue({
    el: '.container',
    data: {
      term: '',
      predictions: undefined
    },
    methods: {
      openLink: function openLink(prediction) {
        console.log(prediction);
        window.open(prediction.link);
      }
    },
    watch: {
      'term': function term() {
        if (!this.term) {
          this.predictions = undefined;
          return;
        }
        var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + this.term + '&limit=5&suggest=1';
        $.ajax({
          url: url,
          jsonp: "callback",
          dataType: "jsonp",
          success: function success(data) {
            var newData = [];
            for (var i in data[1]) {
              var newObject = {};
              newObject.title = data[1][i];
              newObject.summary = data[2][i];
              newObject.link = data[3][i];
              newData.push(newObject);
            }
            list.$set('predictions', newData);
          }
        });
      }
    }
  });
});