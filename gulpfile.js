const gulp = require('gulp');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const browserSync = require('browser-sync');

// Sassファイルを監視して、cssに書き出す
gulp.task('sass', function (){
	console.log('----------sass----------')
	gulp.src('./src/sass/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./dist/css/'));
});

// pugファイルを監視して、htmlに書き出す
gulp.task('pug', function (){
	console.log('----------pug----------')
	gulp.src('./src/pug/*.pug')
	.pipe(pug())
	.pipe(gulp.dest('./dist/'));
});

//Browser Sync
gulp.task('browser-sync', function (){
	console.log('----------browser-sync----------')
  browserSync({
    server: { baseDir: './dist/'}
  });
  gulp.watch('./src/pug/*.pug', gulp.task('reload'));
  gulp.watch('./src/sass/*.scss', gulp.task('reload'));
});


// Browser Sync Reload
gulp.task('reload', () => {
	console.log('----------browser-sync-reload----------')
  browserSync.reload();
});

// 監視
gulp.task('watch', function () {
	console.log('----------watch----------')
  gulp.watch("./src/sass/*.scss", gulp.task('sass'));
  gulp.watch("./src/pug/*.pug", gulp.task('pug'));
});

gulp.task('default', gulp.series(
	gulp.parallel('watch','sass','pug','browser-sync')
));
