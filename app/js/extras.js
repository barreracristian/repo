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
;
