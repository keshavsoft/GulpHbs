/*

=========================================================
* Volt Free - Bootstrap 5 Dashboard
=========================================================

* Product Page: https://themesberg.com/product/admin-dashboard/volt-premium-bootstrap-5-dashboard
* Copyright 2020 Themesberg
* License: https://themesberg.com/licensing

=========================================================

*/

var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();
var cleanCss = require("gulp-clean-css");
var del = require("del");
const htmlmin = require("gulp-htmlmin");
const cssbeautify = require("gulp-cssbeautify");
var gulp = require("gulp");
const npmDist = require("gulp-npm-dist");
var sass = require("gulp-sass")(require("sass"));
var wait = require("gulp-wait");
var sourcemaps = require("gulp-sourcemaps");

var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');

const fse = require("fs-extra");
const { StartFunc: CommonGulpCode } = require("./GulpCode/entryFile");

var dotenv = require("dotenv");
dotenv.config();

// Define paths
const paths = {
    dist: {
        base: "./dist/",
        css: "./dist/css",
        html: "./dist/pages",
        assets: "./dist/assets",
        img: "./dist/assets/img",
        vendor: "./dist/vendor",
    },
    dev: {
        base: "./html&css/",
        css: "./html&css/css",
        html: "./html&css/pages",
        assets: "./html&css/assets",
        img: "./html&css/assets/img",
        vendor: "./html&css/vendor",
    },
    base: {
        base: "./",
        node: "./node_modules",
    },
    src: {
        base: "./src/",
        css: "./src/css",
        html: "./src/pages/**/*.html",
        assets: "./src/assets/**/*.*",
        partials: "./src/partials/**/*.html",
        scss: "./src/scss",
        node_modules: "./node_modules/",
        vendor: "./vendor",
    },
    temp: {
        base: "./.temp/",
        css: "./.temp/css",
        html: "./.temp/pages",
        assets: "./.temp/assets",
        vendor: "./.temp/vendor",
    },
};

var templateData = {
    firstName: 'KeshavSoft',
    Array: [{ name: "create" }, { name: "show" }, { name: "KeshavSoft" }],
    SideBarItems: [{
        Name: "create",
        DisplayName: "Create",
        IconClass: "bi bi-card-list",
        SpanClass: "text-success"
    },
    { Name: "index" }, { Name: "KeshavSoft" }]
};

options = {
    ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
    partials: {
        footer: '<footer>the end</footer>'
    },
    batch: ['./src/partials/Hbs'],
    helpers: {
        capitals: function (str) {
            return str.toUpperCase();
        },
        compare: (k1, k2, options) => {
            if (k1 == k2) {
                return k1;
            } else {
                return options.inverse(this);
            }
        },
        compare1: (value1, value2, options) => {
            if (value1 === value2) {
                return options.fn(this); // Render content within the block if true
            } else {
                return options.inverse(this); // Render content within the else block if false
            }
        },
        isEqual: (value1, value2) => {
            return value1 === value2;
        }
    }
};

// Gulp tasks

gulp.task("scss", function () {
    return gulp
        .src([
            paths.src.scss + "/custom/**/*.scss",
            paths.src.scss + "/volt/**/*.scss",
            paths.src.scss + "/volt.scss",
        ])
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ["> 1%"] }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(paths.temp.css))
        .pipe(browserSync.stream());
});

gulp.task("index", function () {
    return gulp
        .src([paths.src.base + "*.html"])
        .pipe(handlebars(templateData, options))
        .pipe(rename((path) => {
            return {
                dirname: path.dirname,
                basename: path.basename,
                extname: ".html"
            };
        }))
        .pipe(gulp.dest(paths.temp.base))
        .pipe(browserSync.stream());
});

gulp.task("html", function () {
    var templateData = {
        firstName: 'KeshavSoft',
        Array: [{ name: "create" }, { name: "show" }, { name: "KeshavSoft" }]
    };

    options = {
        ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
        partials: {
            footer: '<footer>the end</footer>'
        },
        batch: ['./src/partials'],
        helpers: {
            capitals: function (str) {
                return str.toUpperCase();
            },
            compare: (k1, k2, options) => {
                if (k1 == k2) {
                    return k1;
                } else {
                    return options.inverse(this);
                }
            },
            compare1: (value1, value2, options) => {
                if (value1 === value2) {
                    return options.fn(this); // Render content within the block if true
                } else {
                    return options.inverse(this); // Render content within the else block if false
                }
            }
        }
    };

    return gulp
        .src([paths.src.html])
        .pipe(handlebars(templateData, options))
        .pipe(rename((path) => {
            return {
                dirname: path.dirname,
                basename: path.basename,
                extname: ".html"
            };

            console.log("aaaaaaaaaaaa : ", path);
        }))
        .pipe(gulp.dest(paths.temp.html))
        .pipe(browserSync.stream());
});

gulp.task("html1", function () {
    return gulp
        .src([paths.src.html])
        .pipe(
            fileinclude({
                prefix: "@@",
                basepath: "./src/partials/",
                context: getFileIncludeContext("production"),
            })
        )
        .pipe(gulp.dest(paths.temp.html))
        .pipe(browserSync.stream());
});

gulp.task("assets", function () {
    return gulp
        .src([paths.src.assets])
        .pipe(gulp.dest(paths.temp.assets))
        .pipe(browserSync.stream());
});

gulp.task("vendor", function () {
    return gulp
        .src(npmDist(), { base: paths.src.node_modules })
        .pipe(gulp.dest(paths.temp.vendor));
});

gulp.task("copy:dev:js", function () {
    return gulp.src("src/Js/**/*.*")
        .pipe(gulp.dest(".temp/Js"));
});

