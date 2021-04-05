module.exports = function (app, swig, gestorBD) {
    app.post("/comentarios/:cancion_id", function (req,res) {
        let id = req.params.cancion_id;

        let comentario = {
            autor: req.session.usuario,
            texto: req.body.texto,
            cancion_id: gestorBD.mongo.ObjectID(id),
        }
        gestorBD.insertarComentario(comentario, function (id) {
            if (id == null){
                res.send("Error al añadir comentario");
            }
            else{
                res.send("Added id" + id);
            }
        })
    });

    app.get('/comentario/borrar/:id', function (req, res) {
        let id = req.params.id;
        let comentario = { "_id" : gestorBD.mongo.ObjectID(id) };

        if(comentario.autor == req.session.autor){
            gestorBD.borrarComentario(comentario, function(result) {
                if (result == null) {
                    res.send("Error al eliminar ");
                } else {
                    res.send("Eliminado");
                }
            });
        }else{
            res.send("No se puedo eliminar comentarios que no son tuyos")
        }

    });


};