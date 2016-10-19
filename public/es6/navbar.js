import * as ajax from './ajax';
import { API_URL } from './config';

/** Class representing a Navigation Bar. */
class NavBar {
    /**
     * Create a NavBar.
     * @param {string} selector - the DOM selector where the navBar will put.
     */
    constructor (selector) {
        this.activeMenu = false;
        this.activeElement = false;
        this.selector = selector;
        this.getOptions();
        this._globalHelpers();
    }

    /**
     * Hide the active elements in the navBar
     */
    hideActives() {
        if (this.activeElement) {
            let nodes = document.querySelectorAll(this.selector + ' ul li.active');
            for(let i = 0; i < nodes.length; i++) {
                nodes[i].classList.remove('active');
            }
            this.activeElement = false;
        }
    }

    /**
     * Private function for initialize the DOM event listeners
     */
    _globalHelpers() {
        document.addEventListener('click', 
            (element) => {
                this.hideActives();
            }
        );

        let menu = document.querySelector(this.selector);
        let hamburger = document.getElementById('hamburger');
        let img = document.querySelector('#hamburger img');

        if (hamburger) {
            hamburger.addEventListener('click', 
                (element) => {
                    if (this.activeMenu) {
                        this.activeMenu = false;
                        img.src = 'public/images/toggle-open.svg';
                        menu.classList.remove('active');
                    } else {
                        this.activeMenu = true;
                        img.src = 'public/images/toggle-close.svg';
                        menu.classList.add('active');
                    }
                }
            );
        }
    }

    /**
     * Set the 'active'' css class to the li element given
     * @param {HTMLLIElement} selector - the DOM selector where the navBar will put. 
     */
    showChild(element) {
        element.classList.add('active');
    }

    /**
     * Recursive method for node scan at the JSON response
     * @param {array} items - the array item from json object
     */
    nodeScan(items) {
        let ul = document.createElement('ul');
        for (const item of items) {
            //list element
            let li = document.createElement('li');

            //link creation (a href)
            let link = document.createElement('a');
            link.setAttribute('href', item.url);

            //span for text list
            let span = document.createElement('span');
            span.innerHTML = item.label;

            //add span to link (a href)
            link.appendChild(span);
            
            //add span to li
            li.appendChild(link);

            if (item.items !== undefined && item.items.length) {
                li.appendChild(this.nodeScan(item.items, false));
                link.addEventListener('click', 
                    (event) => {
                        this.hideActives();
                        this.showChild(li);
                        this.activeElement = true;
                        let liElements = li.getElementsByTagName('li');
                        event.stopPropagation();
                    }
                );
            }

            //add list to ul :)
            ul.appendChild(li);
            
        }
        return ul;
    }

    /**
     * Render the data give as parameter
     * @param {array} data - the array item from json object
     */
    render(data = undefined) {
        if (data !== undefined && data.items.length) {
            let root = document.querySelector(this.selector);
            let domElements = this.nodeScan(data.items);
            root.appendChild(domElements);
        }
    }

    /**
     * Method that load the initial data from 'api/nav.json'
     */
    getOptions () {
        ajax.getApi(API_URL + 'api/nav.json').then(
            (data) => {
                this.render(data);
            }
        ).catch(
            (error) => {
                console.error(error);
            }
        );
    }
}

/**
 * Function where the app start
 */
function main() {
    //put navbar into #navBar selector
    let navBar = new NavBar('#navBar');
}

//wait until the DOM is loaded, otherwise the container div couldn't exist
document.addEventListener('DOMContentLoaded', main());