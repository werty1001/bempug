[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/werty1001/bempug/master/LICENSE) [![npm](https://img.shields.io/npm/v/bempug.svg?style=flat-square)](https://www.npmjs.com/package/bempug) [![npm](https://img.shields.io/npm/dt/bempug.svg?style=flat-square)](https://www.npmjs.com/package/bempug)

# BemPug — some pug / jade mixins for BEM

Simple mixins to help you writing code on [BEM](https://en.bem.info/) methodology in [pug](https://pugjs.org/) / jade projects.

##### Anchors
[Install](#install) | [Mixins](#mixins) | [Examples](#examples) | [Settings](#global-settings) | [Changelog](#changelog)

## Install

Install from npm:
```sh
npm i bempug --save-dev
```
Then include `index` file to your pug / jade project:
```Jade
include ../../node_modules/bempug/index
```

## Mixins

```Jade
//- Block mixin
+b(name, data, tag)
```
- **name** (String)
- **data** (String or Object)
  - **data.m** (String) — [block modifier]
  - **data.p** (Boolean) — [disabled parent mode]
  - **data.e** (Array or String or Boolean) — [mix block with element]
  - **data.b** (Array or String) — [mix block with another blocks]
  - **data.t** (String) — [block tag]
  - **data.s** (String) — [block separators]
- **tag** (String)

```Jade
//- Element mixin
+e(name, data, tag)
```
- **name** (String)
- **data** (String or Object)
  - **data.m** (String) — [element modifier]
  - **data.p** (String) — [element parent]
  - **data.t** (String) — [element tag]
  - **data.s** (String) — [element separators]
- **tag** (String)

> If data argument is String it will be modifier.

## Examples
[Element](#element) | [Modifier](#modifier) | [Tag](#tag) | [Mix with element](#mix-with-element) | [Mix blocks](#mix-blocks) | [Disable parent](#disable-parent) | [Separators](#separators)

Simple example:
```Jade
+b('block')
    +e('text') Text
```
```HTML
<div class="block">
    <div class="block__text">Text</div>
</div>
```

### Element

Element depends on parent block, but you can set it directly:
```Jade
+b('block')
    +e('text') Element text
    +e('text', {p: 'content'}) Element text
```
```HTML
<div class="block">
    <div class="block__text">Element text</div>
    <div class="content__text">Element text</div>
</div>
```

### Modifier

Block and element have modifier:
```Jade
+b('alert', 'success')
    +e('text', 'bolder') Success
```
```HTML
<div class="alert alert--success">
    <div class="alert__text alert__text--bolder">Success</div>
</div>
```

Block and element have more than one modifier:
```Jade
+b('alert', 'success.active')
    +e('text', 'bolder.italic') Success text
```
```HTML
<div class="alert alert--success alert--active">
    <div class="alert__text alert__text--bolder alert__text--italic">Success text</div>
</div>
```

When block is mixed:
```Jade
+b('alert', {m: 'success.active', e: 'content'}) Success
```
```HTML
<div class="alert alert--success alert--active content__alert">Success</div>
```

### Tag

Default tag is **div**, but you can set it directly:
```Jade
+b('news', '', 'article')
    +e('title', '', 'h1') Title
```
```HTML
<article class="news">
    <h1 class="news__title">Title</h1>
</article>
```

Or in data argument:
```Jade
+b('news', {t: 'article'})
    +e('title', {t: 'h1'}) Title
```
```HTML
<article class="news">
    <h1 class="news__title">Title</h1>
</article>
```

Sometimes mixin can be smart and tag depends on parent or attributes:
```Jade
+b('list', {t: 'ul'})
    +e('item') My item 1
    +e('item') My item 2
    +e('item') My item 3
```
```HTML
<ul class="list">
    <li class="list__item">My item 1</li>
    <li class="list__item">My item 2</li>
    <li class="list__item">My item 3</li>
</ul>
```
```Jade
+b('link')(href='https://www.npmjs.com/package/bempug')
    +b('text') My text
```
```HTML
<a class="link" href="https://www.npmjs.com/package/bempug">
    <span class="text">My text</span>
</a>
```
> Also, you can use [tagByName](#bempug-tagbyname) global option for set default tag by name.

### Mix with element

Block is mixed with element:
```Jade
+b('title', {e: 'article', t: 'h1'}) Title
```
```HTML
<h1 class="title article__title">Title</h1>
```

You can set name of element in mix with colon:
```Jade
+b('title', {e: 'article:my-name', t: 'h1'}) Title
```
```HTML
<h1 class="title article__my-name">Title</h1>
```

Block is mixed with two elements:
```Jade
+b('title', {e: ['article', 'content'], t: 'h1'}) Title
```
```HTML
<h1 class="title article__title content__title">Title</h1>
```

Block is mixed with element of parent block:
```Jade
+b('news')
    +b('title', {e: true, t: 'h1'}) Title
```
```HTML
<div class="news">
    <h1 class="title news__title">Title</h1>
</div>
```

Block is mixed with element which has modifiers:
```Jade
+b('title', {e: 'article|big.bold', t: 'h1'}) Title
```
```HTML
<h1 class="title article__title article__title--big article__title--bold">Title</h1>
```

Block is mixed with element and contain modifiers for both:
```Jade
+b('title', {m: 'center', e: 'article|big.bold', t: 'h1'}) Title
```
```HTML
<h1 class="title title--center article__title article__title--big article__title--bold">Title</h1>
```

### Mix blocks

Block is mixed with another block:
```Jade
+b('article', {b: 'text'}) Text
```
```HTML
<div class="article text">Text</div>
```

Block is mixed with another block which has modifiers:
```Jade
+b('article', {b: 'text|bold.big'}) Text
```
```HTML
<div class="article text text--bold text--big">Text</div>
```

Block is mixed with two blocks which have modifiers:
```Jade
+b('article', {b: ['news|first','text|bold.big']}) Text
```
```HTML
<div class="article news news--first text text--bold text--big">Text</div>
```

### Disable parent

You can disable parent mode and element will ignore this block:
```Jade
+b('header')
    +b('grid', {p: false})
        +e('logo') Logo
```
```HTML
<div class="header">
    <div class="grid">
        <div class="header__logo">Logo</div>
    </div>
</div>
```

### Separators

You can set separators directly and ignore global settings (modifier|element):
```Jade
+b('article', {e: 'content', m: 'first', s: '----|____' })
    +b('text', {e: true, m: 'bolder'})
        +e('mark') Text
```
```HTML
<div class="article article----first content____article">
    <div class="text text----bolder article____text">
        <div class="text____mark">Text</div>
    </div>
</div>
```

## Global settings
[Get current block](#bempug-getcurrentblock) | [Get current parent](#bempug-getcurrentparent) | [Set modifier separator](#bempug-modifier) | [Set element separator](#bempug-element) | [Set tag by name](#bempug-tagbyname) | [Before parse callback](#bempug-beforeparse) | [After parse callback](#bempug-afterparse)

#### BEMPUG.getCurrentBlock
You can get current block name:
```Jade
+b('nav')
    +e('item')
        - console.log( BEMPUG.getCurrentBlock() ); // 'nav'
        +b('img')
            - console.log( BEMPUG.getCurrentBlock() ); // 'img'
```

#### BEMPUG.getCurrentParent
You can get current parent object:
```Jade
+b('html', 'no-js', 'html')(lang='en')
    - console.log( BEMPUG.getCurrentParent() );
    +b('page')
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

#### BEMPUG.modifier
You can set modifier separator:
```Jade
- BEMPUG.modifier = '_';
```

#### BEMPUG.element
You can set element separator:
```Jade
- BEMPUG.element = '__';
```

#### BEMPUG.tagByName
You can set tagByName option:
```Jade
- BEMPUG.tagByName = {list: 'ul'};
```
```Jade
+b('list')
    +e('item') Item text
    +e('item') Item text
```
```HTML
<ul class="list">
    <li class="list__item">Item text</li>
    <li class="list__item">Item text</li>
</ul>
```

#### BEMPUG.beforeParse
You can set beforeParse callback:
```Jade
- BEMPUG.beforeParse[ 'input' ] = function( block ) {
    if ( typeof block.data.m === 'undefined' ) block.data.m = 'default';
}

+b('input', {m: 'search'}) // Have modifier 'search'

+b('input') // No modifier, but we set modifier 'default' by callback
```
```HTML
<input class="input input--search">
<input class="input input--default">
```

#### BEMPUG.afterParse
You can set afterParse callback:
```Jade
- BEMPUG.afterParse[ 'page' ] = function( block ) {
    block.setTag( 'body' );
    block.addModifier( 'test' );
    block.attributes.itemscope = true;
    block.attributes.itemtype = 'http://schema.org/WebPage';
}

+b('page') My page
```
```HTML
<body class="page page--test" itemscope itemtype="http://schema.org/WebPage">My page</body>
```


## Changelog
```
// 1.0.2
- Fixed: Default tag depends on parent tag for any descendant
- Add: If you set separators directly — it will work for descendant too
- Add: Some global helpers
- Add: Before / after parse callback

// 1.0.1
- Add: disable parent mode for blocks

// 1.0.0
- Release version
```

## Thanks

Many thanks to Roman Komarov for the [original idea](https://github.com/kizu/bemto).

