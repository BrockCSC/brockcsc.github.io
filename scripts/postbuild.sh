echo 'Running postbuild script'
# This is done so that the 404 logic can be handled by the app.
echo 'Copying index.html and renaming it to 404.html'
cp ./dist/index.html ./dist/404.html
cp ./.gitignore ./dist/.gitignore
cp ./CNAME ./dist/CNAME