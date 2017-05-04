var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var prettify = require('gulp-jsbeautifier');

var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('style', function() {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function() {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css',
        './public/js/*.js'
    ], {
        read: false
    });

    var injectOptions = {
        ignorePath: '/public'
    };

    var options = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    return gulp.src('./src/views/*.jade') /*altera o template  jade/hbs*/
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));

});

gulp.task('serve', ['pretty', 'style', 'inject'], function() {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', function(ev) {
            console.log('Restarting....');
        });
});

gulp.task('pretty', function() { /*https://github.com/tarunc/gulp-jsbeautifier*/
    gulp.src(['./src/routes/*.js'])
        .pipe(prettify())
        .pipe(gulp.dest('./src/routes'));

    gulp.src(['./src/config/*.js'])
        .pipe(prettify())
        .pipe(gulp.dest('./src/config'));

    gulp.src(['./src/controllers/*.js'])
        .pipe(prettify())
        .pipe(gulp.dest('./src/controllers'));

    gulp.src(['./src/services/*.js'])
        .pipe(prettify())
        .pipe(gulp.dest('./src/services'));

    gulp.src(['./src/config/strategies/*.js'])
        .pipe(prettify())
        .pipe(gulp.dest('./src/config/strategies'));

    gulp.src(['./*.js', './*.json', './.bowerrc'])
        .pipe(prettify())
        .pipe(gulp.dest('./'));
});