const cloudinary = require('cloudinary')

cloudinary.config({ 
    cloud_name: 'djtd4wqoc', 
    api_key: '862418491127931', 
    api_secret: 'Pe8InGzsMalXgKfd_F_4ZY-Cpoo' 
  });
cloudinary.v2.uploader.upload("blob:http://localhost:3001/d3374833-65c0-4e5e-a6ce-04b9a21edaef",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });