const easymidi = require('easymidi');
const readline = require('readline');

const output = new easymidi.Output('Narak-FootController', true);

function sendMidiCC(cc) {
    output.send('cc', {
        controller: cc,
        value: 100,
        channel: 10,
    });
}

function sendMidiPC(program) {
    output.send('program', {
        number: program,
        channel: 10,
    });
}

// Allows us to listen for events from stdin
readline.emitKeypressEvents(process.stdin);

const midiCC = [
    'q',
    'w',
    'e',
    'r',
    't',
    'y',
    'u',
    'i',
    ',',
    'o',
    '.',
    'p',
    ';',
    '/',
    '[',
    ']',
    "'",
    '\\',
    '`',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '-',
    '=',
];

const midiPC = ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];

// Raw mode gets rid of standard keypress events and other
// functionality Node.js adds by default
process.stdin.setRawMode(true);

// Start the keypress listener for the process
process.stdin.on('keypress', (str, key) => {
    // "Raw" mode so we must do our own kill switch
    if (key.sequence === '\u0003') {
        output.close();
        process.exit();
    }

    const ccValue = midiCC.indexOf(str);
    if (ccValue > -1) {
        console.log('Sending CC', ccValue);
        sendMidiCC(ccValue);
    }

    const pcNum = midiPC.indexOf(str);
    if (pcNum > -1) {
        console.log('Sending PC', pcNum);
        sendMidiPC(pcNum);
    }
});
