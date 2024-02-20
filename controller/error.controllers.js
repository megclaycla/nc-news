function handleInvalidEndpoint(request, response, next){
    response.status(404).send({msg: "path not found"})
}

function handleCustomErrors(err, request, response, next){
    if(err.status && err.msg) {
        response.status(err.status).send({msg: err.msg})
    } else next(err)
    // if (err.status === 204) {
        //     response.status(err.status).send()
        // }
    }
    
    function handlePSQLErrors(err, request, response, next) {
        if(err.code === '22P02'){
            response.status(400).send({msg: "Bad request"})
            } else next(err)
    }


function handleServerError(err, request, response, next){
    response.status(500).send({msg: "Internal server error"})
}

module.exports = {handlePSQLErrors, handleCustomErrors, handleServerError, handleInvalidEndpoint}