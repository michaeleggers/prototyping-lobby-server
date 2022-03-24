const express = require('express')
const request = require('request')

const app = express()
const port = process.env.PORT || 3000


aliveHosts = []

function isHostKnown(ip) {
    aliveHosts.forEach((h) => {
        if (h.ip === ip) {
            console.log('Host known!')
            return true
        }
        console.log('New Host!')
        return false
    })
}

app.get('/', (req, resp) => {
    // ip = req.socket.remoteAddress
    ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    hostname = req.hostname
    console.log(hostname + '@' + ip + ' wants to connect...')
    if ( (aliveHosts.length === 0) || (isHostKnown(ip) === false) ) {
        aliveHosts.push({hostname, ip}) // TODO: Check if host already connected.
    }
    else {
        console.log('Host with IP ' + ip + ' already connected!')
    }
    
    // if (req.rawHeaders != undefined) {
    //     if (aliveHosts.indexOf(req.rawHeaders[1]) < 0) {
    //         aliveHosts.push(req.rawHeaders[1])
    //     }
    // }
    console.log(aliveHosts)
    resp.status(200).send(JSON.stringify(aliveHosts))
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

// checkIfHostIsAlive()