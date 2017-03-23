# BemPug

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/werty1001/bempug/master/LICENSE) [![npm](https://img.shields.io/npm/v/bempug.svg?style=flat-square)](https://www.npmjs.com/package/bempug) [![npm](https://img.shields.io/npm/dt/bempug.svg?style=flat-square)](https://www.npmjs.com/package/bempug)

Simple mixins to help you writing code on [BEM](https://en.bem.info/) methodology in [pug](https://pugjs.org/) or jade projects.

---

> You like BEM? Try [BemGo](https://github.com/werty1001/bemgo) — starter kit for developing BEM apps using Gulp and Webpack.

---

### Anchors
[Install](#install) | [Mixins](#mixins) | [Examples](#examples) | [Helpers](#helpers) | [Changelog](#changelog)

---

### Install

Install from npm:
```sh
npm i bempug -D
```
Then include `index` file to your pug or jade project:
```Jade
include ../../node_modules/bempug/index
```

---

### Mixins

Block mixin:

```Pug
+b( name, data, tag )
```

- **name** `String`
- **data** `String or Object`
  - **data.m** `String` — block modifier
  - **data.p** `Boolean` — disable parent mode
  - **data.e** `Array or String` — mix block with element
  - **data.b** `Array or String` — mix block with another block
  - **data.t** `String` — block tag
  - **data.s** `String` — block separators
- **tag** `String`

> If data argument is String it will be a modifier.

<br>

Element mixin:

```Pug
+e( name, data, tag )
```

- **name** `String`
- **data** `String or Object`
  - **data.m** `String` — element modifier
  - **data.p** `String` — parent block
  - **data.e** `Array or String` — mix element with another element
  - **data.b** `Array or String` — mix element with block
  - **data.t** `String` — element tag
  - **data.s** `String` — element separators
- **tag** `String`

> If data argument is String it will be a modifier.

---

### Examples
[Block](#block) | [Element](#element) | [Modifier](#modifier) | [Tag](#tag) | [Mix](#mix) | [Separators](#separators)

---

### Block
Simple example:
```Pug
+b( 'block' )
    +e( 'element' ) Text
```
```HTML
<div class="block">
    <div class="block__element">Text</div>
</div>
```

You can to disable parent mode and element will ignore this block:
```Pug
+b( 'header' )
    +b( 'grid', {p: false} ) // or short {p:0}
        +e( 'logo' ) Logo
```
```HTML
<div class="header">
    <div class="grid">
        <div class="header__logo">Logo</div>
    </div>
</div>
```

---

### Element

Element depends on parent block:
```Pug
+b( 'content' )
    +e( 'layout' ) Content
```
```HTML
<div class="content">
    <div class="content__layout">Content</div>
</div>
```
You can set parent block for element directly:
```Pug
+b( 'content' )
    +e( 'layout', {p: 'page'} ) Content
```
```HTML
<div class="content">
    <div class="page__layout">Content</div>
</div>
```

---

### Modifier

Block and element have modifier:
```Pug
+b( 'alert', 'success' )
    +e( 'text', 'bolder' ) Success
```
```HTML
<div class="alert alert--success">
    <div class="alert__text alert__text--bolder">Success</div>
</div>
```

Block and element have more than one modifier:
```Pug
+b( 'alert', 'success.active' )
    +e( 'text', 'bolder.italic' ) Success
```
```HTML
<div class="alert alert--success alert--active">
    <div class="alert__text alert__text--bolder alert__text--italic">Success</div>
</div>
```

Also, you can set modifiers in `Object`:
```Pug
+b( 'alert', {m: 'success.active'} ) Success
```
```HTML
<div class="alert alert--success alert--active">Success</div>
```

---

### Tag

Default tag is **div**, but you can set it directly:
```Pug
+b( 'news', {}, 'article' )
    +e( 'title', {}, 'h1' ) Title

// Or in data Object

+b( 'news', {t: 'article'} )
    +e( 'title', {t: 'h1'} ) Title
```
```HTML
<article class="news">
    <h1 class="news__title">Title</h1>
</article>
```

Sometimes mixin can be smart and tag depends on parent or attributes:
```Pug
+b( 'list', {t: 'ul'} )
    +e( 'item' ) My item 1
    +e( 'item' ) My item 2
    +e( 'item' ) My item 3

+b( 'link' )(href='https://www.npmjs.com/package/bempug')
    +b( 'text' ) My text
```
```HTML
<ul class="list">
    <li class="list__item">My item 1</li>
    <li class="list__item">My item 2</li>
    <li class="list__item">My item 3</li>
</ul>

<a class="link" href="https://www.npmjs.com/package/bempug">
    <span class="text">My text</span>
</a>
```

Also, you can use `tagByName` global option for set default tag by name:

```Pug
- BEMPUG.tagByName = {list: 'ul', form: 'form', fields: 'fieldset'};

+b( 'list' )
    +e( 'item' ) Item
    +e( 'item' ) Item
    
+b( 'form' )
    +e( 'fields' ) Fields
```
```HTML
<ul class="list">
    <li class="list__item">Item</li>
    <li class="list__item">Item</li>
</ul>

<form class="form">
    <fieldset class="form__fields">Fields</fieldset>
</form>
```

---

### Mix

Block is mixed with element:
```Jade
+b( 'title', {e: 'article'} ) Title
```
```HTML
<div class="title article__title">Title</div>
```

You can set name of element in mix with colon:
```Pug
+b( 'title', {e: 'article:my-name'} ) Title
```
```HTML
<div class="title article__my-name">Title</div>
```

Block is mixed with two elements:
```Pug
+b( 'title', {e: ['article', 'content']} ) Title
```
```HTML
<div class="title article__title content__title">Title</div>
```

Also, you can use ampersand `&` sign as parent block reference:
```Pug
+b( 'news' )
    +b( 'title', {e: '&'} ) Title
    +b( 'text', {e: '&:description'} ) Text
```
```HTML
<div class="news">
    <div class="title news__title">Title</div>
    <div class="text news__description">Text</div>
</div>
```

Block is mixed with element which has modifiers:
```Pug
+b( 'title', {e: 'news|bolder.size-m'} ) Title
```
```HTML
<div class="title news__title news__title--bolder news__title--size-m">Title</div>
```

Element is mixed with another element:
```Pug
+b( 'footer' )
    +e( 'bottom', {e: 'page'} )
```
```HTML
<div class="footer">
    <div class="footer__bottom page__bottom"></div>
</div>
```

Element is mixed with block:
```Pug
+b( 'footer' )
    +e( 'bottom', {b: 'grid'} )
```
```HTML
<div class="footer">
    <div class="footer__bottom grid"></div>
</div>
```

Block is mixed with another block:
```Pug
+b( 'article', {b: 'news'} ) Content
```
```HTML
<div class="article news">Content</div>
```

Block is mixed with another block which has modifiers:
```Pug
+b( 'article', {b: 'news|first'} ) Content
```
```HTML
<div class="article news news--first">Content</div>
```

Block is mixed with two blocks which have modifiers:
```Pug
+b( 'article', {b: ['news|first','fixed|active']} ) Content
```
```HTML
<div class="article news news--first fixed fixed--active">Content</div>
```

---

### Separators
You can change global separators:
```Pug
- BEMPUG.modifier = '_';
- BEMPUG.element = '__';

+b( 'alert', 'success.active' )
    +e( 'text', 'bolder.italic' ) Success
```
```HTML
<div class="alert alert_success alert_active">
    <div class="alert__text alert__text_bolder alert__text_italic">Success</div>
</div>
```

Also, you can set separators for each block and ignore global settings `'modifier|element'`:
```Pug
+b( 'news', {e: 'content', m: 'first', s: '---|___' } )
    +b( 'text', {e: true, m: 'bolder'} ) Text
```
```HTML
<div class="news news---first content___news">
    <div class="text text---bolder news___text">Text</div>
</div>
```

---

### Helpers
[Get current block](#get-current-block) | [Get current parent](#get-current-parent) | [Callbacks](#callbacks)

---

### Get current block
You can get current block name:
```Pug
+b( 'nav' )
    +e( 'item' )
        - console.log( BEMPUG.getCurrentBlock() ); // 'nav'
        +b( 'img' )
            - console.log( BEMPUG.getCurrentBlock() ); // 'img'
```

---

### Get current parent
You can get current parent `Object`:
```Pug
+b( 'html', 'no-js', 'html' )(lang='en')
    - console.log( BEMPUG.getCurrentParent() );
```
```JS
{ type: 'block',
  name: 'html',
  tag: 'html',
  attributes: { lang: 'en' },
  sep: { modifier: '--', element: '__' },
  classes: [ 'html', 'html--no-js' ],
  parent: {},
  selfClosing: false }
```

---

### Callbacks
You can set `beforeParse` callback:
```Pug
- BEMPUG.beforeParse[ 'input' ] = function( block ) {

    if ( typeof block.data.m === 'undefined' ) block.data.m = 'default';
}

+b( 'input', {m: 'search'} ) // Have modifier 'search'

+b( 'input' ) // No modifier, but we set modifier 'default' by callback
```
```HTML
<input class="input input--search">
<input class="input input--default">
```

You can set `afterParse` callback:
```Pug
- BEMPUG.afterParse[ 'page' ] = function( block ) {

    block.setTag( 'body' );
    block.addModifier( 'test' );
    block.attributes.itemscope = true;
    block.attributes.itemtype = 'http://schema.org/WebPage';
}

+b( 'page' ) My page
```
```HTML
<body class="page page--test" itemscope itemtype="http://schema.org/WebPage">My page</body>
```

---

### Changelog

#### 1.1.1
* **Fixed**: disable parent mode not work in cb
* **Fixed**: name of element in mix with another element

#### 1.1.0
* **Add**: ampersand sign for mix
* **Add**: mix element with blocks and another elements

#### 1.0.2
* **Add**: some global helpers
* **Add**: before / after parse callback
* **Fixed**: block and element separators work for any descendant
* **Fixed**: default tag depends on parent tag for any descendant

#### 1.0.1
* **Add**: disable parent mode for blocks

#### 1.0.0
* **Release version**

---

### Thanks

Many thanks to Roman Komarov for the [original idea](https://github.com/kizu/bemto).

