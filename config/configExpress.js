const express = require('express')

module.exports = () => {

    const app = express()
    
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())

    return app
}

