document.addEventListener("DOMContentLoaded", function() {
    var consoleBody = document.getElementById("console-body");
    var consoleInput = document.getElementById("console-input");
    var consoleHasFocus = false;
    var cmdHistory = [];
    var consoleData = [];
    var cmdInput = "";
    var cmdCache = "";
    var executeCMD = function(){};
    var writeConsole = function(){};
    var consoleReady = true;
    var cursor = "_"
    var cmdHistoryPos = -1
    var isConsoleStreaming = false;

    document.addEventListener("mousedown", function (e) {
        if(!isConsoleStreaming){
            if (e.target.classList.value.includes("console-target")) {
                consoleHasFocus = true;
    			cursor = "_"
    			writeConsole();
            } else {
                consoleHasFocus = false;
    			cursor = "_"
    			writeConsole();
            }
        }
    });
    
document.addEventListener("keydown", function (e) {
    if (consoleHasFocus) {
        var key = e.key;
        var ctlrDown = e.ctrlKey;

        if (isConsoleStreaming) {
            if (ctlrDown && key === "c") {
                isConsoleStreaming = false;
                cmdInput = "";
                writeConsole();
            }
            return;
        }

        if (key === "Enter" && consoleReady) {
            cmdHistory.unshift(cmdInput);
            consoleInput.innerHTML = " ";
            consoleReady = false;
            cmdHistoryPos = -1;
            executeCMD(cmdInput).then(result => {
                consoleData.push("root@0xDEADBEEF:~$ " + cmdInput);
                result.forEach(line => {
                    consoleData.push(line);
                });
                cmdInput = "";
                writeConsole();
                consoleReady = true;
            }).catch(error => {
                cmdInput = "";
                writeConsole();
                consoleReady = true;
            });
            writeConsole();
        } else if (key === "Backspace" && cmdInput.length > 0 && consoleReady) {
            cmdInput = cmdInput.split("");
            cmdInput.pop();
            cmdInput = cmdInput.join("");
            writeConsole();
        } else if (key.length === 1 && consoleReady && !ctlrDown) {
            cmdInput += key;
            writeConsole();
        } else if (key === "ArrowUp") {
            if (cmdHistory.length === 0) return;
            if (cmdHistoryPos === -1) {
                cmdCache = cmdInput.toString();
            }
            if (cmdHistoryPos === cmdHistory.length - 1) {
                cmdInput = cmdHistory[cmdHistoryPos];
            } else if (cmdHistoryPos < cmdHistory.length - 1) {
                cmdHistoryPos++;
                cmdInput = cmdHistory[cmdHistoryPos];
            }
            writeConsole();
            e.preventDefault();
        } else if (key === "ArrowDown") {
            if (cmdHistory.length === 0) return;
            if (cmdHistoryPos === 0) {
                cmdHistoryPos = -1;
                cmdInput = cmdCache.toString();
            } else if (cmdHistoryPos === cmdHistory.length - 1) {
                cmdHistoryPos--;
                cmdInput = cmdHistory[cmdHistoryPos];
            } else if (cmdHistoryPos > -1) {
                cmdHistoryPos--;
                cmdInput = cmdHistory[cmdHistoryPos];
            }
            writeConsole();
            e.preventDefault();
        } else if (key === "v" && ctlrDown) {
            e.preventDefault();
            navigator.clipboard.readText().then(text => {
                cmdInput += text;
                writeConsole();
            }).catch(err => {
                console.log('Failed to read clipboard contents: ', err);
            });
        } else if (e.keyCode === 32) {
            cmdInput += key;
            writeConsole();
        }
    }
    if (e.keyCode === 32) {

        e.preventDefault();
    }
});
    
    writeConsole = function() {
        var outputData = [];
		if (consoleData.length > 11) {
			outputData = consoleData.slice(consoleData.length - 11, consoleData.length);
			outputData.push(`root@0xDEADBEEF:~$ ${cmdInput}${cursor}`);
		} else {
			outputData = consoleData.map(function (item) {return item});
			outputData.push(`root@0xDEADBEEF:~$ ${cmdInput}${cursor}`);
		}
		var output = outputData.join("<br>");
		consoleInput.innerHTML = output
    };

    executeCMD = function(cmd) {
        return new Promise((resolve, reject) => {
            const trimmedCmd = cmd.trim().toLowerCase();
            const parts = trimmedCmd.split(" ");
            
            switch (parts[0]) {
                case "":
                    resolve([]);
                    break;
                
                case "help":
                    consoleData = [];
                    resolve([
                        "-> Help: Display This Message.",
                        "-> Nload: Network Load Information For FEDDED.ORG.",
                        "-> Leaderboard: Show Biggest Bypassing Attacks Against FEDDED.ORG.",
                        "-> Credits: Original Creators",
                        "-> Laws: The 10 Immutable Laws Of Security",
                        "-> Bios: Redirect To The Bio Page With All Users",
                        "-> Clear: Clear The Console.",
                        "-> Logout: Returns You Back To The Main Selection Page."
                    ]);
                    break;
                
                case "nload":
                    nload();
                    resolve([]);
                    break;
                
                case "leaderboard":
                    consoleData = [];
                    resolve([
                        "Reporting The Biggest Bypassing Attacks 0xDEADBEEF Has Mitigated",
                        "[#1] - GlideM8 120k + Holding Consistent",
                        "[#2] - Profile 20k + Holding Consistent",
                        "[#3] - TBD"
                    ]);
                    break;
                
                case "credits":
                    consoleData = [];
                    resolve([
                        "[CREDITS]",
                        "Baloo, Voltic and 0xDEADBEEF: Design & Console.js",
                        "Alexa: Helping With NLOAD Implementation",
                        "Source: My PC"
                    ]);
                    break;
                
                case "clear":
                    consoleData = [];
                    reject();
                    break;
                
                case "logout":
                    consoleData = [];
                    logout();
                    reject();
                    break;
                
                case "laws":
                    consoleData = [];
                    laws();
                    reject();
                    break;
                
                case "bios":
                    consoleData = [];
                    bios();
                    reject();
                    break;
                default:
                    reject([`Unknown command: ${cmd}`]);
                    break;
            }
        });
    };
    
    String.prototype.replaceAt = function(index, key) {
        return(this.substring(0, index) + key + this.substring(index + 1));
    }
    //Replace a character at any point in a string
    
    
    
    //Calculate an ideal scale
    function calcScale (max) {
    	var scale;
    	var range;
    	function calculate(value) {
    	    return (Math.ceil(value / 10) * 10)/10;
        }
        
    	scale = calculate(max);
    	return(scale);
    }
    
    //Read the function name -_-
    function formatNumber(num) {
    	var formatSettings = {
    		notation: "compact",
    	}
    	return new Intl.NumberFormat('en-US', formatSettings).format(num);
    }
    var lines = [
    	["    ", "", "               "],
    	["    ", "", "               "],
    	["    ", "", "               "],
    	["    ", "", "               "],
    	["    ", "", "               "],
    	["    ", "", "               "],
    	["    ", "", "               "],
    	["    ", "", "               "],
    	["    ", "", "               "],
    	["    ", "", "               "],
    	["    ", "", "               "]
    ]
    var timeline = [];
    
    //This fills the lines with empty filler space
    for (let x=0; x < 76; x++) {
    	timeline.push(0);
    }
    function nloadGraph(deadbeef, avgr) {
    	var avg = avgr;
    	var max = 0;
    	var ttl = 0;
    	var current = deadbeef;
        
    	//Scale
    	var scale = 0;
    	timeline.shift();
    	timeline.push(deadbeef);
    	
    	//Calculating the min and max values for the 76 second timeline
    	timeline.forEach(value => {
    		var _scale = calcScale(value);
    		if (scale < _scale) scale = _scale;
    	if (value > max) max = value;
    	ttl = ttl + value;
    	
    	})
    	
    	//Clearing the lines before drawing next bars
    	lines.forEach(line => {
    		line[1] = " ".repeat(76);
    	})
    	
    	//Draw the bars by going up from the bottom
    	for (let y=0; y < 76; y++) {
    		var value = timeline[y];
    		for (let x=0; x < Math.ceil(value/scale); x++) {
    			lines[10-x][1] = lines[10-x][1].replaceAt(y, "#");
    		}
    	}
    	
    	//Drawing the scale numbers
    	lines[9][0] = formatNumber(scale*2) + (" ".repeat(4 - (formatNumber(scale*2)).toString().length));
    	lines[7][0] = formatNumber(scale*4) + (" ".repeat(4 - (formatNumber(scale*4)).toString().length));
    	lines[5][0] = formatNumber(scale*6) + (" ".repeat(4 - (formatNumber(scale*6)).toString().length));
    	lines[3][0] = formatNumber(scale*8) + (" ".repeat(4 - (formatNumber(scale*8)).toString().length));
    	lines[1][0] = formatNumber(scale*10) + (" ".repeat(4 - (formatNumber(scale*10)).toString().length));
    	
    	//Drawing the statistics
    	avg = "Avg: " + formatNumber(avg);
    	max = "Max: " + formatNumber(max);
    	ttl = "Ttl: " + formatNumber(ttl);
    	current = "Curr: " + formatNumber(current);

    	//Clear the right-side stats column for all rows (they now go on top)
    	for (let i = 0; i < lines.length; i++) {
    		lines[i][2] = "";
    	}

    	//Build a single top stats row: 4 cells spread across the 95-char width
    	//Layout: 4 scale-pad + 91 graph/stats area, divided into 4 cells of ~22 chars each
    	function cell(label, w) {
    		var pad = w - label.length;
    		var left = Math.floor(pad / 2);
    		var right = pad - left;
    		return " ".repeat(left) + label + " ".repeat(right);
    	}
    	var topStats = cell(current, 20) + cell(avg, 20) + cell(max, 20) + cell(ttl, 20);

    	//This is to combine each line into one string instead of 3 arrays
    	var output = [];
    	output.push(topStats);
    	lines.forEach(line => {
    		output.push(line.join(""));
    	})
    	
    	//Combine each line and then set the console thingy
    	consoleInput.innerHTML = output.join("<br>").replaceAll(" ", "&nbsp;")
    }
    
    nload = function(){
        
        consoleInput.innerHTML = "[ Loading Nload ] ...";
        
        isConsoleStreaming = true;
        
        var count = 0;
        var all = 0;
        var total = 0;
        var current = 0;
        var highest = 0;
        var lowest = null;
        var average = null;
        
        var previous = null;
        var prevTime = null;
        
        getRps();
        
        function getRps(){
            fetch('/nginx_status')
            .then(function (response) {
            	return response.text();
            }).then(function (text) {
            	var part = text.split(' ')[9];
                all = parseInt(part);
                 
                if(Number.isNaN(all)){
                    consoleInput.innerHTML = "[ Your IP changed. Reloading ] ...";
                    setTimeout(() => {  location.reload(); }, 2000);
                    return;
                }
                
                
                var time = performance.now();
                
                if(prevTime != null){
                    var delay = time - prevTime
                    if(delay > 3000){
                        consoleInput.innerHTML = "[ Slow Connection, Reconnecting... ] !";
                    } else {
                        if(previous != null){
                            current = all - previous
                            
                            if(lowest == null){
                                lowest = current
                            }
                            
                            if(current > highest){
                                highest = current;
                            } else if(current < lowest){
                                lowest = current
                            }
                        }
                        
                        count++;
                        total += current;
                        average = (total/count).toFixed(2);
                        
                        nloadGraph(current, average);
                    }
                } else {
                    consoleInput.innerHTML = "[ Loading Nload ] ...";
                }
                
                previous = all;
                prevTime = performance.now();
                
                if(isConsoleStreaming){
                    setTimeout(getRps, 1000);
                } else {
                    writeConsole();
                }
            }).catch(function (err) {
                console.log(err);
            	consoleInput.innerHTML = "[ Try Setting The Site Up On A Server First ("+err+") ] !";
            	setTimeout(getRps, 1000);
            });
        }
    }
});

logout = function(){
    window.location.href = "desktop.html";
    }

laws = function (){
    window.location.href = "laws.html"
    }

bios = function (){
    window.location.href = "bios.html"
    }