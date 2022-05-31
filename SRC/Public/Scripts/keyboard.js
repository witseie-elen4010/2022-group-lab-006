const keyboard = {
    elements:{
        main:null,
        keysContainer:null,
        keys: []
    },

    eventHandlers:{
        oninput:null,
        onclose:null
    },

    properties:{
        value:"",
    },

    init(){
        //creating the main keyboard elements 
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        //setting up main elements
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this.keysCreation());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // add to dom
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        //to use keyboard for input elements
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus",() => {
                this.open(element.value, currentValue =>{
                    element.value = currentValue;
                });
            });

        }); 
    },

    keysCreation(){
        const fragment = document.createDocumentFragment();
        const keyLayout =[
            "Q","W","E","R","T","Y","U","I","O","P","backspace",
                "A","S","D","F","G","H","J","K","L","enter",
                      "Z","X","C","V","B","N","M"
        ];

        // creating HTML for the different icons 
        const createIconHTML = (icon_name) =>{
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key =>{
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace","enter","M"].indexOf(key)!==-1;

            //setting the keys attributes to be buttons 
            keyElement.setAttribute("type","button");
            keyElement.classList.add("keyboard__key");

            switch (key){
                case "backspace":
                    keyElement.classList.add("keyboard__keys_long");
                    keyElement.innerHTML = createIconHTML("backspace");

                    // deleting previous entry
                    keyElement.addEventListener("click", ()=>{
                        this.properties.value =this.properties.value.substring(0, this.properties.value.length -1);
                        this.eventTrigger("oninput");
                
                    });
                    break;

                case "enter":
                    keyElement.classList.add("keyboard__keys_long");
                    keyElement.innerHTML = createIconHTML("keyboard_return");
    
                    // Enter word entry
                    keyElement.addEventListener("click", ()=>{
                        this.properties.value += "\n";
                        this.eventTrigger("oninput");
                     });
                    break;

                default:
                    keyElement.textContent = key.toUpperCase();
                    keyElement.addEventListener("click",() =>{
                        this.properties.value += key.toUpperCase();
                        this.eventTrigger("oninput")
                    });
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak){
                fragment.appendChild(document.createElement("br"));
            }

        });

        return fragment;
    },

    eventTrigger(handlerName){
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    open(initialValue, oninput,onclose){
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    },

    close(){
        this.properties.value ="";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
    },
};

window.addEventListener("DOMContentLoaded",function(){
    keyboard.init();
});