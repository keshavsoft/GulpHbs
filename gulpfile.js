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
const { options: optionsObject } = require("./options");

var dotenv = require("dotenv");
dotenv.config();

// Load and enhance schema.json
const CommonColumns = require("./schema.json");
const SideBarItems = require("./SidebarItems/SideBar.json");
const SideBarForCalender = require("./SidebarItems/forCalender.json");
const CommonSideBarsImportJson = require("./SideBars/import.json");
const SideBarItemsForShowAll = require("./SidebarItems/forShowAll.json");
const SideBarForRead = require("./SidebarItems/forRead.json")
const SideBarItemsforCreate = require("./SidebarItems/forCreate.json");
const SideBarItemsforDelete = require("./SidebarItems/forDelete.json");
const SideBarItemsForGroupBy = require("./SidebarItems/forGroupBy.json")
const SideBarItemsforAlter = require("./SidebarItems/forAlter.json")
const SideBarItemsforDownload = require("./SidebarItems/forDownload.json")
const SideBarItemsforCards = require("./SidebarItems/forCards.json")
const SideBarItemsforCharts = require("./SidebarItems/forCharts.json")
const SideBarItemsforSubObjShow = require("./SidebarItems/forSubObjShow.json")
const SideBarItemsforSubArrayShow = require("./SidebarItems/forSubArrayShow.json")

// Define paths
const paths = {
    distForProtected: {
        base: "./distForProtected/",
        css: "./distForProtected/css",
        html: "./distForProtected/pages",
        assets: "./distForProtected/assets",
        img: "./distForProtected/assets/img",
        vendor: "./distForProtected/vendor",
    },
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
        hbsPath: "./src/partials/Hbs"
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
    TableName: CommonColumns.tableName,
    firstName: 'KeshavSoft',
    Array: [{ name: "create" }, { name: "show" }, { name: "KeshavSoft" }],
    SideBarItems: SideBarItems,
    SideBarForCalender: SideBarForCalender,
    TableColumns: CommonColumns.columns,
    columns: CommonColumns.columns,
    DataTableOptions: CommonColumns.DataTableOptions,
    SideBarForImport: CommonSideBarsImportJson,
    pathFromGulp: "../..",
    SideBarItemsForShowAll: SideBarItemsForShowAll,
    SideBarForRead: SideBarForRead,
    SideBarItemsforCreate: SideBarItemsforCreate,
    SideBarItemsforDelete: SideBarItemsforDelete,
    SideBarItemsforAlter: SideBarItemsforAlter,
    SideBarItemsforDownload: SideBarItemsforDownload,
    SideBarItemsforCards: SideBarItemsforCards,
    SideBarItemsforCharts: SideBarItemsforCharts,
    SideBarItemsForGroupBy: SideBarItemsForGroupBy,
    SideBarItemsforSubObjShow: SideBarItemsforSubObjShow,
    SideBarItemsforSubArrayShow: SideBarItemsforSubArrayShow
};

