import gulp from 'gulp';

// Config
import path from '../config/path.js';
import app from '../config/app.js';

// Plagins
import fs from 'fs';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import newer from 'gulp-newer';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const fontsConvert = () => {
  return gulp.src(path.font.src, { encoding: false })
	.pipe(plumber({
	    errorHandler: notify.onError(error => ({
	    title: 'Font',
	    message: error.message
	  }))
	}))
	.pipe(newer(path.font.dest))
	.pipe(fonter(app.fonter))
	.pipe(gulp.dest(path.font.dest))
	.pipe(ttf2woff2())
	.pipe(gulp.dest(path.font.dest))
}


export const fontsStyle = (cb) => {
    const source_folder = path.srcFolder;
    const fontsFile = `${source_folder}/scss/fonts/_fonts.scss`;

    // Checking and creating a directory if it does not exist
    if (!fs.existsSync(`${source_folder}/scss/fonts`)) {
        fs.mkdirSync(`${source_folder}/scss/fonts`, { recursive: true });
    }

    // Checking and creating the fonts.scss file if it doesn't exist
    if (!fs.existsSync(fontsFile)) {
        fs.writeFileSync(fontsFile, '');
    }

    // Reading file contents
    let file_content = fs.readFileSync(fontsFile, 'utf8');

    // Check for empty content
    if (file_content.trim() === '') {
        fs.readdir(path.font.dest, (err, items) => {
            if (err) {
                console.error('Error reading fonts directory:', err);
                cb(err);
                return;
            }

            let c_fontname;

            items.forEach(item => {
                const fontname = item.split('.')[0];

                if (c_fontname !== fontname) {
                    fs.appendFileSync(fontsFile, `@include font("${fontname}", "${fontname}", "400", "normal");\r\n`);
                    c_fontname = fontname;
                }
            });

            cb(); // Callback to signal completion
        });
    } else {
        cb(); // Callback to signal completion
    }
};