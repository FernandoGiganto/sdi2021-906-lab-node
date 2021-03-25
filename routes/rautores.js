module.exports = function (app,swig){

    app.get('/autores/agregar', function (req, res) {
        let roles = [ {
            "nombre": "Cantante",
        }, {
            "nombre": "Batería",
        },{
            "nombre": "Guitarrista",
        },{
            "nombre": "Bajista",
        },{
            "nombre": "Teclista",
        }];
        let respuesta = swig.renderFile('views/autores-agregar.html', {
            roles:roles
        });
        res.send(respuesta);
    });

    app.post("/autores/agregar",function (req,res){
        let nombre_autor = req.body.nombre;
        let grupo = req.body.grupo;
        if(nombre_autor == "")
            res.send("Nombre de autor no enviado en la petición");

        else if(grupo == "")
            res.send("Grupo no enviado en la petición");
        else{
            res.send("Autor agregada: " + nombre_autor +"<br>"
                +" grupo: " + grupo +"<br>"
                +" rol: " + req.body.rol ) ;
        }

    });

    app.get("/autores",function (req,res){
        let autores = [ {
            "nombre": "Dario",
            "grupo": "Oracle",
            "rol": "cantante"
        },{
            "nombre": "Manolin",
            "grupo": "Camela",
            "rol": "Teclista"
        }];

        let respuesta = swig.renderFile('views/autores.html',{
            autores : autores
        });

        res.send(respuesta);
    });

    app.get('/autores/:id', function(req, res) {
        let respuesta = 'id: ' + req.params.id;
        res.redirect("/autores");
    });

    app.get('/autores/:grupo', function(req, res) {
        let respuesta = 'grupo: ' + req.params.id;
        res.redirect("/autores");
    });

    app.get('/autores/:grupo/:id', function(req, res) {
        let respuesta = 'id: ' + req.params.id + '<br>' + 'grupo: ' + req.params.id;
        res.redirect("/autores");
    });
};