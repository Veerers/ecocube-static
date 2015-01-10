var path = require('path');
var config = require('config');
var express = require('express');
var app = express();

app.use(require('compression')());
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, './static')));

var mongo = require('mongojs')(config.mongo);
var pages = mongo.collection('pages');
var translations = mongo.collection('translations');

var translation;

translations.findOne({
    language: 'ru'
}, function (err, ru) {
    if (err) {
        throw new Error('translation not found');
    }
    translation = ru;
});

app.get('/', function (req, res, next) {
    pages.find({}, {
        title: 1,
        category: 1,
        _id: 0
    }, function (err, docs) {
        if (err) {
            return next(err);
        }
        var menu = docs.reduce(function (result, item) {
            if (item.category) {
                result[item.category] = result[item.category] || [];
                result[item.category].push(item.title);
            }
            return result;
        }, {});
        res.render('index', {
            menu: menu,
            i: translation
        });
    });
});

app.get('/:title', function (req, res, next) {
    pages.findOne({
        title: req.params.title
    }, function (err, page) {
        if (err) {
            return next(err);
        }
        res.render('subpage', {
            page: page,
            i: translation
        });
    });
});

app.listen(config.get('port'), function () {
    console.log('deployed on port: ' + config.get('port'));
});