options = {
    ignorePartials: true, //ignores the unknown footer2 partial in the handlebars template, defaults to false
    partials: {
        footer: '<footer>the end</footer>'
    },
    batch: [paths.src.hbsPath],
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
        },
        isKeyPresent: (inObject, inKey) => {
            console.log("aaaaaaaaaaaa : ", inObject, inKey);

            return inKey in inObject;
        },
        isVisible: (inObject) => {
            return "visible" in inObject;
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
        .pipe(handlebars(templateData, optionsObject))
        .pipe(rename((path) => {
            console.log("Renaming path: ", path);
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
    return gulp
        .src([paths.src.html])
        .pipe(handlebars(templateData, optionsObject))
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

gulp.task("minify:distForProtected:css", function () {
    return gulp
        .src([paths.distForProtected.css + "/volt.css"])
        .pipe(cleanCss())
        .pipe(gulp.dest(paths.distForProtected.css));
});

gulp.task("minify:html", function () {
    return gulp
        .src([paths.dist.html + "/**/*.html"])
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(handlebars(templateData, optionsObject))
        .pipe(rename((path) => {
            return {
                dirname: path.dirname,
                basename: path.basename,
                extname: ".html"
            };
        }))
        .pipe(gulp.dest(paths.dist.html));
});

gulp.task("minify:distForProtected:html", function () {
    return gulp
        .src([paths.distForProtected.html + "/**/*.html"])
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(handlebars(templateData, optionsObject))
        .pipe(rename((path) => {
            return {
                dirname: path.dirname,
                basename: path.basename,
                extname: ".html"
            };
        }))
        .pipe(gulp.dest(paths.distForProtected.html));
});

gulp.task("minify:html:index", function () {
    return gulp
        .src([paths.dist.base + "*.html"])
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(handlebars(templateData, optionsObject))
        .pipe(rename((path) => {
            return {
                dirname: path.dirname,
                basename: path.basename,
                extname: ".html"
            };
        }))
        .pipe(gulp.dest(paths.dist.base));
});

gulp.task("minify:distForProtected:html:index", function () {
    return gulp
        .src([paths.distForProtected.base + "*.html"])
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(handlebars(templateData, optionsObject))
        .pipe(rename((path) => {
            return {
                dirname: path.dirname,
                basename: path.basename,
                extname: ".html"
            };
        }))
        .pipe(gulp.dest(paths.distForProtected.base));
});

gulp.task("clean:dist", function () {
    return del([paths.dist.base]);
});

gulp.task("clean:distForProtected", function () {
    return del([paths.distForProtected.base]);
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

gulp.task("copy:distForProtected:css", function () {
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
        .pipe(gulp.dest(paths.distForProtected.css));
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

gulp.task("copy:dist:html", function () {
    return gulp
        .src([paths.src.html])
        .pipe(handlebars(templateData, optionsObject))
        .pipe(rename((path) => {
            return {
                dirname: path.dirname,
                basename: path.basename,
                extname: ".html"
            };
        }))
        .pipe(gulp.dest(paths.dist.html))
});


gulp.task("copy:distForProtected:html", function () {
    return gulp
        .src([paths.src.html])
        .pipe(handlebars(templateData, optionsObject))
        .pipe(rename((path) => {
            return {
                dirname: path.dirname,
                basename: path.basename,
                extname: ".html"
            };
        }))
        .pipe(gulp.dest(paths.distForProtected.html))
});

gulp.task("copy:dev:html", function () {
    return gulp
        .src([paths.src.html])
        .pipe(handlebars(templateData, optionsObject))
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
        .pipe(handlebars(templateData, optionsObject))
        .pipe(rename((path) => {
            return {
                dirname: path.dirname,
                basename: path.basename,
                extname: ".html"
            };
        }))
        .pipe(gulp.dest(paths.dist.base));
});

gulp.task("copy:distForProtected:html:index", function () {
    return gulp
        .src([paths.src.base + "*.html"])
        .pipe(handlebars(templateData, optionsObject))
        .pipe(rename((path) => {
            return {
                dirname: path.dirname,
                basename: path.basename,
                extname: ".html"
            };
        }))
        .pipe(gulp.dest(paths.distForProtected.base));
});

gulp.task("copy:dev:html:index", function () {
    return gulp
        .src([paths.src.base + "*.html"])
        .pipe(handlebars(templateData, optionsObject))
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

gulp.task("copy:distForProtected:assets", function () {
    return gulp.src(paths.src.assets).pipe(gulp.dest(paths.distForProtected.assets));
});

gulp.task("copy:dev:assets", function () {
    return gulp.src(paths.src.assets).pipe(gulp.dest(paths.dev.assets));
});

gulp.task("copy:dist:vendor", function () {
    return gulp
        .src(npmDist(), { base: paths.src.node_modules })
        .pipe(gulp.dest(paths.dist.vendor));
});

gulp.task("copy:distForProtected:vendor", function () {
    return gulp
        .src(npmDist(), { base: paths.src.node_modules })
        .pipe(gulp.dest(paths.distForProtected.vendor));
});

gulp.task("copy:dev:vendor", function () {
    return gulp
        .src(npmDist(), { base: paths.src.node_modules })
        .pipe(gulp.dest(paths.dev.vendor));
});

gulp.task("end:dist", async () => {
    fse.copySync(`${paths.src.base}/Js`, `${paths.dist.base}/Js`);

    LocalFuncChangeJsConfig({ inDistPath: paths.dist.base });

    return await true;
});

gulp.task("end:distForProtected:dist", async () => {
    fse.copySync(`${paths.src.base}/Js`, `${paths.distForProtected.base}/Js`);

    LocalFuncChangeJsConfigForProtected({ inDistPath: paths.distForProtected.base });

    return await true;
});

const LocalFuncChangeJsConfig = ({ inDistPath }) => {
    const CommonVersionCode = "$ApiVersion";
    const CommonTableNameCode = "$TableName";

    const LocalDistPath = inDistPath;

    const filePath = `${LocalDistPath}/Js/Config.json`;

    const content = fse.readFileSync(filePath, 'utf-8');
    const contentAsJson = JSON.parse(content);

    contentAsJson.columns = CommonColumns.columns;
    contentAsJson.TableName = contentAsJson.TableName.replace(CommonTableNameCode, CommonColumns.tableName);
    contentAsJson.TableName = contentAsJson.TableName.replace(CommonVersionCode, `${process.env.VERSION}`);

    contentAsJson.DataTableOptions = CommonColumns.DataTableOptions;

    fse.writeFileSync(filePath, JSON.stringify(contentAsJson), 'utf-8');
};

const LocalFuncChangeJsConfigForProtected = ({ inDistPath }) => {
    const CommonVersionCode = "$ApiVersion";
    const CommonTableNameCode = "$TableName";

    const LocalDistPath = inDistPath;

    const filePath = `${LocalDistPath}/Js/Config.json`;

    const content = fse.readFileSync(filePath, 'utf-8');
    const contentAsJson = JSON.parse(content);

    contentAsJson.columns = CommonColumns.columns;
    contentAsJson.TableName = contentAsJson.TableName.replace(CommonTableNameCode, CommonColumns.tableName);
    contentAsJson.TableName = contentAsJson.TableName.replace(CommonVersionCode, `S${process.env.VERSION}`);

    contentAsJson.DataTableOptions = CommonColumns.DataTableOptions;

    fse.writeFileSync(filePath, JSON.stringify(contentAsJson), 'utf-8');
};

gulp.task("build:dev", gulp.series("clean:dev", "copy:dev:css", "copy:dev:html", "copy:dev:html:index", "copy:dev:assets", "copy:dev:js", "beautify:css", "copy:dev:vendor"));

gulp.task("build:dist", gulp.series("clean:dist", "copy:dist:css", "copy:dist:html", "copy:dist:html:index", "copy:dist:assets", "minify:css", "minify:html", "minify:html:index", "copy:dist:vendor", "end:dist"));

gulp.task("build:distForProtected", gulp.series("clean:distForProtected", "copy:distForProtected:css", "copy:distForProtected:html", "copy:distForProtected:html:index", "copy:distForProtected:assets", "minify:distForProtected:css", "minify:distForProtected:html", "minify:distForProtected:html:index", "copy:distForProtected:vendor", "end:distForProtected:dist"));

// gulp.task("k1", gulp.series("k2"));

gulp.task("default", gulp.series("serve"));