gulp.task(
    "serve",
    gulp.series("scss", "html", "index", "assets", "vendor", "copy:dev:js", function () {
        browserSync.init({ server: paths.temp.base, startPath: "/pages/index.html" });

        gulp.watch(
            [
                paths.src.scss + "/volt/**/*.scss",
                paths.src.scss + "/custom/**/*.scss",
                paths.src.scss + "/volt.scss",
            ],
            gulp.series("scss")
        );
        gulp.watch(
            [paths.src.html, paths.src.base + "*.html", paths.src.partials],
            gulp.series("html", "index")
        );
        gulp.watch([paths.src.assets], gulp.series("assets"));
        gulp.watch([paths.src.vendor], gulp.series("vendor"));
        gulp.watch(["src/Js/**/*.*"], gulp.series("copy:dev:js"));
    })
);

gulp.task("beautify:css", function () {
    return gulp
        .src([paths.dev.css + "/volt.css"])
        .pipe(cssbeautify())
        .pipe(gulp.dest(paths.dev.css));
});

gulp.task("minify:css", function () {
    return gulp
        .src([paths.dist.css + "/volt.css"])
        .pipe(cleanCss())
        .pipe(gulp.dest(paths.dist.css));
});

gulp.task("minify:html", function () {
    return gulp
        .src([paths.dist.html + "/**/*.html"])
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(handlebars(templateData, options))
        .pipe(rename((path) => {
            return {
                dirname: path.dirname,
                basename: path.basename,
                extname: ".html"
            };
        }))
        .pipe(gulp.dest(paths.dist.html));
});

gulp.task("minify:html:index", function () {
    return gulp
        .src([paths.dist.base + "*.html"])
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(handlebars(templateData, options))
        .pipe(rename((path) => {
            return {
                dirname: path.dirname,
                basename: path.basename,
                extname: ".html"
            };
        }))
        .pipe(gulp.dest(paths.dist.base));
});

gulp.task("clean:dist", function () {
    return del([paths.dist.base]);
});

gulp.task("clean:dev", function () {
    return del([paths.dev.base]);
});

gulp.task("copy:dist:css", function () {
    return gulp
        .src([
            paths.src.scss + "/volt/**/*.scss",
            paths.src.scss + "/custom/**/*.scss",
            paths.src.scss + "/volt.scss",
        ])
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ["> 1%"] }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(paths.dist.css));
});

gulp.task("copy:dev:css", function () {
    return gulp
        .src([
            paths.src.scss + "/volt/**/*.scss",
            paths.src.scss + "/custom/**/*.scss",
            paths.src.scss + "/volt.scss",
        ])
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({ overrideBrowserslist: ["> 1%"] }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(paths.dev.css));
});

gulp.task("copy:dist:html1", function () {
    return gulp
        .src([paths.src.html])
        .pipe(
            fileinclude({
                prefix: "@@",
                basepath: "./src/partials/",
                context: getFileIncludeContext("production"),
            })
        )
        .pipe(gulp.dest(paths.dist.html));
});

gulp.task("copy:dist:html", function () {
    return gulp
        .src([paths.src.html])
        .pipe(handlebars(templateData, options))
        .pipe(rename((path) => {
            return {
                dirname: path.dirname,
                basename: path.basename,
                extname: ".html"
            };
        }))
        .pipe(gulp.dest(paths.dist.html))
});

gulp.task("copy:dev:html", function () {
    return gulp
        .src([paths.src.html])
        .pipe(handlebars(templateData, options))
        .pipe(rename((path) => {
            return {
                dirname: path.dirname,
                basename: path.basename,
                extname: ".html"
            };
        }))
        .pipe(gulp.dest(paths.dev.html));
});

gulp.task("copy:dist:html:index", function () {
    return gulp
        .src([paths.src.base + "*.html"])
        .pipe(handlebars(templateData, options))
        .pipe(rename((path) => {
            return {
                dirname: path.dirname,
                basename: path.basename,
                extname: ".html"
            };
        }))
        .pipe(gulp.dest(paths.dist.base));
});

gulp.task("copy:dev:html:index", function () {
    return gulp
        .src([paths.src.base + "*.html"])
        .pipe(handlebars(templateData, options))
        .pipe(rename((path) => {
            return {
                dirname: path.dirname,
                basename: path.basename,
                extname: ".html"
            };
        }))
        .pipe(gulp.dest(paths.dev.base));
});

gulp.task("copy:dist:assets", function () {
    return gulp.src(paths.src.assets).pipe(gulp.dest(paths.dist.assets));
});

gulp.task("copy:dev:assets", function () {
    return gulp.src(paths.src.assets).pipe(gulp.dest(paths.dev.assets));
});

gulp.task("copy:dist:vendor", function () {
    return gulp
        .src(npmDist(), { base: paths.src.node_modules })
        .pipe(gulp.dest(paths.dist.vendor));
});

gulp.task("copy:dev:vendor", function () {
    return gulp
        .src(npmDist(), { base: paths.src.node_modules })
        .pipe(gulp.dest(paths.dev.vendor));
});

gulp.task("end:dist", async () => {
    fse.copySync(`${paths.src.base}/Js`, `${paths.dist.base}/Js`);

    CommonGulpCode({ inDistPath: paths.dist.base });

    return await true;
});

gulp.task("build:dev", gulp.series("clean:dev", "copy:dev:css", "copy:dev:html", "copy:dev:html:index", "copy:dev:assets", "copy:dev:js", "beautify:css", "copy:dev:vendor"));

gulp.task("build:dist", gulp.series("clean:dist", "copy:dist:css", "copy:dist:html", "copy:dist:html:index", "copy:dist:assets", "minify:css", "minify:html", "minify:html:index", "copy:dist:vendor", "end:dist"));

gulp.task("default", gulp.series("serve"));
