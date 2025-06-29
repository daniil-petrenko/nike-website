import gulp from 'gulp';

// Config
import path from '../config/path.js';
import app from '../config/app.js';

// Plagins
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import babel from 'gulp-babel';
import webpack from 'webpack-stream';
import fileInclude from 'gulp-file-include';
import include from 'gulp-include';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';

export default () => {
	return gulp.src(path.js.src, { sourcemaps: app.isDev })
		.pipe(plumber({
			errorHandler: notify.onError(error => ({
				title: 'JavaScript',
				message: error.message
			}))
		}))
		.pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
		.pipe(babel())
		.pipe(webpack(app.webpack))
		.pipe(gulp.dest(path.js.dest, { sourcemaps: app.isDev }))
}


