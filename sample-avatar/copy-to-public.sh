#!/bin/bash
cd `dirname $0`
rm ../public/index.html
rm ../public/static/js/main-quiz.*.js
rm ../public/static/css/main-quiz.*.css
cp ./build/index.html ../public/
cp ./build/static/js/*.js ../public/static/js/
cp ./build/static/css/*.css ../public/static/css/
