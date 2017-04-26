var WebSocketServer = new require('ws');

var wss = new WebSocketServer.Server({port: 8080});

var clients = [];

wss.on('connection', function(ws) {
    // Порядковый номер
    var id = clients.length;
    // Добавляем в массив объект вебсокета
    clients[id] = ws;
    console.log('New connection', id);
    
    // Для алерта 
    clients[id].send(JSON.stringify( {
        type: 'hello',
        message: 'Hello, Your ID ' + id,
        data: id
    }));
    
    //Отображаем новые подключения
    for(var key in clients) {
        if(key!=id){
            console.log('send');
            clients[key].send(JSON.stringify({
                type: 'info',
                message: 'New Connection ' + id
            }));
        }
    }
    
    //Сообщения
    ws.on('message', function(message) {
        console.log('Получено сообщение', message);
        for(var key in clients) {
            clients[key].send(JSON.stringify( {
        type: 'message',
        message: message,
        author: id
    }));
        }
    })
})