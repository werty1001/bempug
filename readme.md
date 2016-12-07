[BEM]: https://en.bem.info/
[pug]: https://pugjs.org/

# BemPug — some pug / jade mixins for BEM

Simple mixins to help you writing code on [BEM][] methodology in [pug][] / jade projects.

[![NPM](https://nodei.co/npm/bempug.png?downloads=true&stars=true)](https://www.npmjs.com/package/bempug)

#### Anchors
[Install](#install) | [Mixins](#mixins) | [Examples](#examples) | [Settings](#global-settings) | [Changelog](#changelog)

## Install

Install from npm:
```Pug
npm i bempug --save-dev
```
Then include `index` file to your pug / jade project:
```Pug
include ../../node_modules/bempug/index
```

## Mixins

```Pug
//- Block mixin
+b(name, data, tag)
```
- **name** (String)
- **data** (String or Object)
  - **data.m** (String) — [block modifier]
  - **data.p** (Boolean) — [disabled parent mode]
  - **data.e** (Array or String or Boolean) — [mix block with element]
  - **data.b** (Array or String) — [mix block with another blocks]
  - **data.s** (String) — [block separators]
- **tag** (String)

> If data argument is String it will be modifier.

```Pug
//- Element mixin
+e(name, data, tag)
```
- **name** (String)
- **data** (String or Object)
  - **data.m** (String) — [element modifier]
  - **data.p** (String) — [element parent]
  - **data.s** (String) — [element separators]
- **tag** (String)

> If data argument is String it will be modifier.

## Examples
[Element](#element) | [Modifier](#modifier) | [Tag](#tag) | [Mix with element](#mix-with-element) | [Mix blocks](#mix-blocks) | [Disable parent](#disable-parent) | [Separators](#separators)

Simple example:
```Pug
+b('block')
    +e('text') Element text
```
```HTML
<div class="block">
    <div class="block__text">Element text</div>
</div>
```

### Element

Element depends on parent block, but you can set it directly:
```Pug
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
```Pug
+b('alert', 'success')
    +e('text', 'bolder') Success
```
```HTML
<div class="alert alert--success">
    <div class="alert__text alert__text--bolder">Success</div>
</div>
```

Block and element have many modifiers:
```Pug
+b('alert', 'success.active')
    +e('text', 'bolder.italic') Success text
```
```HTML
<div class="alert alert--success alert--active">
    <div class="alert__text alert__text--bolder alert__text--italic">Success text</div>
</div>
```

When block is mixed with element or another block — you can set main block modifiers in Object:
```Pug
+b('alert', {m: 'success.active', e: 'content'}) Success
```
```HTML
<div class="alert alert--success alert--active content__alert">Success</div>
```

### Tag

Default tag is **div**, but you can set it directly:
```Pug
+b('news', {}, 'article')
    +e('title', {}, 'h1') Title
```
```HTML
<article class="news">
    <h1 class="news__title">Title</h1>
</article>
```

Sometimes mixin can be smart and tag depends on parent block or attributes:
```Pug
+b('list', {}, 'ul')
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
```Pug
+b('link')(href='https://www.npmjs.com/package/bempug')
    +b('text') My text
```
```HTML
<a class="link" href="https://www.npmjs.com/package/bempug">
    <span class="text">My text</span>
</a>
```
> Also, you can use [tagByName](#global-settings) global option for set default tag by name.

### Mix with element

Block is mixed with element:
```Pug
+b('title', {e: 'article'}, 'h1') Title
```
```HTML
<h1 class="title article__title">Title</h1>
```

You can set name of element in mix with colon:
```Pug
+b('title', {e: 'article:my-name'}, 'h1') Title
```
```HTML
<h1 class="title article__my-name">Title</h1>
```

Block is mixed with two elements:
```Pug
+b('title', {e: ['article', 'content']}, 'h1') Title
```
```HTML
<h1 class="title article__title content__title">Title</h1>
```

Block is mixed with element of parent block:
```Pug
+b('news')
    +b('title', {e: true}, 'h1') Title
```
```HTML
<div class="news">
    <h1 class="title news__title">Title</h1>
</div>
```

Block is mixed with element which has modifiers:
```Pug
+b('title', {e: 'article|big.bold'}, 'h1') Title
```
```HTML
<h1 class="title article__title article__title--big article__title--bold">Title</h1>
```

Block is mixed with element and contain modifiers for both:
```Pug
+b('title', {m: 'center', e: 'article|big.bold'}, 'h1') Title
```
```HTML
<h1 class="title title--center article__title article__title--big article__title--bold">Title</h1>
```

### Mix blocks

Block is mixed with another block:
```Pug
+b('article', {b: 'text'}) Text
```
```HTML
<div class="article text">Text</div>
```

Block is mixed with another block which has modifiers:
```Pug
+b('article', {b: 'text|bold.big'}) Text
```
```HTML
<div class="article text text--bold text--big">Text</div>
```

Block is mixed with two blocks which have modifiers:
```Pug
+b('article', {b: ['news|first','text|bold.big']}) Text
```
```HTML
<div class="article news news--first text text--bold text--big">Text</div>
```

### Disable parent

You can disable block parent mode and element will ignore it:
```Pug
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

You can set separators directly and ignore global settings:
```Pug
+b('title', {e: 'article', m: 'center.big', s: '----|____' }, 'h1') Title
```
```HTML
<h1 class="title title----center title----big article____title">Title</h1>
```

## Global settings
You can change **separators** and set **tagByName** option, example:

```Pug
include ../../node_modules/bempug/index

- BEMPUG.modifier = '_';
- BEMPUG.element = '__';
- BEMPUG.tagByName = {page: 'body', mylist: 'ul'};

doctype
+b('html', 'no-js', 'html')(lang='en')
    head
        meta(charset='utf-8')
        title Title
    +b('page', 'test')
        +b('mylist')
            +e('item', 'first') First element
            +e('item', 'second') Second element

```
```HTML
<!DOCTYPE html>
<html class="html html_no-js" lang="en">
    <head>
        <meta charset="utf-8">
        <title>Test page</title>
    </head>
    <body class="page page_test">
        <ul class="mylist">
            <li class="mylist__item mylist__item_first">First element</li>
            <li class="mylist__item mylist__item_second">Second element</li>
        </ul>
    </body>
</html>
```

## Changelog
```
// 1.0.1
- Add: disable parent mode for blocks

// 1.0.0
- Release version
```

## Thanks

[original idea]: https://github.com/kizu/bemto
Many thanks to Roman Komarov for the [original idea][].

## License

[MIT](LICENSE)
