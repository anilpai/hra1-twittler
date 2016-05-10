$(document).ready(function(){
        var $main = $('.main');

        var $getMore = $('<a href="#" class="getMore"></a>');
        $getMore.text('Get more tweets');
        $main.prepend($getMore);

        var $input = $('<input type="text" placeholder="Compose new tweet ... and press Enter"></input>');
        $main.append($input);

        var $tFeeds = $('<div></div>');
        $main.append($tFeeds);

        var showTweets = function(context){
          $tFeeds.html('');

          if (context === 'all') {
            source = streams.home;
          } else if (context) {
            source = streams.users[context];
          }

          var index = source.length - 1;
          var tweet, $tweet, $user, $tweetTime;

          while(index >= 0){
            tweet = source[index];
            $tweet = $('<div></div>');

            $user = $('<a></a>');
            $user.attr({'href':'#', 'data-user':tweet.user});
            $user.text('@' +tweet.user);
            $user.addClass('username');
            $tweet.append($user);

            $tweet.append(': '+ tweet.message);
            $tweet.addClass('tweet');

            $tweetTime = $('<span></span>');
            readableTime = moment(tweet.created_at).fromNow();
            $tweetTime.text(readableTime);
            $tweetTime.addClass('timestamp');
            $tweet.append($tweetTime);

            $tweet.appendTo($tFeeds);
            index -= 1;
          }

          $(".username").on('click', function(e){
            e.preventDefault();
            showTweets($(this).data('user'));
          });

        };  

        showTweets('all');

        $(".getMore").on('click', function(e){
          e.preventDefault();
          showTweets('all');
        });

        // Compose the tweet
        $("input").keypress(function(e){
          if(e.which === 13){
            window.visitor = prompt("Enter your twittler username", "donald_duck");
            if(!streams.users[window.visitor]){
              streams.users[window.visitor] = [];
            }
            writeTweet($(this).val());
            $(this).val('');
            showTweets('all');
          }
        });

      });
