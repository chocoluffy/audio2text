// Required Modules
var formidable = require('formidable'),
    http = require('http'),
    util = require('util'),
    fs   = require('fs-extra');

     // create server  
     http.createServer(function(req, res) {
  
   // Form uploading Process code
   //Upload route
   if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    
 // creates a new incoming form. 
 var form = new formidable.IncomingForm();
 
 // parse a file upload
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('Upload received :\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
 form.on('end', function(fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        /* Location where we want to copy the uploaded file */
        var new_location = __dirname + '/uploads/';
        console.log(new_location);
        fs.copy(temp_path, new_location + file_name, function(err) {  
            if (err) {
                console.error(err);
            } else {
                console.log("success!")
            }
        });
    });
    return;
  }
  /* Displaying file upload form. */
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" method="post" enctype="multipart/form-data">'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8080);