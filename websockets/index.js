function readMessage() {

    // explicit read operation
    const send = () => {
        const message = {
            commands: [
                {
                    commandOptions: [ "SendErrorMessage" ],
                    symbol: "PLC1.GVL.Points"
                },
            ],
            requestType: "ReadWrite"
        };
        ws.send(JSON.stringify(message));
    }

    // target the development server (3000)
    const ws = new WebSocket('ws://localhost:3000/');

    ws.onopen = send;
    ws.onmessage = (message) => {
        
        console.log(message.data);
        // update UI
        if (message.data) {
            const data = JSON.parse(message.data);
            if (data.commands.length) {
                const elem = document.getElementById('structValue');
                elem.innerHTML = JSON.stringify(data.commands[0].readValue);
            }
        }

    };
}

function writeMessage() {

    // explicit write operation
    const send = () => {
        const message = {
            commands: [
                {
                    commandOptions: [ "SendErrorMessage", "SendWriteValue" ],
                    symbol: "PLC1.MAIN.iWriteMe",
                    writeValue: 30
                },
            ],
            requestType: "ReadWrite"
        };
        ws.send(JSON.stringify(message));
    }

    const ws = new WebSocket('ws://localhost:3000/');

    ws.onopen = send;
    ws.onmessage = (message) => {
        
        // update UI
        if (message.data) {
            const data = JSON.parse(message.data);
            console.log(data);
        }

    };
}

function subscribe() {

    // subscribe to symbol onChange
    const send = () => {
        const message = {
            commands: [
                {
                    commandOptions: [ ],
                    symbol: "PLC1.MAIN.Position"
                },
                {
                    commandOptions: [ ],
                    symbol: "PLC1.MAIN.Velocity"
                }
            ],
            requestType: "Subscription",
            intervalTime: 1000
        };
        ws.send(JSON.stringify(message));
    }

    const ws = new WebSocket('ws://localhost:3000/');

    ws.onopen = send;
    ws.onmessage = (message) => {
        
        // update UI
        if (message.data) {
            const data = JSON.parse(message.data);
            if (data.commands.length) {
                console.log(data);
                const pos = document.getElementById('posValue');
                const vel = document.getElementById('velValue');
                pos.value = data.commands[0].readValue;
                vel.value = data.commands[1].readValue;
            }
        }

    };
}