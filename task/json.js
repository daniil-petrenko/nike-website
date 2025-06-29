import gulp from 'gulp';

// Config
import path from '../config/path.js';
import app from '../config/app.js';

// Plagins
import plumber from 'gulp-plumber';


export default () => {
	return gulp.src(path.json.src)
		.pipe(plumber())
		.pipe(gulp.dest(path.json.dest))
}