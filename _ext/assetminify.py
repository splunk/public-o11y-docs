import cssmin, glob,re
from jsmin import jsmin 

def setup(app):
    return
jsmin_files = []
cssmin_files = []
final_conf_includes = []
# It create seperated array of assets based on its type and minify or not. to 3 different arrays.
def asset_includes(asstname , isminify):
   if isminify == "yes":
      if asstname.endswith('.js'):
         jsmin_files.append(asstname)
      if asstname.endswith('.css'):
         cssmin_files.append(asstname)
   else:
      final_conf_includes.append(asstname)
     
#
def pushassets():
# You can add new files here and those file should place in _static folder.
   asset_includes('custom.css',"yes")
   asset_includes('signalfx-alabaster.css',"yes")
   asset_includes('signalfx-includes.css',"yes")
   asset_includes('signalfx-includes.js',"yes")
   asset_includes('jsonpull-splunk.js',"yes")
   asset_includes('customjs.js',"yes")
   asset_includes('yaml-splunk.js',"no")
   asset_includes('showdown.min.js',"no")
   return final_conf_includes

#calling static push assets and same method will be called in conf.py for non minify css & js files.
assets = pushassets()


outfilename = '_static/main.min.css'

with open(outfilename, 'w') as outfile:
    for fname in cssmin_files:
        if re.match(outfilename,fname):
            continue
        else:
            print(fname)
            with open("_static/" + fname, 'r') as rawfile:
                minified_file = cssmin.cssmin(rawfile.read())
                outfile.write(minified_file)
            outfile.write('/* ================================end of ' + fname + '===========================================*/\n')


jsMinifiedFile = '_static/main.min.js'
with open(jsMinifiedFile, 'w') as jsoutfile:
    for jsfname in jsmin_files:
         if re.match(jsMinifiedFile,jsfname):
            continue
         else:
            print(jsfname)
            with open("_static/" + jsfname, 'r') as jsrawfile:
                js_minified_file = jsmin(jsrawfile.read())
                jsoutfile.write(js_minified_file)
            jsoutfile.write('/* ================================end of ' + jsfname + '===========================================*/\n')
