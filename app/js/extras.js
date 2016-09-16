angular.module('repo.extras', [])

    .filter('capitalize', function () {
        return function (input) {
            if (_.isUndefined(input)) {
                return undefined;
            }

            return _.map(_.words(input.toLowerCase()), function (word) {
                if (["de", "y"].indexOf(word) >= 0) {
                    return word;
                }
                return _.capitalize(word);
            }).join(" ");
        };
    })

    .filter('array2list', function () {
        return function (inputArray) {
            if (_.isUndefined(inputArray)) {
                return undefined;
            }

            return _.sortBy(inputArray, function(str){return str;}).join(", ");
        };
    })

;
