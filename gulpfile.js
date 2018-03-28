var gulp            = require('gulp'),
    less            = require('gulp-less'),
    browserSync     = require('browser-sync'),    
    cssnano         = require('gulp-cssnano'),
    rename          = require('gulp-rename'), 
    del             = require('del'),
    imagemin        = require('gulp-imagemin'), 
    pngquant        = require('imagemin-pngquant'),
    cache           = require('gulp-cache'),
    autoprefixer    = require('gulp-autoprefixer'); 

gulp.task('less', function(){ 
    return gulp.src('app/less/style.less') 
        .pipe(less())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() { 
    browserSync({ 
        server: { 
            baseDir: 'app' 
        },
        notify: false
    });
});

gulp.task('css-min', ['less'], function() {
    return gulp.src('app/css/**/*.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'})) 
        .pipe(gulp.dest('app/css'));
});

gulp.task('img', function() {
    return gulp.src('app/img/**/*') 
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img')); 
});

gulp.task('build', ['clean','css-min','img'], function() {
    var buildCss = gulp.src([ 
        'app/css/style.min.css'
        ])
    .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html') 
    .pipe(gulp.dest('dist'));

    var buildLibs = gulp.src('app/libs/**/*')
    .pipe(gulp.dest('dist/libs'));
});

gulp.task('watch',['browser-sync','css-min'], function() {
    gulp.watch('app/less/**/*.less', ['less']); 
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
    return del.sync('dist');
});

gulp.task('clear', function () {
    return cache.clearAll();
})