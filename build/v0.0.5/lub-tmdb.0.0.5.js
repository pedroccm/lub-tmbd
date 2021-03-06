/**
 * AngularJS Tmdb API
 * @version v0.0.5 - 2013-01-15
 * @link https://github.com/gnalFF/lub-tmbd
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

/**
 * Module configuring basic api setup
 */
angular.module('lub-tmdb-config', [])
    .value('lubTmdbBaseURL','http://api.themoviedb.org/3/')
    .value('lubTmdbApiKey','');

/**
 * Module dealing with configuration
 * http://docs.themoviedb.apiary.io/#configuration
 */
angular.module('lub-tmdb-api-configuration', ['lub-tmdb-config','lub-tmdb-http'])
    .factory('lubTmdbApiConfiguration', function (lubTmdbBaseURL, lubTmdbHTTP) {
        var configuration;
        var get = function () {
        };
        return {
            get:function () {
                return lubTmdbHTTP(lubTmdbBaseURL + 'configuration',{},true);
            }
        };
    });

angular.module('lub-tmdb-api-change', ['lub-tmdb-http','lub-tmdb-config'])
    .factory('lubTmdbApiChange', function (lubTmdbHTTP,lubTmdbBaseURL) {
        return {
            movie: function(params,doCache){
                return lubTmdbHTTP(lubTmdbBaseURL+"movie/changes");
            },
            person: function(params,doCache){
                return lubTmdbHTTP(lubTmdbBaseURL+"person/changes");
            }
        };
    });
/**
 * Created with JetBrains WebStorm.
 * User: gnalFF
 * Date: 15.01.13
 * Time: 10:32
 * To change this template use File | Settings | File Templates.
 */
angular.module('lub-tmdb-api-collection', ['lub-tmdb-config','lub-tmdb-http'])
    .factory('lubTmdbApiCollection', function (lubTmdbBaseURL,lubTmdbHTTP) {
        return {
            collection: function(collectionId,options,doCache){
                return lubTmdbHTTP(lubTmdbBaseURL+"collection/"+collectionId,options,doCache);
            },
            images: function(collectionId,options,doCache){
                return lubTmdbHTTP(lubTmdbBaseURL+"collection/"+collectionId+"/images",options,doCache);
            }
        };
    });
angular.module('lub-tmdb-api-company', ['lub-tmdb-config','lub-tmdb-http'])
    .factory('lubTmdbApiCompany', function (lubTmdbBaseURL,lubTmdbHTTP) {
        return {
            company: function(companyId,params,doCache){
                return lubTmdbHTTP(lubTmdbBaseURL+"company/"+companyId);
            },
            movies: function(companyId,params,doCache){
                return lubTmdbHTTP(lubTmdbBaseURL+"company/"+companyId+"/movies");
            }
        };
    });
angular.module('lub-tmdb-api-genre', ['lub-tmdb-config', 'lub-tmdb-http'])
    .factory('lubTmdbApiGenre', function (lubTmdbBaseURL, lubTmdbHTTP) {
        return {
            list:function (params,doCache) {
                return lubTmdbHTTP(lubTmdbBaseURL + "genre/list",params,doCache);
            },
            movies:function (genreId,params,doCache) {
                return lubTmdbHTTP(lubTmdbBaseURL + "genre/"+genreId+"/movies",params,doCache);
            }
        };
    });
angular.module('lub-tmdb-http', ['lub-tmdb-config'])
    .factory('lubTmdbHTTP', function ($http, $q, lubTmdbApiKey) {
        return function (url, options, doCache) {
            var opts = options || {};
            if(angular.isUndefined(doCache)){
                doCache = true;
            }
            return $http.jsonp(url, {
                params:angular.extend({
                    api_key:lubTmdbApiKey,
                    callback:'JSON_CALLBACK'
                }, options),
                cache:doCache
            });
        };
    });
angular.module('lub-tmdb-api-keyword', ['lub-tmdb-config','lub-tmdb-http'])
    .factory('lubTmdbApiKeyword', function (lubTmdbBaseURL,lubTmdbHTTP) {
        return {
            keyword:function (keywordId, params, doCache) {
                return lubTmdbHTTP(lubTmdbBaseURL+'keyword/'+keywordId,params,doCache);
            },
            movies:function (keywordId, params, doCache) {
                return lubTmdbHTTP(lubTmdbBaseURL+'keyword/'+keywordId+"/movies",params,doCache);
            }
        };
    });
angular.module('lub-tmdb-api-list', ['lub-tmdb-http'])
    .factory('lubTmdbApiList', function (lubTmdbHTTP,lubTmdbBaseURL) {
        return {
            list: function(listId,options,doCache){
                return lubTmdbHTTP(lubTmdbBaseURL+"list/"+listId,options,doCache);
            }
        };
    });
/**
 * Module dealing with movie related stuff.
 * http://docs.themoviedb.apiary.io/#movies
 */
