export function jquery(element) {
    return new CustomJQuery(element);
}

function CustomJQuery(element) {
    this.query = document.querySelectorAll(element);
}

CustomJQuery.prototype.addClass = function(argument) {
    var isArgumentFunction = argument instanceof Function;
    for (let i = 0; i < this.query.length; i++) {
        let class_name = isArgumentFunction ? argument(i, this.query[i].className) : argument;
        this.query[i].classList.add(class_name);
    }
    return this;
}
CustomJQuery.prototype.removeClass = function(argument) {
    var isArgumentFunction = argument instanceof Function;
    for (let i = 0; i < this.query.length; i++) {
        let class_name = isArgumentFunction ? argument(i, this.query[i].className) : argument;
        this.query[i].classList.remove(class_name);
    }
    return this;
}

CustomJQuery.prototype.append = function(argument) {
    for (let i = 0; i < this.query.length; i++) {
        if (typeof argument === 'string') {
            this.query[i].innerHTML += argument;
        } else {
            this.query[i].appendChild(argument.cloneNode(true));
        }
    }
    return this;
}

CustomJQuery.prototype.html = function(argument) {
    if (arguments.length == 0) {
        return this.query[0].innerHTML;
    } else {
        for (let i = 0; i < this.query.length; i++) {
            this.query[i].innerHTML += argument;
        }
    }
    return this;
}

CustomJQuery.prototype.attr = function(attributeName, value) {
    if (value == undefined) {
        return this.query[0].getAttribute(attributeName);
    }
    for (let i = 0; i < this.query.length; i++) {
        this.query[i].setAttribute(attributeName, value);
    }
    return this;
}

CustomJQuery.prototype.children = function(argument) {
    return this.query[0].querySelectorAll(argument);
}

CustomJQuery.prototype.css = function(key, value) {
    if (typeof value == 'undefined') {
        return this.query[0].style[key];
    }
    for (let i = 0; i < this.query.length; i++) {
        this.query[i].style.cssText += key + ': ' + value;

    }
    return this;
}

CustomJQuery.prototype.data = function(key, value) {
    for (let i = 0; i < this.query.length; i++) {
        if (arguments.length == 0) {
            return this.query[i].dataset;
        }
        if (typeof key === 'object') {
            for (let k in key) {
                let v = key[k];
                this.query[i].dataset[k] = v;
            }
            continue;
        }
        if (value === undefined) {
            return this.query[i].dataset[key];
        } else {
            this.query[i].dataset[key] = value;
        }
    }
    return this;
}

CustomJQuery.prototype.on = function(eventName, selector, eventHandler) {
    if (arguments.length == 2) {
        this.query[0].addEventListener(eventName, selector);
    } else {
        this.query[0].addEventListener(eventName, function(e) {
            if (e.target.className == document.querySelector(selector).className) {
                eventHandler()
            }
        })
    }
    return this;
}

CustomJQuery.prototype.one = function(events, handler) {
    for (let i = 0; i < this.query.length; i++) {
        this.query[i].addEventListener(events, function(event) {
            event.target.removeEventListener(event.type, arguments.callee);
            return handler(event);
        });
    }
}

CustomJQuery.prototype.each = function(f) {
    for (let i = 0; i < this.query.length; i++) {
        let node = this.query[i];
        let res = f.call(node, i, node);
        if (res === false) {
            break;
        }
    }
    return this;
}
