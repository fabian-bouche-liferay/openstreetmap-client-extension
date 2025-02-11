import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct React 18 import

import LiferayReactMap from './LiferayReactMap';

class LiferayReactMapWebComponent extends HTMLElement {
    constructor() {
        super();
        this.root = null; // Store React root instance
    }

    connectedCallback() {
        if (!this.shadowRoot) {
            this.attachShadow({ mode: 'open' });
        }
        this.renderReactComponent();
    }

    renderReactComponent() {
        if (!this.shadowRoot.querySelector('.react-root')) {
            const reactRoot = document.createElement('div');
            reactRoot.className = 'react-root';
            this.shadowRoot.appendChild(reactRoot);
        }

        const reactRootElement = this.shadowRoot.querySelector('.react-root');

        // Only create root if it hasn't been created
        if (!this.root) {
            this.root = createRoot(reactRootElement);
        }

        const style = document.createElement("link");
        style.id = "leaflet-style";
        style.rel = "stylesheet";
        style.href = "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css";
        this.shadowRoot.appendChild(style);

        const customStyle = document.createElement('style');
        customStyle.textContent = `

            .leaflet-container {
                width: 100%;
                height: 600px;
                z-index: 1;
            }

            .custom-marker {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }

            .marker-container {
                width: 60px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .marker-img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
            }

            .marker-name {
                margin-top: 4px;
                font-size: 12px;
                font-weight: bold;
                color: black;
                background: white;
                padding: 2px 5px;
                border-radius: 5px;
            }           

        `;

        this.shadowRoot.appendChild(customStyle);

        let poiList = [];
        this.querySelectorAll("poi").forEach((poi) => {
            poiList.push({
                headline: poi.querySelector(".marker-headline").innerHTML,
                popupHeadline: this.getCleanText(poi.querySelector(".marker-popup-headline")),
                popupLineOne: this.getCleanText(poi.querySelector(".marker-popup-line1")),
                popupLineTwo: this.getCleanText(poi.querySelector(".marker-popup-line2")),
                portrait: poi.querySelector(".marker-portrait").src,
                lat: poi.querySelector(".marker-latitude").innerHTML,
                lon: poi.querySelector(".marker-longitude").innerHTML,
                url: poi.querySelector(".marker-url").href,
                details: poi.querySelector(".marker-url").innerHTML,
            });
        });

        this.root.render(<LiferayReactMap poiList={poiList} />);
    }

    disconnectedCallback() {
        if (this.root) {
            this.root.unmount();
            this.root = null; // Reset root reference
        }
    }

    getCleanText(element) {
        const clone = element.cloneNode(true);
        clone.querySelectorAll("style").forEach(styleTag => styleTag.remove());
        return clone.textContent.trim();
    }
}

const LIFERAY_REACT_MAP_ELEMENT_ID = 'liferay-react-map';

if (!customElements.get(LIFERAY_REACT_MAP_ELEMENT_ID)) {
    customElements.define(LIFERAY_REACT_MAP_ELEMENT_ID, LiferayReactMapWebComponent);
}
