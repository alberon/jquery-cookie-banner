# Cookie Banner JS

Cookie Banner JS is a simple jQuery plugin that will create a cookie banner on
your site.

It is designed to be as minimalistic as possible, so there is no styling/css
in the package src, but you're welcome to view the
[examples](examples/fixed-top.html) if you want to see some examples

## Installation

This package is available via bower or you can view the src on
[github](https://github.com/alberon/jquery-cookie-banner)

```bash
bower install jquery-cookie-banner
```

Then you can use the [dist directory](dist) to load in the files that you 

*Note: in the dist folder there are 3 main files, a raw file, a minified file
and a packaged file, use whichever one your project requires*

## Usage

Using the package is simple by design, if you want the default configuration
using the below will suffice

```javascript
$('body').cookieBanner();
```

*Note: Styles are not applied so it is strongly recommended that you create
some of your own styles*
  
### Advanced Usage

There are a variety of options available to be passed through to the plugin,
the defaults of which are shown below

#### animate

The animate property is either an empty function which is passed the close click
event or false depending on whether or not an animation is wanted

```javascript
animate: {
    close: false
}
```

*Note: If this function is added in, you will want to remove the cookie banner
as well as remove the class that is added to the body* `cookie-banner-active`

#### cookie

The cookie property is an object which contains various settings that interact
with the [js-cookie library](https://github.com/js-cookie/js-cookie) and are
used in the get, set and remove functions

```javascript
cookie: {
    name: 'accepted_cookie_policy',
    value: true,
    text: 'Accept & Close'
}
```

There are a few properties of cookie that may be added as additionals, which are
as follows

*Note: these are omitted by default*

##### expires

Define when the cookie will be removed

```javascript
expires: 7
```

*Note: this field can be a number (i.e. days from creation) or a specific date*

##### path

A `String` indicating the path where the cookie is visible

```javascript
path: '/'
```

##### domain

A `String` indicating a valid domain where the cookie should be visible.
The cookie will also be visible to all subdomains

```javascript
domain: 'subdomain.site.com'
```

##### secure

Either `true` or `false`, indicating if the cookie transmission requires a
secure protocol (https)

```javascript
secure: true
```


#### link

The link property is an object which contains the url and text of the text link
that is used to provide the user with the cookie policy

```javascript
link: {
    url: '/cookie-policy',
    text: 'Cookies Policy.'
}
```

#### text

The text property is the string in the cookie banner displayed to the user

```javascript
text: 'This site uses cookies to give you the best possible user ' +
      'experience. To find out more please view our '
```

#### testMode

The testMode property will delete the cookie on initialising the plugin which
allows for easy testing of styling, but realistically will always be false

```javascript
testMode: false
```
