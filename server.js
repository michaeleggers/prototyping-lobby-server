const express = require('express')
const request = require('request')

const app = express()
const port = process.env.PORT || 3000


aliveHosts = []


app.get('/', (req, resp) => {
    ip = req.socket.remoteAddress
    hostname = req.hostname
    console.log(hostname + '@' + ip + ' wants to connect...')
    aliveHosts.push({hostname, ip}) // TODO: Check if host already connected.
    
    // if (req.rawHeaders != undefined) {
    //     if (aliveHosts.indexOf(req.rawHeaders[1]) < 0) {
    //         aliveHosts.push(req.rawHeaders[1])
    //     }
    // }
    console.log(aliveHosts)
    resp.status(200).send('HELO')
})

app.listen(port, () => {
    console.log('Server up on port ' + port)
})

const checkIfHostIsAlive = function() {setInterval(() => {
    for (let i = 0; i < aliveHosts.length; i++) {
        // TODO: make a request to the host to check if it is still alive
        console.log(aliveHosts[i])
    }
}, 10000)}

checkIfHostIsAlive()