angular.module("lub-tmdb-api-movie", ['lub-tmdb-config', 'lub-tmdb-http'])
    .factory('lubTmdbApiMovie', function (lubTmdbBaseURL, $q, lubTmdbHTTP) {
        var get = function (movieId, type, options, doCache) {
            var action = type === '' ? '' : ('/' + type);
            if (movieId === '') {
                if (['latest', 'upcoming', 'now_playing', 'popular', 'top_rated'].indexOf(type) < 0) {
                    return $q.reject();
                }
            } else {
                action = '/' + movieId + action;
            }
            var url = lubTmdbBaseURL + 'movie' + action;
            return lubTmdbHTTP(url, options, doCache);
        };
        return {
            movie:function (movieId, options, doCache) {
                return get(movieId, '', options);
            },
            alternativeTitles:function (movieId, options, doCache) {
                return get(movieId, 'alternative_titles', options, doCache);
            },
            casts:function (movieId, options, doCache) {
                return get(movieId, 'casts', options, doCache);
            },
            images:function (movieId, options, doCache) {
                return get(movieId, 'images', options, doCache);
            },
            keywords:function (movieId, options, doCache) {
                return get(movieId, 'keywords', options, doCache);
            },
            releases:function (movieId, options, doCache) {
                return get(movieId, 'releases', options, doCache);
            },
            trailers:function (movieId, options, doCache) {
                return get(movieId, 'trailers', options, doCache);
            },
            translations:function (movieId, options, doCache) {
                return get(movieId, 'translations', options, doCache);
            },
            similarMovies:function (movieId, options, doCache) {
                return get(movieId, 'similar_movies', options, doCache);
            },
            lists:function (movieId, options, doCache) {
                return get(movieId, 'lists', options, doCache);
            },
            changes:function (movieId, options, doCache) {
                return get(movieId, 'changes', options, doCache);
            },
            latest:function (options, doCache) {
                return get('', 'keywords', options, doCache);
            },
            upcoming:function (options, doCache) {
                return get('', 'upcoming', options, doCache);
            },
            nowPlaying:function (options, doCache) {
                return get('', 'now_playing', options, doCache);
            },
            popular:function (options, doCache) {
                return get('', 'popular', options, doCache);
            },
            topRated:function (options, doCache) {
                return get('', 'top_rated', options, doCache);
            }
            /**
             * This is a post method -> implement later
             rating:function (movieId, options) {
                return get(movieId, 'rating', options);
            }
             **/
        };
    });
angular.module('lub-tmdb-api-people', ['lub-tmdb-http'])
    .factory('lubTmdbApiPeople', function (lubTmdbHTTP,lubTmdbBaseURL) {
        return {
            person: function(personId,options,doCache){
                return lubTmdbHTTP(lubTmdbBaseURL+"person/"+personId,options,doCache);
            },
            credits: function(personId,options,doCache){
                return lubTmdbHTTP(lubTmdbBaseURL+"person/"+personId+"/credits",options,doCache);
            },
            images: function(personId,options,doCache){
                return lubTmdbHTTP(lubTmdbBaseURL+"person/"+personId+"/images",options,doCache);
            },
            changes: function(personId,options,doCache){
                return lubTmdbHTTP(lubTmdbBaseURL+"person/"+personId+"/changes",options,doCache);
            },
            latest: function(options,doCache){
                return lubTmdbHTTP(lubTmdbBaseURL+"person/latest",options,doCache);
            }
        };
    });
/**
 * Module dealing with search related stuff.
 * http://docs.themoviedb.apiary.io/#search
 */
angular.module('lub-tmdb-api-search', ['lub-tmdb-config','lub-tmdb-http'])
    .factory('lubTmdbApiSearch', function (lubTmdbBaseURL,lubTmdbHTTP) {
        var get = function (query, type, options,doCache) {
            options = options || {};
            options.query = query;
            var url = lubTmdbBaseURL+ 'search/' + type;
            return lubTmdbHTTP(url,options,doCache);
        };
        return {
            movie:function (query, options) {
                return get(query, 'movie', options);
            },
            collection:function (query, options) {
                return get(query, 'collection', options);
            },
            person:function (query, options) {
                return get(query, 'person', options);
            },
            list:function (query, options) {
                return get(query, 'list', options);
            },
            company:function (query, options) {
                return get(query, 'company', options);
            },
            keyword:function (query, options) {
                return get(query, 'keyword', options);
            }
        };
    });
angular.module('lub-tmdb-api',['lub-tmdb-api-movie',
    'lub-tmdb-api-search',
    'lub-tmdb-api-configuration',
    'lub-tmdb-api-collection',
    'lub-tmdb-api-people',
    'lub-tmdb-api-list',
    'lub-tmdb-api-change',
    'lub-tmdb-api-keyword',
    'lub-tmdb-api-genre',
    'lub-tmdb-api-company']);