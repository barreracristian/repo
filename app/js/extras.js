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

    .filter('money', function () {
        return function (amount) {
            var sign = "$";
            if (amount < 0) {
                sign = "- $";
                amount = -amount;
            }

            //tratamiento de strings en vez de int
            var tmp = '' + amount;
            var currency = '';
            while (tmp.length > 3) {
                currency = '.' + tmp.substring(tmp.length - 3) + currency;
                tmp = tmp.substring(0, tmp.length - 3);
            }
            if (tmp.length > 0) {
                currency = tmp + currency;
            }

            return sign + currency;
        };
    })

    .filter('ppDate', function () {
        return function (input) {
            if (_.isUndefined(input)) {
                return undefined;
            }

            return moment(input).format("L LTS");
        };
    })

    .filter('fhDate', function () { //fullHumanDate
        return function (input) {
            if (_.isUndefined(input)) {
                return undefined;
            }

            return moment(input).format("dddd D MMMM YYYY");
        };
    })

    .filter('mobile', function () {
        return function (input) {
            if (_.isUndefined(input)) {
                return undefined;
            }

            return "+" + input.substring(0,3) + " " + input.substring(3,7) + " " + input.substring(7);
        };
    })

;
